import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/data/industries";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: `CA Services for ${i.title}`, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const services = i.services.map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Industries", href: "/industries" }, { name: i.title, href: `/industries/${i.slug}` }]}
        title={`CA Services for ${i.title}`}
        intro={i.intro}
      />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div>
          <h2 className="text-2xl font-bold">Common challenges</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">{i.challenges.map((c) => <li key={c}>{c}</li>)}</ul>

          <h2 className="mt-12 text-2xl font-bold">How we help</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {i.value.map((v) => (
              <div key={v.t} className="card p-5"><h3 className="font-semibold">{v.t}</h3><p className="mt-1.5 text-sm text-brand-muted">{v.d}</p></div>
            ))}
          </div>

          {services.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Services for your business</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">{services.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
            </>
          )}

          <h2 className="mt-12 text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4"><FAQAccordion faqs={i.faqs} /></div>
        </div>
        <div><div className="lg:sticky lg:top-24"><LeadCard id="industry-lead" /></div></div>
      </div>
      <CTABand />
    </>
  );
}
