import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { relatedFor, relatedHeading, anchorFor } from "@/lib/internal-links";

/**
 * The contextual internal-link block. Server-rendered, plain <a href> through next/link, no
 * nofollow and no JS-only links, so every link is in the HTML a crawler receives.
 *
 * It is NOT marked data-seo-skip: these links are page content and are meant to be counted by
 * scripts/seo-audit.mjs, unlike the shared CTA band below it.
 *
 * `extra` adds page-specific destinations a template knows about but the central map does not.
 */
export default function RelatedLinks({ url, heading, extra = [], className = "bg-brand-mist" }) {
  const links = [...new Set([...relatedFor(url), ...extra])].filter((u) => u && u !== url);
  if (!links.length) return null;

  return (
    <section aria-labelledby="related-links" className={`border-t border-brand-line py-12 md:py-14 ${className}`}>
      <div className="container-x">
        <h2 id="related-links" className="font-display text-xl font-semibold text-brand-navy md:text-2xl">
          {heading || relatedHeading(url)}
        </h2>
        <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-gold" aria-hidden="true" />
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((href) => (
            <li key={href}>
              <Link
                href={href}
                className="group inline-flex items-start gap-1.5 text-sm leading-relaxed text-brand-ink transition-colors hover:text-brand-blue"
              >
                <ArrowUpRight size={14} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />
                <span className="group-hover:underline">{anchorFor(href)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
