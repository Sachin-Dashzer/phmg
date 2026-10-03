import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

// No prices are published: fee display needs the firm's approval (ICAI norms).
// TODO: CLIENT TO CONFIRM fee policy before adding any "starting from" plans.
export const metadata = buildMetadata({
  title: "Fees and Pricing – How We Quote",
  description: "How PHMG & Associates decides fees: clear scope, written quote and no hidden charges. Request a quote from our chartered accountants today.",
  path: "/pricing",
});

const points = [
  { t: "Scope first", d: "We understand what you need and agree on exactly what is included." },
  { t: "Written quote", d: "You receive the professional fee in writing before work starts." },
  { t: "Government fees at actuals", d: "Statutory fees, stamp duty and similar charges are passed on at actual cost and shown separately." },
  { t: "Recurring work", d: "For monthly services such as bookkeeping and GST, we agree a fixed monthly fee based on volumes." },
];

export default function Pricing() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Pricing", href: "/pricing" }]} title="Fees and Pricing" intro="Our fees depend on the service, the size of your business and the complexity of your case. Here is how we quote." />
      <section className="container-x section">
        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.t} className="card p-6"><h2 className="text-xl font-semibold">{p.t}</h2><p className="mt-2 text-brand-muted">{p.d}</p></div>
          ))}
        </div>
        <p className="mt-8">Ready for a quote? <Link href="/book-consultation" className="font-semibold text-brand-blue-dark underline">Book a free consultation</Link>.</p>
      </section>
      <CTABand />
    </>
  );
}
