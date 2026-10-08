"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { team } from "@/data/team";
import CTAImage from "../../../public/cta.png";

// Faint ruled-ledger lines, the same motif as the hero, used behind portraits.
const ledgerLines =
  "repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 22px)";

/* ------------------------------------------------------------------ */
/* Card: arched portrait with a CA-style "seal" for years of practice  */
/* ------------------------------------------------------------------ */

function TeamCard({ slug, name, role, credentials = [], years, photo }) {
  return (
    <Link
      href="/team"
      aria-label={`View ${name}'s profile`}
      className="group relative block w-[72%] shrink-0 snap-start  rounded-3xl focus-visible:outline-none sm:w-[calc((100%-2.5rem)/3)]"
    >
      <div className="relative aspect-3/4 overflow-hidden  rounded-3xl bg-linear-to-b from-brand-blue/40 via-brand-navy to-brand-navy ring-1 ring-white/10 transition duration-500 group-hover:ring-2 group-hover:ring-brand-gold group-focus-visible:ring-2 group-focus-visible:ring-brand-gold">
        {/* Ledger lines behind the portrait */}
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: ledgerLines }} />

        <Image
          src={photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 72vw"
          className="object-cover object-top grayscale-[35%] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {/* Navy wash so the name always reads on the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-brand-navy via-brand-navy/75 to-transparent"
        />

        {/* Years-in-practice seal, like a CA's membership stamp */}
        {years ? (
          <div
            aria-hidden="true"
            className="absolute right-4 top-[46%] flex h-16 w-16 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-gold/80 bg-brand-navy/80 text-brand-gold backdrop-blur-sm transition-transform duration-500 group-hover:rotate-0 motion-reduce:transition-none"
          >
            <span className="font-display text-xl font-bold leading-none">{years}+</span>
            <span className="mt-0.5 text-[9px] font-semibold tracking-wide">years</span>
          </div>
        ) : null}

        {/* Name plate */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-lg font-semibold leading-tight text-white">{name}</h3>
          <p className="mt-1 text-xs font-medium text-brand-gold">{role}</p>

          {credentials.length > 0 && (
            <p className="mt-2 text-[11px] text-white/60">
              {credentials.map((c, i) => (
                <span key={c}>
                  {i > 0 && <span className="mx-1.5 inline-block h-2.5 w-px translate-y-px bg-white/30" aria-hidden="true" />}
                  {c}
                </span>
              ))}
            </p>
          )}

          {/* "View profile" opens up on hover (always shown on touch screens) */}
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="overflow-hidden">
              <span className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs font-semibold text-white">
                View profile
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function TeamSection() {
  const track = useRef(null);
  const [scroll, setScroll] = useState({ fill: 0.3, atStart: true, atEnd: false });

  // Track how far through the team the visitor has scrolled.
  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const visible = el.clientWidth / el.scrollWidth;
    const progress = max > 0 ? el.scrollLeft / max : 1;
    setScroll({
      fill: Math.min(1, visible + progress * (1 - visible)),
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Scroll by one card (+ gap) so snapping lands on the next member.
  const slide = (dir) => {
    const el = track.current;
    if (el?.firstElementChild) {
      el.scrollBy({ left: dir * (el.firstElementChild.offsetWidth + 20), behavior: "smooth" });
    }
  };

  const arrowBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand-gold hover:bg-brand-gold hover:text-brand-navy disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="section relative overflow-hidden bg-brand-navy">
      {/* Soft glows to tie in with the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]" />
      </div>

      <div className="container-x relative z-10">
        <ScrollReveal className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          {/* Left: heading + text + controls */}
          <div>
            <div className="section-label section-label-dark mb-4 w-fit">Meet the team</div>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Partner-led.
              <br />
              <span className="text-white/55">Expert-driven.</span>
            </h2>
            <div className="divider-gold mt-6" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Our partners and branch heads bring years of hands-on experience in audit, tax,
              litigation and advisory, and own every engagement end-to-end. Serving clients since 2014.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/team" className="btn btn-gold px-6">
                Meet the full team <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <div className="flex gap-2">
                <button type="button" onClick={() => slide(-1)} disabled={scroll.atStart} aria-label="Previous team member" className={arrowBtn}>
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => slide(1)} disabled={scroll.atEnd} aria-label="Next team member" className={arrowBtn}>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: arched portrait slider */}
          <div className="min-w-0">
            <div
              ref={track}
              onScroll={update}
              className="-m-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {team.map((member) => (
                <TeamCard key={member.slug} {...member} />
              ))}
            </div>

            {/* Scroll progress */}
            <div className="mt-6 h-px w-full bg-white/15" aria-hidden="true">
              <div
                className="h-0.5 -translate-y-px origin-left bg-brand-gold transition-transform duration-300 motion-reduce:transition-none"
                style={{ transform: `scaleX(${scroll.fill})` }}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const body = new FormData();
      body.set("email", email);
      const res = await fetch("/api/newsletter", { method: "POST", body });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white">
      <div className="">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-[#0b1f3a]">
            <div className="grid items-center lg:grid-cols-[1.3fr_1fr]">
              {/* Left: content */}
              <div className="px-6 py-10 sm:px-10 md:py-14 lg:px-14">
                <h2 className="max-w-md font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                  What Do You Want To Know Today? Subscribe For The Latest Updates
                </h2>
                <p className="mt-4 max-w-md text-xs leading-relaxed text-white/70 md:text-sm">
                  Get tax deadlines, GST changes and compliance tips straight in your inbox.
                  No spam, only useful updates.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email address"
                    // flex-1 only from sm: in the stacked (flex-col) layout it sets
                    // flex-basis on the height axis and collapses h-11 to ~17px.
                    className="h-11 w-full shrink-0 rounded-md bg-white/10 px-4 text-base text-white placeholder:text-white/50 outline-none ring-1 ring-white/20 focus:ring-white/50 sm:flex-1 sm:rounded-r-none sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-11 shrink-0 rounded-md bg-white px-6 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:opacity-60 sm:rounded-l-none"
                  >
                    {status === "loading" ? "Sending..." : "Subscribe"}
                  </button>
                </form>

                {status === "success" && (
                  <p className="mt-3 text-xs text-green-400">Thanks! You are subscribed.</p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-xs text-red-400">Something went wrong. Please try again.</p>
                )}
              </div>

              {/* Right: image */}
              <div className="relative hidden h-full min-h-72 lg:block">
                <Image
                  src={CTAImage}
                  alt=""
                  fill
                  sizes="40vw"
                  className="object-contain object-bottom"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}