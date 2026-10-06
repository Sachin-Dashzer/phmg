import Link from "next/link";
import { MessageCircle, ArrowRight, Phone } from "lucide-react";
import { firm, waHref, phoneHref } from "@/data/firm";

export default function CTABand({
  title = "Ready to get started?",
  text = "Tell us what you need. A qualified CA will review it and reply with next steps and a clear fee.",
  cta = "Book Free Consultation",
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-gold/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-gold/30 to-transparent" />
        {/* Decorative grid */}
        <svg className="absolute inset-0 h-full w-full opacity-3" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="container-x relative z-10 py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div>
            <p className="mb-3 inline-block rounded-full border border-brand-gold/25 bg-brand-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
              Talk to a CA today
            </p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/60 leading-relaxed">
              {text}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-gold animate-pulse-gold text-base px-7 py-3">
              {cta} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {firm.whatsapp && (
              <a href={waHref()} rel="noopener" className="btn btn-whatsapp text-base px-6 py-3">
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Us
              </a>
            )}
            {firm.phone && (
              <a href={phoneHref()} className="btn btn-ghost-light text-base px-6 py-3">
                <Phone size={18} aria-hidden="true" />
                {firm.phone}
              </a>
            )}
          </div>

          <p className="text-xs text-white/30">
            No commitment · Reply within one business day · Your data stays confidential
          </p>
        </div>
      </div>
    </section>
  );
}
