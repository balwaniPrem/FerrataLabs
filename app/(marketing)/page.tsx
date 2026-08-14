import Link from "next/link";
import Cta from "@/components/Cta";
import AgentGrid from "@/components/AgentGrid";
import Marquee from "@/components/Marquee";
import { Proof, Worlds, Personalization, ApprovalGate } from "@/components/Blocks";
import { steps } from "@/content/steps";
import { integrationsCopy } from "@/content/integrations";

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">Enterprise AI deployment &middot; United States</p>
          <h1>
            We build Enterprise AI agents that do the <em>actual work</em>.
          </h1>
          <p className="lede">
            Most enterprise AI summarizes the work. We build agents that do it, wired into
            your systems of record.
          </p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              Book a discovery call
            </Link>
            <Link href="/work" className="btn btn-lg btn-line">
              See the work
            </Link>
          </div>
        </div>
      </header>

      <section className="topo-band">
        <div className="wrap">
          <dl className="topo">
            <div>
              <dt>First agent live</dt>
              <dd>Under 90 days</dd>
            </div>
            <div>
              <dt>Built for</dt>
              <dd>$50M&ndash;$1B revenue</dd>
            </div>
            <div>
              <dt>Runs on</dt>
              <dd>Frontier or open-weight</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>The difference is execution.</h2>
          <p className="intro">
            Plenty of tools will summarize a report or draft an email about a problem. An
            agent goes and resolves it. Receivables shows the difference clearly, because
            every business runs it. Both columns below end in the same place, with a person
            releasing the money.
          </p>
          <Worlds />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>Work we&rsquo;ve shipped.</h2>
          <p className="intro">
            Six agents, each owning a workflow end to end. These are examples of what we
            build, not a shelf you pick from. Every one is rebuilt around how your business
            actually operates.
          </p>
          <AgentGrid />
          <Personalization />
          <ApprovalGate />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">{integrationsCopy.eyebrow}</p>
          <h2>{integrationsCopy.heading}</h2>
          <p className="intro">{integrationsCopy.intro}</p>
          <Marquee />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>How the engagement runs.</h2>
          <p className="intro">
            A via ferrata is a fixed steel line bolted into rock so that people who
            aren&rsquo;t technical climbers can cross terrain they otherwise couldn&rsquo;t.
            Same principle. We install the line and stay on it with you, and your team ends
            up able to walk the route without us.
          </p>
          <div className="steps">
            {steps.map((s) => (
              <div className="step" key={s.no}>
                <div className="step-no">{s.no}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </div>
                <div className="dur">{s.duration}</div>
              </div>
            ))}
          </div>
          <p className="more">
            <Link href="/how-it-works">Read the full engagement model &rarr;</Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Operators, not an agency.</h2>
          <p className="intro">
            We&rsquo;ve done this from the inside. We ran the technology organization
            through exactly this kind of transformation, with a P&amp;L attached and a board
            asking about the number. Everything below came out of operating, not advising.
          </p>
          <Proof />
          <p className="more">
            <Link href="/about">More on how we work &rarr;</Link>
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
