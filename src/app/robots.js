import { absUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: absUrl("/sitemap.xml"),
  };
}
