import type { Metadata } from "next";
import Link from "next/link";
import { seoFor } from "@/content/seo";
import Cta from "@/components/Cta";
import {
  aiTransformationPage,
  arc,
  stall,
  earned,
  closing,
} from "@/content/aiTransformation";

export const metadata: Metadata = seoFor("/ai-transformation");

/**
 * The AI Absent to AI Native arc. See content/aiTransformation.ts for the
 * boundary that keeps this from collapsing into /how-it-works: five stages of
 * what has to become true inside the business, not the four commercial stages
 * of what you buy. Every trust point links out rather than restating.
 */
export default function AiTransformation() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{aiTransformationPage.eyebrow}</p>
          <h1>
            {aiTransformationPage.headline}{" "}
            <span className="hl">{aiTransformationPage.headlineHl}</span>
            {aiTransformationPage.headlineEnd}
          </h1>
          <p className="lede">{aiTransformationPage.lede}</p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              {aiTransformationPage.ctaPrimary}
            </Link>
            <Link href="/how-it-works" className="btn btn-lg btn-line">
              {aiTransformationPage.ctaSecondary}
            </Link>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>{arc.heading}</h2>
          <p className="intro">{arc.intro}</p>
          <div className="arc">
            {arc.stages.map((s) => (
              <div className="arc-stage" key={s.n}>
                <p className="n">{s.n}</p>
                <div className="arc-body">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                <p className="arc-tell">{s.tell}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{stall.heading}</h2>
          <p className="intro">{stall.intro}</p>
          <div className="layers">
            {stall.reasons.map((r) => (
              <div className="layer" key={r.t}>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>{earned.heading}</h2>
          <p className="intro">{earned.intro}</p>
          <div className="layers two">
            {earned.points.map((p) => (
              <div className="layer" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <p className="more">
                  <Link href={p.href}>{p.linkLabel} &rarr;</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>{closing.heading}</h2>
          <div className="prose">
            <p>{closing.body}</p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
