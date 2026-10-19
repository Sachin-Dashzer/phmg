import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { industries } from "@/data/industries";
import { publishedServices, serviceUrl } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { IndustryIcon } from "@/components/ui/Icon";
import CTABand from "@/components/ui/CTABand";
import { AboutSplit, WhoWeServe, WhyChoose, StatsBand } from "@/components/sections/SiteSections";
import whoWeServeImage from "../../../public/who-we-serve.jpg";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata = buildMetadata({
  title: "CA Services by Industry in India",
  description: "See how PHMG & Associates supports startups, e-commerce, real estate, manufacturing, healthcare, professionals and NGOs. Talk to our chartered accountants.",
  path: "/industries",
});

export default function Industries() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Industries", href: "/industries" }]}
        eyebrow="Industries we serve"
        title={<>Sector knowledge that <span className="text-brand-gold">saves you time</span></>}
        intro="Every sector has its own tax, GST and compliance questions. Find yours and see how we help businesses like you."
        image={whoWeServeImage}
      />

      <section aria-labelledby="industries-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading id="industries-title" label="Pick your sector" title="Built for the way your industry works" />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* The card is an <article>, not one big <Link>, so each sector can also link the
                services it actually needs. This page is one of the few Google has indexed, so
                these are the links that carry crawl equity into the service pages. */}
            {industries.map((i, n) => {
              const picks = i.services.map((s) => publishedServices.find((p) => p.slug === s)).filter(Boolean).slice(0, 3);
              return (
                <article
                  key={i.slug}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-xl hover:shadow-brand-blue/10 motion-reduce:transition-none"
                >
                  <span aria-hidden="true" className="absolute right-5 top-4 font-display text-5xl font-bold text-brand-mist transition-colors group-hover:text-brand-gold/20">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    <IndustryIcon slug={i.slug} size={22} />
                  </span>
                  <h2 className="relative mt-5 text-xl font-semibold transition-colors group-hover:text-brand-blue">
                    <Link
                      href={`/industries/${i.slug}`}
                      className="transition-colors after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {i.title}
                    </Link>
                  </h2>
                  <p className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-brand-muted">{i.intro}</p>
                  {picks.length > 0 && (
                    <ul className="relative z-10 mt-5 space-y-0.5 border-t border-neutral-200/70 pt-3">
                      {picks.map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceUrl(s)} className="inline-flex items-center gap-1 py-1.5 text-sm text-brand-muted transition-colors hover:text-brand-blue">
                            <ChevronRight size={14} className="shrink-0 text-brand-gold" aria-hidden="true" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <span aria-hidden="true" className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-blue">
                    Explore sector <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <WhoWeServe />
      <StatsBand />
      <AboutSplit className="bg-white" />
      <WhyChoose />
      <RelatedLinks url="/industries" />
      <CTABand />
    </>
  );
}
