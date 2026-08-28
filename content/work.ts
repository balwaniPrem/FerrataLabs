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

/** Section two: the embedded team. */
export const embedded = {
  heading: "How the team embeds.",
  intro:
    "Not a statement of work executed at arm's length. Our engineers work inside your organisation on your systems, and the structure they leave behind is the one that produced the numbers on our about page.",
  pod: {
    label: "The POD",
    composition: [
      { n: "1", r: "Lead", d: "Owns the domain end to end and the relationship with your side." },
      { n: "1", r: "Product owner", d: "Holds the business logic and decides what an agent may never do." },
      { n: "2", r: "Full-stack AI developers", d: "Build, evaluate and ship the agents themselves." },
    ],
    note: "Deliberately small: it covers business delivery and product direction in one unit rather than staffing engineers and hoping ownership emerges. Small enough to hold context, large enough to ship without waiting on anyone.",
  },
  ways: [
    {
      t: "In your standups, on your tickets",
      d: "Same board, same rituals, same definition of done. You see progress the way you see your own team's, not in a fortnightly status call.",
    },
    {
      t: "Paired, not siloed",
      d: "Your engineers sit with ours from the first sprint. The knowledge transfer is the work, not a document produced at the end of it.",
    },
    {
      t: "The engagement is designed to end",
      d: "Step four exists so you outgrow us. We would rather hand over than hold a retainer nobody can justify.",
    },
  ],
};

/** Section three intro: the agents, as proof. */
export const agentsIntro = {
  heading: "Agents already doing the work.",
  intro:
    "Six agents built and running against real transactions. These are examples of what gets built, not a catalogue you pick from, and every one is rebuilt around how your business actually operates.",
};
