import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
import PageHeader from "@/components/ui/PageHeader";

// noindex until real openings exist (thin page otherwise).
export const metadata = buildMetadata({
  title: "Careers and Articleship",
  description: "Work with PHMG & Associates: articleship and hiring enquiries for accountants, auditors and tax professionals. Get in touch to share your profile.",
  path: "/careers",
  noindex: true,
});

export default function Careers() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Careers", href: "/careers" }]} title="Careers and Articleship" intro="We are always interested in meeting capable people who care about accuracy and clients." />
      <section className="container-x section prose-phmg">
        <h2 className="text-2xl font-bold">Work with us</h2>
        <p>We look for articled assistants, accountants and tax and audit professionals who enjoy careful work and clear communication. You will work on real files with a chartered accountant reviewing your work.</p>
        <p>
          To share your profile, {firm.email ? <>email <a href={`mailto:${firm.email}`} className="font-semibold text-brand-blue-dark underline">{firm.email}</a> or </> : null}
          use our <Link href="/contact" className="font-semibold text-brand-blue-dark underline">contact page</Link> and mention the role you are interested in.
        </p>
      </section>
    </>
  );
}
