import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { team } from "@/data/team";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { StatsBand, WhyChoose, ProcessSteps } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "Our Team – Chartered Accountants",
  description:
    "Meet the chartered accountants and professionals at PHMG & Associates who review and handle your tax, audit, GST and compliance work. Contact us today.",
  path: "/team",
  noindex: team.length === 0,
});

// Same faint ledger lines as the homepage team slider.
const ledgerLines = "repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 22px)";

export default function Team() {
  const [lead, ...rest] = team;
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Team", href: "/team" }]}
        eyebrow="Meet the team"
        title={<>Partner-led. <span className="text-brand-gold">Expert-driven.</span></>}
        intro="Our partners and branch heads bring years of hands-on experience in audit, tax, litigation and advisory, and own every engagement end-to-end. Serving clients since 2014."
        image="/images/office/office-3.jpeg"
      />

      {team.length === 0 ? (
        <section className="container-x section">
          <p className="max-w-prose text-lg">Our work is partner-led: a chartered accountant reviews every important filing before it is submitted. To speak with a partner about your requirement, use the contact page and we will arrange a call.</p>
        </section>
      ) : (
        <>
          {/* Founding partner spotlight */}
          <section aria-labelledby="lead-title" className="section bg-white">
            <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <ScrollReveal className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-3 -z-10 rounded-[2rem] border-2 border-dashed border-brand-gold/40" aria-hidden="true" />
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-linear-to-b from-brand-blue/40 via-brand-navy to-brand-navy">
                  <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: ledgerLines }} />
                  <Image src={lead.photo} alt={lead.name} fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover object-top" />
                </div>
                {lead.years && (
                  <div className="absolute -right-4 bottom-10 flex h-24 w-24 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-gold bg-brand-navy text-brand-gold shadow-xl">
                    <span className="font-display text-3xl font-bold leading-none">{lead.years}</span>
                    <span className="mt-1 text-[10px] font-semibold tracking-wide">years</span>
                  </div>
                )}
              </ScrollReveal>

              <ScrollReveal>
                <div className="section-label section-label-blue mb-4 w-fit">{lead.role}</div>
                <h2 id="lead-title" className="font-display text-3xl font-bold leading-tight md:text-4xl">{lead.name}</h2>
                <p className="mt-2 text-sm font-medium text-brand-gold-dark">{lead.credentials.join(" · ")}</p>
                <div className="divider-gold mt-5" />
                <p className="mt-5 leading-relaxed text-brand-muted">
                  {lead.years} years of practice in {lead.focus.slice(0, 3).join(", ").toLowerCase()} and more,
                  with a partner&apos;s review on every engagement.
                </p>
                <h3 className="mt-7 text-sm font-semibold text-brand-navy">Areas of focus</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {lead.focus.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />{f}</li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary mt-8">Speak with a partner <ArrowRight size={16} aria-hidden="true" /></Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Rest of the team: arched portrait cards like the homepage slider */}
          {rest.length > 0 && (
            <section aria-labelledby="team-title" className="section relative overflow-hidden bg-brand-navy">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-[110px]" />
                <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]" />
              </div>
              <div className="container-x relative">
                <SectionHeading id="team-title" dark label="Partners & branch heads" title="The people behind your filings" center />
                <ScrollReveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {rest.map((p) => (
                    <article key={p.slug} className="group">
                      <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-linear-to-b from-brand-blue/40 via-brand-navy to-brand-navy ring-1 ring-white/10 transition duration-500 group-hover:ring-2 group-hover:ring-brand-gold">
                        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: ledgerLines }} />
                        <Image src={p.photo} alt={p.name} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover object-top grayscale-[35%] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none" />
                        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-brand-navy via-brand-navy/75 to-transparent" />
                        {p.years && (
                          <div aria-hidden="true" className="absolute right-4 top-[46%] flex h-16 w-16 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-gold/80 bg-brand-navy/80 text-brand-gold backdrop-blur-sm transition-transform duration-500 group-hover:rotate-0">
                            <span className="font-display text-xl font-bold leading-none">{p.years}</span>
                            <span className="mt-0.5 text-[9px] font-semibold tracking-wide">years</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="font-display text-lg font-semibold leading-tight text-white">{p.name}</h3>
                          <p className="mt-1 text-xs font-medium text-brand-gold">{p.role}</p>
                          <p className="mt-2 text-[11px] text-white/60">{p.credentials.join(" · ")}</p>
                        </div>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.focus.map((f) => (
                          <li key={f} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">{f}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </ScrollReveal>
              </div>
            </section>
          )}
        </>
      )}

      <StatsBand />
      <WhyChoose className="bg-brand-mist" title="Why clients work with our partners" />
      <ProcessSteps />

      {/* Careers teaser */}
      <section className="bg-brand-mist py-14">
        <div className="container-x flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Want to join the team?</h2>
            <p className="mt-2 text-brand-muted">We hire articled assistants, accountants and tax &amp; audit professionals.</p>
          </div>
          <Link href="/careers" className="btn btn-primary">See careers <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
