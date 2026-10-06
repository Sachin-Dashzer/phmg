import { tools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";
import { ToolCard, WhoWeServe } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "Free Tax and Finance Calculators",
  description: "Free calculators for income tax, HRA, GST, EMI and SIP from PHMG & Associates. Get quick estimates and plan with help from chartered accountants.",
  path: "/tools",
});

export default function Tools() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Tools", href: "/tools" }]}
        eyebrow="Free resources"
        title={<>Free calculators for <span className="text-brand-gold">smarter decisions</span></>}
        intro="Quick estimates for tax and money decisions. No sign-up required. For your exact numbers, talk to a CA."
      />
      <section aria-labelledby="tools-title" className="section bg-brand-mist">
        <div className="container-x">
          <SectionHeading id="tools-title" label={`${tools.length} tools`} title="Pick a calculator" />
          <ScrollReveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </ScrollReveal>
        </div>
      </section>
      <WhoWeServe />
      <CTABand title="Need the exact numbers?" text="Calculators give estimates. A chartered accountant can work out your actual liability and the best way to reduce it." />
    </>
  );
}
