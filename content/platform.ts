/**
 * /platform — the layer the client owns. CLAUDE.md §1, §3.
 *
 * This page exists because the wedge in §3 was invisible on the site. Ferrata's
 * argument is that the enterprise needs the foundation *and* the agents, should
 * own the foundation, and should not buy the two from separate vendors. The
 * foundation was already being built, in the Anchor stage, but it had no name and
 * no page, so a buyer had nothing to repeat. Six named agents and an unnamed
 * platform is the wrong way round: the agents are the proof, the platform is the
 * asset.
 *
 * It is deliberately NOT a product page. Nothing here is licensed, and there is
 * no SKU. It is a description of what gets stood up inside the client's
 * environment and left behind.
 *
 * There is no "systems" pillar and there will not be one. Replacing core business
 * software is a different and much larger business, and it contradicts §1: the
 * engagement is designed to end. Recorded so a later pass does not read two
 * pillars as an unfinished copy of somebody else's three.
 */

export const platformPage = {
  title: "Platform",
  eyebrow: "The platform",
  headline: "Agents need a platform. You should own it.",
  lede:
    "A model gateway, retrieval over your systems of record, evaluation, audit and identity, stood up inside your environment in the first three weeks. It is yours whether or not you ever build another agent with us.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See the work",
};

/** The five layers. These are the Anchor stage, named. */
export const layers = [
  {
    id: "gateway",
    n: "Layer 01",
    t: "Model gateway",
    d: "One route to frontier and open-weight models, with the choice of model as a configuration rather than a rewrite. Spend, latency and failure are visible per workflow, so a model that gets slower or more expensive is something you notice rather than something you discover in an invoice.",
    keep: "Swap a model without touching an agent.",
  },
  {
    id: "retrieval",
    n: "Layer 02",
    t: "Retrieval over your systems of record",
    d: "Grounding against SAP, NetSuite or Dynamics, plus the documents and mailboxes where the real exceptions live. The point is not a chatbot over a wiki. It is an agent that can read the same ledger a controller reads, with the same permissions.",
    keep: "Your data stays in your environment.",
  },
  {
    id: "evaluation",
    n: "Layer 03",
    t: "Evaluation harnesses",
    d: "Every agent ships with a suite that runs against real historic transactions, so a change is measured before it reaches production rather than after. This is the difference between an agent you can improve and one you are afraid to touch.",
    keep: "You can change an agent without guessing.",
  },
  {
    id: "audit",
    n: "Layer 04",
    t: "Audit logging",
    d: "Every action an agent takes, what it read to decide, what it drafted, who released it and when. Written to be read by an auditor rather than a developer, because the controller who signs the close is the person who has to defend it.",
    keep: "The trail exists before anyone asks for it.",
  },
  {
    id: "identity",
    n: "Layer 05",
    t: "Identity and access",
    d: "Agents authenticate as themselves against your directory, with scopes a human can read and revoke. An agent should never hold a shared service account, and nobody should have to reason about what it can reach by reading code.",
    keep: "Revoke an agent the way you revoke a person.",
  },
];

/** Why owning it is the point, not a footnote. */
export const ownership = {
  heading: "Rented infrastructure is a fourth vendor.",
  intro:
    "The market has split into companies that sell you the foundation and companies that sell you agents running on a foundation they keep. Both leave you renting the part that should be an asset.",
  points: [
    {
      t: "It runs in your environment",
      d: "Your cloud, your accounts, your network boundary. Not a tenant on ours, and nothing calls home for permission to work.",
    },
    {
      t: "It survives us",
      d: "The gateway, the retrieval layer, the harnesses and the logs are all still there after the engagement ends. So is the ability to point them at an agent we had nothing to do with.",
    },
    {
      t: "It is one thing, not two contracts",
      d: "Buying the foundation from one vendor and the agents from another leaves you owning the integration between them. That integration is where these programs stall.",
    },
  ],
};

/** What actually gets delivered, and when. Ties the layer back to the engagement. */
export const delivery = {
  heading: "Stood up in three weeks, during Anchor.",
  intro:
    "The platform is not a separate project with its own business case. It is stage two of the same engagement, and the first agent goes live on top of it inside 90 days.",
  note: "Assess maps the workflows and produces the ranked list. Anchor stands up everything on this page. The first agent goes live behind an approval gate. Then more agents, then the handover.",
  linkLabel: "The full engagement, stage by stage",
};

/**
 * The Platform mega-menu, same two-column shape as Solutions.
 *
 * Embedded AI team sits here rather than at the top level so the nav gains one
 * item rather than two. Column one is the layer itself, column two is who runs
 * it and when, which is the question a buyer asks immediately after.
 */
export const platformMenu = {
  columns: [
    {
      h: "The platform",
      items: [
        { t: "Platform overview", d: "What gets stood up, and why you own it", href: "/platform" },
        { t: "Model gateway", d: "Frontier and open-weight behind one route", href: "/platform#gateway" },
        { t: "Retrieval", d: "Grounded in SAP, NetSuite or Dynamics", href: "/platform#retrieval" },
        { t: "Evaluation and audit", d: "Harnesses, and a trail an auditor can read", href: "/platform#audit" },
      ],
    },
    {
      h: "How it runs",
      items: [
        { t: "Embedded AI team", d: "The POD, and how ownership transfers", href: "/embedded-ai-team" },
        { t: "The engagement", d: "Four stages, first agent live in 90 days", href: "/how-it-works" },
      ],
    },
  ],
};
