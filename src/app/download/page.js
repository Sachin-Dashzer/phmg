import { ChevronDown, FileCheck2, Info } from "lucide-react";
import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import PrintButton from "@/components/ui/PrintButton";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "Document Checklists – Print or Save as PDF",
  description: "Document checklists for ITR, GST, company registration, audit and more. Open a checklist, print or save as PDF and get ready before you start. Use it today.",
  path: "/download",
});

export default function Download() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Checklists", href: "/download" }]}
        eyebrow="Free checklists"
        title={<>Know what to bring <span className="text-brand-gold">before you start</span></>}
        intro="Open a service to see the documents usually needed. Use your browser's print option to save a copy as PDF."
        image="/images/office/office-3.jpeg"
      />
      <section className="section bg-brand-mist">
        <div className="container-x">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 text-sm text-brand-muted">
              <Info size={16} className="shrink-0 text-brand-gold" aria-hidden="true" />
              {publishedServices.length} checklists · the exact list depends on your case; we confirm it after understanding your requirement.
            </p>
            <PrintButton />
          </div>
          <div className="grid items-start gap-4 lg:grid-cols-2">
            {publishedServices.map((s) => (
              <details key={s.slug} className="group overflow-hidden rounded-2xl border border-brand-line bg-white shadow-xs transition open:shadow-lg">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-gold"><FileCheck2 size={18} aria-hidden="true" /></span>
                  <span className="flex-1">
                    <span className="block font-semibold text-brand-navy">{s.title}</span>
                    <span className="block text-xs text-brand-muted">{s.documents.length} documents</span>
                  </span>
                  <ChevronDown size={20} className="shrink-0 text-brand-muted transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ol className="space-y-2 border-t border-brand-line bg-brand-mist/50 p-5 text-sm">
                  {s.documents.map((d, i) => (
                    <li key={d} className="flex gap-3"><span className="w-5 shrink-0 font-display font-semibold text-brand-gold-dark">{i + 1}.</span>{d}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="Rather we handle it?" text="Send us what you have. A chartered accountant will tell you what's missing and take it from there." />
    </>
  );
}
