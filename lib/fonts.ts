import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

/**
 * Shared across both root layouts (marketing and product) so the two surfaces
 * stay typographically identical. CLAUDE.md §4.
 */

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVars = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`;
