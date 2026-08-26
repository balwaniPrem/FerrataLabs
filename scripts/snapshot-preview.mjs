#!/usr/bin/env node
/**
 * Capture a static snapshot of the marketing site for review at a subdirectory
 * URL, e.g. ferratalabs.ai/v2/.
 *
 *   PREVIEW_BASE=/v2 npm run build
 *   PREVIEW_BASE=/v2 npx next start -p 3002
 *   node scripts/snapshot-preview.mjs /v2 http://localhost:3002 ../FerrataLabs-WordPress/site/v2
 *
 * It crawls rather than working from a route list. Starting at the base and
 * following internal links means the snapshot tracks whatever the nav actually
 * links to, so adding an agent or an industry needs no change here. It also
 * means the unlisted product consoles stay out on their own: nothing links to
 * them, so nothing reaches them. That is deliberate, per CLAUDE.md §12.
 *
 * Every captured page is forced to noindex. A preview on the live domain is
 * near-duplicate content against the real pages, and that is the one thing that
 * could actually cost us.
 */
import { mkdir, writeFile, cp, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [, , BASE = "/v2", ORIGIN = "http://localhost:3002", OUT_ARG] = process.argv;
const OUT = path.resolve(OUT_ARG ?? `./.preview${BASE}`);

const seen = new Set();
const queue = [`${BASE}/`];
const pages = [];
const problems = [];

/** Only follow real page links inside the preview base. */
const isPage = (href) =>
  href.startsWith(`${BASE}/`) &&
  !href.startsWith(`${BASE}/_next/`) &&
  !/\.(css|js|woff2?|png|jpe?g|svg|webm|mp4|xml|txt|ico)$/i.test(href);

while (queue.length) {
  const route = queue.shift();
  if (seen.has(route)) continue;
  seen.add(route);

  const res = await fetch(ORIGIN + route);
  if (!res.ok) {
    problems.push(`${res.status} ${route}`);
    continue;
  }
  let html = await res.text();

  const before = html;
  html = html.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow"/>',
  );
  if (html === before) {
    // Never publish a page we could not mark noindex.
    problems.push(`NO ROBOTS META ${route}`);
    continue;
  }

  // basePath does not rewrite references to public/ written by hand, so the
  // console recording on the Sterling page would still point at the domain root.
  html = html.replace(/(["'(])\/media\//g, `$1${BASE}/media/`);

  const dir = path.join(OUT, route.slice(BASE.length).replace(/^\/|\/$/g, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
  pages.push(route);

  for (const m of html.matchAll(/href="([^"#?]+)"/g)) {
    const href = m[1];
    if (isPage(href)) queue.push(href.endsWith("/") ? href : `${href}/`);
  }
}

// Chunks and fonts.
await mkdir(path.join(OUT, "_next"), { recursive: true });
await cp(".next/static", path.join(OUT, "_next/static"), { recursive: true });

// public/ is served under basePath by next start, but a plain file server needs
// the files copied in.
if (existsSync("public")) {
  for (const entry of await readdir("public")) {
    await cp(path.join("public", entry), path.join(OUT, entry), { recursive: true });
  }
}

// Favicons are route handlers rather than static assets, so they are fetched.
for (const icon of ["icon.svg", "apple-icon.png"]) {
  const r = await fetch(`${ORIGIN}${BASE}/${icon}`);
  if (r.ok) await writeFile(path.join(OUT, icon), Buffer.from(await r.arrayBuffer()));
  else problems.push(`${r.status} ${icon}`);
}

console.log(JSON.stringify({ out: OUT, pageCount: pages.length, pages: pages.sort(), problems }, null, 2));
if (problems.length) process.exitCode = 1;
