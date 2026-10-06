import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, categoryTitle, SITE_REVIEWER } from "@/data/insights";
import { publishedServices, serviceUrl } from "@/data/services";
import { firm } from "@/data/firm";
import { buildMetadata, absUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import ArticleBody, { slugify } from "@/components/ui/ArticleBody";
import InsightCard, { fmtDate } from "@/components/ui/InsightCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import CTABand from "@/components/ui/CTABand";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.description, path: `/insights/${a.slug}`, type: "article", ownImage: true });
}

export default async function ArticlePage({ params }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const toc = [...a.body.filter(([t]) => t === "h2").map(([, v]) => v), ...(a.faqs.length ? ["Frequently asked questions"] : [])];
  const services = (a.services || []).map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  const more = articles.filter((x) => x.slug !== a.slug && (x.category === a.category || x.tags.some((t) => a.tags.includes(t)))).slice(0, 3);
  const org = { "@type": "Organization", name: firm.name, url: absUrl("/") };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          author: org,
          publisher: org,
          mainEntityOfPage: absUrl(`/insights/${a.slug}`),
        }}
      />
      <PageHeader
        crumbs={[{ name: "Insights", href: "/insights" }, { name: a.title, href: `/insights/${a.slug}` }]}
        eyebrow={categoryTitle(a.category)}
        title={a.title}
        image="/images/office/office-2.jpeg"
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
          <li>{firm.name} editorial team</li>
          <li>{SITE_REVIEWER}</li>
          <li className="flex items-center gap-1.5"><Clock size={14} className="text-brand-gold" aria-hidden="true" />{a.readMinutes} min read</li>
          <li className="flex items-center gap-1.5"><CalendarDays size={14} className="text-brand-gold" aria-hidden="true" />Published {fmtDate(a.publishedAt)} · Updated {fmtDate(a.updatedAt)}</li>
        </ul>
      </PageHeader>

      <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <article className="min-w-0 max-w-3xl">
          <ArticleBody blocks={a.body} />
          {a.faqs.length > 0 && (
            <>
              <h2 id="faq" className="mt-12 scroll-mt-28 border-l-4 border-brand-gold pl-4 font-display text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
              <div className="mt-4"><FAQAccordion faqs={a.faqs} /></div>
            </>
          )}
          <p className="mt-10 rounded-xl bg-brand-mist p-4 text-sm text-brand-muted">
            This content is for general information and does not constitute professional advice. Laws, rates and due dates change; confirm the current position for your case. Section references are to the Income-tax Act, 1961 unless stated; the Income-tax Act, 2025 applies to later periods with renumbered sections.
          </p>
          <div className="mt-10"><NewsletterForm /></div>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="Table of contents" className="rounded-2xl border border-brand-line bg-brand-mist p-5 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">In this article</h2>
            <ul className="mt-4 space-y-1 border-l-2 border-brand-line">
              {toc.map((t) => <li key={t}><a href={`#${slugify(t)}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-brand-muted transition hover:border-brand-gold hover:text-brand-navy">{t}</a></li>)}
            </ul>
          </nav>
          {services.length > 0 && (
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-5 text-sm text-white">
              <h2 className="font-display text-lg font-semibold text-white">Need help with this?</h2>
              <ul className="mt-4 space-y-2">
                {services.map((s) => <li key={s.slug}><Link href={serviceUrl(s)} className="group flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 font-medium text-white/90 transition hover:border-brand-gold hover:text-brand-gold">{s.title}<ArrowRight size={14} aria-hidden="true" /></Link></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {more.length > 0 && (
        <section className="section bg-brand-mist"><div className="container-x">
          <h2 className="font-display text-3xl font-bold">Related articles</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">{more.map((m) => <InsightCard key={m.slug} a={m} />)}</div>
        </div></section>
      )}
      <CTABand />
    </>
  );
}
