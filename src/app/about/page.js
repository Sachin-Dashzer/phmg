import { buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
import PageHeader from "@/components/ui/PageHeader";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "About PHMG & Associates – Chartered Accountants",
  description:
    "Learn how PHMG & Associates works: partner-led chartered accountants focused on accuracy, confidentiality and clear communication. Talk to us today.",
  path: "/about",
});

const values = [
  { t: "Quality", d: "Every filing is prepared against source documents and reviewed before it goes out." },
  { t: "Confidentiality", d: "Client information is used only for the engagement and shared through secure channels." },
  { t: "Independence and objectivity", d: "We give advice based on the law and your facts, including when it is not what you hoped to hear." },
  { t: "Plain communication", d: "We explain terms and sections in simple English, so you know what is being done and why." },
];

export default function About() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", href: "/about" }]}
        title="About PHMG & Associates"
        intro="We are a firm of chartered accountants that helps individuals, businesses and trusts stay compliant and make sound financial decisions."
      />
      <section className="container-x section grid gap-12 lg:grid-cols-2">
        <div className="prose-phmg">
          <h2 className="text-3xl font-bold">How we work</h2>
          <p>Compliance work is only useful when it is accurate and on time. We start by understanding your situation, agree the scope and fee in writing, and then handle the work with a chartered accountant reviewing every important filing.</p>
          <p>Most of our work can be done online. You share documents through a secure link, and we keep you informed at each step until the filing proof reaches you.</p>
          <p>We keep our website claims factual and follow the advertising and ethics norms of the Institute of Chartered Accountants of India (ICAI).</p>
          {firm.icaiFrn && <p>ICAI Firm Registration No.: {firm.icaiFrn}</p>}
          {firm.foundedYear && <p>Established: {firm.foundedYear}</p>}
        </div>
        <div>
          <h2 className="text-3xl font-bold">Our values</h2>
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
