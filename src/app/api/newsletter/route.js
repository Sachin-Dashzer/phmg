import { z } from "zod";
import { delivered, rateLimited, rows, sendMail, sendToSheet } from "@/lib/email";

const schema = z.object({
  email: z.string().trim().email().max(120),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(request) {
  if (rateLimited(request)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const form = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(form);
  if (!parsed.success) {
    if (form.website) return Response.json({ ok: true });
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  // ponytail: subscriptions arrive as an email and a sheet row; move to a mailing-list provider
  // when volume grows.
  return delivered(await Promise.all([
    sendMail({ subject: "Newsletter subscription", html: `<h2>New subscriber</h2>${rows({ Email: parsed.data.email })}` }),
    sendToSheet("newsletter", parsed.data, request),
  ]));
}
