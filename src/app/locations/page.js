import Link from "next/link";
import { cities } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "CA Services by Location",
  description: "PHMG & Associates serves clients in Delhi NCR in person and across India online. Find your location and talk to our chartered accountants today.",
  path: "/locations",
});

export default function Locations() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Locations", href: "/locations" }]} title="Where We Work" intro="Most of our work is delivered online, so we serve clients across India. These pages cover the places where we also meet clients in person." />
      <section className="container-x section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <Link key={c.slug} href={`/ca-in-${c.slug}`} className="card card-hover p-6">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="mt-2 text-brand-muted">{c.metaDescription}</p>
          </Link>
        ))}
      </section>
      <CTABand />
    </>
  );
}
