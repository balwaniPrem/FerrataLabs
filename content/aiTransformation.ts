/**
 * /ai-transformation — the AI Absent to AI Native arc, argued. CLAUDE.md §1, §5.
 *
 * §1 names this arc as the spine of the whole positioning and says every section
 * on the home page should sit somewhere on it, but no page owned it at depth. The
 * home page gestures at it in a fold; this is the argument.
 *
 * The boundary that keeps this page honest: it must not restate the four steps.
 * /how-it-works owns the commercial sequence a CFO buys, at the altitude of what
 * you are purchasing. This page sits one level above it, at the altitude of what
 * has to become true inside the business, and links out rather than repeating.
 * If a future pass finds four stages here that look like assess, anchor, first
 * agent, expand, this page has collapsed into the other one and should be cut.
 *
 * Reached from the footer only, deliberately. It is a keyword target for
 * "enterprise ai transformation" and does not earn a nav slot: §5 records that
 * the top level is already full and that sprawl destroyed the argument once.
 * That is also why it carries a real argument rather than a keyword and a form.
 */

export const aiTransformationPage = {
  title: "Enterprise AI transformation",
  eyebrow: "Enterprise AI transformation",
  headline: "Most enterprise AI transformation stalls",
  headlineHl: "between the demo and the ledger",
  headlineEnd: ".",
  lede:
    "The distance from AI absent to AI native runs through five stages, and almost everyone gets stuck in the middle one, where people work faster and the operation itself never changes. This is what the rest of the arc actually takes.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See the engagement",
};

/** The arc. Five stages, not four, so this can never be mistaken for the engagement. */
export const arc = {
  heading: "AI absent to AI native, in five stages.",
  intro:
    "Most organizations can place themselves on this in about ten seconds. The useful question is not where you are, it is which move you are actually trying to make.",
  stages: [
    {
      n: "Stage 01",
      t: "AI absent",
      d: "Nothing sanctioned, no policy, no budget line. This almost never means nothing is happening: it usually means finance staff are pasting ledger extracts into a consumer chatbot on their own logins, and nobody has written that down.",
      tell: "You cannot name who would own it.",
    },
    {
      n: "Stage 02",
      t: "Piloted",
      d: "A proof of concept that demonstrated well and moved nothing. It ran on extracted sample data, in a sandbox, against a workflow chosen because it was easy rather than because it was expensive.",
      tell: "The demo impressed everyone and shipped to no one.",
    },
    {
      n: "Stage 03",
      t: "Assisted",
      d: "People use AI to do their own work faster. Drafting, summarizing, explaining a variance. Real gains, genuinely felt, and the process, the headcount and the cycle time are all exactly what they were.",
      tell: "Everyone is busy with AI and the close still takes as long.",
    },
    {
      n: "Stage 04",
      t: "Agent-run",
      d: "Agents perform the work end to end inside the systems of record, and a person approves what matters. The workflow changes shape here for the first time: the queue is exceptions rather than everything.",
      tell: "A person reviews the work instead of doing it.",
    },
    {
      n: "Stage 05",
      t: "AI native",
      d: "The operation is designed around what agents do rather than retrofitted to them. People hold judgment, relationships and exceptions. New workflows are built agent-first by your own team, because by now it is your team building them.",
      tell: "You add an agent without calling anyone.",
    },
  ],
};

/** The honest middle. This is the section that makes the page worth reading. */
export const stall = {
  heading: "Why almost everyone stops at stage three.",
  intro:
    "Assisted is a comfortable place to stop, and it is where most enterprise AI programs quietly end. Three reasons, in the order they usually bite.",
  reasons: [
    {
      t: "The pilot was never going to survive the ledger",
      d: "A demo runs on an export somebody cleaned. Production runs on a customer master that disagrees with itself, fields repurposed six years ago, and a workflow that only makes sense once you know who used to run it. The gap between those two is not a modeling problem and no better model closes it.",
    },
    {
      t: "Nobody could say who owned it",
      d: "The pilot sat on a vendor's infrastructure with the vendor's team operating it. When it worked, there was no route to a second workflow that did not start with another statement of work. Ownership was never transferred because there was never anything to transfer.",
    },
    {
      t: "Assisted looks enough like success",
      d: "It is measurable, it is popular internally, and it is genuinely useful. It is also the stage where cost per transaction does not move, because the work is still being done by the same people in the same order. Stopping here is a decision, and it is worth making on purpose rather than by default.",
    },
  ],
};

/** What actually earns the next stage. Each point links out rather than restating. */
export const earned = {
  heading: "What earns the move to stage four.",
  intro:
    "Trust is not a posture and it is not a slide. It is four things being true, each of which you can check.",
  points: [
    {
      t: "It runs in your environment",
      d: "The model gateway, retrieval over your systems of record, evaluation and the audit trail are stood up inside your tenancy, against your data, under your identity. It is your asset whether or not you build another agent with us.",
      href: "/platform",
      linkLabel: "What gets stood up",
    },
    {
      t: "It stops where you say",
      d: "Every agent works to a queue a person releases, and earns its way out of that queue only on workflows where it has been right often enough to stop being checked. Anything touching cash, spend or a customer never leaves it.",
      href: "/human-in-the-loop-ai",
      linkLabel: "How the gate works",
    },
    {
      t: "Your team can build the next one",
      d: "A lead, a product owner and two full-stack AI developers work inside your standups, and the structure exists so that ownership transfers rather than accumulating on our side.",
      href: "/embedded-ai-team",
      linkLabel: "How ownership transfers",
    },
    {
      t: "The engagement is designed to end",
      d: "Assess, anchor, first agent live, expand and hand over. The last step is the point of the other three, and we would rather tell you the sequencing is wrong than sell you a stage you are not ready for.",
      href: "/how-it-works",
      linkLabel: "The four stages",
    },
  ],
};

/** Closes on the honest note §7 asks for. */
export const closing = {
  heading: "Where you actually are matters more than where you want to be.",
  body:
    "A business at stage one does not need an agent, it needs somebody to map what its people are doing and price it. A business stuck at stage three usually does not have a model problem, it has a data access problem and an ownership problem, in that order. Bring us one workflow and we will tell you which of those you have, and say so plainly if the answer is that you should fix something else first.",
};
