/**
 * /agents — the plain-English explainer for the roster. CLAUDE.md §5, §6, §7.
 *
 * This page exists because six agents were reachable only as six separate detail
 * pages or as a grid inside an argument about something else. A buyer who does not
 * already know what an agent is had nowhere to find out, and /agents itself was a
 * 301 to /work.
 *
 * It is deliberately NOT a fourth listing of the same grid. The home page shows the
 * six at a glance, /work argues them as proof that real work shipped, and the detail
 * pages carry the mechanism. This one answers a simpler question: what does each of
 * these actually accomplish, in a sentence, for somebody who has not bought AI
 * before. That is why it leads on Agent.outcome rather than the bullets.
 *
 * Two things here are not optional. §6: the personalization message closes every
 * agent page, and this is one. §7: every agent claim is paired with the approval
 * gate, and a page that is six agent claims end to end needs the gate stated
 * plainly rather than implied.
 */

export const agentsPage = {
  title: "Agents",
  eyebrow: "The agents",
  headline: "Six agents. Each owns a piece of",
  headlineHl: "finance work",
  headlineEnd: "end to end.",
  lede:
    "Not assistants that summarize your ledger and hand the work back. Each of these runs a real workflow inside your own systems, does what a person would have done, and stops before anything that cannot be undone.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See how they get built",
};

/** The category explained before the roster, for a reader who has not bought this before. */
export const whatItIs = {
  heading: "What an agent is, in plain terms.",
  intro:
    "The word gets used loosely enough to mean almost nothing. Here is what it means here.",
  points: [
    {
      t: "It does the work",
      d: "A chatbot tells you which invoices look wrong. An agent opens them, checks each one against the purchase order and the goods receipt, posts the ones that match, and puts the rest in front of a person with the reason already attached.",
    },
    {
      t: "It works inside your systems",
      d: "Not beside them. It reads and writes to SAP, NetSuite or Dynamics directly, against live tables rather than an export somebody remembered to run on Monday.",
    },
    {
      t: "It stops before anything irreversible",
      d: "Every one of them drafts up to the point where money moves, spend is committed or a customer is contacted. Then it waits.",
    },
  ],
};

/** The roster, led by outcome rather than capability. */
export const roster = {
  heading: "What each one is for.",
  intro:
    "One line each, in terms of what changes for the business rather than what the software does.",
};

/** §7. A page of six agent claims states the gate rather than implying it. */
export const gateSection = {
  heading: "Where every one of them stops.",
  body:
    "None of these agents is trusted on day one, and none of them is asked to be. Each works to a queue that a person releases, and earns its way out of that queue on the workflows where it has been right often enough to stop being checked. The ones that touch cash, spend or a customer never leave it.",
  linkLabel: "How the approval gate works",
};

/** §6 framing rule. The roster is the shape of what gets built, not a catalogue you buy from. */
export const personalizationSection = {
  heading: "None of these arrive as a template.",
  intro:
    "The six names describe the shape of the work, not a product you switch on. What makes each one yours is the part no vendor can ship.",
  points: [
    {
      t: "Your rules, not ours",
      d: "Your pricing logic, your approval thresholds, your escalation paths and the reasons you treat one customer differently from another. That logic is your advantage and it stays yours.",
    },
    {
      t: "Your systems as they actually are",
      d: "Including the fields somebody repurposed in 2019, the customer master that disagrees with itself, and the workflow that only makes sense once you know who used to run it.",
    },
    {
      t: "Built in your environment",
      d: "On the platform stood up inside your tenancy, against your data, with your identity and your audit trail. Nothing is rented back to you afterwards.",
    },
  ],
};
