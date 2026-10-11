import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Mail, Gavel, GraduationCap, Languages, BadgeCheck } from "lucide-react";
import { team, getMember, getProfile } from "@/data/team";
import { getOffice } from "@/data/firm";
import { cityByOffice } from "@/data/cities";
import { publishedServices, serviceUrl } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";

// A page per partner. Everything beyond name, role, credentials, years and focus comes from
// `profiles` in team.js and is empty until a partner supplies it, so each block below renders
// only when there is something real to show. Nothing here is invented.
export const dynamicParams = false;
export const generateStaticParams = () => team.map((t) => ({ slug: t.slug }));

/**
 * Builds a description that lands inside check-seo's 120-158 window without truncating mid-word.
 * Starts with the fullest version and drops one focus area at a time until it fits; if the
 * shortest version is still under 120 it adds the years in practice, which every member has.
 */
function describe(p) {
  const creds = p.credentials?.length ? ` (${p.credentials.join(", ")})` : "";
  const head = `${p.name}${creds}, ${p.role.toLowerCase()} at PHMG & Associates, chartered accountants.`;
  for (let n = Math.min(3, p.focus.length); n >= 1; n--) {
    const d = `${head} Works in ${p.focus.slice(0, n).join(", ").toLowerCase()}.`;
    if (d.length <= 158) return d.length >= 120 ? d : `${d} ${p.years} years in practice.`;
  }
  return head;
}

export async function generateMetadata({ params }) {
  const p = getMember((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} – ${p.role}`,
    description: describe(p),
    path: `/team/${p.slug}`,
  });
}

const Fact = ({ icon: I, label, children }) => (
  <div className="flex items-start gap-3">
    <I size={17} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{label}</dt>
      <dd className="mt-0.5 text-sm text-brand-navy">{children}</dd>
    </div>
  </div>
);

export default async function PartnerPage({ params }) {
  const p = getMember((await params).slug);
  if (!p) notFound();
  const profile = getProfile(p.slug);
  const office = profile.office ? getOffice(profile.office) : null;
  const city = office ? cityByOffice(office.slug) : null;

  // Services related to this partner's focus areas, matched on the words in each focus line so
  // the list follows the data rather than a hand-kept mapping.
  const words = p.focus.join(" ").toLowerCase();
  const related = publishedServices
    .filter((s) => {
      const t = `${s.title} ${s.primaryKeyword}`.toLowerCase();
      return t.split(/\W+/).some((w) => w.length > 4 && words.includes(w));
    })
    .slice(0, 6);

  const others = team.filter((t) => t.slug !== p.slug);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...personSchema(p) }} />
      <PageHeader
        crumbs={[{ name: "Team", href: "/team" }, { name: p.name, href: `/team/${p.slug}` }]}
        eyebrow={p.role}
        title={p.name}
        intro={
          profile.bio?.length
            ? profile.bio[0]
            : `${p.credentials.join(", ")}. ${p.years} years in practice, working in ${p.focus.slice(0, 3).join(", ").toLowerCase()}.`
        }
        image="/images/office/office-3.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#enquiry" className="btn btn-gold">Send an enquiry <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/team" className="btn btn-ghost-light">All partners</Link>
        </div>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <article className="min-w-0">
            <div className="grid gap-8 sm:grid-cols-[13rem_1fr] sm:gap-10">
              <div>
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-navy ring-1 ring-brand-line">
                  <Image src={p.photo} alt={p.name} fill sizes="208px" className="object-cover object-top" />
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold">About {p.name.replace(/^CA\s+/, "")}</h2>
                <div className="divider-gold mt-4" />

                {profile.bio?.length > 0 ? (
                  <div className="mt-5 space-y-4 leading-relaxed text-brand-ink">
                    {profile.bio.map((para) => <p key={para}>{para}</p>)}
                  </div>
                ) : (
                  <p className="mt-5 leading-relaxed text-brand-ink">
                    {p.name} is {/^[aeiou]/i.test(p.role) ? "an" : "a"} {p.role.toLowerCase()} at PHMG &amp; Associates,
                    a firm of chartered accountants established in 2014. {p.credentials.join(", ")}.
                    {p.years ? ` ${p.years} years in practice.` : ""} The areas of work below are those
                    {p.name.replace(/^CA\s+/, "")} handles day to day.
                  </p>
                )}

                <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Fact icon={BadgeCheck} label="Qualifications">{p.credentials.join(" · ")}</Fact>
                  {p.years && <Fact icon={Check} label="In practice">{p.years} years</Fact>}
                  {profile.icaiMembership && (
                    <Fact icon={BadgeCheck} label="ICAI membership">{profile.icaiMembership}</Fact>
                  )}
                  {office && (
                    <Fact icon={MapPin} label="Based at">
                      {city ? <Link href={`/ca-in-${city.slug}`} className="underline">{office.city}</Link> : office.city}
                    </Fact>
                  )}
                  {profile.languages?.length > 0 && (
                    <Fact icon={Languages} label="Languages">{profile.languages.join(", ")}</Fact>
                  )}
                  {profile.email && (
                    <Fact icon={Mail} label="Email">
                      <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>
                    </Fact>
                  )}
                </dl>
              </div>
            </div>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">Areas of work</h2>
              <div className="divider-gold mt-4" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.focus.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-xl border border-brand-line bg-brand-mist p-4 text-sm">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {profile.education?.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold">Education</h2>
                <div className="divider-gold mt-4" />
                <ul className="mt-5 space-y-2">
                  {profile.education.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-sm">
                      <GraduationCap size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />{e}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {profile.appearsBefore?.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold">Appears before</h2>
                <div className="divider-gold mt-4" />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {profile.appearsBefore.map((f) => (
                    <li key={f} className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1.5 text-sm">
                      <Gavel size={14} className="text-brand-gold" aria-hidden="true" />{f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-14">
                <SectionHeading label="Related services" title={`Services in ${p.name.replace(/^CA\s+/, "")}'s areas`} />
                <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2">
                  {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </ScrollReveal>
              </section>
            )}
          </article>

          <div id="enquiry" className="scroll-mt-28">
            <div className="lg:sticky lg:top-28">
              <LeadCard id="partner-lead" title={`Send an enquiry to ${p.name}`} />
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="others-title" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="others-title" label="The team" title="Other partners and branch heads" />
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/team/${o.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-5 transition-colors hover:border-brand-gold"
                >
                  <div className="relative mx-auto aspect-square w-20 overflow-hidden rounded-full bg-brand-navy">
                    <Image src={o.photo} alt={o.name} fill sizes="80px" className="object-cover object-top" />
                  </div>
                  <h3 className="mt-4 text-center text-sm font-semibold text-brand-navy transition-colors group-hover:text-brand-blue">{o.name}</h3>
                  <p className="mt-1 text-center text-xs text-brand-gold-dark">{o.role}</p>
                  <p className="mt-2 text-center text-[11px] text-brand-muted">{o.credentials.join(" · ")}</p>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
