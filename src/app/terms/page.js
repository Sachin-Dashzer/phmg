import LegalPage, { legalMetadata } from "@/components/ui/LegalPage";

export const metadata = legalMetadata("terms");
export default function Page() {
  return <LegalPage slug="terms" />;
}
