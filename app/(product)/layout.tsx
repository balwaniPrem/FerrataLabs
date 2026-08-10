import type { Metadata } from "next";
import "../globals.css";
import { fontVars } from "@/lib/fonts";

/**
 * Product root layout — deliberately separate from the marketing chrome. No nav,
 * no footer, no rail. See CLAUDE.md §12.
 *
 * noindex/nofollow is set here rather than per-page so that anything added under
 * (product) inherits it. Unlisted is not private: anyone with the URL can read this.
 */
export const metadata: Metadata = {
  title: "Pledge",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ProductLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="min-h-full flex flex-col app-shell">{children}</body>
    </html>
  );
}
