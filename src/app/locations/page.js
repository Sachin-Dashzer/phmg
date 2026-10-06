import Link from "next/link";
import { ArrowRight, MapPin, Globe2, Video, FileLock2 } from "lucide-react";
import { cities } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { OfficesGrid, StatsBand, ProcessSteps } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "CA Services by Location",
  description: "PHMG & Associates serves clients in Delhi NCR in person and across India online. Find your location and talk to our chartered accountants today.",
  path: "/locations",
});

const online = [
  { icon: Globe2, t: "Pan-India service", d: "Most filings and advisory work are delivered online, wherever you are." },
  { icon: Video, t: "Video consultations", d: "Speak with a chartered accountant on a call at a time that suits you." },
  { icon: FileLock2, t: "Secure document sharing", d: "Share documents through a secure link, not open email attachments." },
];

export default function Locations() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Locations", href: "/locations" }]}
        eyebrow="Where we work"
        title={<>Local offices. <span className="text-brand-gold">Pan-India reach.</span></>}
        intro="Most of our work is delivered online, so we serve clients across India. These pages cover the places where we also meet clients in person."
        image="/images/office/office-1.jpeg"
      />

      <section aria-labelledby="cities-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading id="cities-title" label="Meet us in person" title="Cities we cover locally" />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/ca-in-${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-brand-navy p-6 text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div aria-hidden="true" className="hero-ledger-bg absolute inset-0" />
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl" />
                <MapPin size={26} className="relative text-brand-gold" aria-hidden="true" />
                <h2 className="relative mt-5 font-display text-2xl font-semibold text-white">{c.name}</h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/70">{c.metaDescription}</p>
                <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-gold">
                  View {c.name} page <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <OfficesGrid />
      <StatsBand />

      <section aria-labelledby="online-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading id="online-title" label="Anywhere in India" title="Not near an office? We work online" center />
          <ScrollReveal stagger className="grid gap-5 md:grid-cols-3">
            {online.map(({ icon: I, t, d }) => (
              <div key={t} className="card h-full p-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-gold bg-white text-brand-navy"><I size={22} aria-hidden="true" /></span>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{d}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ProcessSteps />
      <CTABand />
    </>
  );
}
