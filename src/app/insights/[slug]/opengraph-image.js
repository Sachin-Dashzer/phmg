import { getArticle } from "@/data/insights";
import { ogImage, ogSize, ogType } from "@/lib/og";

export const alt = "PHMG & Associates insight";
export const size = ogSize;
export const contentType = ogType;

export default async function Image({ params }) {
  const { slug } = await params;
  return ogImage(getArticle(slug)?.title ?? "Insights", "Insights");
}
