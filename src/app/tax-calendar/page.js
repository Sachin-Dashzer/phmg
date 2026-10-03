import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata = buildMetadata({
  title: "Tax and Compliance Calendar – Due Dates",
  description: "Recurring due dates for GST, TDS, advance tax, income tax returns, PF, ESI and ROC filings in one table. Check dates and plan your compliance today.",
  path: "/tax-calendar",
});

// TODO: Partners to review each quarter. Dates can be extended by notification.
const groups = [
  { title: "Every month", rows: [["7th", "Deposit of TDS and TCS for the previous month (30 April for March)"], ["11th", "GSTR-1 for monthly filers"], ["13th", "GSTR-1 under QRMP, in quarter-end months"], ["15th", "PF and ESI payments"], ["20th", "GSTR-3B for monthly filers"]] },
  { title: "Every quarter", rows: [["15 Jun, 15 Sep, 15 Dec, 15 Mar", "Advance tax instalments"], ["31 Jul, 31 Oct, 31 Jan, 31 May", "TDS returns for the quarter"], ["18th after quarter end", "CMP-08 for composition taxpayers"]] },
  { title: "Every year", rows: [["30 Apr and 31 Oct", "Form MSME-1 (half-yearly), where applicable"], ["30 May", "LLP Form 11"], ["30 Jun", "Form DPT-3, where applicable"], ["31 Jul", "Income tax return, non-audit cases"], ["30 Sep", "Tax audit report; last date for a company's AGM"], ["30 Oct", "LLP Form 8"], ["31 Oct", "Income tax return, audit cases"], ["31 Dec", "GSTR-9 annual return; belated income tax return"], ["30 days after AGM", "Form AOC-4"], ["60 days after AGM", "Form MGT-7 or MGT-7A"]] },
];

export default function TaxCalendar() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Tax Calendar", href: "/tax-calendar" }]} title="Tax and Compliance Calendar" intro="Recurring due dates most businesses and taxpayers need to track. Dates are sometimes extended, so confirm on the official portal." />
      <section className="container-x section">
        <div className="space-y-10">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-2xl font-bold">{g.title}</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-brand-line">
                <table className="w-full min-w-[30rem] text-left text-sm">
                  <thead className="bg-brand-mist text-brand-navy"><tr><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Compliance</th></tr></thead>
                  <tbody>
                    {g.rows.map(([d, c]) => (
                      <tr key={d + c} className="border-t border-brand-line align-top"><th scope="row" className="p-3 font-medium">{d}</th><td className="p-3">{c}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-prose text-sm text-brand-muted">
          Read the explanation in our <Link href="/insights/compliance-calendar-monthly-due-dates-for-businesses" className="font-semibold text-brand-blue-dark underline">monthly compliance guide</Link>. This is general information, not professional advice.
        </p>
        <div className="mt-10 max-w-xl"><NewsletterForm /></div>
      </section>
    </>
  );
}
