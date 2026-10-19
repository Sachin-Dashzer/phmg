import Link from "next/link";
import { ArrowRight, MapPin, Clock, GraduationCap, Briefcase, CalendarDays } from "lucide-react";
import { jobs, whyJoin } from "@/data/jobs";
import { offices } from "@/data/firm";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { ProcessSteps } from "@/components/sections/SiteSections";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Work with PHMG & Associates: current openings, articleship and applications for accountants, auditors and tax professionals across our four offices.",
  path: "/careers",
});

const officeName = (slug) => offices.find((o) => o.slug === slug)?.city || slug;

const steps = [
  { title: "Apply", text: "Send your details and a link to your CV through the form on this page." },
  { title: "First conversation", text: "A short call about your experience and what you would like to work on." },
  { title: "Technical discussion", text: "A discussion with a partner on the areas relevant to the role." },
  { title: "Offer", text: "Role, office, responsibilities and terms confirmed in writing." },
];

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function Careers() {
  const roles = jobs.map((j) => j.title);
  const locations = offices.map((o) => o.city);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Careers", href: "/careers" }]}
        eyebrow="Careers"
        title="Work with us"
        intro="We are a firm of chartered accountants with offices in Noida, Delhi, Ludhiana and Meerut, working in audit, tax, litigation and advisory. If you care about accuracy and want a partner to review and explain your work, we would like to hear from you."
        image="/images/office/office-8.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#apply" className="btn btn-gold">Apply <ArrowRight size={16} aria-hidden="true" /></Link>
          {jobs.length > 0 && <Link href="#openings" className="btn btn-ghost-light">Current openings</Link>}
        </div>
      </PageHeader>

      <section aria-labelledby="openings-title" id="openings" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHeading
            id="openings-title"
            label={jobs.length ? "Open roles" : "Openings"}
            title={jobs.length ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}` : "No advertised openings at the moment"}
            intro={
              jobs.length
                ? "Each role says which offices it is open in and what is expected."
                : "We do not have an advertised vacancy right now, but we read every application that comes in and keep profiles on file for when a role opens. Articleship enquiries are welcome at any time."
            }
          />

          {jobs.length > 0 && (
            <ScrollReveal stagger className="grid gap-5 lg:grid-cols-2">
              {jobs.map((j) => (
                <article key={j.slug} className="flex h-full flex-col rounded-2xl border border-brand-line bg-brand-mist p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-brand-navy">{j.title}</h3>
                    {j.type && (
                      <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold text-brand-gold-dark">{j.type}</span>
                    )}
                  </div>

                  <dl className="mt-4 grid gap-2 text-sm text-brand-muted sm:grid-cols-2">
                    {j.locations?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="shrink-0 text-brand-gold" aria-hidden="true" />
                        <dt className="sr-only">Offices</dt>
                        <dd>{j.locations.map(officeName).join(", ")}</dd>
                      </div>
                    )}
                    {j.experience && (
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="shrink-0 text-brand-gold" aria-hidden="true" />
                        <dt className="sr-only">Experience</dt>
                        <dd>{j.experience}</dd>
                      </div>
                    )}
                    {j.qualification && (
                      <div className="flex items-center gap-2">
                        <GraduationCap size={15} className="shrink-0 text-brand-gold" aria-hidden="true" />
                        <dt className="sr-only">Qualification</dt>
                        <dd>{j.qualification}</dd>
                      </div>
                    )}
                    {j.closesAt && (
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} className="shrink-0 text-brand-gold" aria-hidden="true" />
                        <dt className="sr-only">Applications close</dt>
                        <dd>Closes {fmt(j.closesAt)}</dd>
                      </div>
                    )}
                  </dl>

                  {j.about && <p className="mt-4 text-sm leading-relaxed text-brand-ink">{j.about}</p>}

                  {j.responsibilities?.length > 0 && (
                    <>
                      <h4 className="mt-5 text-sm font-semibold text-brand-navy">What you would do</h4>
                      <ul className="mt-2 space-y-1.5">
                        {j.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-brand-muted">
                            <Briefcase size={13} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />{r}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {j.requirements?.length > 0 && (
                    <>
                      <h4 className="mt-5 text-sm font-semibold text-brand-navy">What we look for</h4>
                      <ul className="mt-2 space-y-1.5">
                        {j.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-brand-muted">
                            <Briefcase size={13} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />{r}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    {j.postedAt && <span className="text-xs text-brand-muted">Posted {fmt(j.postedAt)}</span>}
                    <Link href="#apply" className="btn btn-primary">Apply for this role <ArrowRight size={15} aria-hidden="true" /></Link>
                  </div>
                </article>
              ))}
            </ScrollReveal>
          )}
        </div>
      </section>

      <section aria-labelledby="why-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading id="why-title" label="What the work is like" title="What you would be joining" />
          <ScrollReveal stagger className="grid gap-5 md:grid-cols-2">
            {whyJoin.map((w) => (
              <section key={w.h} className="h-full rounded-2xl border border-brand-line bg-white p-6">
                <h3 className="text-lg font-semibold text-brand-navy">{w.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{w.p}</p>
              </section>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ProcessSteps className="bg-white" label="How hiring works" title="From application to offer" steps={steps} />

      <section aria-labelledby="apply-title" id="apply" className="section scroll-mt-24 bg-brand-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_30rem] lg:gap-14">
          <div>
            <SectionHeading id="apply-title" label="Apply" title="Send us your details" />
            <div className="space-y-4 leading-relaxed text-brand-muted">
              <p>
                Applications go straight to the team by email. There is no account to create and no
                portal to log in to.
              </p>
              <p>
                Link your CV from Google Drive, Dropbox or LinkedIn rather than attaching a file —
                please make sure the link is readable by anyone who has it, or we will not be able
                to open it.
              </p>
              <p>
                If you are applying for articleship, say so in the message and tell us which exam
                stage you have cleared and when you are available to start.
              </p>
              <p>
                We read every application. If there is nothing suitable now, we keep your details
                on file and come back to you when a role opens.
              </p>
            </div>
          </div>
          <ApplicationForm roles={roles} locations={locations} id="careers-apply" />
        </div>
      </section>

      <RelatedLinks url="/careers" />
      <CTABand
        title="Questions about a role?"
        text="If you would like to ask about the work, the offices or articleship before applying, send us a note."
        cta="Contact us"
      />
    </>
  );
}
