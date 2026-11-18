import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { cityServices, getCityService, cityServiceOffice, cityServiceCity, cityServiceReviewed } from "@/data/city-services";
import { publishedServices, serviceUrl } from "@/data/services";
import { articles } from "@/data/insights";
import { firm, phoneHref } from "@/data/firm";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import ArticleBody from "@/components/ui/ArticleBody";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import { FAQSection } from "@/components/sections/SiteSections";
import RelatedLinks from "@/components/ui/RelatedLinks";
import CTABand from "@/components/ui/CTABand";

// Service-in-city landing pages at the root: /company-registration-in-noida and the rest.
//
// `dynamicParams = false` is what makes a root-level dynamic segment safe here: only the slugs in
// data/city-services.js resolve, and every other root path falls through to a 404 or to the
// legacy redirect and 410 rules in src/proxy.js, exactly as before this route existed.
export const dynamicParams = false;
export const generateStaticParams = () => cityServices.map((p) => ({ landing: p.slug }));

const bySlug = (slug) => publishedServices.find((s) => s.slug === slug);

export async function generateMetadata({ params }) {
  const { landing } = await params;
  const p = getCityService(landing);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.metaDescription, path: `/${p.slug}` });
}

export default async function CityServicePage({ params }) {
  const { landing } = await params;
  const p = getCityService(landing);
  if (!p) notFound();

  const office = cityServiceOffice(p);
  const city = cityServiceCity(p);
  const parent = bySlug(p.parentService);
  const related = p.relatedServices.map(bySlug).filter(Boolean);
  const guides = p.guides.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: p.h1,
          description: p.metaDescription,
          path: `/${p.slug}`,
          serviceType: parent?.title || p.h1,
          dateModified: cityServiceReviewed,
          // Provider is this office's node and areaServed is this city alone, which is the whole
          // point of a service-in-city page. PageHeader's Breadcrumbs emits the BreadcrumbList,
          // so none is added here.
          officeSlug: p.officeSlug,
          areaServed: office.city,
        })}
      />

      <PageHeader
        crumbs={[
          { name: "Services", href: "/services" },
          ...(parent ? [{ name: parent.title, href: serviceUrl(parent) }] : []),
          { name: p.h1, href: `/${p.slug}` },
        ]}
        eyebrow={`${p.cityName} office`}
        title={p.h1}
        intro={p.intro}
        image="/images/office/office-2.jpeg"
      />

      <section className="section bg-brand-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem]">
          <div className="min-w-0">
            <ArticleBody blocks={p.sections} />

            <p className="mt-10 flex items-center gap-2 text-sm text-brand-muted">
              <Clock size={15} aria-hidden="true" className="shrink-0 text-brand-gold-dark" />
              Last reviewed: {cityServiceReviewed}. Rates, forms and due dates change by
              notification; the position is confirmed against the official portal before filing.
            </p>

            {/* The office this page is handled from, with the address in full. */}
            <div className="mt-10 rounded-2xl border border-brand-line bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-brand-navy">
                Handled from our {office.city} office
              </h2>
              <p className="mt-3 flex items-start gap-2 text-brand-ink">
                <MapPin size={17} aria-hidden="true" className="mt-1 shrink-0 text-brand-gold-dark" />
                <span>{office.address}</span>
              </p>
              {firm.phone && (
                <p className="mt-2 flex items-start gap-2 text-brand-ink">
                  <Phone size={17} aria-hidden="true" className="mt-1 shrink-0 text-brand-gold-dark" />
                  <a href={phoneHref()} className="font-semibold text-brand-blue-dark">{firm.phone}</a>
                </p>
              )}
              <p className="mt-2 text-sm text-brand-muted">{firm.hours}</p>
              {city?.mapUrl && (
                <a href={city.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-5">
                  Directions to the {office.city} office
                </a>
              )}
              {city && (
                <p className="mt-5 border-t border-brand-line pt-5 text-sm">
                  <Link href={`/ca-in-${city.slug}`} className="font-semibold text-brand-blue-dark underline">
                    Everything we do from the {city.name} office
                  </Link>
                </p>
              )}
            </div>

            {related.length > 0 && (
              <div className="mt-14">
                <SectionHeading label="Related services" title="What usually goes with this" />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </div>
            )}

            {guides.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold text-brand-navy">Guides on this subject</h2>
                <ul className="mt-4 grid gap-3">
                  {guides.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/insights/${a.slug}`} className="inline-flex items-start gap-2 text-brand-ink hover:text-brand-blue">
                        <ArrowRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-brand-gold-dark" />
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div id="lead" className="scroll-mt-28">
            <div className="lg:sticky lg:top-32">
              <LeadCard id="city-service-lead" title={`Talk to a CA about ${p.h1.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={p.faqs} className="bg-white" title={`${p.h1}: questions`} />

      <RelatedLinks
        url={`/${p.slug}`}
        heading="Related services and offices"
        extra={[
          parent ? serviceUrl(parent) : null,
          city ? `/ca-in-${city.slug}` : null,
          ...related.map(serviceUrl),
          ...guides.map((a) => `/insights/${a.slug}`),
        ].filter(Boolean)}
      />
      <CTABand />
    </>
  );
}
