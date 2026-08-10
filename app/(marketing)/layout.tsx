import type { Metadata } from "next";
import "../globals.css";
import { fontVars } from "@/lib/fonts";
import Rail from "@/components/Rail";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ferrata Labs — Enterprise AI agents that do the actual work",
    template: "%s — Ferrata Labs",
  },
  description:
    "Ferrata Labs designs, builds and runs AI agents that do the actual work inside enterprise operations. Built to your business, not off a shelf.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Rail />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
