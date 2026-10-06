import Link from "next/link";
import { ClipboardList, FileSignature, Landmark, Repeat, ArrowRight, Check, X } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/data/faqs";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ProcessSteps, WhyChoose, FAQSection } from "@/components/sections/SiteSections";

// No prices are published: fee display needs the firm's approval (ICAI norms).
// TODO: CLIENT TO CONFIRM fee policy before adding any "starting from" plans.
export const metadata = buildMetadata({
  title: "Fees and Pricing – How We Quote",
  description: "How PHMG & Associates decides fees: clear scope, written quote and no hidden charges. Request a quote from our chartered accountants today.",
  path: "/pricing",
});

const points = [
  { icon: ClipboardList, t: "Scope first", d: "We understand what you need and agree on exactly what is included." },
  { icon: FileSignature, t: "Written quote", d: "You receive the professional fee in writing before work starts." },
  { icon: Landmark, t: "Government fees at actuals", d: "Statutory fees, stamp duty and similar charges are passed on at actual cost and shown separately." },
  { icon: Repeat, t: "Recurring work", d: "For monthly services such as bookkeeping and GST, we agree a fixed monthly fee based on volumes." },
];

const factors = ["The service and its scope", "Size and turnover of your business", "Volume of transactions or documents", "Complexity, notices or past defaults", "Deadlines and urgency"];
const never = ["Hidden charges added later", "Work started without your approval", "Government fees marked up", "Surprise “extra” invoices"];

export default function Pricing() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Pricing", href: "/pricing" }]}
        eyebrow="Fees & pricing"
        title={<>Clear fees, <span className="text-brand-gold">agreed in writing</span></>}
        intro="Our fees depend on the service, the size of your business and the complexity of your case. Here is exactly how we quote."
        image="/images/office/office-3.jpeg"
      >
        <Link href="/book-consultation" className="btn btn-gold">Request a quote <ArrowRight size={16} aria-hidden="true" /></Link>
      </PageHeader>

      <section aria-labelledby="how-title" className="section bg-white">
        <div className="container-x">
          <SectionHeading id="how-title" label="How we quote" title="Four rules we never break" center />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {points.map(({ icon: I, t, d }, i) => (
              <div key={t} className="group relative h-full overflow-hidden rounded-2xl border border-brand-line bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10">
                <span aria-hidden="true" className="absolute right-4 top-3 font-display text-5xl font-bold text-brand-mist group-hover:text-brand-gold/20">0{i + 1}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><I size={22} aria-hidden="true" /></span>
                <h3 className="relative mt-5 text-lg font-semibold">{t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-brand-muted">{d}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="factors-title" className="section bg-brand-mist">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <ScrollReveal className="rounded-2xl border border-brand-line bg-white p-6 md:p-10">
            <div className="section-label section-label-blue mb-4 w-fit">What affects your fee</div>
            <h2 id="factors-title" className="font-display text-3xl font-bold">Priced to your case</h2>
            <ul className="mt-6 space-y-3">
              {factors.map((f) => (
                <li key={f} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-brand-success" aria-hidden="true" />{f}</li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white md:p-10">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/15 blur-3xl" />
            <div className="section-label section-label-dark relative mb-4 w-fit">Our promise</div>
            <h2 className="relative font-display text-3xl font-bold text-white">What you&apos;ll never see</h2>
            <ul className="relative mt-6 space-y-3">
              {never.map((f) => (
                <li key={f} className="flex gap-3 text-white/85"><X size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />{f}</li>
              ))}
            </ul>
            <Link href="/book-consultation" className="btn btn-gold relative mt-8">Book a free consultation <ArrowRight size={16} aria-hidden="true" /></Link>
          </ScrollReveal>
        </div>
      </section>

      <ProcessSteps />
      <WhyChoose />
      <FAQSection faqs={faqs} className="bg-white" />
      <CTABand />
    </>
  );
}
