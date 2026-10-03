import Link from "next/link";
import { articles, insightCategories, articlesIn } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import InsightCard from "@/components/ui/InsightCard";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata = buildMetadata({
  title: "Insights – Tax, GST & Compliance Guides",
  description: "Practical guides on income tax, GST, company law, audit and compliance from PHMG & Associates, reviewed by chartered accountants. Read and subscribe.",
  path: "/insights",
});

export default function Insights() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Insights", href: "/insights" }]} title="Insights" intro="Plain-English guides on tax, GST and compliance, prepared and reviewed by chartered accountants." />
      <section className="container-x section">
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {insightCategories.filter((c) => articlesIn(c.slug).length).map((c) => (
            <li key={c.slug}><Link href={`/insights/category/${c.slug}`} className="rounded-full border border-brand-line px-4 py-2 text-sm font-medium hover:border-brand-blue hover:text-brand-blue">{c.title}</Link></li>
          ))}
        </ul>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => <InsightCard key={a.slug} a={a} />)}
        </div>
        <div className="mt-14 max-w-xl"><NewsletterForm /></div>
      </section>
    </>
  );
}
