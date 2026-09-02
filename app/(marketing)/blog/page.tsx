import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "What we are learning putting AI agents into production inside real finance operations. Specific where we can be, and honest about what has not worked.",
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
          <h1>Notes from the work.</h1>
          <p>
            What we are learning putting agents into production inside real finance
            operations. Specific where we can be, and honest about what has not worked.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          {posts.length ? (
            <div className="post-list">
              {posts.map((p) => (
                <article key={p.slug} className="post-row">
                  {p.date && (
                    <p className="post-meta">
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                    </p>
                  )}
                  <h2>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h2>
                  {p.excerpt && <p className="post-excerpt">{p.excerpt}</p>}
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
