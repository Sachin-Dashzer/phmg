import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getTool } from "@/data/tools";
import { publishedServices, serviceUrl } from "@/data/services";
import { buildMetadata, absUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";
import ToolRunner from "@/components/tools/ToolRunner";

export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }) {
  const t = getTool((await params).slug);
  if (!t) return {};
  return buildMetadata({ title: t.metaTitle, description: t.metaDescription, path: `/tools/${t.slug}` });
}

export default async function ToolPage({ params }) {
  const t = getTool((await params).slug);
  if (!t) notFound();
  const services = t.services.map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: t.title, url: absUrl(`/tools/${t.slug}`), applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } }} />
      <PageHeader crumbs={[{ name: "Tools", href: "/tools" }, { name: t.title, href: `/tools/${t.slug}` }]} title={t.title} intro={t.intro} />
      <section className="container-x section">
        <ToolRunner slug={t.slug} />
        <div className="prose-phmg mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">How this calculator works</h2>
          {t.explainer.map((p) => <p key={p}>{p}</p>)}
        </div>
        <h2 className="mt-12 text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-4 max-w-3xl"><FAQAccordion faqs={t.faqs} /></div>
        {services.length > 0 && (
          <p className="mt-8">
            Need help with the real numbers?{" "}
            {services.map((s, i) => (
              <span key={s.slug}>{i > 0 && ", "}<Link href={serviceUrl(s)} className="font-semibold text-brand-blue-dark underline">{s.title}</Link></span>
            ))}.
          </p>
        )}
        <p className="mt-6 text-sm text-brand-muted">Results are estimates for general information and not professional advice.</p>
      </section>
      <CTABand />
    </>
  );
}
