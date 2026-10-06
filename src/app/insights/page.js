import Link from "next/link";
import { articles, insightCategories, articlesIn } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InsightCard from "@/components/ui/InsightCard";
import { SubscribeSection } from "@/components/sections/TeamSection";
import { ToolCard } from "@/components/sections/SiteSections";
import { tools } from "@/data/tools";

export const metadata = buildMetadata({
  title: "Insights – Tax, GST & Compliance Guides",
  description: "Practical guides on income tax, GST, company law, audit and compliance from PHMG & Associates, reviewed by chartered accountants. Read and subscribe.",
  path: "/insights",
});

export default function Insights() {
  const [featured, ...rest] = articles;
  const cats = insightCategories.filter((c) => articlesIn(c.slug).length);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Insights", href: "/insights" }]}
        eyebrow="Knowledge hub"
        title={<>Plain-English guides on <span className="text-brand-gold">tax &amp; compliance</span></>}
        intro="Prepared and reviewed by chartered accountants, so you can make informed decisions."
      >
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {cats.map((c) => (
            <li key={c.slug}>
              <Link href={`/insights/category/${c.slug}`} className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-brand-gold hover:text-brand-gold">
                {c.title} <span className="text-white/50">({articlesIn(c.slug).length})</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      {featured && (
        <section aria-labelledby="latest-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading id="latest-title" label="Latest" title="Fresh from our CAs" />
            <div className="grid gap-5 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
              <ScrollReveal><InsightCard a={featured} featured /></ScrollReveal>
              <ScrollReveal stagger className="flex flex-col gap-5">
                {rest.slice(0, 2).map((a) => <InsightCard key={a.slug} a={a} />)}
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {rest.length > 2 && (
        <section aria-labelledby="all-title" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="all-title" label="All articles" title="Browse the library" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(2).map((a) => <InsightCard key={a.slug} a={a} />)}
            </ScrollReveal>
          </div>
        </section>
      )}

      {tools.length > 0 && (
        <section aria-labelledby="tools-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading id="tools-title" label="Free resources" title="Put it into numbers" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.slice(0, 3).map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
            </ScrollReveal>
          </div>
        </section>
      )}

      <SubscribeSection />
    </>
  );
}
