import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { team } from "@/data/team";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "Our Team – Chartered Accountants",
  description:
    "Meet the chartered accountants and professionals at PHMG & Associates who review and handle your tax, audit, GST and compliance work. Contact us today.",
  path: "/team",
  noindex: team.length === 0,
});

export default function Team() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Team", href: "/team" }]}
        title="Our Team"
        intro="Partner-led. Expert-driven. Since 2014."
      />
      <section className="container-x section">
        {team.length === 0 ? (
          <p className="max-w-prose text-lg">Our work is partner-led: a chartered accountant reviews every important filing before it is submitted. To speak with a partner about your requirement, use the contact page and we will arrange a call.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <article key={p.slug} className="card overflow-hidden">
                <div className="relative aspect-square bg-brand-mist">
                  <Image src={p.photo} alt={p.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-top" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="text-sm font-medium text-brand-gold-dark">{p.role}</p>
                  <p className="text-sm text-brand-muted">{p.credentials.join(", ")} · {p.years} yrs experience</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{p.focus.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <CTABand />
    </>
  );
}
