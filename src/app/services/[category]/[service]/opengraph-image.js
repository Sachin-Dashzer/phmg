import { getService } from "@/data/services";
import { ogImage, ogSize, ogType } from "@/lib/og";

export const alt = "PHMG & Associates service";
export const size = ogSize;
export const contentType = ogType;

export default async function Image({ params }) {
  const { category, service } = await params;
  return ogImage(getService(category, service)?.h1 ?? "Our services", "Service");
}
