import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Users, Building2, TrendingUp, Mail, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StatsBand } from "@/components/sections/SiteSections";

// noindex until real openings exist (thin page otherwise).
export const metadata = buildMetadata({
  title: "Careers and Articleship",
  description: "Work with PHMG & Associates: articleship and hiring enquiries for accountants, auditors and tax professionals. Get in touch to share your profile.",
  path: "/careers",
  noindex: true,
});

const perks = [
  { I: GraduationCap, t: "Learn on real files", d: "Bank audits, GST litigation, tax appeals and advisory work from day one." },
  { I: Users, t: "Partner mentorship", d: "A chartered accountant reviews your work and explains the why behind it." },
  { I: Building2, t: "Five offices", d: "Opportunities in Noida, Delhi, Mumbai, Ludhiana and Meerut." },
  { I: TrendingUp, t: "Grow with the firm", d: "Take on more responsibility as you show care and accuracy." },
];
const roles = ["Articled assistants", "Accountants", "Tax professionals", "Audit professionals"];

export default function Careers() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Careers", href: "/careers" }]}
        eyebrow="Careers & articleship"
        title={<>Build your career with <span className="text-brand-gold">PHMG</span></>}
        intro="We are always interested in meeting capable people who care about accuracy and clients."
        image="/images/office/office-3.jpeg"
      >
        <Link href="#apply" className="btn btn-gold">How to apply <ArrowRight size={16} aria-hidden="true" /></Link>
      </PageHeader>

      <section aria-labelledby="why-work" className="section bg-white">
        <div className="container-x">
          <SectionHeading id="why-work" label="Why work with us" title="Careful work, clear communication" center />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ I, t, d }) => (
              <div key={t} className="card card-hover h-full p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><I size={22} aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{d}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <StatsBand />

      <section aria-label="Life at PHMG" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading label="Life at PHMG" title="Where you'll work" />
          <ScrollReveal className="grid gap-4 sm:grid-cols-3">
            {["office-1", "office-2", "office-3"].map((o, i) => (
              <div key={o} className={`relative overflow-hidden rounded-2xl shadow-lg ${i === 0 ? "aspect-4/3 sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-4/3"}`}>
                <Image src={`/images/office/${o}.jpeg`} alt="PHMG & Associates office" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="section scroll-mt-28 bg-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Who we look for</div>
            <h2 id="apply-title" className="font-display text-3xl font-bold md:text-4xl">Work with us</h2>
            <div className="divider-gold mt-5" />
            <p className="mt-5 leading-relaxed text-brand-muted">
              We look for people who enjoy careful work and clear communication. You will work on real files with a
              chartered accountant reviewing your work.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {roles.map((r) => <li key={r} className="rounded-full border border-brand-line bg-brand-mist px-4 py-2 text-sm font-medium text-brand-navy">{r}</li>)}
            </ul>
          </ScrollReveal>
          <ScrollReveal className="relative overflow-hidden rounded-2xl bg-brand-navy p-8 text-white">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/15 blur-3xl" />
            <Mail className="relative text-brand-gold" size={32} aria-hidden="true" />
            <h3 className="relative mt-4 font-display text-2xl font-semibold text-white">Share your profile</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-white/70">Mention the role you are interested in and attach your CV.</p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              {firm.email && <a href={`mailto:${firm.email}?subject=Career enquiry`} className="btn btn-gold">Email {firm.email}</a>}
              <Link href="/contact" className="btn btn-ghost-light">Contact page</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
