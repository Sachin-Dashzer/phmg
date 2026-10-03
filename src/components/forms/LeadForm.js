"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/components/layout/Analytics";
import Link from "next/link";

// variant "quick": name, mobile, service, city. variant "full": adds email + message.
// inline: three fields in a row on desktop (no city), consent and button on the next row.
export default function LeadForm({ variant = "quick", defaultService = "", services = [], id = "lead", submitLabel = "Book Free Consultation", showSlot = false, inline = false }) {
  const router = useRouter();
  const [state, setState] = useState({ busy: false, error: "" });
  const full = variant === "full";

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ busy: true, error: "" });
    try {
      const data0 = new FormData(form);
      const res = await fetch("/api/contact", { method: "POST", body: data0 });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      track("generate_lead", { form_id: id, service: data0.get("service") || undefined });
      router.push("/thank-you");
    } catch (err) {
      setState({ busy: false, error: err.message });
    }
  }

  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="mb-1 block text-sm font-medium text-brand-navy">{label}</label>
      <input id={`${id}-${name}`} name={name} className="input" {...props} />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className={inline ? "grid gap-3 md:grid-cols-3" : "space-y-3"} aria-describedby={state.error ? `${id}-error` : undefined}>
      {field("name", "Your name", { required: true, autoComplete: "name", minLength: 2 })}
      {field("phone", "Mobile number", { required: true, type: "tel", autoComplete: "tel", inputMode: "tel", pattern: "(\\+91[\\s\\-]?)?[6-9][0-9]{9}", title: "10-digit Indian mobile number" })}
      {full && field("email", "Email (optional)", { type: "email", autoComplete: "email" })}
      <div>
        <label htmlFor={`${id}-service`} className="mb-1 block text-sm font-medium text-brand-navy">Service needed</label>
        <select id={`${id}-service`} name="service" defaultValue={defaultService} className="input">
          <option value="">Select a service</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {!inline && field("city", "City", { autoComplete: "address-level2" })}
      {showSlot && (
        <div>
          <label htmlFor={`${id}-slot`} className="mb-1 block text-sm font-medium text-brand-navy">Preferred time</label>
          <select id={`${id}-slot`} name="slot" className="input">
            <option value="">Any time</option>
            <option>Morning (10am–1pm)</option>
            <option>Afternoon (1pm–4pm)</option>
            <option>Evening (4pm–7pm)</option>
          </select>
        </div>
      )}
      {full && (
        <div>
          <label htmlFor={`${id}-message`} className="mb-1 block text-sm font-medium text-brand-navy">How can we help?</label>
          <textarea id={`${id}-message`} name="message" rows={4} maxLength={1500} className="input" />
        </div>
      )}
      {/* honeypot: hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={inline ? "space-y-2 md:col-span-2 md:self-center" : "space-y-3"}>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />
          <span>I agree to be contacted about my enquiry and to the <Link href="/privacy-policy" className="text-brand-blue-dark underline">Privacy Policy</Link>.</span>
        </label>
        {state.error && <p id={`${id}-error`} role="alert" className="text-sm font-medium text-brand-danger">{state.error}</p>}
      </div>
      <button type="submit" disabled={state.busy} className="btn btn-primary w-full disabled:opacity-60">
        {state.busy ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
