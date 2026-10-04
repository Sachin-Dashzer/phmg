import { buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "About PHMG & Associates – Chartered Accountants",
  description:
    "PHMG & Associates: RBI Category-I and CAG empanelled chartered accountants since 2014, across Noida, Delhi, Mumbai, Ludhiana and Meerut. Talk to us today.",
  path: "/about",
});

const values = [
  { t: "Quality", d: "We are committed to excellence in service delivery, professionalism and client satisfaction." },
  { t: "Good relations", d: "Clients are at the heart of everything we do: we build long-term relationships on trust and mutual respect." },
  { t: "Innovation", d: "We embrace change and technology to add value, improve processes and stay ahead of industry trends." },
  { t: "Confidentiality", d: "Client information is used only for the engagement and shared through secure channels." },
];

export default function About() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", href: "/about" }]}
        title="About PHMG & Associates"
        intro="A decade of trust. A future of growth. Strategic advisors to growing businesses."
      />
      <section className="container-x section grid gap-12 lg:grid-cols-2">
        <div className="prose-phmg">
          <h2 className="text-3xl font-bold">Who we are</h2>
          <p>PHMG and Associates is a multi-location CA firm empanelled with the Reserve Bank of India in Category-I and with the CAG of India, handling bank statutory and concurrent audits, with a specialisation in GST litigation.</p>
          <p>We serve corporate, banking, government, PSU and private sector clients across India and globally, from offices in Noida (head office), Delhi, Mumbai, Ludhiana and Meerut covering four states. Our work spans manufacturing and infrastructure, healthcare and pharmaceuticals, banking and financial services, IT companies and government entities, FMCG, real estate and textiles, and eco-recycling and chemicals.</p>
          <p>Our team of 50+ professionals includes chartered accountants, company secretaries, semi-qualified CAs and specialists. Every engagement is owned end-to-end by a partner.</p>
          {firm.icaiFrn && <p>ICAI Firm Registration No.: {firm.icaiFrn}</p>}
          {firm.foundedYear && <p>Established: {firm.foundedYear}</p>}
        </div>
        <div>
          <h2 className="text-3xl font-bold">Our values: navigating success together</h2>
          <dl className="mt-5 space-y-4">
            {values.map((v) => (
              <div key={v.t} className="card p-5"><dt className="font-semibold text-brand-navy">{v.t}</dt><dd className="mt-1 text-brand-muted">{v.d}</dd></div>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-brand-mist">
        <div className="container-x section prose-phmg">
          <h2 className="text-3xl font-bold">Editorial and review policy</h2>
          <p>Guides and service pages on this site are written for general information. They are prepared by our team and reviewed by a chartered accountant, with references to the Income-tax Act, the CGST Act, the Companies Act, the LLP Act and official notifications. Each page shows when it was last reviewed.</p>
          <p>Tax and company laws change often. If you notice something out of date, please tell us through the contact page and we will correct it.</p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
