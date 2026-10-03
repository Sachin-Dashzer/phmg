import { leadSchema } from "@/lib/validators";
import { rateLimited, rows, sendMail } from "@/lib/email";

export async function POST(request) {
  if (rateLimited(request)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const form = Object.fromEntries(await request.formData());
  const parsed = leadSchema.safeParse(form);
  if (!parsed.success) {
    // A filled honeypot is a bot: pretend success.
    if (form.website) return Response.json({ ok: true });
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const d = parsed.data;
  const html = `<h2>New enquiry</h2>${rows({ Name: d.name, Phone: d.phone, Email: d.email, Service: d.service, City: d.city, "Preferred time": d.slot, Message: d.message })}`;
  const failed = await sendMail({ subject: `New enquiry: ${d.service || "General"} – ${d.name}`, html, replyTo: d.email });
  return failed || Response.json({ ok: true });
}
