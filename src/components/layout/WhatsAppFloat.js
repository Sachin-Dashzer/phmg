import { Phone } from "lucide-react";
import { firm, phoneHref, waHref } from "@/data/firm";

// Floating "WhatsApp now" + "Call now" buttons, bottom-right on every page.
// Icon-only; the label expands on hover. Sits above StickyMobileCTA's bar on mobile.
export default function WhatsAppFloat() {
  const wa = waHref();
  if (!wa && !firm.phone) return null;
  const btn =
    "group relative flex items-center rounded-full p-3.5 font-semibold text-white shadow-xl transition hover:-translate-y-0.5 motion-reduce:hover:transform-none";
  // Label stays collapsed until hover / keyboard focus, then slides out.
  const label =
    "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-32 group-hover:pl-2.5 group-hover:pr-1.5 group-hover:opacity-100 group-focus-visible:max-w-32 group-focus-visible:pl-2.5 group-focus-visible:pr-1.5 group-focus-visible:opacity-100";
  const halo = "absolute inset-0 -z-10 animate-ping rounded-full opacity-40 motion-reduce:hidden";
  return (
    // Hidden below md: StickyMobileCTA already offers Call / WhatsApp / Enquire there.
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp now" className={`${btn} bg-[#25d366] shadow-[#25d366]/40`}>
          <span aria-hidden="true" className={`${halo} bg-[#25d366]`} />
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.93.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.46 9.48-9.46 2.53 0 4.9.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46m8.06-17.52A11.32 11.32 0 0 0 12.05.64C5.77.64.66 5.75.66 12.03c0 2 .53 3.96 1.52 5.69L.57 23.6l6.03-1.58a11.4 11.4 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05" />
          </svg>
          <span className={label}>WhatsApp now</span>
        </a>
      )}
      {firm.phone && (
        <a href={phoneHref()} aria-label={`Call now: ${firm.phone}`} className={`${btn} bg-brand-navy ring-2 ring-brand-gold`}>
          <span aria-hidden="true" className={`${halo} bg-brand-gold [animation-delay:1s]`} />
          <Phone size={22} className="text-brand-gold transition-transform group-hover:rotate-12" aria-hidden="true" />
          <span className={label}>Call now</span>
        </a>
      )}
    </div>
  );
}
