"use client";

import { useRef, useState } from "react";
import { runners } from "@/lib/calculators/runners";
import { track } from "@/components/layout/Analytics";

export default function ToolRunner({ slug }) {
  const { fields, run } = runners[slug];
  const [raw, setRaw] = useState(() => Object.fromEntries(fields.map((f) => [f.name, f.default])));
  const used = useRef(false);
  const change = (name, value) => {
    if (!used.current) { used.current = true; track("calculator_use", { tool: slug }); }
    setRaw((r) => ({ ...r, [name]: value }));
  };

  // numbers parsed on every render; empty input counts as 0
  const values = Object.fromEntries(fields.map((f) => [f.name, f.type === "select" ? raw[f.name] : Number(raw[f.name]) || 0]));
  const result = run(values);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form onSubmit={(e) => e.preventDefault()} className="card space-y-4 p-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`${slug}-${f.name}`} className="mb-1 block text-sm font-medium text-brand-navy">{f.label}</label>
            {f.type === "select" ? (
              <select id={`${slug}-${f.name}`} className="input" value={raw[f.name]} onChange={(e) => change(f.name, e.target.value)}>
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ) : (
              <input id={`${slug}-${f.name}`} className="input" type="number" inputMode="decimal" min={f.min} max={f.max} step={f.step} value={raw[f.name]} onChange={(e) => change(f.name, e.target.value)} />
            )}
          </div>
        ))}
      </form>
      <div className="card bg-brand-mist p-6" aria-live="polite">
        <h2 className="text-xl font-bold">Result</h2>
        <dl className="mt-4 divide-y divide-brand-line">
          {result.rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-sm">{r.label}</dt>
              <dd className={r.strong ? "text-xl font-extrabold text-brand-blue-dark" : "font-semibold"}>{r.value}</dd>
            </div>
          ))}
        </dl>
        {result.note && <p className="mt-4 text-xs text-brand-muted">{result.note}</p>}
      </div>
    </div>
  );
}
