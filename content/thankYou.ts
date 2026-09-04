/**
 * /thank-you — where the contact form lands. CLAUDE.md §5.
 *
 * It existed only as a hand-written part in the WordPress theme, which is why it
 * could not be reviewed locally. Written here so it comes under the same
 * source-of-truth rule as every other page.
 *
 * The old version put "What happens next" in one column and a bordered card
 * headed "While you wait" in the other. The card was doing nothing a link could
 * not: it boxed one sentence and a button, and a floating bordered box beside a
 * plain list reads as an afterthought rather than a layout. §4 allows cards in a
 * hairline grid, not as a single object sitting on its own.
 *
 * One column now, and the onward link is a link.
 *
 * Unlisted like the product routes: it is a conversion destination, and a search
 * result landing someone here means they see a thank-you for something they
 * never did.
 */

export const thankYou = {
  title: "Thank you",
  eyebrow: "Discovery call",
  headline: "Got it. Thank you.",
  lede:
    "We'll come back to you within one business day to find a time. If it's urgent, email us and it reaches the same place.",
  next: {
    heading: "What happens next",
    steps: [
      "We read what you sent and look at the workflow you named.",
      "We come back with a time, and what we'd want to cover in thirty minutes.",
      "If the sequencing is wrong and something else should come first, we say so.",
    ],
  },
  onward: {
    text: "In the meantime, the six agents and what each one owns end to end.",
    label: "See the work",
    href: "/work",
  },
};
