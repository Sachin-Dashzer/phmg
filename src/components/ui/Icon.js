import {
  ClipboardCheck, FileText, Receipt, Building2, Landmark, Calculator, Globe2, TrendingUp, HeartHandshake,
  Laptop, ShoppingCart, Building, Factory, Stethoscope, BriefcaseBusiness, Palette, Ship, Layers,
} from "lucide-react";

const map = { ClipboardCheck, FileText, Receipt, Building2, Landmark, Calculator, Globe2, TrendingUp, HeartHandshake };

export const Icon = ({ name, ...props }) => {
  const C = map[name] || FileText;
  return <C aria-hidden="true" {...props} />;
};

const industryMap = {
  "it-saas-startups": Laptop,
  "ecommerce-retail": ShoppingCart,
  "real-estate-construction": Building,
  manufacturing: Factory,
  "healthcare-pharma": Stethoscope,
  professionals: BriefcaseBusiness,
  "freelancers-creators": Palette,
  "ngos-trusts": HeartHandshake,
  "export-import": Ship,
};

export const IndustryIcon = ({ slug, ...props }) => {
  const C = industryMap[slug] || Layers;
  return <C aria-hidden="true" {...props} />;
};
