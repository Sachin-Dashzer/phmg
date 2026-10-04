import Link from "next/link";
import Image from "next/image";
import {
  Check, Rocket, Store, Briefcase, LineChart, Globe2, HeartHandshake,
  UserCheck, Laptop, Building2, Gavel, Search, Cpu, MapPin,
  Star, Zap, Target, ShieldCheck, ArrowRight, ChevronRight,
  MessageCircle, Sparkles,
} from "lucide-react";
import { TeamSection, SubscribeSection } from "@/components/sections/TeamSection";
import whoWeServeImage from "../../public/who-we-serve.jpg";
import { firm, offices, phoneHref, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import { servicesIn } from "@/data/services";
import { faqs } from "@/data/faqs";
import DueDateLedger from "@/components/sections/DueDateLedger";
import HeroEnquiry from "@/components/sections/HeroEnquiry";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";
import InsightCard from "@/components/ui/InsightCard";
import { articles } from "@/data/insights";
import { tools } from "@/data/tools";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

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

const steps = [
  { n: "01", title: "Free consultation", text: "Tell us what you need. We listen and explain your options.", icon: MessageCircle },
  { n: "02", title: "Proposal & documents", text: "You get a clear scope, fee and a document checklist.", icon: Sparkles },
  { n: "03", title: "We execute", text: "Our team prepares and files, with partner review at every step.", icon: Zap },
  { n: "04", title: "Proof & support", text: "You receive filing proof, acknowledgement and ongoing support.", icon: Target },
];

const toolGradients = [
  "from-blue-600 via-blue-700 to-indigo-800",
  "from-amber-500 via-orange-600 to-orange-700",
  "from-teal-500 via-teal-600 to-cyan-700",
];

const stats = [
  [firm.stats.yearsExperience, "Years of experience"],
  [firm.stats.assignments, "Assignments handled"],
  [firm.stats.clientsServed, "Clients served"],
  [firm.stats.offices, "Office locations"],
  [firm.stats.statesServed, "States covered"],
].filter(([v]) => v);

// Static class names so Tailwind can see them at build time.
const statCols = {
  1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5",
};

const dots = "radial-gradient(rgb(15 23 42 / 0.07) 1px, transparent 1px)";
const fade = "linear-gradient(to bottom, black, transparent 75%)";

const heroPoints = firm.empanelments?.length
  ? firm.empanelments
  : ["Fee agreed in writing before work starts", "Documents shared through a secure link", "Online service across India"];

/* ------------------------------------------------------------------ */
/* Shared section heading                                              */
/* One pattern for every section: label, h2, optional intro, optional  */
/* action on the right. Keeps sizes and spacing identical page-wide.   */
/* ------------------------------------------------------------------ */

function SectionHeading({ label, title, intro, action, center = false, id }) {
  return (
    <ScrollReveal
      className={`mb-10 flex flex-col gap-6 md:mb-12 ${
        center ? "items-center text-center" : action ? "md:flex-row md:items-end md:justify-between" : ""
      }`}
    >
      <div className={`max-w-2xl ${center ? "mx-auto" : ""}`}>
        <div className="section-label section-label-blue mb-4 w-fit">{label}</div>
        <h2 id={id} className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-3 leading-relaxed text-brand-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </ScrollReveal>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* Order: Hero → trust → about → numbers → services → audience →       */
/* why us → process → team → proof → reach → resources → FAQ → CTA     */
/* Backgrounds alternate white / mist so no two neighbours match.      */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* -- 1. HERO (no scroll animation above the fold) ---- */}
      <section aria-labelledby="hero-title" className="hero-ledger-bg relative bg-brand-navy pb-24 pt-12 lg:pb-28 lg:pt-16">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            {(firm.foundedYear || firm.strapline) && (
              <p className="mb-4 text-sm font-semibold text-brand-gold">
                {[firm.foundedYear && `Est. ${firm.foundedYear}`, firm.strapline].filter(Boolean).join(" | ")}
              </p>
            )}
            <h1
              id="hero-title"
              className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl xl:text-5xl"
            >
              Strategic advisors to growing businesses
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              PHMG &amp; Associates is a multi-location chartered accountancy firm, RBI Category-I and CAG empanelled,
              handling tax, GST, audit and company compliance for corporate, banking, government, PSU and private
              sector clients across India.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/book-consultation" className="btn btn-gold w-full px-7 py-3.5 text-base sm:w-auto">
                Book a free consultation <ArrowRight size={18} aria-hidden="true" />
              </Link>
              {firm.whatsapp ? (
                <a href={waHref()} rel="noopener" className="btn btn-whatsapp w-full px-6 py-3.5 text-base sm:w-auto">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp us
                </a>
              ) : (
                <Link href="/services" className="btn btn-ghost-light w-full px-6 py-3.5 text-base sm:w-auto">
                  Browse services
                </Link>
              )}
            </div>
            {firm.phone && (
              <p className="mt-4 text-white/75">
                Prefer to talk now?{" "}
                <a href={phoneHref()} className="font-semibold text-white underline underline-offset-4">{firm.phone}</a>
              </p>
            )}

            <ul className="mt-10 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/85 sm:grid-cols-3 sm:gap-6">
              {heroPoints.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <DueDateLedger />
        </div>
      </section>

      <div className="container-x relative z-10 -mt-14">
        <HeroEnquiry />
      </div>

      {/* -- 2. CLIENTS: trust strip right under the hero ----- */}
      {/* Sits near the fold, so it is not animated (avoids a blank flash on load). */}
      <section aria-labelledby="clients-title" className="bg-white pb-16 pt-16 md:pb-20">
        <div className="container-x text-center">
          <h2 id="clients-title" className="text-sm font-semibold text-brand-muted">
            Trusted by banks, PSUs and businesses across sectors
          </h2>
          <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <li key={c} className="rounded-full border border-brand-line bg-brand-mist px-5 py-2 text-sm font-medium text-brand-navy">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -- 3. WHO WE ARE ------------------------------------ */}
      <section aria-labelledby="about-title" className="section bg-brand-mist">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="section-label section-label-blue mb-4 w-fit">Who we are</div>
            <h2 id="about-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              A decade of trust. A future of growth.
            </h2>
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
                  <ChevronRight size={14} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn btn-primary mt-8">
              About our firm <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-video overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/office/office-1.jpeg" alt="PHMG & Associates office, Noida" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/office/office-3.jpeg" alt="PHMG & Associates team at work" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-brand-navy p-5 text-white">
              <ShieldCheck className="text-brand-gold" size={28} aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-semibold leading-snug">RBI Category-I &amp; CAG empanelled</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* -- 4. STATS (only renders when data exists) --------- */}
      {stats.length > 0 && (
        <section aria-label="Our numbers" className="bg-linear-to-r from-brand-navy via-brand-charcoal to-brand-navy">
          <ScrollReveal stagger className={`container-x grid grid-cols-2 gap-8 py-12 ${statCols[stats.length]}`}>
            {stats.map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="font-display text-3xl font-bold gradient-text md:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-white/60">{l}</p>
              </div>
            ))}
          </ScrollReveal>
        </section>
      )}

      {/* -- 5. SERVICES (category cards) --------------------- */}
      <section aria-labelledby="services-title" className="section relative overflow-clip bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: dots, backgroundSize: "22px 22px", maskImage: fade, WebkitMaskImage: fade }}
          />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-[90px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/10 blur-[90px]" />
        </div>

        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky lives on a plain wrapper: the reveal's transform must not sit on the sticky element. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ScrollReveal>
                <div className="section-label section-label-blue mb-4 w-fit">Our services</div>
                <h2 id="services-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
                  Trusted expertise for your financial needs
                </h2>
                <p className="mt-4 leading-relaxed text-brand-muted">
                  From accounting and taxation to audits and business advisory, we provide reliable chartered
                  accountancy services tailored to your needs, with practical guidance to help you stay compliant and
                  grow with confidence.
                </p>
                <Link href="/services" className="btn btn-primary mt-7">
                  View all services <ArrowRight size={16} aria-hidden="true" />
                </Link>

                <div className="mt-10 hidden rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 lg:block">
                  <p className="text-sm font-semibold text-brand-navy">Not sure what you need?</p>
                  <p className="mt-1 text-sm text-brand-muted">
                    Tell us about your situation and we&apos;ll point you to the right service.
                  </p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline">
                    Talk to a CA <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {categories.map((c) => {
              const list = servicesIn(c.slug);
              return (
                <article
                  key={c.slug}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 focus-within:border-brand-blue/40 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/10 sm:last:odd:col-span-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-gold to-brand-blue transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-gold">
                    <Icon name={c.icon} size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-brand-navy">
                    <Link
                      href={`/services/${c.slug}`}
                      className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-blue focus-visible:outline-none"
                    >
                      {c.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.short}</p>

                  {list.length > 0 && (
                    <ul className="relative z-10 mt-5 space-y-1.5 border-t border-neutral-200/70 pt-4">
                      {list.slice(0, 3).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.category}/${s.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-blue"
                          >
                            <ChevronRight size={14} className="shrink-0 text-brand-gold" aria-hidden="true" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-xs text-neutral-400">
                      {list.length > 0 ? `${list.length} ${list.length === 1 ? "service" : "services"}` : ""}
                    </span>
                    <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* -- 6. PRACTICE AREAS -------------------------------- */}
      <section aria-labelledby="practice-title" className="section bg-brand-mist">
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
                      <Check size={14} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" /> {i}
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

      {/* -- 7. WHO WE SERVE ---------------------------------- */}
      <section aria-labelledby="serve-title" className="section bg-white">
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
              <Image
                src={whoWeServeImage}
                alt="Chartered accountant consulting a client"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </ScrollReveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map(({ icon: I, title, text, href, iconColor }) => (
              <Link
                key={title}
                href={href}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-brand-line bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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

      {/* -- 8. WHY PHMG -------------------------------------- */}
      {/* Was a reveal nested inside another reveal; now two siblings. */}
      <section aria-labelledby="why-title" className="section bg-brand-mist">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <ScrollReveal>
              <div className="section-label section-label-blue mb-4 w-fit">Why PHMG</div>
              <h2 id="why-title" className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
                Built on integrity, driven by results
              </h2>
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

      {/* -- 9. HOW WE WORK ----------------------------------- */}
      <section aria-labelledby="process-title" className="section bg-white">
        <div className="container-x">
          <SectionHeading id="process-title" label="How we work" title="From first call to filing proof" />

          <div className="relative">
            {/* Connector line sits outside the staggered grid so it isn't animated as a step. */}
            <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-brand-line lg:block" />
            <ScrollReveal stagger role="list" className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map(({ n, title, text, icon: I }) => (
                <div key={n} role="listitem">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-gold bg-white text-brand-navy">
                    <I size={20} aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-display text-sm font-semibold tabular-nums text-brand-gold-dark">Step {n}</p>
                  <h3 className="mt-1 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{text}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* -- 10. TEAM ----------------------------------------- */}
      <TeamSection />

      {/* -- 11. TESTIMONIALS --------------------------------- */}
      {firm.testimonials.length > 0 && (
        <section aria-labelledby="testimonials-title" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading id="testimonials-title" label="Client stories" title="What clients say" center />

            <ScrollReveal stagger className="grid gap-6 md:grid-cols-3">
              {firm.testimonials.map((t) => (
                <figure key={t.name} className="card flex h-full flex-col bg-white p-6">
                  <div className="mb-3 flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-gold text-brand-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="leading-relaxed text-brand-ink">&ldquo;{t.text}&rdquo;</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-brand-line pt-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-blue to-brand-teal text-xs font-bold text-white">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      {t.role && <p className="text-xs text-brand-muted">{t.role}</p>}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* -- 12. OFFICES -------------------------------------- */}
      {offices.length > 0 && (
        <section aria-labelledby="offices-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading
              id="offices-title"
              label="Our office network"
              title={`${offices.length} offices, pan-India reach`}
              intro={
                firm.stats.professionals
                  ? `${firm.stats.professionals} professionals: chartered accountants, company secretaries, semi-qualified CAs and specialists.`
                  : undefined
              }
            />

            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offices.map((o) => (
                <div key={o.city} className={`card h-full p-5 ${o.head ? "border-brand-gold" : ""}`}>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold">{o.city}</h3>
                    {o.head && (
                      <span className="ml-auto rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold-dark">
                        Head office
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{o.address}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* -- 13. FREE TOOLS ----------------------------------- */}
      {tools.length > 0 && (
        <section aria-labelledby="tools-title" className="section bg-brand-mist">
          <div className="container-x">
            <SectionHeading
              id="tools-title"
              label="Free resources"
              title="Free calculators & tools"
              intro="Use these tools free, no sign-up required."
              action={
                <Link href="/tools" className="btn btn-secondary">
                  All tools <ArrowRight size={15} aria-hidden="true" />
                </Link>
              }
            />

            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.slice(0, 3).map((t, i) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-br ${toolGradients[i % 3]} p-6 text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                >
                  <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" aria-hidden="true" />
                  <Zap size={22} className="relative mb-4 opacity-70" aria-hidden="true" />
                  <h3 className="relative text-lg font-bold">{t.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed opacity-80">{t.short}</p>
                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
                    Open tool <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* -- 14. LATEST INSIGHTS ------------------------------ */}
      {articles.length > 0 && (
        <section aria-labelledby="insights-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading
              id="insights-title"
              label="Knowledge hub"
              title="Latest insights"
              intro="Tax tips, compliance updates and guides from our CAs."
              action={
                <Link href="/insights" className="btn btn-secondary">
                  All insights <ArrowRight size={15} aria-hidden="true" />
                </Link>
              }
            />

            {articles.length >= 3 ? (
              <div className="grid gap-5 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
                <ScrollReveal>
                  <InsightCard a={articles[0]} featured />
                </ScrollReveal>
                <ScrollReveal stagger className="flex flex-col gap-5">
                  {articles.slice(1, 3).map((a) => <InsightCard key={a.slug} a={a} />)}
                </ScrollReveal>
              </div>
            ) : (
              <ScrollReveal stagger className="grid gap-5 md:grid-cols-3">
                {articles.map((a) => <InsightCard key={a.slug} a={a} />)}
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* -- 15. NEWSLETTER (follows the content it promotes) - */}
      <SubscribeSection />

      {/* -- 16. FAQ ------------------------------------------ */}
      <section aria-labelledby="faq-title" className="section bg-brand-mist">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              id="faq-title"
              label="FAQ"
              title="Frequently asked questions"
              intro="Quick answers to the questions we hear most often."
            />
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}