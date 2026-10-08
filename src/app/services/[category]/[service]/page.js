import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, AlertTriangle, ArrowRight, FileCheck2, ShieldCheck, CalendarClock } from "lucide-react";
import { publishedServices, getService, serviceUrl } from "@/data/services";
import { getCategory } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import ArticleBody from "@/components/ui/ArticleBody";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import { ProcessSteps, FAQSection } from "@/components/sections/SiteSections";

export const dynamicParams = false;

export const generateStaticParams = () => publishedServices.map((s) => ({ category: s.category, service: s.slug }));

export async function generateMetadata({ params }) {
  const { category, service } = await params;
  const s = getService(category, service);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: serviceUrl(s), ownImage: true });
}

const whyPhmg = [
  "Partner-led: a chartered accountant reviews your work, not only a junior team.",
  "Clear fee and scope in writing before we start.",
  "Deadlines tracked for you, with reminders well before the due date.",
  "Your documents and data are handled confidentially.",
  "Online service across India, with a single point of contact.",
];

// Fallback hero photo per category; services can still set their own heroImage.
const categoryImage = {
  "audit-assurance": "/images/stock-audit.png",
  "income-tax": "/who-we-serve.jpg",
  gst: "/images/office/office-3.jpeg",
};

const H2 = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-28 font-display text-2xl font-bold md:text-3xl">{children}</h2>
);

const CheckList = ({ items }) => (
  <ul className="mt-5 space-y-3">
    {items.map((t) => (
      <li key={t} className="flex gap-3 text-sm leading-relaxed">
        <span className="mt-0.5 flex h-14 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-dark"><Check size={13} aria-hidden="true" /></span>
        {t}
      </li>
    ))}
  </ul>
);

export default async function ServicePage({ params }) {
  const { category, service } = await params;
  const s = getService(category, service);
  if (!s) notFound();
  const cat = getCategory(category);
  const related = (s.related || []).map((slug) => publishedServices.find((x) => x.slug === slug)).filter(Boolean);
  const image = s.heroImage || categoryImage[cat.slug] || "/images/office/office-1.jpeg";

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.title, description: s.metaDescription, path: serviceUrl(s) })} />
      <PageHeader
        crumbs={[
          { name: "Services", href: "/services" },
          { name: cat.title, href: `/services/${cat.slug}` },
          { name: s.title, href: serviceUrl(s) },
        ]}
        eyebrow={cat.title}
        title={s.h1}
        intro={s.intro}
        image="/images/office/office-2.jpeg"
        aside={
          <div className="relative">
            <div className="relative aspect-16/11 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
              <Image src={image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 divide-x divide-brand-line rounded-xl bg-white text-center shadow-xl sm:left-8 sm:right-8">
              {[[FileCheck2, `${s.documents.length} documents`], [CalendarClock, `${s.process.length} steps`], [ShieldCheck, "Partner review"]].map(([I, t]) => (
                <div key={t} className="flex flex-col items-center gap-1 px-2 py-3">
                  <I size={18} className="text-brand-gold" aria-hidden="true" />
                  <span className="text-xs font-semibold text-brand-navy">{t}</span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#lead" className="btn btn-gold">Get a free quote <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="#documents" className="btn btn-ghost-light">Documents needed</Link>
        </div>
      </PageHeader>

      <div className="bg-white">
        <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <article className="min-w-0 space-y-16">
            <section>
              <div className="section-label section-label-blue mb-4 w-fit">Overview</div>
              <H2 id="what-is">What is {s.title}?</H2>
              <div className="divider-gold mt-5" />
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand-ink">{s.definition}</p>
            </section>

            <ScrollReveal stagger className="grid gap-5 md:grid-cols-2">
              <section className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <H2 id="who">Who needs it</H2>
                <CheckList items={s.whoNeedsIt} />
              </section>
              <section className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <H2 id="benefits">Benefits</H2>
                <CheckList items={s.benefits} />
              </section>
            </ScrollReveal>

            {s.sections && <ArticleBody blocks={s.sections} />}

            <section>
              <H2 id="documents">Documents required</H2>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.documents.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 rounded-xl border border-brand-line bg-white p-4 text-sm shadow-xs">
                    <span className="flex h-18 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-navy font-display text-xs font-bold text-brand-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pt-1">{t}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <H2 id="due-dates">Due dates and penalties</H2>
              <div tabIndex={0} role="region" aria-label="Due dates, scrolls horizontally" className="mt-6 overflow-x-auto rounded-2xl border border-brand-line">
                <table className="w-full min-w-136 text-left text-sm">
                  <thead className="bg-brand-navy text-white">
                    <tr><th scope="col" className="p-4 font-semibold">Item</th><th scope="col" className="p-4 font-semibold">Due date</th><th scope="col" className="p-4 font-semibold">If missed</th></tr>
                  </thead>
                  <tbody>
                    {s.deadlines.map((d) => (
                      <tr key={d.item} className="border-t border-brand-line align-top even:bg-brand-mist/60">
                        <th scope="row" className="p-4 font-semibold text-brand-navy">{d.item}</th><td className="p-4">{d.date}</td><td className="p-4 text-brand-danger">{d.penalty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {s.dueNote && <p className="mt-3 text-sm text-brand-muted">{s.dueNote}</p>}
            </section>

            <ScrollReveal stagger className="grid gap-5 md:grid-cols-2">
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <H2 id="mistakes">Mistakes to avoid</H2>
                <ul className="mt-5 space-y-3">
                  {s.mistakes.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />{t}</li>
                  ))}
                </ul>
              </section>
              <section className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white">
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/15 blur-2xl" />
                <h2 id="why" className="relative scroll-mt-28 font-display text-2xl font-bold text-white md:text-3xl">Why PHMG</h2>
                <ul className="relative mt-5 space-y-3">
                  {whyPhmg.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/80"><Check size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />{t}</li>
                  ))}
                </ul>
                <p className="relative mt-5 border-t border-white/15 pt-4 text-sm text-white/70">
                  Fees depend on your case. <Link href="/contact" className="font-semibold text-brand-gold underline">Request a quote</Link> for a clear scope and fee.
                </p>
              </section>
            </ScrollReveal>
          </article>

          <div id="lead" className="scroll-mt-28">
            <div className="lg:sticky lg:top-28">
              <LeadCard defaultService={cat.title} id="service-lead" title={`Talk to a CA about ${s.title.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </div>

      <ProcessSteps className="bg-brand-mist" label="Our process" title={`How we handle your ${s.title.toLowerCase()}`} steps={s.process} />
      <FAQSection faqs={s.faqs} className="bg-white" />

      {related.length > 0 && (
        <section aria-labelledby="related" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="related" label="Related services" title="You may also need" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
            </ScrollReveal>
          </div>
        </section>
      )}

      <div className="bg-white py-8">
        <p className="container-x text-xs text-brand-muted">
          This content is for general information and does not constitute professional advice. Laws, rates and due dates change; please confirm the current position for your case before acting.
        </p>
      </div>
      <CTABand />
    </>
  );
}
