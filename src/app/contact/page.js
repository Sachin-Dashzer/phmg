import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { firm, offices, hasAddress, phoneHref, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import { faqs } from "@/data/faqs";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";
import { OfficesGrid, FAQSection } from "@/components/sections/SiteSections";

export const metadata = buildMetadata({
  title: "Contact PHMG & Associates – Talk to a CA",
  description:
    "Contact PHMG & Associates for audit, tax, GST, litigation and advisory. Send an enquiry and our chartered accountants will get back to you. Talk to a CA today.",
  path: "/contact",
});

export default function Contact() {
  const a = firm.address;
  // Quick-contact tiles under the hero.
  const tiles = [
    firm.phone && { I: Phone, label: "Call us", value: firm.phone, href: phoneHref() },
    firm.email && { I: Mail, label: "Email us", value: firm.email, href: `mailto:${firm.email}` },
    firm.whatsapp && { I: MessageCircle, label: "WhatsApp", value: "Chat with us", href: waHref() },
    hasAddress() && { I: MapPin, label: "Head office", value: `${a.street}, ${a.city}` },
  ].filter(Boolean);
  const branches = offices.filter((o) => !o.head);
  // Secondary details in the side panel.
  const rows = [
    firm.phone2 && { I: Phone, label: "Phone (alternate)", node: <a href={`tel:${firm.phone2.replace(/[^+\d]/g, "")}`} className="hover:text-brand-gold">{firm.phone2}</a> },
    firm.email2 && { I: Mail, label: "Email (alternate)", node: <a href={`mailto:${firm.email2}`} className="hover:text-brand-gold">{firm.email2}</a> },
    hasAddress() && { I: MapPin, label: "Head office", node: [a.street, a.locality, a.city, a.region, a.postalCode].filter(Boolean).join(", ") },
    firm.hours && { I: Clock, label: "Hours", node: firm.hours },
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Get in touch"
        title={<>Let&apos;s talk about <span className="text-brand-gold">your business</span></>}
        intro="Tell us what you need. A chartered accountant from our team will review your enquiry and get back to you within one business day."
        image="/images/office/office-1.jpeg"
      />

      {tiles.length > 0 && (
        <div className="container-x relative z-10 -mt-10">
          <ul className="grid gap-4 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            {tiles.map(({ I, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-navy"><I size={20} aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</span>
                    <span className="block wrap-break-word font-semibold text-brand-navy">{value}</span>
                  </span>
                </>
              );
              const cls = `flex h-full items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-xl shadow-brand-navy/10${href ? " group transition hover:-translate-y-px hover:border-brand-gold focus-visible:outline-2 focus-visible:outline-brand-gold motion-reduce:hover:translate-y-0" : ""}`;
              return (
                <li key={label}>
                  {href ? <a href={href} rel={href.startsWith("http") ? "noopener" : undefined} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <section className="section bg-white">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_24rem]">
          <div id="enquiry" className="scroll-mt-28 rounded-2xl border border-brand-line bg-white p-6 shadow-lg shadow-brand-navy/5 md:p-10">
            <div className="section-label section-label-blue mb-4 w-fit">Enquiry form</div>
            <h2 className="font-display text-3xl font-bold">Send us an enquiry</h2>
            <p className="mt-2 text-brand-muted">Share a few details and we&apos;ll call you back with next steps and a clear fee.</p>
            <div className="mt-8">
              <LeadForm variant="full" id="contact" services={categories.map((c) => c.title)} submitLabel="Send Enquiry" />
            </div>
          </div>

          <aside className="h-fit overflow-hidden rounded-2xl bg-brand-navy text-white lg:sticky lg:top-28">
            <div className="relative h-48">
              <Image src="/images/office/office-3.jpeg" alt="" fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-navy to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl font-semibold text-white">Reach us directly</h2>
              <ul className="mt-5 space-y-4">
                {rows.map(({ I, label, node }) => (
                  <li key={label} className="flex gap-3">
                    <I size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                    <div className="min-w-0"><p className="text-xs text-white/60">{label}</p><p className="wrap-break-word text-sm font-medium text-white/90">{node}</p></div>
                  </li>
                ))}
                {branches.length > 0 && (
                  <li className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                    <div><p className="text-xs text-white/60">Branches</p><p className="text-sm font-medium text-white/90">{branches.map((o) => o.city).join(" · ")}</p></div>
                  </li>
                )}
              </ul>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                Your details are used only to respond to your enquiry and are never shared.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <OfficesGrid className="bg-brand-mist" />
      <FAQSection faqs={faqs} className="bg-white" ctaHref="#enquiry" />
    </>
  );
}
