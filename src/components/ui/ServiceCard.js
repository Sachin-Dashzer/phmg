import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";

export function CategoryCard({ category, items = [] }) {
  return (
    <div className="card card-hover flex flex-col p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-mist text-brand-blue">
        <Icon name={category.icon} size={22} />
      </span>
      <h3 className="mt-4 text-xl font-semibold">
        <Link href={`/services/${category.slug}`} className="hover:text-brand-blue">{category.title}</Link>
      </h3>
      <p className="mt-2 text-brand-muted">{category.short}</p>
      {items.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {items.slice(0, 3).map((s) => (
            <li key={s.slug}><Link href={`/services/${s.category}/${s.slug}`} className="inline-block py-1 text-brand-ink hover:text-brand-blue hover:underline">{s.title}</Link></li>
          ))}
        </ul>
      )}
      <Link href={`/services/${category.slug}`} className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brand-blue-dark">
        View all <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function ServiceCard({ service }) {
  return (
    <Link href={`/services/${service.category}/${service.slug}`} className="card card-hover block p-5">
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="mt-1.5 text-sm text-brand-muted">{service.shortDesc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-dark">
        Learn more <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}
