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
