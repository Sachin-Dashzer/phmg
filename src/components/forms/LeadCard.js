import { Check, MessageCircle } from "lucide-react";
import { firm, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import LeadForm from "./LeadForm";

const serviceOptions = categories.map((c) => c.title);

export default function LeadCard({ title = "Get a free consultation", points = ["Reply from a qualified CA", "Clear fee before we start", "Your data stays confidential"], defaultService = "", id = "lead-card" }) {
  return (
    <aside className="card p-6 shadow-lg" aria-label="Enquiry form">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand-success" aria-hidden="true" />{p}</li>
        ))}
      </ul>
      <div className="mt-4">
        <LeadForm id={id} services={serviceOptions} defaultService={defaultService} />
      </div>
      {firm.whatsapp && (
        <a href={waHref()} rel="noopener" className="btn btn-whatsapp mt-3 w-full"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a>
      )}
    </aside>
  );
}
