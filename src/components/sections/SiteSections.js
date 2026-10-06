import Link from "next/link";
import Image from "next/image";
import {
  Check, ChevronRight, ArrowRight, ShieldCheck, MapPin, Gavel, Search, Briefcase, Globe2, Cpu, UserCheck,
  MessageCircle, Sparkles, Zap, Target, Phone, Rocket, Store, LineChart, HeartHandshake, Laptop, Building2,
} from "lucide-react";
import whoWeServeImage from "../../../public/who-we-serve.jpg";
import { firm, offices, phoneHref } from "@/data/firm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";

// Homepage sections, shared so inner pages repeat the same visual language.
// Each takes `className` for its background so pages can keep white / mist alternating.

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const sectors = [
  "Manufacturing & Infrastructure", "Healthcare & Pharmaceuticals", "Banking & Financial Services",
  "IT Companies & Gov Entities", "FMCG, Real Estate & Textiles", "Eco-Recycling & Chemicals",
];

// Named in the "Few Esteemed Clients" page of PHMG_Profile_Updated.pdf.
const clients = [
  "State Bank of India", "Bank of Baroda", "Bank of India", "J&K Bank", "Crompton", "Expeditors", "Allied", "Likhitha",
  "Ryan Clinic", "Oasis Grandstand", "MPS", "Atlantic Water World", "Greenfield Public School", "Vikas", "CAIT", "Blue Bell Travel Experts",
];

const why = [
  { icon: Gavel, title: "Litigation focus", text: "Representation before ITAT, CIT(A), GST Tribunals and High Courts in high-stakes tax matters.", accent: "text-brand-blue" },
  { icon: Search, title: "Search & survey specialists", text: "Immediate expert response during IT and GST search and survey, available 24/7.", accent: "text-brand-teal" },
  { icon: Briefcase, title: "CFO advisory", text: "Virtual CFO services: financial controls, board reporting and compliance readiness.", accent: "text-brand-gold" },
  { icon: Globe2, title: "Multi-state compliance", text: "Compliance across Delhi, UP, Maharashtra and Punjab with local teams.", accent: "text-blue-400" },
  { icon: Cpu, title: "Technology driven", text: "Digitised workflows, real-time dashboards and paperless audit processes.", accent: "text-brand-teal" },
  { icon: UserCheck, title: "Partner-led delivery", text: "A Partner owns every engagement end to end. Critical work is never left to juniors.", accent: "text-brand-gold" },
];

// href points at the closest existing service category.
const serviceGroups = [
  { title: "Business Growth", href: "/services/audit-assurance", items: ["Statutory Audits", "Tax Audits", "IFRS & Ind AS Compliances", "Compliance Certificates"] },
  { title: "Governance & Risk", href: "/services/audit-assurance", items: ["Internal Audit", "Business Risk Consulting", "SOP Drafting & Revamping", "IT & Finance Control Testing"] },
  { title: "Litigation", href: "/services/income-tax", items: ["Direct Tax Litigation", "GST Litigation & Advisory", "Assessments & Appeals", "Search & Raid Representation"] },
  { title: "Finance Transformation", href: "/services/accounting-bookkeeping", items: ["Virtual CFO Services", "Accounting Automation", "Business Process Reviews", "Capability Gap Assessment"] },
  { title: "Transaction Advisory", href: "/services/business-advisory", items: ["Transfer Pricing", "Due Diligence", "Asset & Inventory Verification", "Transaction Structuring"] },
  { title: "GST & Indirect Tax", href: "/services/gst", items: ["GST Advisory & Registration", "Periodic Returns & Reconciliation", "GST Certification", "Gratuity/ESI/EPF Trust Audits"] },
];

const personas = [
  { icon: Rocket, title: "Startup founder", text: "Register your company, set up GST and keep compliance on track.", href: "/services/business-registration/private-limited-company-registration", iconColor: "text-blue-600" },
  { icon: Store, title: "Business owner", text: "GST returns, bookkeeping, audit and ROC filings in one place.", href: "/services/gst/gst-return-filing", iconColor: "text-amber-600" },
  { icon: Briefcase, title: "Salaried or professional", text: "File your ITR correctly and choose the better tax regime.", href: "/services/income-tax/itr-filing", iconColor: "text-teal-600" },
  { icon: LineChart, title: "Trader or investor", text: "Capital gains and trading income reported the right way.", href: "/services/income-tax", iconColor: "text-purple-600" },
  { icon: Globe2, title: "NRI or overseas Indian", text: "Tax filing and compliance for income and assets in India.", href: "/services/international-tax-fema", iconColor: "text-green-600" },
  { icon: HeartHandshake, title: "NGO or trust", text: "Registration, exemptions and annual compliance.", href: "/services/ngo-trust", iconColor: "text-rose-600" },
  { icon: Laptop, title: "Freelancer or consultant", text: "Advance tax, presumptive taxation and clean invoicing for your professional income.", href: "/services/income-tax", iconColor: "text-indigo-600" },
  { icon: Building2, title: "Property owner", text: "Rental income, property sale gains and TDS handled without surprises.", href: "/services/income-tax", iconColor: "text-orange-600" },
];

const toolGradients = [
  "from-blue-600 via-blue-700 to-indigo-800",
  "from-amber-500 via-orange-600 to-orange-700",
  "from-teal-500 via-teal-600 to-cyan-700",
];

const defaultSteps = [
  { title: "Free consultation", text: "Tell us what you need. We listen and explain your options." },
  { title: "Proposal & documents", text: "You get a clear scope, fee and a document checklist." },
  { title: "We execute", text: "Our team prepares and files, with partner review at every step." },
  { title: "Proof & support", text: "You receive filing proof, acknowledgement and ongoing support." },
];
const stepIcons = [MessageCircle, Sparkles, Zap, Target];
const stepCols = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 5: "lg:grid-cols-5", 6: "lg:grid-cols-3" };

const stats = [
  [firm.stats.yearsExperience, "Years of experience"],
  [firm.stats.assignments, "Assignments handled"],
  [firm.stats.clientsServed, "Clients served"],
  [firm.stats.offices, "Office locations"],
  [firm.stats.statesServed, "States covered"],
].filter(([v]) => v);

// Static class names so Tailwind can see them at build time.
const statCols = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" };

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export function ClientsStrip({ className = "bg-white" }) {
  return (
    <section aria-labelledby="clients-title" className={`py-14 md:py-16 ${className}`}>
      <div className="container-x text-center">
        <h2 id="clients-title" className="text-sm font-semibold text-brand-muted">
          Trusted by banks, PSUs and businesses across sectors
        </h2>
        <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
          {clients.map((c) => (
            <li key={c} className="rounded-full border border-brand-line bg-brand-mist px-5 py-2 text-sm font-medium text-brand-navy">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutSplit({ className = "bg-brand-mist", cta = true, title = "A decade of trust. A future of growth." }) {
  return (
    <section aria-labelledby="about-title" className={`section ${className}`}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <div className="section-label section-label-blue mb-4 w-fit">Who we are</div>
          <h2 id="about-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">{title}</h2>
          <div className="divider-gold mt-5" />
          <p className="mt-5 leading-relaxed text-brand-muted">
            PHMG and Associates is empanelled with the Reserve Bank of India in Category-I and with the CAG of India,
            and handles bank statutory and concurrent audits. We serve corporate, banking, government, PSU and
            private sector clients across India and globally.
          </p>

          <h3 className="mt-8 text-sm font-semibold text-brand-gold-dark">Sectors we serve</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {sectors.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <ChevronRight size={14} className="mt-px shrink-0 text-brand-gold" aria-hidden="true" /> {s}
              </li>
            ))}
          </ul>

          {cta && (
            <Link href="/about" className="btn btn-primary mt-8">
              About our firm <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image src="/images/office/office-1.jpeg" alt="PHMG & Associates office, Noida" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg">
            <Image src="/images/office/office-3.jpeg" alt="PHMG & Associates team at work" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-brand-navy p-5 text-white">
            <ShieldCheck className="text-brand-gold" size={28} aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-semibold leading-snug">RBI Category-I &amp; CAG empanelled</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StatsBand() {
  if (!stats.length) return null;
  return (
    <section aria-label="Our numbers" className="bg-linear-to-r from-brand-navy via-brand-charcoal to-brand-navy">
      <ScrollReveal stagger className={`container-x grid grid-cols-2 gap-8 py-12 ${statCols[stats.length]}`}>
        {stats.map(([v, l]) => (
          <div key={l} className="text-center">
            <p className="font-display text-3xl font-bold gradient-text md:text-4xl">{v}</p>
            <p className="mt-px text-sm text-white/60">{l}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}

export function PracticeAreas({ className = "bg-brand-mist" }) {
  return (
    <section aria-labelledby="practice-title" className={`section ${className}`}>
      <div className="container-x">
        <SectionHeading
          id="practice-title"
          label="Practice areas"
          title="Grouped by your business challenge"
          intro="Specialist work for companies, banks and public bodies, led by partners who handle it every day."
        />
        <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 transition-colors hover:border-brand-gold focus-visible:border-brand-gold"
            >
              <h3 className="font-display text-xl font-semibold text-brand-navy">{g.title}</h3>
              <span className="mt-2 block h-0.5 w-8 bg-brand-gold transition-all duration-300 group-hover:w-14 motion-reduce:transition-none" aria-hidden="true" />
              <ul className="mt-4 space-y-2">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-muted">
                    <Check size={14} className="mt-px shrink-0 text-brand-gold" aria-hidden="true" /> {i}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-blue">
                See related services <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

export function WhyChoose({ className = "bg-brand-mist", title = "Built on integrity, driven by results" }) {
  return (
    <section aria-labelledby="why-title" className={`section ${className}`}>
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-start">
        {/* Sticky lives on a plain wrapper: the reveal's transform must not sit on the sticky element. */}
        <div className="lg:sticky lg:top-28">
          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Why PHMG</div>
            <h2 id="why-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">{title}</h2>
            <div className="divider-gold mt-5" />
            <p className="mt-5 leading-relaxed text-brand-muted">
              Deep technical expertise with personal attention, so your filings are handled right, your deadlines
              never slip, and your business keeps moving.
            </p>
            <Link href="/contact" className="btn btn-primary mt-7 w-fit">
              Talk to a CA <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(({ icon: I, title, text, accent }) => (
            <div key={title} className="card h-full bg-white p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mist ${accent}`}>
                <I size={20} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{text}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

// steps: [{ title, text, time? }]
export function ProcessSteps({ className = "bg-white", label = "How we work", title = "From first call to filing proof", intro, steps = defaultSteps }) {
  return (
    <section aria-labelledby="process-title" className={`section ${className}`}>
      <div className="container-x">
        <SectionHeading id="process-title" label={label} title={title} intro={intro} />
        <div className="relative">
          {/* Connector line sits outside the staggered grid so it isn't animated as a step. */}
          {steps.length <= 5 && <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-brand-line lg:block" />}
          <ScrollReveal stagger role="list" className={`relative grid gap-8 md:grid-cols-2 lg:gap-6 ${stepCols[steps.length] || "lg:grid-cols-4"}`}>
            {steps.map(({ title, text, time }, i) => {
              const I = stepIcons[i % stepIcons.length];
              return (
                <div key={title} role="listitem">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-gold bg-white text-brand-navy">
                    <I size={20} aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-display text-sm font-semibold tabular-nums text-brand-gold-dark">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-px font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{text}</p>
                  {time && <p className="mt-2 text-xs font-medium text-brand-blue">{time}</p>}
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function OfficesGrid({ className = "bg-white" }) {
  if (!offices.length) return null;
  return (
    <section aria-labelledby="offices-title" className={`section ${className}`}>
      <div className="container-x">
        <SectionHeading
          id="offices-title"
          label="Our office network"
          title={`${offices.length} offices, pan-India reach`}
          intro={firm.stats.professionals ? `${firm.stats.professionals} professionals: chartered accountants, company secretaries, semi-qualified CAs and specialists.` : undefined}
          action={firm.phone && (
            <a href={phoneHref()} className="btn btn-secondary"><Phone size={15} aria-hidden="true" /> {firm.phone}</a>
          )}
        />
        <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o) => (
            <div key={o.city} className={`card h-full p-5 ${o.head ? "border-brand-gold" : ""}`}>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="shrink-0 text-brand-gold" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">{o.city}</h3>
                {o.head && (
                  <span className="ml-auto rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold-dark">Head office</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{o.address}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

export function WhoWeServe({ className = "bg-white" }) {
  return (
    <section aria-labelledby="serve-title" className={`section ${className}`}>
      <div className="container-x">
        <div className="mb-10 grid items-center gap-8 md:mb-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Who we serve</div>
            <h2 id="serve-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Whoever you are, we&rsquo;ve got you covered
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-brand-muted">
              Pick the one closest to you and see how a qualified chartered accountant can help. From salaried
              individuals to growing businesses, we handle tax, compliance and advisory so you can focus on what
              matters.
            </p>
            <Link href="/book-consultation" className="btn btn-primary mt-7">
              Book a free consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="relative h-56 overflow-hidden rounded-2xl shadow-lg sm:h-64 lg:h-80">
            <Image src={whoWeServeImage} alt="Chartered accountant consulting a client" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map(({ icon: I, title, text, href, iconColor }) => (
            <Link
              key={title}
              href={href}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-brand-line bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <I size={24} strokeWidth={1.6} className={`shrink-0 ${iconColor}`} aria-hidden="true" />
                <h3 className="text-sm font-semibold leading-tight transition-colors group-hover:text-brand-blue">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gradient calculator card, as on the homepage.
export function ToolCard({ tool: t, index = 0 }) {
  return (
    <Link
      href={`/tools/${t.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-br ${toolGradients[index % toolGradients.length]} p-6 text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" aria-hidden="true" />
      <Zap size={22} className="relative mb-4 opacity-70" aria-hidden="true" />
      <h3 className="relative text-lg font-bold text-white">{t.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed opacity-80">{t.short}</p>
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
        Open tool <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

// Two columns: heading + "still have a question" card on the left, accordion on the right.
export function FAQSection({ faqs, className = "bg-brand-mist", title = "Frequently asked questions", intro = "Quick answers to the questions we hear most often.", ctaHref = "/contact" }) {
  if (!faqs?.length) return null;
  return (
    <section aria-labelledby="faq-title" className={`section ${className}`}>
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" label="FAQ" title={title} intro={intro} />
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/15 blur-2xl" />
              <p className="relative font-display text-xl font-semibold text-white">Still have a question?</p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">A chartered accountant will look at your case and reply within one business day.</p>
              <Link href={ctaHref} className="btn btn-gold relative mt-5">Ask a CA <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
        <ScrollReveal><FAQAccordion faqs={faqs} /></ScrollReveal>
      </div>
    </section>
  );
}
