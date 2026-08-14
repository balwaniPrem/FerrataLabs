/**
 * Records an agent console and encodes it for the agent page. CLAUDE.md §13.
 *
 *   npm i -D playwright && npx playwright install chromium   # not a project dep
 *   npx next build && npx next start -p 3001                 # console must be served
 *   node scripts/record-console.mjs sterling
 *
 * Writes public/media/<slug>-console.{mp4,webm,png}.
 *
 * Why a recording and not a mock-up: div-based fake screenshots are a well-known
 * tell and the design skill bans them outright. This drives the real route.
 *
 * Why MP4/WebM and not GIF: GIF is capped at 256 colours, so UI text dithers and
 * the greys band. This is roughly a tenth the size and stays crisp.
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/record-console.mjs <agent-slug>");
  process.exit(1);
}

const BASE = process.env.BASE ?? "http://127.0.0.1:3001";
const OUT = "public/media";
const W = 1728, H = 1080;
const dir = mkdtempSync(path.join(tmpdir(), "console-"));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  recordVideo: { dir, size: { width: W, height: H } },
});
const page = await ctx.newPage();
await page.goto(`${BASE}/${slug}`, { waitUntil: "networkidle" });

const wait = (ms) => page.waitForTimeout(ms);
/** Eased programmatic scroll, so the pan reads as considered rather than jerky. */
const glide = (to, ms) =>
  page.evaluate(async ([to, ms]) => {
    const from = window.scrollY, t0 = performance.now();
    const ease = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
    await new Promise((res) => {
      const step = (t) => {
        const k = Math.min(1, (t - t0) / ms);
        window.scrollTo(0, from + (to - from) * ease(k));
        k < 1 ? requestAnimationFrame(step) : res();
      };
      requestAnimationFrame(step);
    });
  }, [to, ms]);

const hoverIfPresent = async (locator, ms) => {
  if (await locator.count()) {
    await locator.first().hover();
    await wait(ms);
  }
};

// Start and end at the top so the loop is seamless.
await wait(1500);
for (const label of ["Approval queue", "Ledger", "Cash position"]) {
  await hoverIfPresent(page.getByRole("link", { name: label }), 650);
}
for (const nm of ["Clark", "Tally", "Chandler", "Swift", "Quill"]) {
  await hoverIfPresent(page.locator(".rail-agent", { hasText: nm }), 420);
}
await hoverIfPresent(page.getByRole("link", { name: "Settings" }), 650);
await hoverIfPresent(page.getByRole("link", { name: "Data" }), 750);

await glide(320, 1300);
await wait(600);
await hoverIfPresent(page.locator("table.grid2 tbody tr").nth(0), 750);
await hoverIfPresent(page.locator("table.grid2 tbody tr").nth(1), 700);
await hoverIfPresent(page.locator(".draft .mini"), 1100);
await hoverIfPresent(page.locator(".draft").nth(1).locator(".mini"), 950);
await glide(1250, 1500);
await wait(1400);
await glide(0, 1400);
await wait(1100);

await ctx.close();
await browser.close();

const src = path.join(dir, readdirSync(dir).find((f) => f.endsWith(".webm")));
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args]);

// yuv420p and even dimensions are required by Safari and iOS; faststart lets it
// begin playing before the whole file arrives.
ff(["-i", src, "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    "-vf", "scale=1728:-2,fps=24", "-c:v", "libx264", "-crf", "24",
    "-preset", "slow", "-an", `${OUT}/${slug}-console.mp4`]);
ff(["-i", src, "-vf", "scale=1728:-2,fps=24", "-c:v", "libvpx-vp9",
    "-crf", "36", "-b:v", "0", "-an", `${OUT}/${slug}-console.webm`]);
// Poster doubles as the reduced-motion still, so take it after the page settles.
ff(["-ss", "1.0", "-i", src, "-frames:v", "1", "-vf", "scale=1728:-2",
    `${OUT}/${slug}-console.png`]);

rmSync(dir, { recursive: true, force: true });
console.log(`wrote ${OUT}/${slug}-console.{mp4,webm,png}`);
