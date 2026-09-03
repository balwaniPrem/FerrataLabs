import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Playbooks and field notes from AI transformation work: what shipped, what stalled, and the numbers that explain the difference.",
};

/**
 * Local preview of the blog index. WordPress serves the real one from
 * home.php in the theme; this renders content/posts/ so post copy can be read
 * in the template before it is pushed. Class names are kept identical to the
 * theme's so the two cannot drift visually. CLAUDE.md §14.
 */
export default async function Blog() {
  const posts = await getPosts();

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">Writing</p>
          <h1>Production, not pilots.</h1>
          <p>
            Playbooks and field notes from AI transformation work: what shipped, what
            stalled, and the numbers that explain the difference.
          </p>
        </div>
      </header>

      {/* tint: the cards are --surface, so the section has to be --canvas or they
          have nothing to sit on and the empty cells in a short row show as holes. */}
      <section className="sec tint">
        <div className="wrap">
          {posts.length ? (
            <div className="post-list">
              {posts.map((p) => (
                <article key={p.slug} className="post-row">
                  <Link href={`/blog/${p.slug}`} className="post-thumb" tabIndex={-1} aria-hidden="true">
                    {/* Decorative: the title link beneath carries the accessible name.
                        Plain <img> rather than next/image because the fallback is an
                        SVG and WordPress serves these through its own pipeline. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" loading="lazy" />
                  </Link>
                  <div className="post-card-body">
                    {(p.date || p.categories.length > 0) && (
                      <p className="post-meta">
                        {p.date && <time dateTime={p.date}>{formatDate(p.date)}</time>}
                        {p.date && p.categories.length > 0 && <span className="sep">·</span>}
                        {p.categories.join(" · ")}
                      </p>
                    )}
                    <h2>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </h2>
                    {p.excerpt && <p className="post-excerpt">{p.excerpt}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="prose">
              <p>Nothing published yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
