#!/usr/bin/env node
/**
 * Push content/seo.ts to Rank Math on the live site.
 *
 *   node scripts/push-seo.mjs --dry-run   # diff against live, change nothing
 *   node scripts/push-seo.mjs             # write the differences
 *   node scripts/push-seo.mjs /platform   # one route
 *
 * CLAUDE.md §11: titles and descriptions are authored in this repo and Rank
 * Math renders them. This is the only thing that moves them across, and it runs
 * against the live database rather than the theme, because that is where Rank
 * Math keeps them. export-theme.mjs cannot do this and should not try.
 *
 * Diff-then-write on purpose. It reads what Rank Math currently has, prints
 * every difference, and sends only the entries that actually changed. A run that
 * finds nothing writes nothing, so it is safe to run repeatedly, and --dry-run
 * is how a metadata change gets reviewed before it ships.
 *
 * It will not create pages. A route with no page on the server is reported and
 * skipped: silently creating pages from a metadata push would be a much larger
 * action than the one being asked for.
 */
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

const CONF = path.join(homedir(), "Documents/Projects/ferratalabs.wp");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const only = args.filter((a) => !a.startsWith("--"));

/** Route -> WordPress page slug. The two differ for nested routes. */
function slugFor(route) {
  const clean = route.replace(/^\/|\/$/g, "");
  if (clean === "") return "home";
  return clean.split("/").pop();
}

async function loadCreds() {
  let raw;
  try {
    raw = await readFile(CONF, "utf8");
  } catch {
    throw new Error(`no credentials at ${CONF}`);
  }
  const c = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const at = line.indexOf("=");
    if (at === -1) continue;
    c[line.slice(0, at).trim()] = line
      .slice(at + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  for (const k of ["WP_URL", "WP_USER", "WP_APP_PASS"]) {
    if (!c[k] || c[k].startsWith("REPLACE_WITH")) throw new Error(`${k} not set in ${CONF}`);
  }
  return c;
}

/**
 * content/seo.ts is TypeScript, so node cannot import it directly and a build
 * step for one object would be worse than reading it.
 *
 * The object literal is evaluated rather than pattern-matched into JSON. A
 * regex that quotes bare keys also corrupts any string containing a colon,
 * which these descriptions routinely do; an object literal is already valid
 * JavaScript, so evaluating it is both simpler and correct.
 */
async function loadSeo() {
  const src = await readFile(new URL("../content/seo.ts", import.meta.url), "utf8");
  const start = src.indexOf("{", src.indexOf("export const seo"));
  let depth = 0;
  let end = -1;
  let inStr = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end === -1) throw new Error("could not find the seo object literal in content/seo.ts");
  return Function(`"use strict"; return (${src.slice(start, end)});`)();
}

const creds = await loadCreds();
const base = `${creds.WP_URL.replace(/\/$/, "")}/wp-json`;
const auth = Buffer.from(
  `${creds.WP_USER}:${creds.WP_APP_PASS.replace(/\s+/g, "")}`
).toString("base64");
const headers = { Authorization: `Basic ${auth}`, "Content-Type": "application/json" };

const seo = await loadSeo();
const routes = only.length ? only : Object.keys(seo);

let changed = 0;
let skipped = 0;
let missing = 0;

for (const route of routes) {
  const entry = seo[route];
  if (!entry) {
    console.log(`?  ${route}  not in content/seo.ts`);
    missing++;
    continue;
  }

  const slug = slugFor(route);
  const found = await fetch(`${base}/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id`, {
    headers,
  }).then((r) => r.json());
  if (!Array.isArray(found) || !found.length) {
    console.log(`!  ${route}  no page with slug "${slug}" on the server, skipped`);
    missing++;
    continue;
  }
  const id = found[0].id;

  const current = await fetch(
    `${base}/wp-abilities/v1/abilities/rank-math/get-post-seo-meta/run?input[post_id]=${id}`,
    { headers }
  ).then((r) => r.json());

  const diffs = [];
  if ((current.title ?? "") !== entry.title) {
    diffs.push(["title", current.title ?? "", entry.title]);
  }
  if ((current.description ?? "") !== entry.description) {
    diffs.push(["description", current.description ?? "", entry.description]);
  }
  if ((current.focus_keyword ?? "") !== entry.keyword) {
    diffs.push(["focus keyword", current.focus_keyword ?? "", entry.keyword]);
  }

  if (!diffs.length) {
    skipped++;
    continue;
  }

  console.log(`\n${dryRun ? "would update" : "updating"}  ${route}  (page ${id})`);
  for (const [field, was, now] of diffs) {
    console.log(`   ${field}`);
    console.log(`     live: ${was || "(empty)"}`);
    console.log(`     repo: ${now}`);
  }
  changed++;

  if (dryRun) continue;

  const res = await fetch(`${base}/rankmath/v1/updateMeta`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      objectType: "post",
      objectID: id,
      meta: {
        rank_math_title: entry.title,
        rank_math_description: entry.description,
        rank_math_focus_keyword: entry.keyword,
      },
    }),
  });
  if (!res.ok) {
    console.error(`   FAILED ${res.status}: ${await res.text()}`);
    process.exitCode = 1;
  }
}

console.log(
  `\n${changed} ${dryRun ? "would change" : "changed"}, ${skipped} already current` +
    (missing ? `, ${missing} skipped` : "")
);
if (dryRun && changed) console.log("Re-run without --dry-run to write these.");
