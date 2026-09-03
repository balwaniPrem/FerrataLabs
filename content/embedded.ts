/**
 * /embedded-ai-team — the POD, promoted. CLAUDE.md §1, §5.
 *
 * The POD was real and specific and buried: two paragraphs on /work and a
 * pointer on /about. It is one of the few things on this site a competitor
 * cannot copy by writing better copy, because it is a claim about how the work
 * is staffed rather than about what the software does.
 *
 * `pod` and `ways` live here rather than in content/work.ts so the /work section
 * and this page cannot drift. /work imports them and stays a summary; this page
 * is where the argument gets made.
 */

export const embeddedPage = {
  title: "Embedded AI team",
  eyebrow: "How the team works",
  headline: "Engineers inside your team, not a statement of work.",
  lede:
    "A small unit that sits in your standups, builds on your systems, and is structured so that ownership transfers rather than being promised. It is the same structure that produced the numbers on our about page.",
  ctaPrimary: "Book a discovery call",
  ctaSecondary: "See the platform",
};

/** The unit. Kept deliberately small, and the reason is the interesting part. */
export const pod = {
  label: "The POD",
  composition: [
    { n: "1", r: "Lead", d: "Owns the domain end to end and the relationship with your side." },
    { n: "1", r: "Product owner", d: "Holds the business logic and decides what an agent may never do." },
    { n: "2", r: "Full-stack AI developers", d: "Build, evaluate and ship the agents themselves." },
  ],
  note: "Deliberately small: it covers business delivery and product direction in one unit rather than staffing engineers and hoping ownership emerges. Small enough to hold context, large enough to ship without waiting on anyone.",
};

/** How it actually operates day to day. */
export const ways = [
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
];

/** Why a product owner sits in a four-person unit. This is the part people query. */
export const whySmall = {
  heading: "Why the product owner is not optional.",
  body: [
    "The common failure is staffing engineers against a workflow nobody has authority over. The engineers build what they were told, the exceptions turn out to be forty percent of volume, and there is no one in the room who can decide which of those exceptions the agent is allowed to handle and which must stop at a person.",
    "The product owner is that decision. They hold the pricing, routing, approval and escalation logic that makes your operation yours, and they are the reason the agent ends up shaped like your business rather than like a template.",
    "That logic stays yours. We do not take it to the next client, and it is not the basis of a product we sell back to your competitors.",
  ],
};

/** The handover, stated as a sequence rather than a promise. */
export const handover = {
  heading: "What transfer actually looks like.",
  intro:
    "Ownership does not transfer in a meeting at the end. It transfers in stages, and each one is visible while it is happening.",
  stages: [
    {
      k: "01",
      t: "We build, you watch",
      d: "First agent. Your engineers are in the sprint and on the pull requests, but the delivery risk is ours.",
    },
    {
      k: "02",
      t: "We build together",
      d: "Second agent. Your engineers take components. Ours review rather than write, and the evaluation harnesses become the shared language.",
    },
    {
      k: "03",
      t: "You build, we review",
      d: "Third agent is yours end to end. We are on call for the parts that break in ways nobody has seen yet.",
    },
    {
      k: "04",
      t: "You build",
      d: "The POD structure is installed with a hiring profile against each seat, the runbooks are written, and you should not need us to change a prompt.",
    },
  ],
};
