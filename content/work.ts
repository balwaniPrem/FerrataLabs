/**
 * /work — the deep version of the home page argument. CLAUDE.md §5.
 *
 * Order is deliberate and set in point 14: the solution first, then how the team
 * embeds, then the agents. Agents come last because they are the proof, not the
 * pitch. A reader who lands here from the nav should meet the offering before the
 * catalogue, or the page reads as a product list again.
 *
 * This is one long page rather than three thin ones. Limestone has four service
 * pages because they sell four things; we sell one thing in stages, and splitting
 * that produces pages nobody can fill.
 */

import { pod, ways } from "./embedded";

export const workPage = {
  title: "The work",
  headline: "What transformation actually looks like.",
  lede:
    "Not a strategy deck and not a pilot. Engineers inside your team, agents wired into your systems of record, and a handover that leaves your people able to build the next one.",
};

/** Section one: the offering, stated plainly. */
export const offering = {
  heading: "One engagement, four stages, one outcome.",
  intro:
    "We take a single workflow from absent to running in under 90 days, then repeat it until your team no longer needs us. The platform is stood up in your environment on the way through, because that is the part you keep.",
  points: [
    {
      t: "We start with a number, not a roadmap",
      d: "Two weeks mapping workflows against transaction volume, exception rates and what the errors cost when they escape. You leave with a ranked list and a defensible figure against each line, whether or not you continue.",
    },
    {
      t: "The platform is yours from day one",
      d: "Model gateway, retrieval over your own systems, evaluation harnesses and audit logging, all inside your environment. Nothing is rented and nothing phones home.",
    },
    {
      t: "One agent, in production, behind a gate",
      d: "Real transactions, human approval on every consequential action, and a rollback path defined before go-live rather than after an incident.",
    },
    {
      t: "Then we leave",
      d: "The POD structure is installed, the runbooks are written, and your engineers build the second agent. You should never need us to change a prompt.",
    },
  ],
};

/**
 * Section two: the embedded team.
 *
 * pod and ways now live in content/embedded.ts and are re-exported here, so this
 * section and /embedded-ai-team cannot drift. This page stays the summary; the
 * argument is made on that page.
 */
export const embedded = {
  heading: "How the team embeds.",
  intro:
    "Not a statement of work executed at arm's length. Our engineers work inside your organisation on your systems, and the structure they leave behind is the one that produced the numbers on our about page.",
  pod,
  ways,
  more: "How the team embeds, and how ownership transfers",
};

/** Section three intro: the agents, as proof. */
export const agentsIntro = {
  heading: "Agents already doing the work.",
  intro:
    "Six agents built and running against real transactions. These are examples of what gets built, not a catalogue you pick from, and every one is rebuilt around how your business actually operates.",
};
