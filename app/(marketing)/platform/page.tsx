import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { platformPage, layers, ownership, delivery } from "@/content/platform";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The enterprise AI platform Ferrata Labs stands up inside your environment: model gateway, retrieval over SAP, NetSuite or Dynamics, evaluation harnesses, audit logging and identity. You own it.",
};

/**
 * The platform layer, named and given a page. See content/platform.ts for why
 * this exists and why there is deliberately no "systems" pillar beside it.
 */
export default function Platform() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{platformPage.eyebrow}</p>
          <h1>{platformPage.headline}</h1>
          <p className="lede">{platformPage.lede}</p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              {platformPage.ctaPrimary}
            </Link>
            <Link href="/work" className="btn btn-lg btn-line">
              {platformPage.ctaSecondary}
            </Link>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>What gets stood up.</h2>
          <p className="intro">
            Five layers, all inside your environment. Each one is the answer to a question
            a controller or a CIO asks before an agent is allowed near a ledger.
          </p>

          <div className="plat-stack">
            {layers.map((l) => (
              <div className="plat-layer" id={l.id} key={l.id}>
                <p className="n">{l.n}</p>
                <div className="plat-body">
                  <h3>{l.t}</h3>
                  <p>{l.d}</p>
                </div>
                <p className="plat-keep">{l.keep}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{ownership.heading}</h2>
          <p className="intro">{ownership.intro}</p>
          <div className="layers">
            {ownership.points.map((p) => (
              <div className="layer" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>{delivery.heading}</h2>
          <p className="intro">{delivery.intro}</p>
          <div className="prose">
            <p>{delivery.note}</p>
            <p>
              <Link href="/how-it-works">{delivery.linkLabel} &rarr;</Link>
            </p>
            <p>
              <Link href="/embedded-ai-team">
                Who builds it, and how ownership transfers &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
