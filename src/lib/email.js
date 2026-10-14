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

/** Returns a Response on failure, or null when sent (or logged in dev). */
export async function sendMail({ subject, html, replyTo }) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV === "production") {
      return Response.json({ error: "Submissions are temporarily unavailable. Please call or WhatsApp us." }, { status: 503 });
    }
    console.log("[dev] mail not configured:", subject);
    return null;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], subject, html, reply_to: replyTo || undefined }),
  });
  return res.ok ? null : Response.json({ error: "Could not send. Please try again." }, { status: 502 });
}

/**
 * Appends one row to the Google Sheet behind an Apps Script web app (docs/google-sheet-webhook.gs).
 *
 * Deliberately swallows every failure: email is how the firm actually receives an enquiry, and a
 * sheet that is down, slow or misconfigured must never turn a successful submission into an error
 * for the visitor. Failures are logged, not surfaced.
 *
 * Awaited rather than fired and forgotten: on a serverless host the function is frozen once the
 * response is returned, so an un-awaited fetch may simply never be sent. The timeout is what keeps
 * that await from holding the visitor up.
 */
export async function sendToSheet(form, data, request) {
  const { SHEETS_WEBHOOK_URL, SHEETS_WEBHOOK_TOKEN } = process.env;
  if (!SHEETS_WEBHOOK_URL) {
    if (process.env.NODE_ENV !== "production") console.log("[dev] sheet not configured:", form);
    return;
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
      return;
    }
    const body = await res.json().catch(() => null);
    if (body && body.ok === false) console.error(`[sheet] ${form}: rejected — ${body.error || "no reason given"}`);
  } catch (err) {
    console.error(`[sheet] ${form}:`, err.message);
  }
}
