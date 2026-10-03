"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Recurring monthly filings. Same dates as /tax-calendar; extensions are announced by notification.
const items = [
  { day: 7, label: "TDS and TCS deposit", note: "For the previous month" },
  { day: 11, label: "GSTR-1", note: "Monthly filers" },
  { day: 15, label: "PF and ESI payment", note: "For the previous month" },
  { day: 20, label: "GSTR-3B", note: "Monthly filers" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Today's date as a string so the snapshot is stable. The server snapshot is null, so the
// server-rendered HTML never contains a date that would be wrong by the time it is viewed.
const subscribe = () => () => {};
const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};
const getServerToday = () => null;

const nextDue = (day, today) => {
  const due = new Date(today.getFullYear(), today.getMonth(), day);
  return due < today ? new Date(today.getFullYear(), today.getMonth() + 1, day) : due;
};

const when = (days) => (days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`);

export default function DueDateLedger() {
  const key = useSyncExternalStore(subscribe, getToday, getServerToday);
  const today = key ? new Date(...key.split("-").map(Number)) : null;

  const rows = items.map((it) => {
    if (!today) return it;
    const due = nextDue(it.day, today);
    return { ...it, due, days: Math.round((due - today) / 86400000) };
  });
  const soonest = today ? Math.min(...rows.map((r) => r.days)) : null;

  return (
    <section aria-labelledby="ledger-title" className="relative rounded-xl bg-brand-cream text-brand-navy shadow-2xl shadow-black/30">
      <div className="border-b border-brand-navy/15 px-6 pb-4 pt-6 pl-10">
        <h2 id="ledger-title" className="font-display text-2xl font-bold">Upcoming due dates</h2>
        <p className="mt-1 text-sm text-brand-ink">The filings most businesses have every month.</p>
      </div>

      {/* ledger margin rule */}
      <span aria-hidden="true" className="absolute inset-y-0 left-7 w-px bg-rose-400/60" />

      <ul>
        {rows.map((r) => {
          const next = today && r.days === soonest;
          return (
            <li
              key={r.label}
              className={`relative flex items-center gap-4 border-b border-brand-navy/10 py-4 pl-10 pr-6 transition-colors duration-700 ${next ? "bg-brand-gold/15" : ""}`}
            >
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 bg-brand-gold transition-opacity duration-700 ${next ? "opacity-100" : "opacity-0"}`} />
              <span className="w-12 shrink-0 text-right font-display text-4xl font-bold leading-none tabular-nums">{r.day}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{r.label}</span>
                <span className="block text-sm text-brand-ink">{r.note}</span>
              </span>
              <span className="w-24 shrink-0 text-right text-sm leading-tight">
                {r.due ? (
                  <>
                    <span className={`block font-semibold ${next ? "text-brand-navy" : "text-brand-ink"}`}>{when(r.days)}</span>
                    <span className="block text-brand-ink tabular-nums">{r.due.getDate()} {MONTHS[r.due.getMonth()]}</span>
                  </>
                ) : (
                  <span className="block text-brand-ink">Every month</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 px-6 py-4 pl-10 text-sm">
        <span className="text-brand-ink">Dates move when the government extends them.</span>
        <Link href="/tax-calendar" className="inline-flex shrink-0 items-center gap-1 py-2 font-semibold text-brand-blue-dark underline-offset-4 hover:underline">
          Full calendar <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
