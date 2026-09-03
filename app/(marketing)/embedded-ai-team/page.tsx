import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { embeddedPage, pod, ways, whySmall, handover } from "@/content/embedded";

export const metadata: Metadata = {
  title: "Embedded AI team",
  description:
    "An embedded AI team inside your organization: one lead, one product owner and two full-stack AI developers, working on your systems and structured so ownership transfers rather than being promised.",
};

/**
 * The POD, promoted out of two paragraphs on /work. Reached from the Platform
 * menu rather than the top level, so the nav gains one item rather than two.
 */
export default function EmbeddedTeam() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{embeddedPage.eyebrow}</p>
          <h1>{embeddedPage.headline}</h1>
          <p className="lede">{embeddedPage.lede}</p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              {embeddedPage.ctaPrimary}
            </Link>
            <Link href="/platform" className="btn btn-lg btn-line">
              {embeddedPage.ctaSecondary}
            </Link>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>Four people, and each seat is a decision.</h2>
          <div className="pod">
            <p className="h">{pod.label}</p>
            <div className="pod-row">
              {pod.composition.map((c) => (
                <div key={c.r}>
                  <p className="n">{c.n}</p>
                  <p className="r">{c.r}</p>
                  <p className="d">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="pod-note">{pod.note}</p>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>How it operates.</h2>
          <div className="layers">
            {ways.map((w) => (
              <div className="layer" key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>{whySmall.heading}</h2>
          <div className="prose">
            {whySmall.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{handover.heading}</h2>
          <p className="intro">{handover.intro}</p>
          <div className="handover">
            {handover.stages.map((s) => (
              <div className="hand-stage" key={s.k}>
                <p className="k">{s.k}</p>
                <h3>{s.t}</h3>
                <p className="d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
