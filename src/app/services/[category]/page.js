import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { servicesIn, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/ui/ServiceCard";
import LeadCard from "@/components/forms/LeadCard";
import CTABand from "@/components/ui/CTABand";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return buildMetadata({
    title: `${c.title} Services`,
    description: `${c.intro} Talk to our chartered accountants – call or WhatsApp today.`.slice(0, 158),
    path: `/services/${c.slug}`,
    noindex: servicesIn(c.slug).length === 0, // thin until services are published
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const live = servicesIn(c.slug);
  const comingSoon = services.filter((s) => s.category === c.slug && !live.includes(s));

  return (
    <>
      <section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#E6F7F9]">
        <div className="container-x py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: c.title, href: `/services/${c.slug}` }]} />
          <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">{c.title} Services</h1>
          <p className="mt-4 max-w-2xl text-lg">{c.intro}</p>
        </div>
      </section>
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div>
          {live.length > 0 && (
            <>
              <h2 className="text-2xl font-bold">Our {c.title.toLowerCase()} services</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">{live.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
            </>
          )}
          {comingSoon.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Also available on request</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {comingSoon.map((s) => (
                  <li key={s.slug} className="card p-4"><span className="font-semibold">{s.title}</span><span className="mt-1 block text-sm text-brand-muted">{s.shortDesc}</span></li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div><div className="lg:sticky lg:top-24"><LeadCard id="category-lead" defaultService={c.title} /></div></div>
      </div>
      <CTABand />
    </>
  );
}
