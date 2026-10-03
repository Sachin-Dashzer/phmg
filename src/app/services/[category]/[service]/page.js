import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, AlertTriangle } from "lucide-react";
import { publishedServices, getService, serviceUrl } from "@/data/services";
import { getCategory } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ArticleBody from "@/components/ui/ArticleBody";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";

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

const H2 = ({ id, children }) => (
  <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-bold md:text-3xl">{children}</h2>
);

export default async function ServicePage({ params }) {
  const { category, service } = await params;
  const s = getService(category, service);
  if (!s) notFound();
  const cat = getCategory(category);
  const related = (s.related || []).map((slug) => publishedServices.find((x) => x.slug === slug)).filter(Boolean);

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.title, description: s.metaDescription, path: serviceUrl(s) })} />
      <section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#E6F7F9]">
        <div className="container-x py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: cat.title, href: `/services/${cat.slug}` }, { name: s.title, href: serviceUrl(s) }]} />
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold md:text-5xl">{s.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg">{s.intro}</p>
          <p className="mt-3 text-sm text-brand-muted">Last reviewed: {s.lastReviewed}</p>
        </div>
      </section>

      <div className="container-x grid gap-10 pb-16 lg:grid-cols-[1fr_22rem]">
        <article className="min-w-0">
          <H2 id="what-is">What is {s.title}?</H2>
          <p className="mt-3 max-w-prose leading-relaxed">{s.definition}</p>

          <H2 id="who">Who needs it</H2>
          <ul className="mt-3 space-y-2">
            {s.whoNeedsIt.map((t) => <li key={t} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-brand-success" aria-hidden="true" />{t}</li>)}
          </ul>

          <H2 id="benefits">Benefits</H2>
          <ul className="mt-3 space-y-2">
            {s.benefits.map((t) => <li key={t} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-brand-success" aria-hidden="true" />{t}</li>)}
          </ul>

          {s.sections && <ArticleBody blocks={s.sections} />}

          <H2 id="documents">Documents required</H2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {s.documents.map((t) => <li key={t} className="card flex gap-2 p-3 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />{t}</li>)}
          </ul>

          <H2 id="process">Our process</H2>
          <ol className="mt-4 space-y-4">
            {s.process.map((p, i) => (
              <li key={p.title} className="card flex gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1">{p.text}</p>
                  <p className="mt-1 text-sm font-medium text-brand-muted">{p.time}</p>
                </div>
              </li>
            ))}
          </ol>

          <H2 id="due-dates">Due dates and penalties</H2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-brand-line">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-brand-mist text-brand-navy">
                <tr><th scope="col" className="p-3">Item</th><th scope="col" className="p-3">Due date</th><th scope="col" className="p-3">If missed</th></tr>
              </thead>
              <tbody>
                {s.deadlines.map((d) => (
                  <tr key={d.item} className="border-t border-brand-line align-top">
                    <th scope="row" className="p-3 font-medium">{d.item}</th><td className="p-3">{d.date}</td><td className="p-3">{d.penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.dueNote && <p className="mt-3 text-sm text-brand-muted">{s.dueNote}</p>}

          <H2 id="mistakes">Mistakes to avoid</H2>
          <ul className="mt-3 space-y-2">
            {s.mistakes.map((t) => <li key={t} className="flex gap-2"><AlertTriangle size={18} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />{t}</li>)}
          </ul>

          <H2 id="why">Why PHMG for {s.title.toLowerCase()}</H2>
          <ul className="mt-3 space-y-2">
            {whyPhmg.map((t) => <li key={t} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-brand-success" aria-hidden="true" />{t}</li>)}
          </ul>
          <p className="mt-4">
            Fees depend on your case. <Link href="/contact" className="font-semibold text-brand-blue-dark underline">Request a quote</Link> and we will share a clear scope and fee.
          </p>

          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-4"><FAQAccordion faqs={s.faqs} /></div>

          {related.length > 0 && (
            <>
              <H2 id="related">Related services</H2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
              </div>
            </>
          )}

          <p className="mt-12 rounded-xl bg-brand-mist p-4 text-sm text-brand-muted">
            This content is for general information and does not constitute professional advice. Laws, rates and due dates change; please confirm the current position for your case before acting.
          </p>
        </article>

        <div className="lg:pt-12">
          <div className="lg:sticky lg:top-24">
            <LeadCard defaultService={cat.title} id="service-lead" title={`Talk to a CA about ${s.title.toLowerCase()}`} />
          </div>
        </div>
      </div>
      <CTABand />
    </>
  );
}
