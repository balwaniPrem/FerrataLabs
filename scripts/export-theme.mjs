#!/usr/bin/env node
/**
 * Regenerate the WordPress theme's page bodies and stylesheet from the Next build.
 *
 *   npm run build && npx next start -p 3000 &
 *   node scripts/export-theme.mjs ../FerrataLabs-WordPress/site/wp-content/themes/ferrata-labs
 *
 * The theme renders header.php, then parts/<name>.php, then footer.php. header.php
 * ends by opening <main> and footer.php begins by closing it, so a part is exactly
 * the inner HTML of <main> on the corresponding Next route. That is what this
 * extracts, which is why the port cannot drift from the app: it is generated, not
 * transcribed.
 *
 * Three things are rewritten on the way through, and one is protected:
 *
 *   - internal links become home_url() so the site works on any domain
 *   - /media/ paths become get_theme_file_uri(), since public/ does not exist here
 *   - @font-face is stripped from the CSS; fonts.css already provides it with
 *     theme-relative URLs, and the build's copies point at /_next/
 *   - the contact form is NOT copied. It is a Next server action and would be dead
 *     markup. The card is replaced by inc/contact-card.php, the working PHP port,
 *     so the enquiry form keeps submitting exactly as it does today.
 */
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:3000";
const THEME = path.resolve(process.argv[2] || "../FerrataLabs-WordPress/site/wp-content/themes/ferrata-labs");

/** route -> part file, mirroring ferrata_routes() in functions.php. */
const ROUTES = {
  "/": "home",
  "/work": "work",
  "/how-it-works": "how-it-works",
  "/about": "about",
  "/contact": "contact",
  "/platform": "platform",
  "/embedded-ai-team": "embedded-ai-team",
  "/human-in-the-loop-ai": "human-in-the-loop-ai",
  "/thank-you": "thank-you",
};
for (const s of ["sterling", "clark", "tally", "chandler", "swift", "quill"]) {
  ROUTES[`/agents/${s}`] = `agents-${s}`;
}
for (const s of ["financial-services", "food-and-beverage", "construction",
  "manufacturing", "venture-and-private-capital", "logistics-and-supply-chain"]) {
  ROUTES[`/industries/${s}`] = `industries-${s}`;
}

const php = (expr) => `<?php echo esc_url( ${expr} ); ?>`;

function transform(html, route) {
  // React emits <!-- --> between adjacent text nodes so it can find the boundary
  // when hydrating. Nothing hydrates here, so they are noise.
  html = html.replace(/<!-- -->/g, "");
  // Suspense boundary markers, same story: hydration bookkeeping with nothing to
  // hydrate. <!--$--> ... <!--/$-->, and the ?/! variants for pending and errored.
  html = html.replace(/<!--\/?\$[^>]*?-->/g, "");
  // React escapes apostrophes; a literal one is legal inside the double-quoted
  // attributes React emits, and keeps the generated file readable.
  html = html.replace(/&#x27;/g, "'");

  // Links. Longest first is not needed because the pattern is anchored on the quote.
  html = html.replace(/href="\/([^"]*)"/g, (_, p) =>
    `href="${php(`home_url( '/${p}' )`)}"`);
  html = html.replace(/href="\/"/g, `href="${php("home_url( '/' )")}"`);

  // public/ assets live in the theme here.
  html = html.replace(/(["'])\/media\/([^"']+)\1/g, (_, q, f) =>
    `${q}${php("get_theme_file_uri( 'assets/media/' )")}${f}${q}`);

  // The contact card is a server action in Next and a PHP form here.
  if (route === "/contact") {
    const start = html.indexOf('<div class="card"><h3>Request a call</h3>');
    if (start === -1) throw new Error("contact: could not find the card to replace");
    // Walk the tag stack from the card's opening div to its match.
    let depth = 0, i = start;
    const tag = /<(\/?)div\b[^>]*>/g;
    tag.lastIndex = start;
    let m, end = -1;
    while ((m = tag.exec(html))) {
      depth += m[1] ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
    if (end === -1) throw new Error("contact: unbalanced div while replacing the card");
    html = html.slice(0, start) +
      "<?php get_template_part( 'inc/contact-card' ); ?>" +
      html.slice(end);
  }
  return html;
}

let wrote = 0;
for (const [route, part] of Object.entries(ROUTES)) {
  const res = await fetch(BASE + route);
  if (!res.ok) throw new Error(`${res.status} on ${route}`);
  const html = await res.text();

  const m = html.match(/<main[^>]*>([\s\S]*)<\/main>/);
  if (!m) throw new Error(`no <main> on ${route}`);
  let body = m[1];

  if (/\$ACTION_REF|__next_f/.test(body)) {
    // The RSC payload belongs after </main>; if it is inside, the slice is wrong.
    if (route !== "/contact") throw new Error(`${route}: framework payload inside <main>`);
  }

  body = transform(body, route);
  await writeFile(path.join(THEME, "parts", `${part}.php`), body + "\n");
  wrote++;
}

// Stylesheet. One compiled file, minus the faces fonts.css already declares.
const home = await (await fetch(BASE + "/")).text();
const href = home.match(/\/_next\/static\/chunks\/[A-Za-z0-9_-]+\.css/);
if (!href) throw new Error("could not find the stylesheet on /");
let css = await (await fetch(BASE + href[0])).text();
const faces = (css.match(/@font-face\{[^}]*\}/g) || []).length;
css = css.replace(/@font-face\{[^}]*\}/g, "");
if (/_next\//.test(css)) throw new Error("stylesheet still references /_next/ after stripping faces");
await writeFile(path.join(THEME, "assets", "site.css"), css);

console.log(JSON.stringify({
  theme: THEME, partsWritten: wrote, cssBytes: css.length, fontFacesStripped: faces,
}, null, 2));
