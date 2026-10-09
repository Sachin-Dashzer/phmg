import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone, MessageCircle, Navigation, Clock, Check } from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { firm, getOffice, phoneHref, waHref } from "@/data/firm";
import { team } from "@/data/team";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import { OfficesGrid, FAQSection } from "@/components/sections/SiteSections";

// Public URL is /ca-in-{city} (rewritten in next.config.mjs); this is the canonical.
// /locations/{city} redirects to /ca-in-{city} (see src/data/redirects.mjs), and because Next
// checks redirects before the filesystem and array rewrites after it, the two do not loop.
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
  const office = getOffice(c.officeCity);
  const head = c.branchHead ? team.find((t) => t.slug === c.branchHead) : null;
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
        <div className="flex flex-wrap gap-3">
          <Link href="#lead" className="btn btn-gold">Book a consultation <ArrowRight size={16} aria-hidden="true" /></Link>
          {firm.phone && (
            <a href={phoneHref()} className="btn btn-ghost-light"><Phone size={16} aria-hidden="true" /> {firm.phone}</a>
          )}
        </div>
      </PageHeader>

      {/* Office details and branch head. Every optional field renders only when it is set. */}
      {office && (
        <section aria-labelledby="office-title" className="bg-white py-12 md:py-14">
          <div className="container-x grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
              <h2 id="office-title" className="font-display text-xl font-semibold">Our {c.name} office</h2>
              <address className="mt-4 space-y-3 not-italic">
                <div className="flex items-start gap-3 text-sm leading-relaxed">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                  <span>{office.address}</span>
                </div>
                {firm.phone && (
                  <a href={phoneHref()} className="flex items-center gap-3 text-sm transition-colors hover:text-brand-blue">
                    <Phone size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    {firm.phone}
                  </a>
                )}
                {firm.whatsapp && (
                  <a href={waHref(`Hello PHMG & Associates, I would like to talk to a chartered accountant in ${c.name}.`)} rel="noopener" className="flex items-center gap-3 text-sm transition-colors hover:text-brand-blue">
                    <MessageCircle size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
                {office.hours && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    {office.hours}
                  </div>
                )}
              </address>
              {office.mapUrl && (
                <a href={office.mapUrl} rel="noopener" className="btn btn-secondary mt-5">
                  <Navigation size={15} aria-hidden="true" /> Get directions
                </a>
              )}
              {c.nearby?.length > 0 && (
                <>
                  <h3 className="mt-6 text-sm font-semibold text-brand-navy">Areas served from this office</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.nearby.map((n) => (
                      <li key={n} className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-brand-muted">{n}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {head && (
              <div className="rounded-2xl border border-brand-line bg-white p-6">
                <h2 className="font-display text-xl font-semibold">{c.name} branch head</h2>
                <div className="mt-4 flex items-start gap-4">
                  {head.photo && (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-navy">
                      <Image src={head.photo} alt={head.name} fill sizes="80px" className="object-cover object-top" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-navy">{head.name}</p>
                    <p className="mt-0.5 text-sm text-brand-gold-dark">{head.role}</p>
                    {head.credentials?.length > 0 && (
                      <p className="mt-1 text-xs text-brand-muted">{head.credentials.join(" · ")}</p>
                    )}
                  </div>
                </div>
                {head.focus?.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {head.focus.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-brand-muted">
                        <Check size={14} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href="/team" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                  Meet the team <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section bg-white pt-4">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div className="min-w-0">
            <div className="section-label section-label-blue mb-4 w-fit">Local know-how</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Working with businesses in {c.name}</h2>
            <div className="divider-gold mt-5" />
            <ScrollReveal stagger className="mt-8 grid gap-5 md:grid-cols-2">
              {c.local.map((s, n) => (
                <section key={s.h} className="relative h-full rounded-2xl border border-brand-line bg-brand-mist p-6">
                  <span aria-hidden="true" className="font-display text-sm font-semibold text-brand-gold-dark">{String(n + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{s.p}</p>
                </section>
              ))}
            </ScrollReveal>

            {services.length > 0 && (
              <div className="mt-16">
                <SectionHeading label="Popular here" title={`Services we are asked for most in ${c.name}`} />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </div>
            )}
          </div>
          <div id="lead" className="scroll-mt-28"><div className="lg:sticky lg:top-28"><LeadCard id="city-lead" title={`Speak to a chartered accountant in ${c.name}`} /></div></div>
        </div>
      </section>

      <OfficesGrid className="bg-brand-mist" exclude={c.officeCity} label="Our other offices" title="Where else we work" />
      <FAQSection faqs={c.faqs} />
      <CTABand />
    </>
  );
}
