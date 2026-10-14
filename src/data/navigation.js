import { categories } from "./categories.js";
import { servicesIn, serviceUrl } from "./services.js";

// Mega-menu and footer are built from data, so published services appear automatically.
export const megaMenu = categories.map((c) => ({
  title: c.title,
  href: `/services/${c.slug}`,
  items: servicesIn(c.slug).map((s) => ({ title: s.title, href: serviceUrl(s) })),
}));

// Eight items is what the desktop bar holds at lg once the link padding tightens (see Header.js).
// Adding a ninth means either a shorter label or grouping two of these under a dropdown.
export const mainNav = [
  { title: "Services", href: "/services", mega: true },
  { title: "Industries", href: "/industries" },
  { title: "Insights", href: "/insights" },
  { title: "Resources", href: "/knowledge-bank" },
  { title: "Gallery", href: "/gallery" },
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];

export const legalLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms", href: "/terms" },
  { title: "Disclaimer", href: "/disclaimer" },
];
