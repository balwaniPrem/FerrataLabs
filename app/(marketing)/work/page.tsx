import type { Metadata } from "next";
import Cta from "@/components/Cta";
import AgentGrid from "@/components/AgentGrid";
import { Worlds, Personalization, ApprovalGate } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "The work",
  description:
    "Agents Ferrata Labs has shipped, and how every deployment gets personalized to your organization.",
};

export default function Work() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <h1>Agents we&rsquo;ve shipped.</h1>
          <p>
            These are examples, not a catalogue. They show the shape of what an agent can own
            end to end, and where we draw the line between machine and person. What we build
            for you is designed around your processes, including the ones you have every
            reason to keep to yourself.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <AgentGrid detail />
          <Personalization />
          <ApprovalGate />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>The difference is execution.</h2>
          <p className="intro">
            Plenty of tools will now summarize a report or draft an email about a problem. An
            agent goes and resolves it. Receivables makes the clearest illustration because
            every business runs it, both columns end in the same place, with a person
            releasing the money.
          </p>
          <Worlds />
        </div>
      </section>

      <Cta />
    </>
  );
}
