import Link from "next/link";
import {
  Check, Rocket, Store, Briefcase, LineChart, Globe2, HeartHandshake,
  UserCheck, CalendarClock, Laptop, Headset, Building2,
  Star, Zap, Target,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Lock,
} from "lucide-react";
import { TeamSection, SubscribeSection } from "@/components/sections/TeamSection";
import whoWeServeImage from "../../public/who-we-serve.jpg";
import { firm, phoneHref, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import { servicesIn } from "@/data/services";
import { faqs } from "@/data/faqs";
import { team } from "@/data/team";
import Image from "next/image";
import DueDateLedger from "@/components/sections/DueDateLedger";
import HeroEnquiry from "@/components/sections/HeroEnquiry";
import { CategoryCard } from "@/components/ui/ServiceCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";
import InsightCard from "@/components/ui/InsightCard";
import { articles } from "@/data/insights";
import { tools } from "@/data/tools";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icon";

const personas = [
  { icon: Rocket, title: "Startup founder", text: "Register your company, set up GST and keep compliance on track.", href: "/services/business-registration/private-limited-company-registration", color: "border-blue-500", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Store, title: "Business owner", text: "GST returns, bookkeeping, audit and ROC filings in one place.", href: "/services/gst/gst-return-filing", color: "border-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Briefcase, title: "Salaried or professional", text: "File your ITR correctly and choose the better tax regime.", href: "/services/income-tax/itr-filing", color: "border-teal-500", iconBg: "bg-teal-50", iconColor: "text-teal-600" },
  { icon: LineChart, title: "Trader or investor", text: "Capital gains and trading income reported the right way.", href: "/services/income-tax", color: "border-purple-500", iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  { icon: Globe2, title: "New Generation", text: "Tax filing and compliance for income and assets in India.", href: "/services/international-tax-fema", color: "border-green-500", iconBg: "bg-green-50", iconColor: "text-green-600" },
  { icon: HeartHandshake, title: "NGO or trust", text: "Registration, exemptions and annual compliance.", href: "/services/ngo-trust", color: "border-rose-500", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
  { icon: Laptop, title: "Freelancer or consultant", text: "Advance tax, presumptive taxation and clean invoicing for your professional income.", href: "/services/income-tax", color: "border-indigo-500", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { icon: Building2, title: "Property owner", text: "Rental income, property sale gains and TDS handled without surprises.", href: "/services/income-tax", color: "border-orange-500", iconBg: "bg-orange-50", iconColor: "text-orange-600" },
];

const why = [
  { icon: UserCheck, title: "Partner-led service", text: "A qualified CA reviews your file—not just a junior team.", accent: "text-brand-blue" },
  { icon: ShieldCheck, title: "Clear, upfront fees", text: "Scope and fee in writing before work starts. No surprises.", accent: "text-brand-teal" },
  { icon: CalendarClock, title: "Deadlines tracked", text: "We remind you well before statutory due dates.", accent: "text-brand-gold" },
  { icon: Lock, title: "Confidential", text: "Your documents are shared securely and used only for your work.", accent: "text-blue-400" },
  { icon: Laptop, title: "Online across India", text: "Share documents securely and get work done from anywhere.", accent: "text-brand-teal" },
  { icon: Headset, title: "One point of contact", text: "A dedicated person answers your questions, every time.", accent: "text-brand-gold" },
];

const steps = [
  { n: "01", title: "Free consultation", text: "Tell us what you need. We listen and explain your options.", icon: MessageCircle },
  { n: "02", title: "Proposal & documents", text: "You get a clear scope, fee, and a document checklist.", icon: Sparkles },
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
  [firm.stats.clientsServed, "Clients served"],
  [firm.stats.returnsFiled, "Returns filed"],
  [firm.stats.gstRegistrations, "GST registrations"],
  [firm.stats.statesServed, "States served"],
].filter(([v]) => v);

export default function Home() {

  const dots = "radial-gradient(rgb(15 23 42 / 0.07) 1px, transparent 1px)";
  const fade = "linear-gradient(to bottom, black, transparent 75%)";

  return (
    <>
      {/* -- HERO ------------------------------------------- */}
      <section aria-labelledby="hero-title" className="hero-ledger-bg relative bg-brand-navy pb-24 pt-12 lg:pb-28 lg:pt-15">
        <div className="container-x  grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="px-10">
            <h1
              id="hero-title"
              className="max-w-2xl font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl xl:text-[3rem]"
            >
              Chartered Accountants in India for Tax, GST, Audit and Company Compliance
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              File on time, answer notices and keep your company in good standing. A chartered accountant reviews your
              file, and you can work with us online from anywhere in India.
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
                Prefer to talk now? <a href={phoneHref()} className="font-semibold text-white underline underline-offset-4">{firm.phone}</a>
              </p>
            )}

            <ul className="mt-10 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/85 sm:grid-cols-3 sm:gap-6">
              {[
                "Fee agreed in writing before work starts",
                "Documents shared through a secure link",
                "Online service across India",
              ].map((t) => (
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

      {/* -- STATS (only renders when data exists) ------------ */}
      {stats.length > 0 && (
        <section aria-label="Our numbers" className="border-y border-brand-line bg-linear-to-r from-brand-navy via-brand-charcoal to-brand-navy">
          <dl className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-5">
            {stats.map(([v, l]) => (
              <ScrollReveal key={l} className="text-center">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-bold gradient-text">{v}</dd>
                <dd className="mt-1 text-sm text-white/60">{l}</dd>
              </ScrollReveal>
            ))}
          </dl>
        </section>
      )}

      {/* -- WHO ARE YOU ------------------------------------ */}
      <section className="section bg-linear-to-b from-slate-50 via-white to-slate-50">
        <div className="container-x">
          {/* Top: heading + image */}
          <ScrollReveal className="grid items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div>
              <div className="section-label section-label-blue mb-4">Who we serve</div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-6xl">
                Whoever you are,
                <br />
                we&rsquo;ve got you
                <br />
                covered
              </h2>
            </div>

            <div className="relative h-56 overflow-hidden rounded-2xl shadow-lg sm:h-64 lg:h-72">
              <Image
                src={whoWeServeImage}
                alt="Chartered accountant consulting a client"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </ScrollReveal>

          {/* Middle: paragraph + CTA */}
          <ScrollReveal className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <p className="max-w-3xl text-sm leading-relaxed text-brand-muted md:text-base">
              Pick the one closest to you and see how a qualified chartered accountant can help.
              From salaried individuals to growing businesses, we handle tax, compliance and
              advisory so you can focus on what matters.
            </p>
            <Link
              href="/book-consultation"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue"
            >
              Book a free consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollReveal>

          {/* Bottom: 4 cards */}
          <ScrollReveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {personas.slice(0, 8).map(({ icon: I, title, text, href, iconColor }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center gap-3">
                  <I size={26} strokeWidth={1.6} className={iconColor} aria-hidden="true" />
                  <h3 className="text-sm font-semibold leading-tight transition-colors group-hover:text-brand-blue">
                    {title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed mt-1 text-brand-muted">{text}</p>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>



     

      <TeamSection />
      

      {/* -- SERVICES --------------------------------------- */}

      <section className="section relative overflow-clip bg-linear-to-b from-white via-brand-blue/[0.04] to-white">
        {/* Soft background: fading dot grid + two tinted glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: dots, backgroundSize: "22px 22px", maskImage: fade, WebkitMaskImage: fade }}
          />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-[90px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/10 blur-[90px]" />
        </div>

        <div className="container-x relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Intro column, stays in view while the cards scroll */}
            <ScrollReveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <div className="section-label section-label-blue w-fit">Our Services</div>
              <h2 className="font-display text-3xl mt-3 font-bold text-brand-navy md:text-4xl lg:text-[2.6rem] lg:leading-tight">
                Trusted{" "}
                <span className="relative whitespace-nowrap text-brand-blue">
                  Expertise
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-brand-gold/70"
                  />
                </span>{" "}
                for Your Financial Needs
              </h2>

              <p className="mt-4 text-sm max-w-2xl text-neutral-600 leading-5">
                From accounting and taxation to audits and business advisory, we provide
                reliable Chartered Accountancy services tailored to your needs.
              </p>

              <p className="mt-3 text-sm max-w-2xl text-neutral-600 leading-5">
                Our experienced team combines professional expertise with practical
                guidance to help you stay compliant, make informed decisions, and grow
                with confidence.
              </p>
              <Link
                href="/services"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-blue hover:shadow-md motion-reduce:transition-none"
              >
                View all services
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <div className="mt-10 hidden rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 lg:block">
                <p className="text-sm font-semibold text-brand-navy">Not sure what you need?</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Tell us about your situation and we&apos;ll point you to the right service.
                </p>
                <Link
                  href="/contact"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                >
                  Talk to a CA
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Category cards */}
            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {categories.map((c, i) => {
                const list = servicesIn(c.slug);
                return (
                  // Wrapper takes the reveal animation so the card can lift on hover independently
                  <div key={c.slug} className="sm:last:odd:col-span-2">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-xs transition-all duration-300 focus-within:border-brand-blue/40 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      {/* Accent line that draws across the top on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-gold to-brand-blue transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                      />

                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-all duration-300 group-hover:rotate-3 group-hover:bg-brand-navy group-hover:text-brand-gold motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
                          <Icon name={c.icon} size={22} />
                        </div>
                        <span className="font-display text-sm font-semibold tabular-nums text-neutral-300 transition-colors group-hover:text-brand-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-brand-navy">
                        {/* Stretched link: the whole card is clickable without nesting anchors */}
                        <Link
                          href={`/services/${c.slug}`}
                          className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-blue focus-visible:outline-none"
                        >
                          {c.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.short}</p>

                      {list.length > 0 && (
                        <ul className="relative z-10 mt-5 space-y-1.5 border-t border-neutral-200/70 pt-4">
                          {list.slice(0, 3).map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.category}/${s.slug}`}
                                className="group/s inline-flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-brand-blue"
                              >
                                <ChevronRight
                                  size={14}
                                  className="shrink-0 text-brand-gold transition-transform duration-200 group-hover/s:translate-x-0.5"
                                />
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
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                        >
                          Explore
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
                          />
                        </span>
                      </div>
                    </article>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>
        </div>
      </section>



      <SubscribeSection />


      {/* -- WHY CHOOSE US ---------------------------------- */}
      <section className="bg-white section">
        <div className="container-x">
          <ScrollReveal className="mb-12 grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-start">
            {/* Left: Big statement */}
            <div className="flex flex-col gap-6">
              <div className="section-label section-label-blue w-fit">Why PHMG</div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Built on integrity,<br />
                <span className="gradient-text-blue">driven by results</span>
              </h2>
              <div className="divider-gold" />
              <p className="text-brand-muted leading-relaxed">
                We combine deep technical expertise with personal attention—so your filings are handled right, your deadlines never slip, and your business keeps moving.
              </p>
              <Link href="/about" className="btn btn-primary w-fit">
                About our firm <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: Feature grid */}
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {why.map(({ icon: I, title, text, accent }) => (
                <div key={title} className="card card-hover p-5 group">
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mist ${accent} transition-all group-hover:scale-110`}>
                    <I size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </section>


      {/* -- TEAM -------------------------------------------- */}
      {team.length > 0 && (
        <section className="bg-brand-navy section">
          <div className="container-x">
            <ScrollReveal className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="section-label section-label-dark mb-4">Our team</div>
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Meet our partners</h2>
              </div>
              <Link href="/team" className="btn btn-ghost-light shrink-0">View all</Link>
            </ScrollReveal>

            <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.slice(0, 4).map((p) => (
                <div key={p.slug} className="card-glass p-6 text-center group">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand-blue to-brand-teal text-white text-xl font-bold shadow-lg">
                    {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-brand-gold transition-colors">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{p.role}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* -- TESTIMONIALS ----------------------------------- */}
      {firm.testimonials.length > 0 && (
        <section className="bg-brand-mist section">
          <div className="container-x">
            <ScrollReveal className="text-center mb-12">
              <div className="section-label section-label-blue mb-4 inline-flex">Client stories</div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">What clients say</h2>
            </ScrollReveal>

            <ScrollReveal stagger className="grid gap-6 md:grid-cols-3">
              {firm.testimonials.map((t) => (
                <figure key={t.name} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <blockquote className="text-brand-ink leading-relaxed">
                    <span className="font-display text-4xl leading-none text-brand-gold/30">&ldquo;</span>
                    {t.text}
                    <span className="font-display text-4xl leading-none text-brand-gold/30">&rdquo;</span>
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-brand-line pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand-blue to-brand-teal text-xs font-bold text-white">
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

      {/* -- FREE TOOLS -------------------------------------- */}
      <section className="bg-white section">
        <div className="container-x">
          <ScrollReveal className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="section-label section-label-blue mb-4">Free resources</div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Free calculators &amp; tools</h2>
              <p className="mt-2 text-brand-muted">Use these tools free—no sign-up required.</p>
            </div>
            <Link href="/tools" className="btn btn-secondary shrink-0">All tools <ArrowRight size={15} /></Link>
          </ScrollReveal>

          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 3).map((t, i) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${toolGradients[i % 3]} p-6 text-white transition-all hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" aria-hidden="true" />
                <div className="absolute -right-2 -bottom-6 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />
                <span className="relative z-10">
                  <Zap size={22} className="mb-4 opacity-70" aria-hidden="true" />
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm opacity-70 leading-relaxed">{t.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold opacity-90 group-hover:gap-3 transition-all">
                    Open tool <ArrowRight size={14} />
                  </span>
                </span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* -- LATEST INSIGHTS --------------------------------- */}
      {articles.length > 0 && (
        <section className="bg-brand-mist section">
          <div className="container-x">
            <ScrollReveal className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="section-label section-label-blue mb-4">Knowledge hub</div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">Latest insights</h2>
                <p className="mt-2 text-brand-muted">Tax tips, compliance updates and guides from our CAs.</p>
              </div>
              <Link href="/insights" className="btn btn-secondary shrink-0">All insights <ArrowRight size={15} /></Link>
            </ScrollReveal>

            {articles.length >= 3
              ? (
                <div className="grid gap-5 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
                  <ScrollReveal>
                    <InsightCard a={articles[0]} featured />
                  </ScrollReveal>
                  <ScrollReveal stagger className="flex flex-col gap-5">
                    {articles.slice(1, 3).map((a) => (
                      <InsightCard key={a.slug} a={a} />
                    ))}
                  </ScrollReveal>
                </div>
              ) : (
                <ScrollReveal stagger className="grid gap-5 md:grid-cols-3">
                  {articles.slice(0, 3).map((a) => (
                    <InsightCard key={a.slug} a={a} />
                  ))}
                </ScrollReveal>
              )
            }
          </div>
        </section>
      )}

      {/* -- FAQ --------------------------------------------- */}
      <section className="bg-white section">
        <div className="container-x">
          <ScrollReveal className="max-w-3xl mx-auto">
            <div className="section-label section-label-blue mb-4">FAQ</div>
            <h2 className="font-display text-3xl font-bold mb-2 md:text-4xl">Frequently asked questions</h2>
            <p className="text-brand-muted mb-10">Quick answers to the questions we hear most often.</p>
            <FAQAccordion faqs={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
