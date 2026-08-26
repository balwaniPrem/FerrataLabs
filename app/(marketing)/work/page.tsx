import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import AgentGrid from "@/components/AgentGrid";
import { Worlds, Personalization, ApprovalGate } from "@/components/Blocks";
import { solutionIcons } from "@/components/SolutionIcons";
import { workPage, offering, embedded, agentsIntro } from "@/content/work";

export const metadata: Metadata = {
  title: "The work",
  description:
    "What an AI transformation with Ferrata Labs actually involves: the engagement, how the team embeds, and the six agents already running against real transactions.",
};

export default function Work() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <h1>{workPage.headline}</h1>
          <p>{workPage.lede}</p>
        </div>
      </header>

      {/* 1. the offering */}
      <section className="sec">
        <div className="wrap">
          <h2>{offering.heading}</h2>
          <p className="intro">{offering.intro}</p>
          <ol className="offering">
            {offering.points.map((p, i) => (
              <li key={p.t}>
                <span className="n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. how the team embeds */}
      <section className="sec tint">
        <div className="wrap">
          <h2>{embedded.heading}</h2>
          <p className="intro">{embedded.intro}</p>

          <div className="layers solution-cards">
            {embedded.ways.map((w, i) => {
              const Icon = solutionIcons[i];
              return (
                <div className="layer" key={w.t}>
                  <span className="l-icon">
                    <Icon />
                  </span>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                </div>
              );
            })}
          </div>

          <div className="pod">
            <p className="h">{embedded.pod.label}</p>
            <div className="pod-row">
              {embedded.pod.composition.map((c) => (
                <div key={c.r}>
                  <p className="n">{c.n}</p>
                  <p className="r">{c.r}</p>
                  <p className="d">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="pod-note">{embedded.pod.note}</p>
          </div>
        </div>
      </section>

      {/* 3. the agents, last, because they are proof rather than pitch */}
      <section className="sec">
        <div className="wrap">
          <h2>{agentsIntro.heading}</h2>
          <p className="intro">{agentsIntro.intro}</p>
          <AgentGrid detail />
          <Personalization />
          <ApprovalGate />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>The difference is execution.</h2>
          <p className="intro">
            Plenty of tools will summarize a report or draft an email about a problem. An
            agent goes and resolves it. Receivables shows the difference clearly, because
            every business runs it. Both columns end in the same place, with a person
            releasing the money.
          </p>
          <Worlds />
          <p className="more">
            <Link href="/how-it-works">Read the full engagement model &rarr;</Link>
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
