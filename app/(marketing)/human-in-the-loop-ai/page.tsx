import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { hitlPage, gate, guardrails, earning, blended } from "@/content/hitl";

export const metadata: Metadata = {
  title: "Human in the loop",
  description:
    "How human-in-the-loop AI works in production: approval gates as a queue rather than a dialog, the guardrails underneath, what earns an agent out of a gate, and the blended end state where exceptions stop at a person.",
};

/**
 * §7's approval gate, argued rather than asserted. See content/hitl.ts for why
 * this page exists and for the care needed around the autonomy claim.
 */
export default function HumanInTheLoop() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{hitlPage.eyebrow}</p>
          <h1>{hitlPage.headline}</h1>
          <p className="lede">{hitlPage.lede}</p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              {hitlPage.ctaPrimary}
            </Link>
            <Link href="/platform" className="btn btn-lg btn-line">
              {hitlPage.ctaSecondary}
            </Link>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>{gate.heading}</h2>
          <p className="intro">{gate.intro}</p>
          <div className="layers">
            {gate.points.map((p) => (
              <div className="layer" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{guardrails.heading}</h2>
          <p className="intro">{guardrails.intro}</p>
          <div className="plat-stack">
            {guardrails.items.map((g) => (
              <div className="plat-layer" key={g.n}>
                <p className="n">{g.n}</p>
                <div className="plat-body">
                  <h3>{g.t}</h3>
                  <p>{g.d}</p>
                </div>
                <p className="plat-keep" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>{earning.heading}</h2>
          <p className="intro">{earning.intro}</p>
          <ul className="crit">
            {earning.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="pod-note">{earning.note}</p>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{blended.heading}</h2>
          <p className="intro">{blended.intro}</p>
          <div className="worlds">
            <div className="world agentic">
              <p className="tag">{blended.columns.auto.tag}</p>
              <ul>
                {blended.columns.auto.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="world manual">
              <p className="tag">{blended.columns.gated.tag}</p>
              <ul>
                {blended.columns.gated.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="pod-note">{blended.note}</p>
        </div>
      </section>

      <Cta />
    </>
  );
}
