import { legal } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "./PageHeader";

export const legalMetadata = (slug) =>
  buildMetadata({ title: legal[slug].title, description: legal[slug].description, path: `/${slug}` });

export default function LegalPage({ slug }) {
  const { title, sections } = legal[slug];
  return (
    <>
      <PageHeader crumbs={[{ name: title, href: `/${slug}` }]} title={title} />
      <section className="container-x section prose-phmg">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="text-2xl font-bold">{s.h}</h2>
            {s.p.map((t) => <p key={t}>{t}</p>)}
          </div>
        ))}
      </section>
    </>
  );
}
