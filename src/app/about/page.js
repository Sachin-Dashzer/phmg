import Link from "next/link";
import Image from "next/image";
import { Award, Handshake, Lightbulb, Lock, ArrowRight, Quote, BookOpenCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TeamSection } from "@/components/sections/TeamSection";
import { AboutSplit, StatsBand, WhyChoose, OfficesGrid } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "About PHMG & Associates – Chartered Accountants",
  description:
    "PHMG & Associates: RBI Category-I and CAG empanelled chartered accountants since 2014, across Noida, Delhi, Mumbai, Ludhiana and Meerut. Talk to us today.",
  path: "/about",
});

const values = [
  { icon: Award, t: "Quality", d: "We are committed to excellence in service delivery, professionalism and client satisfaction." },
  { icon: Handshake, t: "Good relations", d: "Clients are at the heart of everything we do: we build long-term relationships on trust and mutual respect." },
  { icon: Lightbulb, t: "Innovation", d: "We embrace change and technology to add value, improve processes and stay ahead of industry trends." },
  { icon: Lock, t: "Confidentiality", d: "Client information is used only for the engagement and shared through secure channels." },
];

export default function About() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", href: "/about" }]}
        eyebrow={`Chartered Accountants${firm.foundedYear ? ` · Since ${firm.foundedYear}` : ""}`}
        title={<>Strategic advisors to <span className="text-brand-gold">growing businesses</span></>}
        intro="A decade of trust. A future of growth. A multi-location CA firm with a specialisation in audit, GST litigation and advisory."
        image="/images/office/office-2.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-gold">Talk to a partner <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/team" className="btn btn-ghost-light">Meet the team</Link>
        </div>
      </PageHeader>

      <AboutSplit className="bg-white" cta={false} title="Who we are" />
      <StatsBand />

      {/* Story: image collage + long-form copy */}
      <section aria-labelledby="story-title" className="section bg-brand-mist">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="relative order-last lg:order-first">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-xl sm:aspect-4/3 lg:aspect-4/5">
              <Image src="/images/office/office-3.jpeg" alt="Partners reviewing an engagement" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <figure className="relative -mt-16 ml-auto max-w-sm rounded-2xl bg-brand-navy p-6 text-white shadow-2xl sm:-mt-24 sm:-mr-4 lg:-mr-8">
              <Quote className="text-brand-gold" size={28} aria-hidden="true" />
              <blockquote className="mt-3 font-display text-lg leading-snug">
                Every engagement is owned end-to-end by a partner. That is the promise we built the firm on.
              </blockquote>
            </figure>
          </ScrollReveal>

          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Our story</div>
            <h2 id="story-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Built around the people we serve
            </h2>
            <div className="divider-gold mt-5" />
            <div className="mt-5 space-y-4 leading-relaxed text-brand-muted">
              <p>
                We serve corporate, banking, government, PSU and private sector clients across India and globally, from
                offices in Noida (head office), Delhi, Mumbai, Ludhiana and Meerut covering four states.
              </p>
              <p>
                Our work spans manufacturing and infrastructure, healthcare and pharmaceuticals, banking and financial
                services, IT companies and government entities, FMCG, real estate and textiles, and eco-recycling and
                chemicals.
              </p>
              <p>
                Our team of {firm.stats.professionals || "50+"} professionals includes chartered accountants, company
                secretaries, semi-qualified CAs and specialists.
              </p>
            </div>
            {(firm.icaiFrn || firm.foundedYear) && (
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {firm.foundedYear && (
                  <div className="rounded-xl border border-brand-line bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">Established</dt>
                    <dd className="mt-px font-display text-2xl font-bold text-brand-navy">{firm.foundedYear}</dd>
                  </div>
                )}
                {firm.icaiFrn && (
                  <div className="rounded-xl border border-brand-line bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">ICAI FRN</dt>
                    <dd className="mt-px font-display text-2xl font-bold text-brand-navy">{firm.icaiFrn}</dd>
                  </div>
                )}
              </dl>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section bg-white">
        <div className="container-x">
          <SectionHeading id="values-title" label="Our values" title="Navigating success together" center />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: I, t, d }, i) => (
              <div key={t} className="group relative h-full overflow-hidden rounded-2xl border border-brand-line bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-brand-blue/10">
                <span aria-hidden="true" className="absolute right-4 top-3 font-display text-5xl font-bold text-brand-mist transition-colors group-hover:text-brand-gold/20">
                  0{i + 1}
                </span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
                  <I size={22} aria-hidden="true" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-brand-muted">{d}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <WhyChoose />
      <TeamSection />
      <OfficesGrid />

      {/* Editorial policy */}
      <section aria-labelledby="policy-title" className="bg-brand-mist py-14 md:py-16">
        <div className="container-x">
          <ScrollReveal className="flex flex-col gap-6 rounded-2xl border border-brand-line bg-white p-6 md:flex-row md:items-start md:p-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold-dark">
              <BookOpenCheck size={24} aria-hidden="true" />
            </div>
            <div className="space-y-3 leading-relaxed text-brand-muted">
              <h2 id="policy-title" className="font-display text-2xl font-bold">Editorial and review policy</h2>
              <p>Guides and service pages on this site are written for general information. They are prepared by our team and reviewed by a chartered accountant, with references to the Income-tax Act, the CGST Act, the Companies Act, the LLP Act and official notifications. Each page shows when it was last reviewed.</p>
              <p>Tax and company laws change often. If you notice something out of date, please tell us through the <Link href="/contact" className="font-semibold text-brand-blue underline">contact page</Link> and we will correct it.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
