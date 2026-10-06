import { legal } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "./PageHeader";
import { slugify } from "./ArticleBody";

export const legalMetadata = (slug) =>
  buildMetadata({ title: legal[slug].title, description: legal[slug].description, path: `/${slug}` });

export default function LegalPage({ slug }) {
  const { title, sections } = legal[slug];
  return (
    <>
      <PageHeader crumbs={[{ name: title, href: `/${slug}` }]} eyebrow="Legal" title={title} image="/images/office/office-2.jpeg" />
      <section className="section bg-brand-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-brand-line bg-white p-5 text-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">On this page</p>
              <ul className="mt-3 space-y-2">
                {sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`} className="text-brand-muted hover:text-brand-navy">{s.h}</a></li>)}
              </ul>
            </div>
          </nav>
          <div className="prose-phmg rounded-2xl border border-brand-line bg-white p-6 md:p-10">
            {sections.map((s) => (
              <div key={s.h} className="mb-8 last:mb-0">
                <h2 id={slugify(s.h)} className="scroll-mt-28 font-display text-2xl font-bold">{s.h}</h2>
                {s.p.map((t) => <p key={t}>{t}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
