import Image from "next/image";
import { Check, Clock, ShieldCheck, BadgeIndianRupee } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/data/categories";
import { faqs } from "@/data/faqs";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";
import { ClientsStrip, ProcessSteps, WhyChoose, FAQSection } from "@/components/sections/SiteSections";
import whoWeServeImage from "../../../public/who-we-serve.jpg";

export const metadata = buildMetadata({
  title: "Book a Free Consultation with a CA",
  description: "Book a free consultation with PHMG & Associates. Pick a service and a convenient time and our chartered accountants will confirm. Book your slot today.",
  path: "/book-consultation",
});

const expect = ["A short call to understand your requirement", "Clear next steps and a document checklist", "A written scope and fee if you decide to proceed"];
const badges = [
  { I: Clock, t: "Reply within one business day" },
  { I: BadgeIndianRupee, t: "Free, no obligation" },
  { I: ShieldCheck, t: "Strictly confidential" },
];

export default function Book() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Book Consultation", href: "/book-consultation" }]}
        eyebrow="Free consultation"
        title={<>Book a call with a <span className="text-brand-gold">chartered accountant</span></>}
        intro="Tell us what you need and when you are free. We will confirm the time by phone or message."
        image={whoWeServeImage}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {badges.map(({ I, t }) => (
            <li key={t} className="flex items-center gap-2 text-sm text-white/85"><I size={18} className="text-brand-gold" aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </PageHeader>

      <section className="section bg-brand-mist">
        <div className="container-x grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-xl shadow-brand-navy/10 md:p-10">
            <div className="section-label section-label-blue mb-4 w-fit">Book now</div>
            <h2 className="font-display text-3xl font-bold">Request your consultation</h2>
            <p className="mt-2 text-brand-muted">Takes under a minute. No payment needed.</p>
            <div className="mt-8">
              <LeadForm variant="full" showSlot id="book" services={categories.map((c) => c.title)} submitLabel="Request Consultation" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/office/office-3.jpeg" alt="A partner in a client consultation" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white md:p-8">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/15 blur-2xl" />
              <h2 className="relative font-display text-2xl font-semibold text-white">What to expect</h2>
              <ol className="relative mt-6 space-y-5">
                {expect.map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold font-display text-sm font-bold text-brand-gold">{i + 1}</span>
                    <span className="pt-1.5 text-sm text-white/85">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="relative mt-6 flex items-center gap-2 border-t border-white/15 pt-5 text-sm text-white/60">
                <Check size={16} className="text-brand-gold" aria-hidden="true" /> No commitment until you approve the written scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClientsStrip />
      <ProcessSteps className="bg-brand-mist" />
      <WhyChoose className="bg-white" />
      <FAQSection faqs={faqs} />
    </>
  );
}
