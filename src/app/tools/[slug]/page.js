import Link from "next/link";
import { notFound } from "next/navigation";
import { Info, ArrowRight } from "lucide-react";
import { tools, getTool } from "@/data/tools";
import { publishedServices } from "@/data/services";
import { buildMetadata, absUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import ToolRunner from "@/components/tools/ToolRunner";
import { FAQSection, ToolCard } from "@/components/sections/SiteSections";

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
  const others = tools.filter((x) => x.slug !== t.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: t.title, url: absUrl(`/tools/${t.slug}`), applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } }} />
      <PageHeader crumbs={[{ name: "Tools", href: "/tools" }, { name: t.title, href: `/tools/${t.slug}` }]} eyebrow="Free calculator" title={t.title} intro={t.intro} />

      <section className="bg-brand-mist pb-16 md:pb-20">
        <div className="container-x relative z-10 -mt-8 md:-mt-12">
          <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-xl shadow-brand-navy/10 md:p-8">
            <ToolRunner slug={t.slug} />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
            <Info size={16} className="shrink-0 text-brand-gold" aria-hidden="true" />
            Results are estimates for general information and not professional advice.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-title" className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Explainer</div>
            <h2 id="how-title" className="font-display text-3xl font-bold">How this calculator works</h2>
            <div className="divider-gold mt-5" />
            <div className="prose-phmg mt-2 text-brand-ink">{t.explainer.map((p) => <p key={p}>{p}</p>)}</div>
          </ScrollReveal>
          {services.length > 0 && (
            <div>
              <div className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white">
                  <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/15 blur-2xl" />
                  <p className="relative font-display text-xl font-semibold text-white">Need help with the real numbers?</p>
                  <ul className="relative mt-4 space-y-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.category}/${s.slug}`} className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 transition hover:border-brand-gold hover:text-brand-gold">
                          {s.title} <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <FAQSection faqs={t.faqs} />

      {services.length > 0 && (
        <section aria-labelledby="svc-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading id="svc-title" label="Related services" title="Let a CA handle it" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </ScrollReveal>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="more-tools" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="more-tools" label="More tools" title="Try another calculator" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => <ToolCard key={o.slug} tool={o} index={i} />)}
            </ScrollReveal>
          </div>
        </section>
      )}
      <CTABand />
    </>
  );
}
