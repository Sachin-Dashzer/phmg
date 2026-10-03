import { notFound } from "next/navigation";
import { cities, getCity } from "@/data/cities";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";

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
        title={c.title}
        intro={c.intro}
      />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div>
          {c.local.map((s) => (
            <section key={s.h} className="mb-8">
              <h2 className="text-2xl font-bold">{s.h}</h2>
              <p className="mt-3 max-w-prose leading-relaxed">{s.p}</p>
            </section>
          ))}
          <h2 className="text-2xl font-bold">Popular services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{services.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
          <h2 className="mt-12 text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4"><FAQAccordion faqs={c.faqs} /></div>
        </div>
        <div><div className="lg:sticky lg:top-24"><LeadCard id="city-lead" /></div></div>
      </div>
      <CTABand />
    </>
  );
}
