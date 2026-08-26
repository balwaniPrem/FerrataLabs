/**
 * Home page narrative. CLAUDE.md §1, §5.
 *
 * Positioning moved up a level: Ferrata sells AI transformation across people,
 * product and process. The six agents are no longer the pitch — they are the proof
 * that real work has shipped. See §1 for why the one-liner changed.
 *
 * The spine is "AI absent to AI native". Every fold should sit somewhere on that arc.
 */

export const hero = {
  badge: "Enterprise AI deployment",
  /** The word that cycles. Order matters: heaviest verticals first. */
  verticals: [
    "Manufacturing",
    "Financial Services",
    "Logistics",
    "Construction",
    "Distribution",
    "Private Capital",
  ],
  headline: "AI transformation for",
  sub: "Across people, product and process. Engineers who embed with your team, ship into your systems of record, and train your people until running it belongs to you.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See the work",
};

/** The arc, named. Used by the hero graphic and echoed by the engagement section. */
export const arc = {
  from: "AI absent",
  to: "AI native",
  stages: [
    { k: "01", t: "Absent", d: "Tools bought. Nothing in production." },
    { k: "02", t: "Grounded", d: "Wired to your systems of record." },
    { k: "03", t: "Running", d: "One workflow live, behind a gate." },
    { k: "04", t: "Native", d: "Your team builds the next one." },
  ],
};

/** Second fold: what to expect, in three layers. */
export const layers = {
  heading: "What changes, and where.",
  intro:
    "Transformation is not a model licence. It happens in three places at once, and skipping any one of them is why most of it stalls.",
  items: [
    {
      n: "Layer 01",
      t: "People",
      d: "Your engineers learn to build and run agents themselves. We install the POD structure that does it, then step back. You should never need us to change a prompt.",
    },
    {
      n: "Layer 02",
      t: "Product",
      d: "Agents wired into the systems you already run, acting on live transactions. Nothing is re-platformed and nobody is asked to work somewhere new.",
    },
    {
      n: "Layer 03",
      t: "Process",
      d: "The rules your business actually follows, encoded and governed: approval thresholds, escalation paths, what an agent may never do.",
    },
  ],
  fix: "Six agents already run on this model. Look at what they do before deciding whether it fits you.",
};

/** Third fold: the problem, stated as the reader's own history. */
export const problem = {
  heading: "You already tried this.",
  intro:
    "Most of the mid-market has been buying AI for two years. Very little of it is doing work. The pattern is consistent enough to name.",
  items: [
    {
      t: "You bought the tools",
      d: "Licences for copilots and assistants, most of them now unused. Seats renew whether or not anyone logs in.",
    },
    {
      t: "You hired the engineers",
      d: "Good people, now maintaining demos. The gap was never talent, it was that nothing connected to a system of record.",
    },
    {
      t: "You paid for frontier models",
      d: "Real spend on tokens for pilots that never left the sandbox, because no one would let them touch a live transaction.",
    },
    {
      t: "Your best people are stuck on it",
      d: "The engineers you can least afford to lose are debugging prompts instead of shipping product.",
    },
    {
      t: "Nobody has seen the value",
      d: "No line on the P&L moved. The board asks about AI and the honest answer is still a roadmap.",
    },
  ],
  fix: "None of that failed because the technology was wrong. It failed because nothing was ever wired to a system of record, and nothing had permission to act.",
};

/** Fourth fold: the solution and the guarantee. */
export const solution = {
  heading: "Execution made better, not rebuilt.",
  intro:
    "We do not re-platform your business. Your ERP stays where it is, your team stays who they are, and your processes keep the judgment that makes them work. What changes is how much of the execution a person has to do by hand.",
  items: [
    {
      t: "We embed, we do not advise",
      d: "Our engineers work inside your team, on your tickets, in your standups. You get people who ship, not a deck and a follow-up.",
    },
    {
      t: "We learn how you actually operate",
      d: "The pricing exception nobody documented, the customer who always gets a call first. That accumulated judgment is your advantage, and it stays yours.",
    },
    {
      t: "We hand it over on purpose",
      d: "The platform runs in your environment. The runbooks are yours. Step four exists so your engineers build the next agent without us.",
    },
  ],
  guarantee: {
    label: "The commitment",
    body: "We agree what we are measuring before we build anything, against a baseline taken in the assessment. If that number does not move, you do not pay for the work that was meant to move it.",
    note: "Baseline, metric and threshold are written down in step one, so nobody is arguing about the definition at invoice time.",
  },
  fix: "This is the same shape as a via ferrata. Someone bolts the line into the rock; everyone else crosses on their own feet.",
};

/** Fifth fold: proof of shipped work. */
export const shipped = {
  heading: "Agents already doing the work.",
  intro:
    "Six agents built and running against real transactions. These are examples of what gets built, not a catalogue you pick from, and every one is rebuilt around how your business actually operates.",
  fix: "Sterling's console below is the real thing, recorded. Every action it takes stops at a person before it reaches a customer.",
};

/** Operators fold. */
export const operators = {
  heading: "Operators, not an agency.",
  intro:
    "We ran the technology organisation through exactly this kind of transformation, with a P&L attached and a board asking about the number. Everything below came out of operating, not advising.",
};

/**
 * Client logos. EMPTY ON PURPOSE.
 *
 * §8: never invent a client name or a logo. A fabricated wall is the fastest way to
 * lose the credibility this whole page is built to earn. Add real ones here and the
 * section renders itself.
 */
export const clients: { name: string }[] = [];
