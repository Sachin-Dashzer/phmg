// Shared server helpers for form routes: HTML escaping, rate limit, Resend delivery and the
// Google Sheet append.

export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// ponytail: in-memory limiter, per server instance. Use Redis/Upstash if you scale out.
const hits = new Map();
export function rateLimited(request, max = 5, windowMs = 10 * 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}

export const rows = (obj) =>
  `<ul>${Object.entries(obj).filter(([, v]) => v).map(([k, v]) => `<li><b>${k}:</b> ${esc(v)}</li>`).join("")}</ul>`;

/** True when the message was handed to Resend (or, in development, logged instead). */
export async function sendMail({ subject, html, replyTo }) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV === "production") {
      console.error("[mail] not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL");
      return false;
    }
    // Development has no keys by design; treat it as delivered so local forms behave normally.
    console.log("[dev] mail not configured:", subject);
    return true;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], subject, html, reply_to: replyTo || undefined }),
  });
  if (!res.ok) console.error(`[mail] Resend HTTP ${res.status}`);
  return res.ok;
}

/**
 * The reply to the visitor. A submission is accepted when at least one sink took it: an enquiry
 * sitting in the Google Sheet has not been lost just because the mail key is missing, and telling
 * someone to call instead when their message did arrive costs a real enquiry.
 */
export function delivered(results) {
  if (results.some(Boolean)) return Response.json({ ok: true });
  return Response.json(
    { error: "Submissions are temporarily unavailable. Please call or WhatsApp us." },
    { status: 503 }
  );
}

/**
 * Appends one row to the Google Sheet behind an Apps Script web app (docs/google-sheet-webhook.gs).
 *
 * Never throws: it reports whether the row landed and leaves the routing decision to `delivered`.
 * A sheet that is down, slow or misconfigured must not turn a submission that email accepted into
 * an error for the visitor. Failures are logged, not surfaced.
 *
 * Awaited rather than fired and forgotten: on a serverless host the function is frozen once the
 * response is returned, so an un-awaited fetch may simply never be sent. The timeout is what keeps
 * that await from holding the visitor up.
 */
export async function sendToSheet(form, data, request) {
  const { SHEETS_WEBHOOK_URL, SHEETS_WEBHOOK_TOKEN } = process.env;
  if (!SHEETS_WEBHOOK_URL) {
    if (process.env.NODE_ENV !== "production") console.log("[dev] sheet not configured:", form);
    return false;
  }
  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The page the form was submitted from, so a lead can be traced back to what prompted it.
      body: JSON.stringify({
        token: SHEETS_WEBHOOK_TOKEN || "",
        form,
        data: { ...data, page: request?.headers.get("referer") || "" },
      }),
      signal: AbortSignal.timeout(8000),
    });
    // Apps Script answers 200 even when it refuses the row (a wrong token, an unknown form), so
    // the status alone would hide a misconfiguration that silently drops every lead. Read the body.
    if (!res.ok) {
      console.error(`[sheet] ${form}: HTTP ${res.status}`);
      return false;
    }
    const body = await res.json().catch(() => null);
    if (body && body.ok === false) {
      console.error(`[sheet] ${form}: rejected — ${body.error || "no reason given"}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[sheet] ${form}:`, err.message);
    return false;
  }
}
