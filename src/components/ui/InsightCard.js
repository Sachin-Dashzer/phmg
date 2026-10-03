import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryTitle } from "@/data/insights";

export const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const categoryColors = {
  "income-tax": "from-blue-600 to-blue-800",
  "gst": "from-teal-500 to-teal-700",
  "audit": "from-indigo-600 to-indigo-800",
  "company-law": "from-purple-600 to-purple-800",
  "international-tax": "from-emerald-600 to-emerald-800",
  "business": "from-amber-500 to-orange-700",
};

const getBg = (cat) => categoryColors[cat] || "from-brand-blue to-brand-blue-dark";

export default function InsightCard({ a, featured = false }) {
  const bg = getBg(a.category);

  if (featured) {
    return (
      <Link href={`/insights/${a.slug}`} className="group block card card-hover overflow-hidden h-full">
        {/* Color banner */}
        <div className={`relative h-48 bg-linear-to-br ${bg} p-6 flex items-end`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <span className="relative z-10 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {categoryTitle(a.category)}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold group-hover:text-brand-blue transition-colors leading-snug">{a.title}</h3>
          <p className="mt-2.5 text-sm text-brand-muted leading-relaxed line-clamp-3">{a.description}</p>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-brand-muted">{a.readMinutes} min read · {fmtDate(a.publishedAt)}</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/insights/${a.slug}`} className="group block card card-hover overflow-hidden">
      {/* Thin color bar */}
      <div className={`h-1.5 w-full bg-linear-to-r ${bg}`} />
      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal-dark">{categoryTitle(a.category)}</span>
        <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-brand-blue transition-colors">{a.title}</h3>
        <p className="mt-2 text-xs text-brand-muted leading-relaxed line-clamp-2">{a.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-brand-line pt-3">
          <p className="text-xs text-brand-muted">{a.readMinutes} min · {fmtDate(a.publishedAt)}</p>
          <ArrowRight size={14} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
