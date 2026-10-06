import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { servicesIn } from "@/data/services";
import { faqs } from "@/data/faqs";
import { firm, phoneHref } from "@/data/firm";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CategoryCard } from "@/components/ui/ServiceCard";
import CTABand from "@/components/ui/CTABand";
import { ClientsStrip, PracticeAreas, WhoWeServe, ProcessSteps, WhyChoose, FAQSection } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "CA Services – Tax, Audit, GST, ROC",
  description:
    "Explore PHMG & Associates services: income tax, GST, audit, company registration, ROC compliance, accounting and more. Talk to our chartered accountants today.",
  path: "/services",
});

export default function ServicesHub() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Assurance · Tax · Advisory · Litigation"
        title={<>Chartered accountant services, <span className="text-brand-gold">end to end</span></>}
        intro="From tax and GST to audit and company registration, our chartered accountants handle your compliance end to end, with a partner reviewing every important filing."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/book-consultation" className="btn btn-gold">Book free consultation <ArrowRight size={16} aria-hidden="true" /></Link>
          {firm.phone && <a href={phoneHref()} className="btn btn-ghost-light"><Phone size={16} aria-hidden="true" />{firm.phone}</a>}
        </div>
      </PageHeader>

      <ClientsStrip />

      <section aria-labelledby="all-services" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading
            id="all-services"
            label="Our services"
            title="Trusted expertise for your financial needs"
            intro="Pick a category to see every service in it, what documents you need and how we work."
          />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} items={servicesIn(c.slug)} />)}
          </ScrollReveal>
        </div>
      </section>

      <PracticeAreas className="bg-white" />
      <WhoWeServe className="bg-brand-mist" />
      <ProcessSteps />
      <WhyChoose />
      <FAQSection faqs={faqs} className="bg-white" />
      <CTABand />
    </>
  );
}
