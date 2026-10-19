import Link from "next/link";
import { ArrowRight, Calculator, Table2, ExternalLink, Info } from "lucide-react";
import {
  calculatorGroups,
  calculators,
  calculatorsIn,
  utilities,
  notReproduced,
} from "@/data/knowledge-bank";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { WhoWeServe } from "@/components/sections/SiteSections";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata = buildMetadata({
  // Short enough that buildMetadata keeps the "| PHMG & Associates" suffix; the nav, breadcrumb
  // and eyebrow all read "Resources".
  title: "Calculators and Reference Tables",
  description:
    "Calculators for tax, GST and loans, reference tables for rates and due dates, and a directory of the official sources we work from.",
  path: "/knowledge-bank",
});

export default function KnowledgeBank() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Resources", href: "/knowledge-bank" }]}
        eyebrow="Resources"
        title={<>Work out the numbers <span className="text-brand-gold">yourself</span></>}
        intro="Calculators that show their working, reference tables for the rates and dates that come up most often, and links to the official sources behind them. No sign-up."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#calculators" className="btn btn-gold">Calculators <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="#utilities" className="btn btn-ghost-light">Reference tables</Link>
          <Link href="/knowledge-bank/official-resources" className="btn btn-ghost-light">Official sources</Link>
        </div>
      </PageHeader>

      <section aria-labelledby="calculators-title" id="calculators" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHeading
            id="calculators-title"
            label="Calculators"
            title={`${calculators.length} calculators`}
            intro="Each one states the basis it works on and what it does not model, because an estimate you cannot check is no use."
          />
          <div className="space-y-12">
            {calculatorGroups.map((g) => {
              const items = calculatorsIn(g.slug);
              if (!items.length) return null;
              return (
                <div key={g.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-brand-navy">{g.title}</h3>
                    <p className="text-sm text-brand-muted">{g.blurb}</p>
                  </div>
                  <ScrollReveal stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/knowledge-bank/calculators/${c.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-5 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-gold">
                          <Calculator size={19} aria-hidden="true" />
                        </span>
                        <h4 className="mt-4 font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">{c.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{c.short}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue">
                          Open <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    ))}
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="utilities-title" id="utilities" className="section scroll-mt-24 bg-brand-mist">
        <div className="container-x">
          <SectionHeading
            id="utilities-title"
            label="Reference tables"
            title="Rates, dates and comparisons"
            intro="The tables we look up most often, each with the official source alongside it."
          />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {utilities.map((u) => (
              <Link
                key={u.slug}
                href={`/knowledge-bank/utilities/${u.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold-dark">
                  <Table2 size={19} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{u.short}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue">
                  Open <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="sources-title" className="section bg-white">
        <div className="container-x">
          <SectionHeading
            id="sources-title"
            label="Official sources"
            title="Where the rules actually live"
            intro="Acts, rules and forms are maintained by the departments that make them. Rather than copy them, we link the source."
          />
          <Link
            href="/knowledge-bank/official-resources"
            className="group flex flex-col gap-4 rounded-2xl border border-brand-line bg-brand-mist p-6 transition-colors hover:border-brand-gold sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-navy">Directory of official sources</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-brand-muted">
                Direct tax, GST, company law, exchange control, labour, not-for-profit and small
                business, grouped by subject, with what each source is good for.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-blue">
              Open the directory <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <div className="mt-10 rounded-2xl border border-brand-line bg-white p-6">
            <h3 className="flex items-center gap-2 font-semibold text-brand-navy">
              <Info size={17} className="shrink-0 text-brand-gold" aria-hidden="true" />
              What we deliberately do not reproduce
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-muted">
              Some data changes too often, or runs to too many records, for a copy on this site to
              be reliable. A stale rate table is worse than no rate table, so these link straight
              to the authority that maintains them.
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {notReproduced.map((n) => (
                <li key={n.what} className="text-sm">
                  <p className="font-semibold text-brand-navy">{n.what}</p>
                  <p className="mt-0.5 text-brand-muted">{n.why}.</p>
                  <a href={n.where.href} rel="noopener" className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand-blue underline">
                    {n.where.label} <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WhoWeServe className="bg-brand-mist" />
      <RelatedLinks url="/knowledge-bank" />
      <CTABand
        title="Need the exact numbers?"
        text="Calculators give estimates. A chartered accountant can work out your actual position and the deductions and reliefs available to you."
      />
    </>
  );
}
