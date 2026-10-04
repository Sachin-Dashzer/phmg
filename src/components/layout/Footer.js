import Link from "next/link";
import { firm, hasAddress } from "@/data/firm";
import { categories } from "@/data/categories";
import { publishedServices, serviceUrl } from "@/data/services";
import { legalLinks } from "@/data/navigation";
import { Logo } from "./Header";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const quick = [
  { title: "About", href: "/about" },
  { title: "Industries", href: "/industries" },
  { title: "Locations", href: "/locations" },
  { title: "Pricing", href: "/pricing" },
  { title: "Insights", href: "/insights" },
  { title: "Free Tools", href: "/tools" },
  { title: "Tax Calendar", href: "/tax-calendar" },
  { title: "Book Consultation", href: "/book-consultation" },
  { title: "Team", href: "/team" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

const linkClass = "text-sm text-white/65 transition-colors hover:text-white";

function ColumnHeading({ children }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold tracking-wide text-white">{children}</h3>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-gold" aria-hidden="true" />
    </div>
  );
}

export default function Footer() {
  const a = firm.address;
  const phoneHref = firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : null;

  return (
    <footer className="bg-[#0b1f3a] pb-24 text-white/70 md:pb-0">
      <div className="container-x">
        {/* Main grid */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              PHMG & Associates, Chartered Accountants since 2014. Assurance, tax, advisory and litigation across Noida, Delhi, Mumbai, Ludhiana and Meerut.
              RBI Category-I and CAG empanelled. Partner-led delivery.
            </p>

            {(hasAddress() || firm.phone || firm.email) && (
              <address className="mt-6 space-y-3 not-italic">
                {hasAddress() && (
                  <div className="flex items-start gap-3 text-sm text-white/65">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                    <span>
                      {[a.street, a.locality, a.city, a.region, a.postalCode].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
                {firm.phone && (
                  <a href={phoneHref} className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white">
                    <Phone size={16} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    {firm.phone}
                  </a>
                )}
                {firm.email && (
                  <a href={`mailto:${firm.email}`} className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white">
                    <Mail size={16} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    {firm.email}
                  </a>
                )}
              </address>
            )}

            <Link
              href="/book-consultation"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1f3a] transition hover:bg-brand-gold hover:text-white"
            >
              Book free consultation <ArrowRight size={15} aria-hidden="true" />
            </Link>

            {firm.icaiFrn && (
              <p className="mt-5 text-xs text-white/40">ICAI Firm Reg. No. {firm.icaiFrn}</p>
            )}
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-5">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} className={`${linkClass} font-medium`}>
                    {c.title}
                  </Link>
                </li>
              ))}
              {publishedServices.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={serviceUrl(s)} className="text-sm text-white/45 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-3">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-3">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} {firm.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-white/50 transition-colors hover:text-white">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 max-w-4xl text-xs leading-relaxed text-white/35">
            Disclaimer: Content is for general information only and does not constitute professional
            advice or solicitation. Consult a qualified professional before acting.
          </p>
        </div>
      </div>
    </footer>
  );
}