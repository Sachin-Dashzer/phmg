import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import { OfficesGrid, FAQSection, WhyChoose } from "@/components/sections/SiteSections";

// Public URL is /ca-in-{city} (rewritten in next.config.mjs); this is the canonical.
export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

export async function generateMetadata({ params }) {
  const c = getCity((await params).city);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.metaDescription, path: `/ca-in-${c.slug}` });
}

export default async function CityPage({ params }) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const services = c.services.map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Locations", href: "/locations" }, { name: c.name, href: `/ca-in-${c.slug}` }]}
        eyebrow={`Chartered accountants · ${c.name}`}
        title={c.title}
        intro={c.intro}
        image="/images/office/office-1.jpeg"
      >
        <Link href="#lead" className="btn btn-gold">Book a free consultation <ArrowRight size={16} aria-hidden="true" /></Link>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div className="min-w-0">
            <div className="section-label section-label-blue mb-4 w-fit">Local know-how</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Working with businesses in {c.name}</h2>
            <div className="divider-gold mt-5" />
            <ScrollReveal stagger className="mt-8 grid gap-5 md:grid-cols-2">
              {c.local.map((s, n) => (
                <section key={s.h} className="relative h-full rounded-2xl border border-brand-line bg-brand-mist p-6">
                  <span aria-hidden="true" className="font-display text-sm font-semibold text-brand-gold-dark">0{n + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{s.p}</p>
                </section>
              ))}
            </ScrollReveal>

            {services.length > 0 && (
              <div className="mt-16">
                <SectionHeading label="Popular here" title={`Popular services in ${c.name}`} />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </div>
            )}
          </div>
          <div id="lead" className="scroll-mt-28"><div className="lg:sticky lg:top-28"><LeadCard id="city-lead" title={`Talk to a CA in ${c.name}`} /></div></div>
        </div>
      </section>

      <OfficesGrid className="bg-brand-mist" />
      <WhyChoose className="bg-white" />
      <FAQSection faqs={c.faqs} />
      <CTABand />
    </>
  );
}
