import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// items: [{ name, href }] — the last item is the current page.
export default function Breadcrumbs({ items }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-brand-navy">{it.name}</span>
            ) : (
              <Link href={it.href} className="hover:text-brand-blue hover:underline">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
