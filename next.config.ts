import type { NextConfig } from "next";

/**
 * Static preview builds.
 *
 *   PREVIEW_BASE=/v2 npm run build
 *
 * Set PREVIEW_BASE to the subdirectory the snapshot will be served from and the
 * whole site relocates under it: basePath rewrites every internal Link so a
 * preview never leaks back to the live pages, assetPrefix moves the chunks and
 * the fonts referenced from CSS, and trailingSlash makes each route a directory
 * with an index.html so a plain file server resolves it without a redirect hop.
 *
 * Without it the site builds at the domain root exactly as before, so production
 * output is unaffected. See scripts/snapshot-preview.mjs for the capture.
 */
const preview = process.env.PREVIEW_BASE;

const nextConfig: NextConfig = {
  ...(preview
    ? { basePath: preview, assetPrefix: preview, trailingSlash: true }
    : {}),
};

export default nextConfig;
