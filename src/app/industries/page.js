import Link from "next/link";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "CA Services by Industry",
  description: "See how PHMG & Associates supports startups, e-commerce, real estate, manufacturing, healthcare, professionals and NGOs. Talk to our chartered accountants.",
  path: "/industries",
});

export default function Industries() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Industries", href: "/industries" }]} title="Industries We Serve" intro="Every sector has its own tax, GST and compliance questions. Find yours." />
      <section className="container-x section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <Link key={i.slug} href={`/industries/${i.slug}`} className="card card-hover p-6">
            <h2 className="text-xl font-semibold">{i.title}</h2>
            <p className="mt-2 text-brand-muted">{i.intro}</p>
          </Link>
        ))}
      </section>
      <CTABand />
    </>
  );
}
