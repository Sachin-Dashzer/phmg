import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/data/faqs";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";
import { FAQSection, ProcessSteps } from "@/components/sections/SiteSections";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata = buildMetadata({
  title: "FAQ – Questions About Our CA Services",
  description:
    "Answers to common questions about working with PHMG & Associates: services, fees, documents, confidentiality and filing online. Send us your question.",
  path: "/faq",
});

export default function FAQ() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "FAQ", href: "/faq" }]}
        eyebrow="Help centre"
        title={<>Frequently asked <span className="text-brand-gold">questions</span></>}
        intro="Quick answers about how we work. For anything specific to your case, talk to us."
        image="/images/office/office-2.jpeg"
      />
      <FAQSection faqs={faqs} className="bg-white" title="Everything you need to know" />
      <ProcessSteps className="bg-brand-mist" />
      <RelatedLinks url="/faq" />
      <CTABand />
    </>
  );
}
