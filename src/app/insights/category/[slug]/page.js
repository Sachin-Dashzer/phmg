import { notFound } from "next/navigation";
import { insightCategories, articlesIn } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import InsightCard from "@/components/ui/InsightCard";

export const dynamicParams = false;
const live = insightCategories.filter((c) => articlesIn(c.slug).length);
export const generateStaticParams = () => live.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = live.find((x) => x.slug === slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.title} Guides and Updates`,
    description: `Practical ${c.title.toLowerCase()} guides from PHMG & Associates, prepared and reviewed by chartered accountants. Read the latest articles today.`,
    path: `/insights/category/${c.slug}`,
  });
}

export default async function CategoryArchive({ params }) {
  const { slug } = await params;
  const c = live.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <PageHeader crumbs={[{ name: "Insights", href: "/insights" }, { name: c.title, href: `/insights/category/${c.slug}` }]} title={`${c.title} Guides`} />
      <section className="container-x section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articlesIn(c.slug).map((a) => <InsightCard key={a.slug} a={a} />)}
      </section>
    </>
  );
}
