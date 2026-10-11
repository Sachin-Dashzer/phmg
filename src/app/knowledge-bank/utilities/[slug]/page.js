import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Info, Table2 } from "lucide-react";
import { utilities, getUtility, getCalculator } from "@/data/knowledge-bank";
import { publishedServices, serviceUrl } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ArticleBody from "@/components/ui/ArticleBody";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";

export const dynamicParams = false;
export const generateStaticParams = () => utilities.map((u) => ({ slug: u.slug }));

export async function generateMetadata({ params }) {
  const u = getUtility((await params).slug);
  if (!u) return {};
  return buildMetadata({
    title: u.metaTitle,
    description: u.metaDescription,
    path: `/knowledge-bank/utilities/${u.slug}`,
  });
}

export default async function UtilityPage({ params }) {
  const u = getUtility((await params).slug);
  if (!u) notFound();
  const services = (u.services || []).map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  const related = (u.related || []).map(getCalculator).filter(Boolean);
  const others = utilities.filter((x) => x.slug !== u.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Knowledge Bank", href: "/knowledge-bank" },
          { name: u.title, href: `/knowledge-bank/utilities/${u.slug}` },
        ]}
        eyebrow="Reference table"
        title={u.title}
        intro={u.intro}
      />

      <div className="bg-white">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <article className="min-w-0 max-w-3xl">
            <ArticleBody blocks={u.sections} />

            {/* Stated once on every reference table rather than buried: these figures change by
                notification and the official source is the authority, not this page. */}
            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                <Info size={16} className="shrink-0 text-amber-600" aria-hidden="true" />
                Check before you rely on this
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink">
                Rates, limits and dates change by notification, and some are extended part-way
                through a year. This table is a summary for general information, not a statement of
                the law for your case. Confirm the current position from the official source below,
                or ask us.
              </p>
              {u.source && (
                <a href={u.source.href} rel="noopener" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue underline">
                  {u.source.label} <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {related.length > 0 && (
              <nav aria-label="Related calculators" className="rounded-2xl border border-brand-line bg-brand-mist p-5">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">Run the numbers</h2>
                <ul className="mt-4 space-y-2">
                  {related.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/knowledge-bank/calculators/${c.slug}`} className="group flex items-center justify-between gap-2 rounded-lg border border-brand-line bg-white px-3 py-2.5 text-sm font-medium text-brand-navy transition hover:border-brand-gold">
                        {c.title} <ArrowRight size={14} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {services.length > 0 && (
              <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-5 text-white">
                <h2 className="font-display text-lg font-semibold text-white">Need help with this?</h2>
                <ul className="mt-4 space-y-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceUrl(s)} className="group flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-white/90 transition hover:border-brand-gold hover:text-brand-gold">
                        {s.title} <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <nav aria-label="Other reference tables" className="rounded-2xl border border-brand-line bg-white p-5">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">Other tables</h2>
              <ul className="mt-4 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/knowledge-bank/utilities/${o.slug}`} className="flex items-start gap-2 text-sm text-brand-muted transition hover:text-brand-blue">
                      <Table2 size={14} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />{o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      {services.length > 0 && (
        <section aria-labelledby="svc-title" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="svc-title" label="Related services" title="Where we can help" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
