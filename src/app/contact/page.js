import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { firm, offices, hasAddress, phoneHref, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";

export const metadata = buildMetadata({
  title: "Contact PHMG & Associates – Talk to a CA",
  description:
    "Contact PHMG & Associates for audit, tax, GST, litigation and advisory. Send an enquiry and our chartered accountants will get back to you. Talk to a CA today.",
  path: "/contact",
});

export default function Contact() {
  const a = firm.address;
  const rows = [
    firm.phone && { I: Phone, label: "Phone", node: <a href={phoneHref()} className="hover:underline">{firm.phone}</a> },
    firm.phone2 && { I: Phone, label: "Phone (alternate)", node: <a href={`tel:${firm.phone2.replace(/[^+d]/g, "")}`} className="hover:underline">{firm.phone2}</a> },
    firm.email && { I: Mail, label: "Email", node: <a href={`mailto:${firm.email}`} className="hover:underline">{firm.email}</a> },
    firm.email2 && { I: Mail, label: "Email", node: <a href={`mailto:${firm.email2}`} className="hover:underline">{firm.email2}</a> },
    firm.whatsapp && { I: MessageCircle, label: "WhatsApp", node: <a href={waHref()} rel="noopener" className="hover:underline">Chat with us</a> },
    hasAddress() && { I: MapPin, label: "Head office", node: [a.street, a.locality, a.city, a.region, a.postalCode].filter(Boolean).join(", ") },
    ...offices.filter((o) => !o.head).map((o) => ({ I: MapPin, label: `${o.city} branch`, node: o.address })),
    firm.hours && { I: Clock, label: "Hours", node: firm.hours },
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", href: "/contact" }]}
        title="Contact Us"
        intro="Tell us what you need. A chartered accountant from our team will review your enquiry and get back to you."
      />
      <section className="container-x section grid gap-10 lg:grid-cols-[1fr_24rem]">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold">Send an enquiry</h2>
          <div className="mt-5 max-w-xl">
            <LeadForm variant="full" id="contact" services={categories.map((c) => c.title)} submitLabel="Send Enquiry" />
          </div>
        </div>
        {rows.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold">Reach us directly</h2>
            <ul className="mt-5 space-y-4">
              {rows.map(({ I, label, node }) => (
                <li key={label} className="flex gap-3"><I size={20} className="mt-0.5 text-brand-blue" aria-hidden="true" /><div><p className="text-sm text-brand-muted">{label}</p><p className="font-medium">{node}</p></div></li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
