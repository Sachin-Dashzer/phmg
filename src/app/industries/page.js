import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { IndustryIcon } from "@/components/ui/Icon";
import CTABand from "@/components/ui/CTABand";
import { AboutSplit, WhoWeServe, WhyChoose, StatsBand } from "@/components/sections/SiteSections";
import whoWeServeImage from "../../../public/who-we-serve.jpg";

export const metadata = buildMetadata({
  title: "CA Services by Industry",
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
            {industries.map((i, n) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-xl hover:shadow-brand-blue/10 motion-reduce:transition-none"
                >
                  <span aria-hidden="true" className="absolute right-5 top-4 font-display text-5xl font-bold text-brand-mist transition-colors group-hover:text-brand-gold/20">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    <IndustryIcon slug={i.slug} size={22} />
                  </span>
                  <h2 className="relative mt-5 text-xl font-semibold transition-colors group-hover:text-brand-blue">{i.title}</h2>
                  <p className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-brand-muted">{i.intro}</p>
                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-blue">
                    Explore sector <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <WhoWeServe />
      <StatsBand />
      <AboutSplit className="bg-white" />
      <WhyChoose />
      <CTABand />
    </>
  );
}
