import { categories } from "@/data/categories";
import LeadForm from "@/components/forms/LeadForm";

const services = categories.map((c) => c.title);

// Quick enquiry strip that overlaps the bottom edge of the hero.
export default function HeroEnquiry() {
  return (
    <section aria-labelledby="hero-enquiry-title" className="card grid gap-5 p-5 shadow-xl shadow-brand-navy/10 md:p-7 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <div>
        <h2 id="hero-enquiry-title" className="font-display text-2xl font-bold">Request a call back</h2>
        <p className="mt-1 text-sm text-brand-muted">Tell us what you need. A chartered accountant will call you to discuss it.</p>
      </div>
      <LeadForm id="hero-lead" inline services={services} submitLabel="Request call back" />
    </section>
  );
}
