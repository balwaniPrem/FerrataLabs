import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost, formatDate } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

/**
 * Local preview of one post. Rank Math owns titles and descriptions on the live
 * site, so the metadata here is for the preview only. CLAUDE.md §14.
 */
export default async function Post({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  // getPosts() is newest first, so the next entry is the older post.
  const older = posts[i + 1];
  const newer = posts[i - 1];

  return (
    <article>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">Writing</p>
          <h1>{post.title}</h1>
          {(post.date || post.categories.length > 0) && (
            <p className="post-meta">
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              {post.date && post.categories.length > 0 && <span className="sep">·</span>}
              {post.categories.join(" · ")}
            </p>
          )}
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <figure className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="" />
          </figure>

          <div
            className="prose post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {(older || newer) && (
            <nav className="post-nav" aria-label="More writing">
              {older && (
                <Link href={`/blog/${older.slug}`}>
                  <span className="k">Previous</span>
                  <span className="t">{older.title}</span>
                </Link>
              )}
              {newer && (
                <Link href={`/blog/${newer.slug}`}>
                  <span className="k">Next</span>
                  <span className="t">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </article>
  );
}
