import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy">
        <div aria-hidden="true" className="hero-ledger-bg absolute inset-0 -z-10" />
        <div className="container-x py-20 text-center md:py-24">
          <p className="font-display text-7xl font-bold text-brand-gold md:text-8xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-medium text-white md:text-4xl">Page not found</h1>
          <p className="mx-auto mt-3 max-w-prose text-white/70">The page you are looking for does not exist or has moved. Try one of these instead.</p>
          <Link href="/" className="btn btn-gold mt-8">Go to home <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="section bg-brand-mist">
        <ul className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/services/${c.slug}`} className="group flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 transition hover:border-brand-gold hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><Icon name={c.icon} size={20} /></span>
                <span className="font-semibold text-brand-navy group-hover:text-brand-blue">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
