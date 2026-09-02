import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/**
 * Reads content/posts/*.md at build time.
 *
 * These routes are a *preview* of what WordPress will serve, not the published
 * blog. WordPress owns the live one, including any post written by hand in
 * wp-admin, which will never appear here. The point of rendering them locally is
 * that post copy gets reviewed in the template it will actually appear in rather
 * than as raw markdown in a PR diff. See CLAUDE.md §14.
 *
 * The front matter format is specified in content/posts/README.md.
 * scripts/publish-post.mjs carries its own copy of this parser because it runs as
 * plain node outside the TypeScript build; the two must agree, so change the
 * README first and then both.
 */

const DIR = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO, or empty when the file has no date. */
  date: string;
  categories: string[];
  html: string;
};

function parseFrontMatter(raw: string): { meta: Record<string, string | string[]>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("no front matter block (file must start with ---)");
  const meta: Record<string, string | string[]> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    const val = line.slice(at + 1).trim();
    meta[key] =
      val.startsWith("[") && val.endsWith("]")
        ? val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean)
        : val.replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

export async function getPosts(): Promise<Post[]> {
  let files: string[];
  try {
    files = await readdir(DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") && f !== "README.md")
      .map(async (f) => {
        const raw = await readFile(path.join(DIR, f), "utf8");
        const { meta, body } = parseFrontMatter(raw);
        const cats = meta.categories;
        return {
          slug: str(meta.slug) || path.basename(f, ".md"),
          title: str(meta.title) || path.basename(f, ".md"),
          excerpt: str(meta.excerpt),
          date: str(meta.date),
          categories: Array.isArray(cats) ? cats : cats ? [cats] : [],
          html: (await marked.parse(body)).trim(),
        };
      })
  );

  // Newest first. Undated files sort last rather than to an arbitrary position.
  return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

/** "4 September 2026", matching the theme's get_the_date( 'j F Y' ). */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
