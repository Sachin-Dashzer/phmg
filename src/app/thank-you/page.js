import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Thank You", description: "Thank you for your enquiry.", path: "/thank-you", noindex: true });

export default function ThankYou() {
  return (
    <section className="container-x section text-center">
      <h1 className="text-4xl font-extrabold">Thank you</h1>
      <p className="mx-auto mt-4 max-w-md text-lg">We have received your enquiry. A member of our team will contact you shortly.</p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </section>
  );
}
