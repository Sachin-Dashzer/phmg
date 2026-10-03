"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useState } from "react";
import CTAImage from "../../../public/cta.png";

const team = [
  { name: "CA Rahul Sharma", role: "Founder & Tax Partner", image: "/images/team/member-1.jpg" },
  { name: "CA Neha Gupta", role: "GST & Compliance Lead", image: "/images/team/member-2.jpg" },
  { name: "CA Amit Verma", role: "Audit & Assurance Head", image: "/images/team/member-3.jpg" },
];

export function TeamSection() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <ScrollReveal className="grid items-center gap-10 lg:grid-cols-[1.9fr_1fr] lg:gap-14">
          {/* Left: 3 team cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {team.map(({ name, role, image }) => (
              <div key={name} className="group">
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-brand-navy">{name}</h3>
                <p className="mt-0.5 text-xs text-brand-muted">{role}</p>
              </div>
            ))}
          </div>

          {/* Right: label + heading + text + button */}
          <div>
            <div className="section-label section-label-blue mb-3">Meet the team</div>
            <h2 className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Trusted Experts,
              <br />
              Reliable Advice
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
              Our chartered accountants bring years of hands-on experience in tax, audit and
              compliance, so you always get clear and practical guidance.
            </p>
            <Link
              href="/about/team"
              className="mt-6 inline-flex items-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue"
            >
              View More
            </Link>
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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white pb-12 md:pb-16">
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
                    className="h-11 w-full flex-1 rounded-md bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none ring-1 ring-white/20 focus:ring-white/50 sm:rounded-r-none"
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