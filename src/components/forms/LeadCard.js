import { Check, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { firm, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import LeadForm from "./LeadForm";

const serviceOptions = categories.map((c) => c.title);

export default function LeadCard({
  title = "Let's discuss your requirements",
  points = [
    "Speak directly with a qualified CA",
    "Clear guidance for your requirements",
    "Confidential consultation",
  ],
  defaultService = "",
  id = "lead-card",
}) {
  return (
    <aside
      aria-label="Enquiry form"
      className="
        overflow-hidden
        rounded-xl
        border border-neutral-200
        bg-white
        shadow-[0_10px_35px_rgba(0,0,0,0.09)]
      "
    >
      {/* Top accent */}
      <div className="h-0.5 bg-linear-to-r from-brand-gold to-brand-gold/30" />

      {/* Compact heading */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-brand-gold" />

          <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            Free Consultation
          </span>
        </div>

        <h2 className="mt-2 text-[20px] font-semibold leading-tight text-brand-navy">
          {title}
        </h2>

        <p className="mt-1.5 text-[11px] leading-3.5 text-neutral-500">
          Tell us what you need and we&apos;ll get back to you.
        </p>

        {/* Very compact benefits */}
        <div className="mt-2.5 flex flex-col gap-1">
          {points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-1.5 text-[11px] leading-3.5 text-neutral-600"
            >
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15">
                <Check
                  size={9}
                  strokeWidth={3}
                  className="text-brand-gold"
                />
              </span>

              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="border-t border-neutral-100 bg-[#fcfcfb] px-5 py-4">
        <LeadForm
          id={id}
          services={serviceOptions}
          defaultService={defaultService}
        />

        {firm.whatsapp && (
          <>
            <div className="my-2.5 flex items-center gap-2">
              <span className="h-px flex-1 bg-neutral-200" />

              <span className="text-[8px] uppercase tracking-wider text-neutral-400">
                Or
              </span>

              <span className="h-px flex-1 bg-neutral-200" />
            </div>

            <a
              href={waHref()}
              rel="noopener"
              className="
                flex h-9 w-full items-center justify-center gap-1.5
                rounded-md
                border border-[#25D366]/30
                bg-[#25D366]/5
                text-[11px] font-semibold text-[#168b45]
                transition hover:bg-[#25D366]/10
              "
            >
              <MessageCircle size={14} />

              Chat on WhatsApp

              <ArrowRight size={12} />
            </a>
          </>
        )}

        <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-neutral-400">
          <ShieldCheck size={11} className="text-brand-gold" />
          <span>Your information is confidential</span>
        </div>
      </div>
    </aside>
  );
}