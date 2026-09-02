#!/usr/bin/env node
/**
 * Publish a post from content/posts/ to WordPress over the REST API.
 *
 *   node scripts/publish-post.mjs content/posts/<slug>.md          # draft
 *   node scripts/publish-post.mjs content/posts/<slug>.md --publish
 *   node scripts/publish-post.mjs content/posts/<slug>.md --dry-run
 *
 * Why this direction only. CLAUDE.md §11 keeps changes flowing Next -> WordPress,
 * and the blog is the one place that rule needed a written exception, because a
 * post is native WordPress content rather than a generated snapshot of a Next
 * route. The resolution is that posts *authored by an agent* are written here
 * first, reviewed in a PR, and pushed out by this script; posts a human writes
 * straight into wp-admin are legitimate and are simply not mirrored back. So this
 * script pushes and never pulls, and it only ever touches posts it created.
 *
 * That last part is enforced by the wpId written into the file's front matter
 * after the first publish. Without an id we POST and create; with one we PUT and
 * update exactly that post. Re-running is therefore idempotent, and the script
 * can never adopt or overwrite a post a human wrote by slug collision.
 *
 * Defaults to draft on purpose. §8 exists because claims on this site need to
 * survive a second-meeting probe, and a post is mostly claims, so going live is
 * a separate deliberate flag rather than the default path.
 *
 * Credentials come from ~/Documents/Projects/ferratalabs.wp, outside both repos,
 * the same arrangement push.sh uses for ferratalabs.sftp. WP_APP_PASS must be an
 * Application Password, never an account password.
 */
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { marked } from "marked";

const CONF = path.join(homedir(), "Documents/Projects/ferratalabs.wp");

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const publish = args.includes("--publish");
const dryRun = args.includes("--dry-run");

if (!file) {
  console.error("usage: node scripts/publish-post.mjs content/posts/<slug>.md [--publish] [--dry-run]");
  process.exit(1);
}

/** Minimal front matter reader. Deliberately not YAML: the fields are a fixed,
 *  small set and a parser dependency for six keys is not worth the supply chain. */
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("no front matter block found (file must start with ---)");
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const at = line.indexOf(":");
    if (at === -1) throw new Error(`front matter line is not key: value -> ${line}`);
    const key = line.slice(0, at).trim();
    let val = line.slice(at + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    meta[key] = val;
  }
  return { meta, body: m[2] };
}

async function loadCreds() {
  let raw;
  try {
    raw = await readFile(CONF, "utf8");
  } catch {
    throw new Error(`no credentials at ${CONF}. See the blog section of CLAUDE.md.`);
  }
  const creds = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const at = line.indexOf("=");
    if (at === -1) continue;
    creds[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  for (const k of ["WP_URL", "WP_USER", "WP_APP_PASS"]) {
    if (!creds[k] || creds[k].startsWith("REPLACE_WITH")) {
      throw new Error(`${k} is not set in ${CONF}`);
    }
  }
  return creds;
}

/** Resolve category names to term ids, creating any that do not exist yet. */
async function categoryIds(names, api, headers) {
  const ids = [];
  for (const name of names) {
    const found = await api(`/categories?search=${encodeURIComponent(name)}&per_page=100`);
    const hit = found.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (hit) {
      ids.push(hit.id);
      continue;
    }
    const res = await fetch(`${api.base}/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error(`could not create category "${name}": ${res.status} ${await res.text()}`);
    ids.push((await res.json()).id);
  }
  return ids;
}

const raw = await readFile(file, "utf8");
const { meta, body } = parseFrontMatter(raw);
if (!meta.title) throw new Error("front matter needs a title");

const slug = meta.slug || path.basename(file, ".md");
const html = marked.parse(body, { mangle: false, headerIds: false }).trim();

const payload = {
  title: meta.title,
  slug,
  content: html,
  excerpt: meta.excerpt || "",
  status: publish ? "publish" : "draft",
};
if (meta.date) payload.date = new Date(meta.date).toISOString();

if (dryRun) {
  console.log(`slug     ${slug}`);
  console.log(`title    ${meta.title}`);
  console.log(`status   ${payload.status}`);
  console.log(`wpId     ${meta.wpId || "(new)"} `);
  console.log(`html     ${html.length} bytes`);
  console.log(`\n${html.slice(0, 600)}${html.length > 600 ? "\n..." : ""}`);
  process.exit(0);
}

const creds = await loadCreds();
const base = `${creds.WP_URL.replace(/\/$/, "")}/wp-json/wp/v2`;
const auth = Buffer.from(`${creds.WP_USER}:${creds.WP_APP_PASS.replace(/\s+/g, "")}`).toString("base64");
const headers = { Authorization: `Basic ${auth}`, "Content-Type": "application/json" };

const api = async (p) => {
  const res = await fetch(`${base}${p}`, { headers });
  if (!res.ok) throw new Error(`GET ${p} failed: ${res.status} ${await res.text()}`);
  return res.json();
};
api.base = base;

if (Array.isArray(meta.categories) && meta.categories.length) {
  payload.categories = await categoryIds(meta.categories, api, headers);
}

const existing = meta.wpId ? String(meta.wpId).trim() : "";
const res = await fetch(existing ? `${base}/posts/${existing}` : `${base}/posts`, {
  method: "POST", // WordPress accepts POST for both create and update
  headers,
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error(`${existing ? "update" : "create"} failed: ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}

const post = await res.json();
console.log(`${existing ? "updated" : "created"}  id=${post.id}  status=${post.status}`);
console.log(`link      ${post.link}`);

// Record the id so the next run updates this post rather than creating a second.
if (!existing) {
  const stamped = raw.replace(/^---\r?\n/, `---\nwpId: ${post.id}\n`);
  await writeFile(file, stamped);
  console.log(`stamped   wpId: ${post.id} into ${file}`);
}

if (!publish) {
  console.log("\nSaved as a draft. Re-run with --publish when the copy is signed off.");
}
