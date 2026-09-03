/**
 * /human-in-the-loop-ai — the approval gate, argued at length. CLAUDE.md §7, §13.
 *
 * §7 makes the gate non-negotiable and pairs it with every agent claim, but the
 * site only ever asserted it. This page is where it gets explained: what the gate
 * actually is, what earns an agent out of one, and the blended state most
 * operations end up in, where exceptions stop at a person and verified categories
 * run end to end.
 *
 * The keyword slug is deliberate. "Human in the loop" is what a buyer searches
 * when they have been told to get comfortable with agents and do not know how.
 *
 * Careful with the claim in `blended`: an agent released from a gate for one
 * category is a real thing we build toward, not something to imply is running
 * everywhere today. Keep it framed as a progression with evidence attached.
 */

export const hitlPage = {
  title: "Human in the loop",
  eyebrow: "Control",
  headline: "Every agent stops. Until it has earned its way out.",
  lede:
    "Nothing releases cash, commits spend or touches a customer without a person saying so. That is not a disclaimer bolted on at the end. It decides what gets built, and it is the reason a controller will sign.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See the platform",
};

/** What a gate actually is, as opposed to what people picture. */
export const gate = {
  heading: "A queue, not a confirmation dialog.",
  intro:
    "The version people picture is a modal that asks are you sure. Nobody reads the fortieth one of the morning, and an approval that is always granted is not a control.",
  points: [
    {
      t: "The work is already done",
      d: "The agent has pulled the records, scored them, drafted the action and matched the evidence. What it has not done is send, post or pay.",
    },
    {
      t: "The evidence sits with the action",
      d: "Each row shows what the agent read to decide, what it produced, and what changes if it goes through. Approving without opening anything else is the normal case.",
    },
    {
      t: "Release in batches, reject individually",
      d: "A dialog asks are you sure. A queue asks which of these forty is wrong. Only the second question is answerable at volume.",
    },
  ],
};

/** The guardrails that sit underneath, so the gate is not the only control. */
export const guardrails = {
  heading: "The gate is the last control, not the only one.",
  intro:
    "If the approval queue is the only thing standing between an agent and your ledger, the design is already wrong. Most of what stops an agent should stop it before a person is involved.",
  items: [
    {
      n: "01",
      t: "Scope",
      d: "The agent authenticates as itself against your directory and can reach only what its scopes allow. It cannot act outside them, whatever it decides.",
    },
    {
      n: "02",
      t: "Policy",
      d: "Value thresholds, counterparty rules, calling windows and segregation of duties are encoded as rules the agent cannot switch off, not as instructions it is asked to follow.",
    },
    {
      n: "03",
      t: "Confidence",
      d: "An agent that is not sure stops and says why. Uncertainty routes to a person rather than resolving itself into a plausible answer.",
    },
    {
      n: "04",
      t: "Evaluation",
      d: "Changes run against historic transactions before they reach production, so a regression is caught by the harness rather than by the queue.",
    },
    {
      n: "05",
      t: "Audit",
      d: "Every action, its evidence, its approver and its timestamp, written to be read by an auditor. The trail exists before anyone asks for it.",
    },
  ],
};

/** The part buyers actually want to know: when does the gate open. */
export const earning = {
  heading: "What earns an agent out of a gate.",
  intro:
    "Gates are not permanent, and treating them as permanent is its own failure. It is a decision made on evidence, by category, by you.",
  criteria: [
    "A release rate that has held for months, not weeks, on that category of action",
    "Corrections that are traceable to a cause you have fixed, rather than to judgment",
    "An evaluation suite that catches the failure you are worried about, demonstrated on real history",
    "A rollback path that has been used at least once, deliberately, in a rehearsal",
  ],
  note: "None of that is our call. We show you the numbers and the failure modes; you decide which categories run without a person and which never will.",
};

/** The end state, and the honest version of it. */
export const blended = {
  heading: "Most operations end up blended.",
  intro:
    "Not fully gated, and not fully autonomous. The categories that have proved themselves run end to end, and the exceptions, which is where the judgment was always needed, stop at a person.",
  columns: {
    auto: {
      tag: "Runs end to end",
      items: [
        "Matched, in tolerance, and inside policy",
        "Counterparty and value profile already seen many times",
        "Sampled after the fact rather than approved before it",
      ],
    },
    gated: {
      tag: "Stops at a person",
      items: [
        "Anything outside tolerance or policy",
        "New counterparty, or a value the category has not seen",
        "The agent's own uncertainty, surfaced rather than resolved",
        "Anything that releases cash, commits spend or reaches a customer for the first time",
      ],
    },
  },
  note: "The ratio is the number worth watching. It tells you how much of the work has genuinely moved, and it is the honest version of a capacity claim.",
};

/**
 * The How it works mega-menu.
 *
 * "The work" and "How it works" read as near-duplicates at the top level and
 * between them ate two of five slots. The engagement is the parent idea, so The
 * work moves underneath it and the top level loses an item.
 */
export const processMenu = {
  columns: [
    {
      h: "The engagement",
      items: [
        { t: "How it works", d: "Four stages, first agent live in 90 days", href: "/how-it-works" },
        { t: "The work", d: "What a transformation actually looks like", href: "/work" },
      ],
    },
    {
      h: "Control",
      items: [
        { t: "Human in the loop", d: "Approval gates, guardrails, and what opens them", href: "/human-in-the-loop-ai" },
        { t: "ADLC", d: "The agent development lifecycle", href: "/how-it-works#adlc" },
      ],
    },
  ],
};
