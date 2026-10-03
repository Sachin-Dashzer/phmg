import { MessageCircle } from "lucide-react";
import { firm, waHref } from "@/data/firm";

export default function WhatsAppFloat() {
  if (!firm.whatsapp) return null;
  return (
    <a href={waHref()} rel="noopener" aria-label="Chat on WhatsApp" className="btn btn-whatsapp fixed bottom-6 right-6 z-40 hidden rounded-full shadow-lg md:inline-flex">
      <MessageCircle size={20} aria-hidden="true" />Need help?
    </a>
  );
}
