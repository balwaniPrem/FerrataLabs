/**
 * The commercial engagement sequence — CLAUDE.md §1.
 * This is what a CFO buys. ADLC (content/adlc.ts) is how we build inside step 03.
 * Durations are load-bearing claims; do not change them without asking.
 */

export type Step = {
  no: string;
  title: string;
  /** One-line version for the condensed home-page list. */
  short: string;
  /** Full paragraphs for /how-it-works. */
  body: string[];
  duration: string;
  /** Duration line as shown on the detail page, with its qualifier. */
  durationLong: string;
  deliverablesHeading: string;
  deliverables: string[];
};

export const steps: Step[] = [
  {
    no: "01",
    title: "Assess",
    short:
      "We map workflows, not org charts. You get a ranked list of candidate workflows with a defensible number attached to each, whether or not you go further with us.",
    body: [
      "We map workflows, not org charts. Transaction volumes, exception rates, where people are re-keying between systems, what the errors cost when they escape. In parallel we audit what you already have, cloud posture, data residency obligations, what your security team will and won't allow.",
      "The output is a ranked list with a defensible number against each line. You keep it whether or not you continue with us, because a ranking you can't take to your board isn't worth the two weeks.",
    ],
    duration: "2 weeks",
    durationLong: "2 weeks · you keep the output either way",
    deliverablesHeading: "You get",
    deliverables: [
      "Ranked workflows with a cost attached to each",
      "A target architecture for your environment",
      "What runs frontier, what runs open-weight, and why",
    ],
  },
  {
    no: "02",
    title: "Anchor the platform",
    short:
      "We stand up the platform in your environment, frontier models, open-weight, or both, depending on what your data residency and cost profile demand.",
    body: [
      "The foundational step, and the one most firms skip. We stand up model access and routing, serving for open-weight models where cost or residency demands it, retrieval across your documents and systems of record, evaluation harnesses, and the logging that makes any of it defensible.",
      "It runs in your environment and it belongs to you. This is the difference between buying agents and owning the capability to run them, and it is why the fourth step is possible at all.",
    ],
    duration: "3 weeks",
    durationLong: "3 weeks · the asset you keep",
    deliverablesHeading: "What gets built",
    deliverables: [
      "Model gateway across frontier and open-weight",
      "Retrieval over your own corpus and systems",
      "Inference in your VPC or on-premise",
      "Evaluation, cost controls and audit logging",
      "Identity and access wired to your directory",
    ],
  },
  {
    no: "03",
    title: "First agent live",
    short:
      "One agent, one workflow, in production against real transactions with a human approval gate on every action.",
    body: [
      "One agent, one workflow, in production against real transactions with a human approval gate on every action that matters. You watch it work on your own numbers before committing to a second.",
      "It's configured to your rules, your pricing logic, your approval thresholds, your escalation paths. This is where the Agent Development Lifecycle runs, and where you see what disciplined agent engineering actually looks like from the inside.",
    ],
    duration: "Under 90 days",
    durationLong: "Under 90 days from start",
    deliverablesHeading: "Non-negotiable",
    deliverables: [
      "Nothing releases cash without approval",
      "Every action logged and attributable",
      "Rollback path defined before go-live",
    ],
  },
  {
    no: "04",
    title: "Expand, then hand over",
    short:
      "Add agents as trust builds. When you want it in-house, we install the POD operating model with runbooks and evaluation harnesses documented.",
    body: [
      "Add agents as trust builds. When you want it in-house we install the POD operating model, one lead, five engineers, one QA per unit, with runbooks and evaluation harnesses documented.",
      "Your engineers build the next agents themselves, on infrastructure designed from day one to be handed over. You should never need us to change a prompt.",
    ],
    duration: "Ongoing",
    durationLong: "Ongoing, or until you don't need us",
    deliverablesHeading: "Enablement",
    deliverables: [
      "POD structure and hiring profile",
      "Agent development runbooks",
      "Evaluation harness your team can extend",
      "Managed operation if you'd rather not",
    ],
  },
];
