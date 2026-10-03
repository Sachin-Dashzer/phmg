import { ogImage, ogSize, ogType } from "@/lib/og";

export const alt = "PHMG & Associates – Chartered Accountants in India";
export const size = ogSize;
export const contentType = ogType;

export default function Image() {
  return ogImage("Tax, Audit, GST & Company Compliance");
}
