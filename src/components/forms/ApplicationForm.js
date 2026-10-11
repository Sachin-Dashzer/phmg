"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";
import { track } from "@/components/layout/Analytics";

// Job application form. Posts to /api/careers, which validates with the same honeypot and
// consent pattern as the enquiry form and emails the application on. The CV is a link rather
// than an upload: the form handlers are stateless and have nowhere to put a file.
export default function ApplicationForm({ roles = [], defaultRole = "", locations = [], id = "apply" }) {
  const router = useRouter();
  const [state, setState] = useState({ busy: false, error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ busy: true, error: "" });
    try {
      const data = new FormData(form);
      const res = await fetch("/api/careers", { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || "Something went wrong. Please try again.");
      track("job_application", { form_id: id, role: data.get("role") || undefined });
      router.push("/thank-you");
    } catch (err) {
      setState({ busy: false, error: err?.message || "Something went wrong. Please try again." });
    }
  }

  const inputClass =
    "h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-base text-brand-navy outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 sm:text-sm";
  const labelClass = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-neutral-600";

  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={`${id}-${name}`} className={labelClass}>{label}</label>
      <input id={`${id}-${name}`} name={name} className={inputClass} {...props} />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold">Apply</h2>
      <p className="mt-1.5 text-sm text-brand-muted">
        Share your details and a link to your CV. A member of the team will reply by email.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field("name", "Full name", { required: true, minLength: 2, maxLength: 80, autoComplete: "name", placeholder: "Your name" })}
        {field("phone", "Mobile", { required: true, type: "tel", inputMode: "numeric", autoComplete: "tel", placeholder: "10-digit mobile" })}
        {field("email", "Email", { required: true, type: "email", maxLength: 120, autoComplete: "email", placeholder: "you@example.com" })}

        <div>
          <label htmlFor={`${id}-role`} className={labelClass}>Role</label>
          <select id={`${id}-role`} name="role" defaultValue={defaultRole} className={inputClass}>
            <option value="">Select a role</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            <option value="Speculative application">Speculative application</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-location`} className={labelClass}>Preferred office</label>
          <select id={`${id}-location`} name="location" className={inputClass}>
            <option value="">No preference</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {field("qualification", "Qualification", { maxLength: 120, placeholder: "e.g. CA, CA Inter, B.Com" })}
        {field("experience", "Experience", { maxLength: 60, placeholder: "e.g. 3 years, or fresher" })}
        {field("cv", "Link to your CV", { type: "url", maxLength: 300, placeholder: "Google Drive, Dropbox or LinkedIn URL" })}
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-message`} className={labelClass}>Anything else</label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          maxLength={1500}
          placeholder="Where you are now, what you would like to work on, notice period"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-base text-brand-navy outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 sm:text-sm"
        />
      </div>

      {/* Honeypot: hidden from people, usually filled by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input id={`${id}-consent`} name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-brand-gold" />
        <label htmlFor={`${id}-consent`} className="text-xs leading-relaxed text-brand-muted">
          I agree that my details may be used to consider this application, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-blue underline">privacy policy</Link>.
        </label>
      </div>

      {state.error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-brand-danger">{state.error}</p>
      )}

      <button type="submit" disabled={state.busy} className="btn btn-gold mt-5 w-full disabled:opacity-70">
        {state.busy ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending</> : <>Send application <Send size={15} aria-hidden="true" /></>}
      </button>
    </form>
  );
}
