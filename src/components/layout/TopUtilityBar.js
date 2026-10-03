import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { firm, phoneHref } from "@/data/firm";

export default function TopUtilityBar() {
  if (!firm.phone && !firm.email) return null;
  return (
    <div className="hidden bg-brand-navy text-sm text-white md:block">
      <div className="container-x flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          {firm.phone && (
            <a href={phoneHref()} className="flex items-center gap-2 hover:underline"><Phone size={14} aria-hidden="true" />{firm.phone}</a>
          )}
          {firm.email && (
            <a href={`mailto:${firm.email}`} className="flex items-center gap-2 hover:underline"><Mail size={14} aria-hidden="true" />{firm.email}</a>
          )}
          {firm.hours && <span className="text-white/80">{firm.hours}</span>}
        </div>
        <Link href="/book-consultation" className="font-semibold hover:underline">Book Free Consultation</Link>
      </div>
    </div>
  );
}
