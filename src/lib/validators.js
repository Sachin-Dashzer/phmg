import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.union([z.literal(""), z.string().trim().email().max(120)]).optional(),
  service: z.string().trim().max(120).optional(),
  city: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1500).optional(),
  slot: z.string().trim().max(60).optional(),
  consent: z.literal("on", { message: "Please accept the consent to continue" }),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

// Job application. Same honeypot and consent pattern as leadSchema. A CV is accepted as a link
// rather than an upload: the form handlers are stateless and have nowhere to put a file.
export const applicationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  role: z.string().trim().max(120).optional(),
  location: z.string().trim().max(80).optional(),
  qualification: z.string().trim().max(120).optional(),
  experience: z.string().trim().max(60).optional(),
  cv: z.union([z.literal(""), z.string().trim().url("Enter a valid link to your CV").max(300)]).optional(),
  message: z.string().trim().max(1500).optional(),
  consent: z.literal("on", { message: "Please accept the consent to continue" }),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});
