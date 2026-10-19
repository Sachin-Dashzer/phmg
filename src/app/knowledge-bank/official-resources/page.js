import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { officialResources, notReproduced } from "@/data/knowledge-bank";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata = buildMetadata({
  title: "Official Sources",
  description:
    "A directory of the official sources for Indian tax, GST, company law, exchange control, labour and not-for-profit rules, grouped by subject.",
  path: "/knowledge-bank/official-resources",
});

export default function OfficialResources() {
  const count = officialResources.reduce((n, g) => n + g.links.length, 0);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Resources", href: "/knowledge-bank" },
          { name: "Official sources", href: "/knowledge-bank/official-resources" },
        ]}
        eyebrow="Official sources"
        title="Where the rules actually live"
        intro="Acts, rules, forms and notifications are maintained by the departments that make them, and they change constantly. Rather than keep a copy that drifts out of date, we link the source and say what each one is good for."
      />

      <section aria-labelledby="why-title" className="bg-white py-12 md:py-14">
        <div className="container-x">
          <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
            <h2 id="why-title" className="flex items-center gap-2 font-semibold text-brand-navy">
              <Info size={17} className="shrink-0 text-brand-gold" aria-hidden="true" />
              Why this is a directory and not a copy of the statute book
            </h2>
            <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-brand-ink">
              <p>
                A page reproducing a bare Act is out of date the day it is amended, and the reader
                has no way of knowing. The official text carries the amendments; a copy does not.
              </p>
              <p>
                So the {count} sources below are grouped by subject with a note on what each is
                useful for. Our own service pages cite the specific provision they discuss and link
                the same sources, so you can check any statement on this site against the authority
                behind it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="sources-title" className="section bg-white pt-0">
        <div className="container-x">
          <SectionHeading id="sources-title" label="Directory" title="By subject" />
          <div className="space-y-10">
            {officialResources.map((g) => (
              <div key={g.group}>
                <h3 className="font-display text-xl font-semibold text-brand-navy">{g.group}</h3>
                <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-gold" aria-hidden="true" />
                <ScrollReveal stagger className="mt-5 grid gap-4 sm:grid-cols-2">
                  {g.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      rel="noopener"
                      className="group flex h-full flex-col rounded-xl border border-brand-line bg-white p-5 transition-colors hover:border-brand-gold"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">{l.label}</span>
                        <ExternalLink size={14} className="mt-1 shrink-0 text-brand-muted" aria-hidden="true" />
                      </span>
                      {l.note && <span className="mt-1.5 text-sm leading-relaxed text-brand-muted">{l.note}</span>}
                    </a>
                  ))}
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="notrepro-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading
            id="notrepro-title"
            label="Not reproduced here"
            title="Data we point at rather than copy"
            intro="Either it changes too often, or it runs to too many records for a copy on this site to be reliable."
          />
          <div tabIndex={0} role="region" aria-label="Data not reproduced, scrolls horizontally" className="overflow-x-auto rounded-2xl border border-brand-line bg-white">
            <table className="w-full min-w-150 text-left text-sm">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th scope="col" className="p-4 font-semibold">What</th>
                  <th scope="col" className="p-4 font-semibold">Why not here</th>
                  <th scope="col" className="p-4 font-semibold">Where to get it</th>
                </tr>
              </thead>
              <tbody>
                {notReproduced.map((n) => (
                  <tr key={n.what} className="border-t border-brand-line align-top even:bg-brand-mist/60">
                    <th scope="row" className="p-4 font-semibold text-brand-navy">{n.what}</th>
                    <td className="p-4 text-brand-muted">{n.why}</td>
                    <td className="p-4">
                      <a href={n.where.href} rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-brand-blue underline">
                        {n.where.label} <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/knowledge-bank" className="btn btn-primary">Back to Resources <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/insights" className="btn btn-secondary">Read our guides</Link>
          </div>
        </div>
      </section>

      <RelatedLinks url="/knowledge-bank/official-resources" />
      <CTABand
        title="Not sure which rule applies?"
        text="The hard part is usually not finding the provision but working out how it applies to your case. Tell us the position and we will set out the options."
      />
    </>
  );
}
