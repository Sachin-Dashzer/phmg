import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ToolCard } from "@/components/sections/SiteSections";
import { tools } from "@/data/tools";

export const metadata = buildMetadata({ title: "Thank You", description: "Thank you for your enquiry.", path: "/thank-you", noindex: true });

export default function ThankYou() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy">
        <div aria-hidden="true" className="hero-ledger-bg absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="container-x py-20 text-center md:py-28">
          <CheckCircle2 size={64} strokeWidth={1.5} className="hero-enter-5 mx-auto text-brand-gold" aria-hidden="true" />
          <h1 className="hero-enter-1 mt-6 font-display text-4xl font-medium text-white md:text-5xl">Thank you</h1>
          <p className="hero-enter-2 mx-auto mt-4 max-w-md text-lg text-white/75">We have received your enquiry. A member of our team will contact you shortly.</p>
          <div className="hero-enter-3 mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-gold">Back to home <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/insights" className="btn btn-ghost-light">Read our guides</Link>
          </div>
        </div>
      </section>
      {tools.length > 0 && (
        <section className="section bg-brand-mist">
          <div className="container-x">
            <h2 className="text-center font-display text-3xl font-bold">While you wait, try a free calculator</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.slice(0, 3).map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
