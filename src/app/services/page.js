import { categories } from "@/data/categories";
import { servicesIn } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CategoryCard } from "@/components/ui/ServiceCard";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "CA Services – Tax, Audit, GST, ROC",
  description:
    "Explore PHMG & Associates services: income tax, GST, audit, company registration, ROC compliance, accounting and more. Talk to our chartered accountants today.",
  path: "/services",
});

export default function ServicesHub() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#E6F7F9]">
        <div className="container-x py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
          <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">Chartered Accountant Services</h1>
          <p className="mt-4 max-w-2xl text-lg">From tax and GST to audit and company registration, our chartered accountants handle your compliance end to end.</p>
        </div>
      </section>
      <section className="container-x section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} items={servicesIn(c.slug)} />)}
        </div>
      </section>
      <CTABand />
    </>
  );
}
