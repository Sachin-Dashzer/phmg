import Link from "next/link";
import { CalendarDays, CalendarRange, CalendarCheck2, AlertCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import DueDateLedger from "@/components/sections/DueDateLedger";
import { SubscribeSection } from "@/components/sections/TeamSection";

export const metadata = buildMetadata({
  title: "Tax and Compliance Calendar – Due Dates",
  description: "Recurring due dates for GST, TDS, advance tax, income tax returns, PF, ESI and ROC filings in one table. Check dates and plan your compliance today.",
  path: "/tax-calendar",
});

// TODO: Partners to review each quarter. Dates can be extended by notification.
const groups = [
  { icon: CalendarDays, title: "Every month", rows: [["7th", "Deposit of TDS and TCS for the previous month (30 April for March)"], ["11th", "GSTR-1 for monthly filers"], ["13th", "GSTR-1 under QRMP, in quarter-end months"], ["15th", "PF and ESI payments"], ["20th", "GSTR-3B for monthly filers"]] },
  { icon: CalendarRange, title: "Every quarter", rows: [["15 Jun, 15 Sep, 15 Dec, 15 Mar", "Advance tax instalments"], ["31 Jul, 31 Oct, 31 Jan, 31 May", "TDS returns for the quarter"], ["18th after quarter end", "CMP-08 for composition taxpayers"]] },
  { icon: CalendarCheck2, title: "Every year", rows: [["30 Apr and 31 Oct", "Form MSME-1 (half-yearly), where applicable"], ["30 May", "LLP Form 11"], ["30 Jun", "Form DPT-3, where applicable"], ["31 Jul", "Income tax return, non-audit cases"], ["30 Sep", "Tax audit report; last date for a company's AGM"], ["30 Oct", "LLP Form 8"], ["31 Oct", "Income tax return, audit cases"], ["31 Dec", "GSTR-9 annual return; belated income tax return"], ["30 days after AGM", "Form AOC-4"], ["60 days after AGM", "Form MGT-7 or MGT-7A"]] },
];

export default function TaxCalendar() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Tax Calendar", href: "/tax-calendar" }]}
        eyebrow="Compliance calendar"
        title={<>Never miss a <span className="text-brand-gold">due date</span></>}
        intro="Recurring due dates most businesses and taxpayers need to track. Dates are sometimes extended, so confirm on the official portal."
        image="/images/office/office-2.jpeg"
      >
        <nav aria-label="Jump to" className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.title} href={`#${g.title.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-gold hover:text-brand-gold">{g.title}</a>
          ))}
        </nav>
      </PageHeader>

      <section className="section bg-brand-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div className="min-w-0 space-y-10">
            {groups.map(({ icon: I, title, rows }) => (
              <ScrollReveal key={title} as="section" className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-xs">
                <h2 id={title.toLowerCase().replace(/\s+/g, "-")} className="flex scroll-mt-28 items-center gap-3 border-b border-brand-line bg-brand-navy px-6 py-4 font-display text-xl font-semibold text-white">
                  <I size={20} className="text-brand-gold" aria-hidden="true" /> {title}
                </h2>
                <div tabIndex={0} role="region" aria-label={`${title}, scrolls horizontally`} className="overflow-x-auto">
                  <table className="w-full min-w-120 text-left text-sm">
                    <thead className="sr-only"><tr><th scope="col">Date</th><th scope="col">Compliance</th></tr></thead>
                    <tbody>
                      {rows.map(([d, c]) => (
                        <tr key={d + c} className="border-t border-brand-line align-top first:border-t-0 even:bg-brand-mist/60">
                          <th scope="row" className="w-56 p-4">
                            <span className="inline-block rounded-md bg-brand-gold/15 px-2.5 py-1 font-semibold text-brand-gold-dark">{d}</span>
                          </th>
                          <td className="p-4 pt-5">{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>
            ))}
            <p className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-brand-ink">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
              <span>
                Read the explanation in our <Link href="/insights/compliance-calendar-monthly-due-dates-for-businesses" className="font-semibold text-brand-blue-dark underline">monthly compliance guide</Link>. This is general information, not professional advice.
              </span>
            </p>
          </div>
          <div><div className="lg:sticky lg:top-28"><DueDateLedger /></div></div>
        </div>
      </section>

      <SubscribeSection />
      <CTABand title="Let us track your deadlines" text="We file on time and remind you well before every due date, so penalties never become a surprise." />
    </>
  );
}
