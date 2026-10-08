import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// items: [{ name, href }] — the last item is the current page. `light` for dark backgrounds.
export default function Breadcrumbs({ items, light = false }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/60" : "text-brand-muted"}`}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((it, i) => (
          // Separator trails its own crumb, so a wrap never starts a line with "/".
          <li key={it.href} className="flex items-center gap-1.5">
            {i === all.length - 1 ? (
              <span aria-current="page" className={light ? "text-white" : "text-brand-navy"}>{it.name}</span>
            ) : (
              <>
                <Link href={it.href} className={light ? "hover:text-brand-gold" : "hover:text-brand-blue hover:underline"}>{it.name}</Link>
                <span aria-hidden="true" className={light ? "text-brand-gold/70" : ""}>/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
