import { categories } from "./categories";
import { servicesIn, serviceUrl } from "./services";

// Mega-menu and footer are built from data, so published services appear automatically.
export const megaMenu = categories.map((c) => ({
  title: c.title,
  href: `/services/${c.slug}`,
  items: servicesIn(c.slug).map((s) => ({ title: s.title, href: serviceUrl(s) })),
}));

export const mainNav = [
  { title: "Services", href: "/services", mega: true },
  { title: "Industries", href: "/industries" },
  { title: "Insights", href: "/insights" },
  { title: "Tools", href: "/tools" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const legalLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms", href: "/terms" },
  { title: "Disclaimer", href: "/disclaimer" },
];
