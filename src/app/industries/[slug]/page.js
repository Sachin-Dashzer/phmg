import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { industries, getIndustry } from "@/data/industries";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { IndustryIcon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import { ProcessSteps, FAQSection, StatsBand } from "@/components/sections/SiteSections";
import whoWeServeImage from "../../../../public/who-we-serve.jpg";

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: `CA Services for ${i.title}`, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const services = i.services.map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean);
  const others = industries.filter((x) => x.slug !== i.slug).slice(0, 4);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Industries", href: "/industries" }, { name: i.title, href: `/industries/${i.slug}` }]}
        eyebrow="Industry focus"
        title={<>CA services for <span className="text-brand-gold">{i.title}</span></>}
        intro={i.intro}
        image={whoWeServeImage}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#lead" className="btn btn-gold">Talk to a specialist <ArrowRight size={16} aria-hidden="true" /></Link>
          {services.length > 0 && <Link href="#services" className="btn btn-ghost-light">See services</Link>}
        </div>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div className="min-w-0 space-y-16">
            {/* Challenges vs how we help, side by side */}
            <div className="grid gap-5 md:grid-cols-2">
              <ScrollReveal className="rounded-2xl border border-brand-line bg-brand-mist p-6 md:p-8">
                <div className="section-label section-label-blue mb-4 w-fit">The challenge</div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">Common challenges</h2>
                <ul className="mt-6 space-y-4">
                  {i.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed"><AlertCircle size={18} className="mt-0.5 shrink-0 text-brand-gold-dark" aria-hidden="true" />{c}</li>
                  ))}
                </ul>
              </ScrollReveal>
              <ScrollReveal className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white md:p-8">
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/15 blur-3xl" />
                <div className="section-label section-label-dark relative mb-4 w-fit">Our answer</div>
                <h2 className="relative font-display text-2xl font-bold text-white md:text-3xl">How we help</h2>
                <ul className="relative mt-6 space-y-5">
                  {i.value.map((v) => (
                    <li key={v.t} className="flex gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-white">{v.t}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">{v.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {services.length > 0 && (
              <div id="services" className="scroll-mt-28">
                <SectionHeading label="Recommended" title="Services for your business" />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </div>
            )}
          </div>
          <div id="lead" className="scroll-mt-28"><div className="lg:sticky lg:top-28"><LeadCard id="industry-lead" title={`Talk to a CA about ${i.title}`} /></div></div>
        </div>
      </section>

      <StatsBand />
      <ProcessSteps className="bg-brand-mist" />
      <FAQSection faqs={i.faqs} className="bg-white" />

      <section aria-labelledby="other-industries" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading
            id="other-industries"
            label="Other sectors"
            title="More industries we serve"
            action={<Link href="/industries" className="btn btn-secondary">All industries <ArrowRight size={15} aria-hidden="true" /></Link>}
          />
          <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="group flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 transition hover:border-brand-gold hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><IndustryIcon slug={o.slug} size={20} /></span>
                <span className="font-semibold text-brand-navy group-hover:text-brand-blue">{o.title}</span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
