/**
 * FAQ — six questions, /how-it-works. CLAUDE.md §5.
 * Two of these are policy commitments flagged in §8: confirm they are true before launch.
 */

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "Where does our data actually go?",
    a: "Into infrastructure standing in your environment. Retrieval runs over your own systems of record. Where residency or sensitivity requires it, models are served inside your VPC or on-premise rather than called out to a third party. What leaves your boundary, and to whom, is decided in step one and documented before anything is built.",
  },
  {
    q: "Do you train on our data?",
    a: "No. Your operating logic is your advantage and it stays yours. If fine-tuning makes sense for a specific workflow, the resulting model is yours, trained in your environment, and it doesn't inform anything we build for anyone else.",
  },
  {
    q: "What happens if an agent gets it wrong?",
    a: "It gets caught at the approval gate, because agents start behind one and only earn their way out with evidence. Every action is logged and attributable, and a rollback path is defined before go-live rather than after an incident.",
  },
  {
    q: "Frontier models or open-weight?",
    a: "Both, usually. The decision is made per workflow on cost, latency and sensitivity rather than as a company-wide religion. High-volume classification is rarely worth frontier pricing; a nuanced negotiation draft usually is.",
  },
  {
    q: "Are we locked into you?",
    a: "The platform runs in your environment and the runbooks are yours. Step four exists specifically so your own engineers can build the next agents without us. We'd rather you outgrow the engagement than depend on it.",
  },
  {
    q: "What does this cost?",
    a: "It depends on the workflow and how much of your environment already exists, which is why the assessment comes first and why you keep its output either way. We'll give you a range on the first call rather than making you sit through a process to find out.",
  },
];
