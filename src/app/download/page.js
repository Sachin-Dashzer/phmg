import { publishedServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import PrintButton from "@/components/ui/PrintButton";

export const metadata = buildMetadata({
  title: "Document Checklists – Print or Save as PDF",
  description: "Document checklists for ITR, GST, company registration, audit and more. Open a checklist, print or save as PDF and get ready before you start. Use it today.",
  path: "/download",
});

export default function Download() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Checklists", href: "/download" }]} title="Document Checklists" intro="Open a service to see the documents usually needed. Use your browser's print option to save a copy as PDF." />
      <section className="container-x section">
        <PrintButton />
        <div className="mt-6 max-w-3xl space-y-3">
          {publishedServices.map((s) => (
            <details key={s.slug} className="card p-5">
              <summary className="cursor-pointer font-semibold text-brand-navy">{s.title}</summary>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{s.documents.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
          ))}
        </div>
        <p className="mt-6 max-w-prose text-sm text-brand-muted">The exact list depends on your case. We confirm it after understanding your requirement.</p>
      </section>
    </>
  );
}
