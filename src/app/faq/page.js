import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/data/faqs";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "FAQ – Questions About Our CA Services",
  description:
    "Answers to common questions about working with PHMG & Associates: services, fees, documents, confidentiality and online filing. Ask us anything today.",
  path: "/faq",
});

export default function FAQ() {
  return (
    <>
      <PageHeader crumbs={[{ name: "FAQ", href: "/faq" }]} title="Frequently Asked Questions" intro="Quick answers about how we work. For anything specific to your case, talk to us." />
      <section className="container-x section"><div className="max-w-3xl"><FAQAccordion faqs={faqs} /></div></section>
      <CTABand />
    </>
  );
}
