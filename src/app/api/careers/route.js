import { applicationSchema } from "@/lib/validators";
import { rateLimited, rows, sendMail } from "@/lib/email";

// Job applications. Mirrors the contact handler: same rate limit, same honeypot behaviour, and
// the same stateless approach — nothing is stored, the application is emailed on.
export async function POST(request) {
  if (rateLimited(request)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const form = Object.fromEntries(await request.formData());
  const parsed = applicationSchema.safeParse(form);
  if (!parsed.success) {
    // A filled honeypot is a bot: pretend success.
    if (form.website) return Response.json({ ok: true });
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const d = parsed.data;
  const html = `<h2>Job application</h2>${rows({
    Name: d.name,
    Phone: d.phone,
    Email: d.email,
    Role: d.role,
    Location: d.location,
    Qualification: d.qualification,
    Experience: d.experience,
    CV: d.cv,
    Message: d.message,
  })}`;
  const failed = await sendMail({ subject: `Job application: ${d.role || "General"} – ${d.name}`, html, replyTo: d.email });
  return failed || Response.json({ ok: true });
}
