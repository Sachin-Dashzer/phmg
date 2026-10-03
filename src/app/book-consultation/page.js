import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/data/categories";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";

export const metadata = buildMetadata({
  title: "Book a Free Consultation with a CA",
  description: "Book a free consultation with PHMG & Associates. Pick a service and a convenient time and our chartered accountants will confirm. Book your slot today.",
  path: "/book-consultation",
});

export default function Book() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Book Consultation", href: "/book-consultation" }]} title="Book a Free Consultation" intro="Tell us what you need and when you are free. We will confirm the time by phone or message." />
      <section className="container-x section grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="card max-w-xl p-6 md:p-8">
          <LeadForm variant="full" showSlot id="book" services={categories.map((c) => c.title)} submitLabel="Request Consultation" />
        </div>
        <div>
          <h2 className="text-xl font-bold">What to expect</h2>
          <ul className="mt-4 space-y-3">
            {["A short call to understand your requirement", "Clear next steps and a document checklist", "A written scope and fee if you decide to proceed"].map((t) => (
              <li key={t} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-brand-success" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
