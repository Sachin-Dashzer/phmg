import Link from "next/link";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { Icon } from "./Icon";

// Gold-to-blue bar that draws across the top on hover; shared by both cards.
const topBar = (
  <span
    aria-hidden="true"
    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-gold to-brand-blue transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
  />
);
const cardCls =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 focus-within:border-brand-blue/40 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const iconCls =
  "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-gold";

export function CategoryCard({ category: c, items = [], className = "" }) {
  return (
    <article className={`${cardCls} ${className}`}>
      {topBar}
      <div className={iconCls}><Icon name={c.icon} size={22} /></div>
      <h3 className="mt-5 text-lg font-semibold text-brand-navy">
        <Link
          href={`/services/${c.slug}`}
          className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-blue focus-visible:outline-none"
        >
          {c.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.short}</p>

      {items.length > 0 && (
        <ul className="relative z-10 mt-5 space-y-0.5 border-t border-neutral-200/70 pt-3">
          {items.slice(0, 3).map((s) => (
            <li key={s.slug}>
              {/* py-1.5 keeps the row past the 24px minimum target size */}
              <Link href={`/services/${s.category}/${s.slug}`} className="inline-flex items-center gap-1 py-1.5 text-sm text-brand-muted transition-colors hover:text-brand-blue">
                <ChevronRight size={14} className="shrink-0 text-brand-gold" aria-hidden="true" />
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs text-neutral-400">
          {items.length > 0 ? `${items.length} ${items.length === 1 ? "service" : "services"}` : ""}
        </span>
        <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}

export function ServiceCard({ service }) {
  return (
    <Link href={`/services/${service.category}/${service.slug}`} className={cardCls}>
      {topBar}
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-gold">
          <FileText size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">{service.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{service.shortDesc}</p>
        </div>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-blue">
        Learn more <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
