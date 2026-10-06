import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { TeamSection, SubscribeSection } from "@/components/sections/TeamSection";
import { firm } from "@/data/firm";
import { categories } from "@/data/categories";
import { servicesIn } from "@/data/services";
import { faqs } from "@/data/faqs";
import HeroEnquiry from "@/components/sections/HeroEnquiry";
import SectionHeading from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/ServiceCard";
import {
  ClientsStrip, AboutSplit, WhoWeServe, StatsBand, PracticeAreas, WhyChoose, ProcessSteps, OfficesGrid, FAQSection, ToolCard,
} from "@/components/sections/SiteSections";
import CTABand from "@/components/ui/CTABand";
import InsightCard from "@/components/ui/InsightCard";
import { articles } from "@/data/insights";
import { tools } from "@/data/tools";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BannerImg from "../../public/banner.png";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const dots = "radial-gradient(rgb(15 23 42 / 0.07) 1px, transparent 1px)";
const fade = "linear-gradient(to bottom, black, transparent 75%)";


/* ------------------------------------------------------------------ */
/* Page                                                                */
/* Order: Hero → trust → about → numbers → services → audience →       */
/* why us → process → team → proof → reach → resources → FAQ → CTA     */
/* Backgrounds alternate white / mist so no two neighbours match.      */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* =========================================================
    HERO SECTION
    ========================================================= */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-160 items-center overflow-hidden pb-24 pt-28 sm:min-h-180 lg:min-h-205 lg:pb-28 lg:pt-32"
      >
        {/* =======================================================
      BACKGROUND IMAGE
      ======================================================= */}
        <Image
          src={BannerImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />

        {/* =======================================================
      LEFT-SIDE DARK GRADIENT
      Keeps the text readable while leaving the
      right side of the office clearly visible.
      ======================================================= */}
        <div
          className="
      absolute
      inset-0
      -z-10
      bg-linear-to-b
      from-black/80
      via-black/65
      to-black/50
      sm:bg-linear-to-r
      sm:from-black/90
      sm:via-black/55
      sm:via-42%
      sm:to-transparent
    "
          aria-hidden="true"
        />

        {/* Top scrim keeps the transparent nav readable over bright image areas. */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-36 bg-linear-to-b from-black/60 to-transparent"
          aria-hidden="true"
        />

        {/* =======================================================
      VERY SUBTLE BOTTOM GRADIENT
      ======================================================= */}
        <div
          className="
      absolute
      inset-x-0
      bottom-0
      -z-10
      h-32
      bg-linear-to-t
      from-black/25
      to-transparent
    "
          aria-hidden="true"
        />

        {/* =======================================================
      CONTENT
      ======================================================= */}
        <div className="container-x relative z-10 w-full">
          <div className="max-w-170 ">

            {/* =====================================================
          EYEBROW
          ===================================================== */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <span className="h-px w-8 shrink-0 bg-brand-gold sm:w-11" />

              <p
                className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.2em]
            sm:tracking-[0.28em]
            text-brand-gold
            sm:text-xs
          "
              >
                Your Trusted Partner in Financial Success
              </p>
            </div>

            {/* =====================================================
          MAIN HEADING
          ===================================================== */}
            <h1
              id="hero-title"
              className="
          max-w-162.5
          font-display
          text-[34px]
          font-medium
          leading-[1.12]
          tracking-[-0.02em]
          text-white
          sm:text-5xl
          lg:text-[52px]
          xl:text-[58px]
        "
            >
              <span className="block">Expert Accounting</span>
              <span className="block">Solutions for a</span>
              <span className="block text-brand-gold">Stronger Tomorrow</span>
            </h1>

            {/* =====================================================
          DESCRIPTION
          ===================================================== */}
            <p
              className="
          mt-7
          max-w-152.5
          text-[15px]
          leading-[1.85]
          text-white/85
          sm:text-[16px]
          lg:text-[17px]
        "
            >
              PHMG &amp; Associates, a leading Chartered Accountant firm,
              offers comprehensive financial, advisory and compliance
              services to help your business grow with confidence.
            </p>

            {/* =====================================================
          CTA BUTTONS
          ===================================================== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">

              {/* Primary Button */}
              <Link
                href="/services"
                className="
            inline-flex
            h-12
            items-center
            justify-center
            gap-3
            rounded-[5px]
            bg-brand-gold
            sm:h-14
            px-8
            text-[14px]
            font-semibold
            text-[#17140f]
            shadow-lg
            shadow-black/10
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#e8bd70]
          "
              >
                Our Services

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/about"
                className="
            inline-flex
            h-12
            items-center
            justify-center
            gap-3
            rounded-[5px]
            border
            border-white/30
            bg-black/20
            sm:h-14
            px-8
            text-[14px]
            font-medium
            text-white
            backdrop-blur-[2px]
            transition-all
            duration-300
            hover:border-brand-gold
            hover:bg-black/20
            hover:text-brand-gold
          "
              >
                Learn More
              </Link>
            </div>

            {/* =====================================================
          TRUST / FEATURE POINTS
          ===================================================== */}
            <div
              className="
          mt-10
          grid
          sm:mt-12
          max-w-162.5
          grid-cols-1
          border-t
          border-white/20
          pt-6
          sm:grid-cols-3
        "
            >

              {/* ===================================================
            FEATURE 1
            =================================================== */}
              <div
                className="
            flex
            items-center
            gap-3
            border-white/15
            py-2
            sm:border-r
            sm:pr-6
          "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-22 w-8 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 4L34 10V19C34 27.5 28.2 33.8 20 36C11.8 33.8 6 27.5 6 19V10L20 4Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M13 20L18 25L28 14"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <span className="text-[13px] leading-[1.35] text-white/90">
                  Trusted
                  <br />
                  Expertise
                </span>
              </div>

              {/* ===================================================
            FEATURE 2
            =================================================== */}
              <div
                className="
            flex
            items-center
            gap-3
            border-white/15
            py-2
            sm:border-r
            sm:px-6
          "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-22 w-8 text-brand-gold"
                    aria-hidden="true"
                  >
                    <circle
                      cx="20"
                      cy="12"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="10"
                      cy="17"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="30"
                      cy="17"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M11 31C11 25.5 14.5 22 20 22C25.5 22 29 25.5 29 31"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M4 30C4 26.5 6.5 24 10 24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M36 30C36 26.5 33.5 24 30 24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span className="text-[13px] leading-[1.35] text-white/90">
                  Client-Centric
                  <br />
                  Approach
                </span>
              </div>

              {/* ===================================================
            FEATURE 3
            =================================================== */}
              <div
                className="
            flex
            items-center
            gap-3
            py-2
            sm:pl-6
          "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-22 w-8 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 32H34"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M8 28L15 21L21 25L32 12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M26 12H32V18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M9 32V25M17 32V20M25 32V23M33 32V15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span className="text-[13px] leading-[1.35] text-white/90">
                  Sustainable
                  <br />
                  Growth
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>


      <div className="container-x relative z-10 -mt-14">
        <HeroEnquiry />
      </div>

      <ClientsStrip />

      <AboutSplit />

      <StatsBand />

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
                  <p className="mt-px text-sm text-brand-muted">
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
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} items={servicesIn(c.slug)} className="sm:last:odd:col-span-2" />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <PracticeAreas />

      <WhoWeServe />

      <WhyChoose />

      {/* -- 9. HOW WE WORK ----------------------------------- */}
      <ProcessSteps />

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

      <OfficesGrid />

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
                <ToolCard key={t.slug} tool={t} index={i} />
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
      <FAQSection faqs={faqs} />

      <CTABand />
    </>
  );
}