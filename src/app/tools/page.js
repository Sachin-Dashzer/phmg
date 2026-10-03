import Link from "next/link";
import { tools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = buildMetadata({
  title: "Free Tax and Finance Calculators",
  description: "Free calculators for income tax, HRA, GST, EMI and SIP from PHMG & Associates. Get quick estimates and plan with help from chartered accountants.",
  path: "/tools",
});

export default function Tools() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Tools", href: "/tools" }]} title="Free Calculators" intro="Quick estimates for tax and money decisions. For your exact numbers, talk to a CA." />
      <section className="container-x section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="card card-hover p-6">
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="mt-2 text-brand-muted">{t.short}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
