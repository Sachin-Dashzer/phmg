import Link from "next/link";
import { notFound } from "next/navigation";
import { insightCategories, articlesIn } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InsightCard from "@/components/ui/InsightCard";
import { SubscribeSection } from "@/components/sections/TeamSection";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const dynamicParams = false;
const live = insightCategories.filter((c) => articlesIn(c.slug).length);
export const generateStaticParams = () => live.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = live.find((x) => x.slug === slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.title} Guides and Updates`,
    description: `Practical ${c.title.toLowerCase()} guides from PHMG & Associates, written and reviewed by chartered accountants, and updated as the law changes.`,
    path: `/insights/category/${c.slug}`,
  });
}

export default async function CategoryArchive({ params }) {
  const { slug } = await params;
  const c = live.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = articlesIn(c.slug);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Insights", href: "/insights" }, { name: c.title, href: `/insights/category/${c.slug}` }]}
        eyebrow={`${list.length} ${list.length === 1 ? "article" : "articles"}`}
        title={`${c.title} Guides`}
        intro={`Practical ${c.title.toLowerCase()} guides, prepared and reviewed by chartered accountants.`}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {live.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/insights/category/${x.slug}`}
                aria-current={x.slug === c.slug ? "page" : undefined}
                className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-gold hover:text-brand-gold aria-[current=page]:border-brand-gold aria-[current=page]:bg-brand-gold aria-[current=page]:text-brand-navy"
              >
                {x.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>
      <section className="section bg-brand-mist">
        <div className="container-x">
          {c.intro && (
            <div className="mb-10 max-w-prose">
              <h2 className="font-display text-2xl font-bold text-brand-navy">What this category covers</h2>
              <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-gold" aria-hidden="true" />
              <p className="mt-4 leading-relaxed text-brand-ink">{c.intro}</p>
            </div>
          )}
          <h2 className="sr-only">All {c.title.toLowerCase()} guides</h2>
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => <InsightCard key={a.slug} a={a} />)}
          </ScrollReveal>
        </div>
      </section>
      <RelatedLinks url={`/insights/category/${c.slug}`} />
      <SubscribeSection />
    </>
  );
}
