import { articles } from "@/data/insights";
import { firm } from "@/data/firm";
import { absUrl } from "@/lib/seo";

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

export function GET() {
  const items = articles
    .map(
      (a) => `<item><title>${esc(a.title)}</title><link>${absUrl(`/insights/${a.slug}`)}</link><guid>${absUrl(`/insights/${a.slug}`)}</guid><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(firm.name)} Insights</title><link>${absUrl("/insights")}</link><description>Tax, GST and compliance guides.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
