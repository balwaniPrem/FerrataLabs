import type { Metadata } from "next";
import "../globals.css";
import { fontVars } from "@/lib/fonts";
import Rail from "@/components/Rail";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /*
   * Default and description come from content/seo.ts, which mirrors what Rank
   * Math serves on the live site. The old values here were the retired
   * one-liner, §1, and were still being sent to link previews.
   *
   * The template still applies to any page that sets a bare string title. Pages
   * carrying imported search metadata use `absolute`, because those titles are
   * already complete and the suffix would push them past displayed length.
   */
  title: {
    default: seo["/"].title,
    template: "%s. Ferrata Labs",
  },
  description: seo["/"].description,
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
