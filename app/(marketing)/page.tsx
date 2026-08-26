import Link from "next/link";
import Cta from "@/components/Cta";
import AgentGrid from "@/components/AgentGrid";
import Marquee from "@/components/Marquee";
import HeroArc from "@/components/HeroArc";
import { solutionIcons } from "@/components/SolutionIcons";
import { Proof, Personalization, ApprovalGate } from "@/components/Blocks";
import { steps } from "@/content/steps";
import { integrationsCopy } from "@/content/integrations";
import {
  hero,
  layers,
  problem,
  solution,
  shipped,
  operators,
  clients,
} from "@/content/home";

/** Every fold closes the same way: a line on how it is fixed, then the ask. */
function FoldClose({ text }: { text: string }) {
  return (
    <div className="fold-close">
      <p>{text}</p>
      <Link href="/contact" className="btn">
        Book a discovery call
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="hero hero-split">
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow">{hero.badge}</p>
            <h1>
              {hero.headline}{" "}
              {/* CSS-only cycle; frozen on the first vertical under reduced motion */}
              <span className="cycle" aria-label={hero.verticals.join(", ")}>
                {hero.verticals.map((v, i) => (
                  <span key={v} style={{ ["--i" as string]: i }} aria-hidden={i > 0}>
                    {v}
                  </span>
                ))}
              </span>
            </h1>
            <p className="lede">{hero.sub}</p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-lg">
                {hero.ctaPrimary}
              </Link>
              <Link href="/work" className="btn btn-lg btn-line">
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hero-fig">
            <HeroArc />
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>{layers.heading}</h2>
          <p className="intro">{layers.intro}</p>
          <div className="layers">
            {layers.items.map((l) => (
              <div className="layer" key={l.n}>
                <p className="n">{l.n}</p>
                <h3>{l.t}</h3>
                <p>{l.d}</p>
              </div>
            ))}
          </div>
          <FoldClose text={layers.fix} />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2 className="problem-h">{problem.heading}</h2>
          <p className="intro">{problem.intro}</p>
          <ol className="problems">
            {problem.items.map((p) => (
              <li key={p.t}>
                <span className="n" aria-hidden="true">{p.n}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="problem-closer">
            {problem.closer}{" "}
            <span className="hl">{problem.closerEmphasis}</span>
          </p>
          <FoldClose text={problem.fix} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>{solution.heading}</h2>
          <p className="intro">{solution.intro}</p>
          <div className="layers solution-cards">
            {solution.items.map((s, i) => {
              const Icon = solutionIcons[i];
              return (
                <div className="layer" key={s.t}>
                  <span className="l-icon"><Icon /></span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              );
            })}
          </div>
          <div className="guarantee">
            <p className="h">{solution.guarantee.label}</p>
            <p className="g-head">{solution.guarantee.headline}</p>
            <p className="g-body">{solution.guarantee.body}</p>
            <p className="g-note">{solution.guarantee.note}</p>
          </div>
          <FoldClose text={solution.fix} />
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{shipped.heading}</h2>
          <p className="intro">{shipped.intro}</p>
          <AgentGrid />
          <Personalization />
          <ApprovalGate />
          <FoldClose text={shipped.fix} />
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
            Four stages from absent to native. The line goes in before anyone climbs, and
            your team ends up able to walk the route without us.
          </p>
          <div className="stages">
            {steps.map((s) => (
              <div className="stage" key={s.no}>
                <p className="n">{s.no}</p>
                <h3>{s.title}</h3>
                <p className="dur">{s.duration}</p>
                <p className="d">{s.short}</p>
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
          <h2>{operators.heading}</h2>
          <p className="intro">{operators.intro}</p>
          <Proof />
          {clients.length > 0 && (
            <div className="clients">
              {clients.map((c) => (
                <span key={c.name}>{c.name}</span>
              ))}
            </div>
          )}
          <p className="more">
            <Link href="/about">More on how we work &rarr;</Link>
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
