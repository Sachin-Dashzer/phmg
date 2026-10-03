import Link from "next/link";
import { Phone, MessageCircle, Send } from "lucide-react";
import { firm, phoneHref, waHref } from "@/data/firm";

export default function StickyMobileCTA() {
  const item = "flex min-h-12 flex-1 items-center justify-center gap-2 font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-line bg-white md:hidden">
      {firm.phone && <a href={phoneHref()} className={`${item} text-brand-blue-dark`}><Phone size={18} aria-hidden="true" />Call</a>}
      {firm.whatsapp && <a href={waHref()} className={`${item} text-[#0e7a40]`} rel="noopener"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>}
      <Link href="/contact" className={`${item} bg-brand-blue text-white`}><Send size={18} aria-hidden="true" />Enquire</Link>
    </div>
  );
}
