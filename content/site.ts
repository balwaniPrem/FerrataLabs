/**
 * Shared site copy — CLAUDE.md §1, §7, §8.
 * The CTA band is identical everywhere it appears. Keep it that way.
 */

export const site = {
  name: "Ferrata Labs",
  email: "hello@ferratalabs.ai",
  url: "https://ferratalabs.ai",
  blurb:
    "Enterprise AI agents that do the actual work — built around how your business already runs.",
};

/** §8 — every one of these is a claim that must survive a second-meeting probe. */
export const proof = [
  { fig: "$1.2B", cap: "Total GMV scaled across the platform and products we built" },
  { fig: "120+", cap: "Real-world FTEs of capacity unlocked, and counting" },
  { fig: "25 → 5", cap: "Days to close the books, with a reconciliation agent on it" },
  { fig: "30%", cap: "Improvement in AR collection times" },
];

export const cta = {
  eyebrow: "Next step",
  heading: "Bring us one workflow.",
  body: "Thirty minutes, no deck. Pick the process that costs you most in people, errors or delay, and we'll pressure-test whether an agent is genuinely the right answer for it.",
  list: [
    "An honest read on whether that workflow is a good agent candidate",
    "What the first deployment would involve, and roughly what it costs",
    "An honest answer if the sequencing is wrong and you should fix something else first",
  ],
};

/** The assisted vs agent-run comparison. Both columns end with a person. */
export const worlds = {
  manual: {
    tag: "Receivables → cash · assisted",
    items: [
      "Pull the aging report out of SAP by hand",
      "Guess which accounts to chase first",
      "Chase across scattered email threads",
      "Reconcile remittances line by line",
      "See the true cash position at month-end",
    ],
  },
  agentic: {
    tag: "Receivables → cash · agent-run",
    items: [
      "Aging and payables read live from the ERP",
      "Cash position narrated every morning",
      "Collection sequences drafted, prioritized by risk",
      "Remittance exceptions listed, not hunted",
    ],
    human: "Human approves and releases",
  },
};
