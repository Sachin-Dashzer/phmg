// Shared server helpers for form routes: HTML escaping, rate limit and Resend delivery.

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
