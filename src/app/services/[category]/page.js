import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { categories, getCategory } from "@/data/categories";
import { servicesIn, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icon";
import { ServiceCard, CategoryCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import CTABand from "@/components/ui/CTABand";
import { ProcessSteps, WhyChoose, StatsBand } from "@/components/sections/SiteSections";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return buildMetadata({
    title: `${c.title} Services`,
    description: `${c.intro} Talk to our chartered accountants – call or WhatsApp today.`.slice(0, 158),
    path: `/services/${c.slug}`,
    noindex: servicesIn(c.slug).length === 0, // thin until services are published
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const live = servicesIn(c.slug);
  const comingSoon = services.filter((s) => s.category === c.slug && !live.includes(s));
  const others = categories.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", href: "/services" }, { name: c.title, href: `/services/${c.slug}` }]}
        eyebrow="Our services"
        title={`${c.title} Services`}
        intro={c.intro}
        image="/images/office/office-1.jpeg"
        aside={
          <div className="card-glass hidden p-6 lg:block">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold text-brand-navy"><Icon name={c.icon} size={26} /></span>
              <div>
                <p className="font-display text-3xl font-bold text-white">{live.length + comingSoon.length}</p>
                <p className="text-sm text-white/70">services in this practice</p>
              </div>
            </div>
            <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-relaxed text-white/75">{c.short}</p>
            <Link href="#lead" className="btn btn-gold mt-5 w-full">Get a quote <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        }
      />

      <section className="section bg-brand-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem]">
          <div className="min-w-0">
            {live.length > 0 && (
              <>
                <SectionHeading label={c.title} title={`Our ${c.title.toLowerCase()} services`} />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {live.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </>
            )}
            {comingSoon.length > 0 && (
              <div className={live.length ? "mt-14" : ""}>
                <h2 className="font-display text-2xl font-bold">Also available on request</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {comingSoon.map((s) => (
                    <li key={s.slug} className="flex gap-3 rounded-xl border border-dashed border-brand-line bg-white p-4">
                      <Clock size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-brand-navy">{s.title}</span>
                        <span className="mt-1 block text-sm text-brand-muted">{s.shortDesc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div id="lead" className="scroll-mt-28"><div className="lg:sticky lg:top-28"><LeadCard id="category-lead" defaultService={c.title} /></div></div>
        </div>
      </section>

      <StatsBand />
      <ProcessSteps />
      <WhyChoose />

      <section aria-labelledby="more-title" className="section bg-white">
        <div className="container-x">
          <SectionHeading
            id="more-title"
            label="Explore more"
            title="Other practice areas"
            action={<Link href="/services" className="btn btn-secondary">All services <ArrowRight size={15} aria-hidden="true" /></Link>}
          />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => <CategoryCard key={o.slug} category={o} items={servicesIn(o.slug)} />)}
          </ScrollReveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
