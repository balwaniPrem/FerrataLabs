# content/posts

Blog posts, authored here and pushed to WordPress by `scripts/publish-post.mjs`.

This directory is the review gate. §8 exists because every claim on this site has
to survive a second-meeting probe, and a post is mostly claims, so posts land in
a PR before they land on the site. Publishing straight from a chat window would
skip the diff, and that is exactly how an unverified number gets out.

## Writing one

Create `<slug>.md`. The file name is the URL slug unless front matter overrides it.

```markdown
---
title: What a three-way match actually costs you
excerpt: One sentence for the archive list and the search snippet.
date: 2026-09-04
categories: [Engineering]
---

Body in Markdown. Headings from `##` down; `#` is the post title and comes from
the front matter, so do not repeat it here.
```

| key | required | notes |
|---|---|---|
| `title` | yes | |
| `excerpt` | no | shown on the archive; Rank Math falls back to it |
| `date` | no | defaults to publish time |
| `slug` | no | defaults to the file name |
| `categories` | no | `[One, Two]`; created in WordPress if missing |
| `wpId` | never by hand | written back on first publish |

## Publishing

```bash
node scripts/publish-post.mjs content/posts/<slug>.md --dry-run   # render only
node scripts/publish-post.mjs content/posts/<slug>.md             # create a draft
node scripts/publish-post.mjs content/posts/<slug>.md --publish   # go live
```

Draft is the default. Going live is a separate deliberate flag.

The first run stamps `wpId` into the front matter. Every run after that updates
that exact post, so re-publishing is idempotent and the script can never adopt a
post somebody wrote by hand in wp-admin.

Needs `~/Documents/Projects/ferratalabs.wp` with `WP_URL`, `WP_USER` and
`WP_APP_PASS` (an Application Password). Outside both repos, never committed,
same arrangement `push.sh` uses for SFTP.

## What this directory is not

It is not a mirror of the blog. A post written directly in wp-admin is perfectly
legitimate and will not appear here. Sync is one-way and only for posts that
originated here. Pulling published posts back down is a later problem, and a
deliberate one.

These files are also not rendered by the Next app. There is no `/blog` route
here; the blog lives on WordPress only, and the "Blog" nav item exists in the
theme's `header.php` rather than in `components/Nav.tsx`.
