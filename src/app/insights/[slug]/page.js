import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, categoryTitle, SITE_REVIEWER } from "@/data/insights";
import { publishedServices, serviceUrl } from "@/data/services";
import { firm } from "@/data/firm";
import { buildMetadata, absUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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
      <section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#E6F7F9]">
        <div className="container-x py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Insights", href: "/insights" }, { name: a.title, href: `/insights/${a.slug}` }]} />
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-brand-teal-dark">{categoryTitle(a.category)}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold md:text-5xl">{a.title}</h1>
          <p className="mt-4 text-sm text-brand-muted">
            {firm.name} editorial team · {SITE_REVIEWER} · {a.readMinutes} min read | Published {fmtDate(a.publishedAt)} · Updated {fmtDate(a.updatedAt)}
          </p>
        </div>
      </section>

      <div className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0 max-w-3xl">
          <ArticleBody blocks={a.body} />
          {a.faqs.length > 0 && (
            <>
              <h2 id="faq" className="mt-10 scroll-mt-24 text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4"><FAQAccordion faqs={a.faqs} /></div>
            </>
          )}
          <p className="mt-10 rounded-xl bg-brand-mist p-4 text-sm text-brand-muted">
            This content is for general information and does not constitute professional advice. Laws, rates and due dates change; confirm the current position for your case. Section references are to the Income-tax Act, 1961 unless stated; the Income-tax Act, 2025 applies to later periods with renumbered sections.
          </p>
          <div className="mt-10"><NewsletterForm /></div>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Table of contents" className="card p-5 text-sm">
            <h2 className="font-semibold">In this article</h2>
            <ul className="mt-3 space-y-2">
              {toc.map((t) => <li key={t}><a href={`#${slugify(t)}`} className="text-brand-muted hover:text-brand-blue">{t}</a></li>)}
            </ul>
          </nav>
          {services.length > 0 && (
            <div className="card p-5 text-sm">
              <h2 className="font-semibold">Need help with this?</h2>
              <ul className="mt-3 space-y-2">
                {services.map((s) => <li key={s.slug}><Link href={serviceUrl(s)} className="font-medium text-brand-blue-dark hover:underline">{s.title}</Link></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {more.length > 0 && (
        <section className="container-x pb-14">
          <h2 className="text-2xl font-bold">Related articles</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">{more.map((m) => <InsightCard key={m.slug} a={m} />)}</div>
        </section>
      )}
      <CTABand />
    </>
  );
}
