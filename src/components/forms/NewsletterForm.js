"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [state, setState] = useState({ busy: false, done: false, error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ busy: true, done: false, error: "" });
    try {
      const res = await fetch("/api/newsletter", { method: "POST", body: new FormData(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setState({ busy: false, done: true, error: "" });
    } catch (err) {
      setState({ busy: false, done: false, error: err.message });
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6">
      <h2 className="text-xl font-bold">Get compliance updates by email</h2>
      <p className="mt-1 text-sm text-brand-muted">Due dates and changes that matter to businesses and taxpayers. No spam.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="input" />
        <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" disabled={state.busy} className="btn btn-primary disabled:opacity-60">{state.busy ? "Subscribing…" : "Subscribe"}</button>
      </div>
      {state.done && <p role="status" className="mt-3 text-sm font-medium text-brand-success">Thank you. You are subscribed.</p>}
      {state.error && <p role="alert" className="mt-3 text-sm font-medium text-brand-danger">{state.error}</p>}
    </form>
  );
}
