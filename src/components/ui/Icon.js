import { ClipboardCheck, FileText, Receipt, Building2, Landmark, Calculator, Globe2, TrendingUp, HeartHandshake } from "lucide-react";

const map = { ClipboardCheck, FileText, Receipt, Building2, Landmark, Calculator, Globe2, TrendingUp, HeartHandshake };

export const Icon = ({ name, ...props }) => {
  const C = map[name] || FileText;
  return <C aria-hidden="true" {...props} />;
};
