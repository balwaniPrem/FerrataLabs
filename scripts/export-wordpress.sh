#!/usr/bin/env bash
# Renders the three files that need to sit at the WordPress web root.
#
# The Next app is the source of truth for llms.txt and llms-full.txt (they are
# generated from content/), so these are exports, not hand-written copies.
# Re-run after any content change.
#
#   npm run build && npx next start -p 3001 &
#   ./scripts/export-wordpress.sh
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:3001}"
OUT="wordpress-upload"

if ! curl -sf -o /dev/null "$BASE/llms.txt"; then
  echo "error: $BASE is not serving. Start it with: npx next start -p 3001" >&2
  exit 1
fi

mkdir -p "$OUT"
curl -sf "$BASE/llms.txt"      -o "$OUT/llms.txt"
curl -sf "$BASE/llms-full.txt" -o "$OUT/llms-full.txt"

# robots.txt is written here rather than exported: the Next app's version points at
# its own sitemap route, which does not exist on the WordPress install.
cat > "$OUT/robots.txt" <<'ROBOTS'
User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://ferratalabs.ai/wp-sitemap.xml
ROBOTS

cat > "$OUT/README.md" <<'README'
# Upload these to the WordPress web root

Put all three in the folder that contains `wp-config.php` and `wp-content`
(10Web: Hosting -> File Manager, or SFTP). Then purge the 10Web cache.

| File | Why |
|---|---|
| `llms.txt` | Map of the site for answer engines, per llmstxt.org |
| `llms-full.txt` | Long form: agent runbooks, industries, ADLC, FAQ |
| `robots.txt` | A physical file here **overrides** the one WordPress generates, which is the only way to add the `Sitemap:` line |

## Before robots.txt helps, fix the sitemap

`https://ferratalabs.ai/wp-sitemap.xml` currently returns **404**. WordPress 5.5+
generates it automatically, so something disabled it, usually an SEO plugin that
took over and was never configured. The `Sitemap:` line points nowhere until that
is fixed. Fix the sitemap first, then confirm the URL loads, then upload.

## Deliberately not in robots.txt

No `Disallow: /pledge/`. That page carries `noindex`, and disallowing it would stop
crawlers reading the noindex, which can leave the URL indexed with no content: worse
than leaving it alone. Trash the page in WP Admin instead.

## Regenerating

`llms.txt` and `llms-full.txt` are generated from `content/` by the Next app, so they
cannot drift from the site. Do not hand-edit them here. Re-export with:

```
npm run build && npx next start -p 3001 &
./scripts/export-wordpress.sh
```
README

echo "wrote:"
ls -1 "$OUT" | sed 's/^/  '"$OUT"'\//'
