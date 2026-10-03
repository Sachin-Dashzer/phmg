import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

// Native <details>: keyboard accessible, no client JS.
export default function FAQAccordion({ faqs, schema = true }) {
  if (!faqs?.length) return null;
  return (
    <div className="divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
      {schema && <JsonLd data={faqSchema(faqs)} />}
      {faqs.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-navy">
            {f.q}
            <ChevronDown size={20} aria-hidden="true" className="shrink-0 transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-prose leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
