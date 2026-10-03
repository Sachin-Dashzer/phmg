import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { firm } from "@/data/firm";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Analytics from "@/components/layout/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata = {
  metadataBase: new URL(firm.url),
  ...buildMetadata({
    title: "PHMG & Associates | Chartered Accountants in India",
    description:
      "Trusted CA firm for tax, audit, GST, company registration & compliance. Partner-led, transparent fees, pan-India online service. Book a free consultation.",
    path: "/",
    ownImage: true, // root opengraph-image.js supplies it
  }),
  applicationName: firm.name,
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined },
};

export const viewport = { themeColor: "#0b1f3a" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
