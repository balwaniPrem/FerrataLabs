import type { Metadata } from "next";
import Link from "next/link";
import { seoFor } from "@/content/seo";
import Cta from "@/components/Cta";
import { Personalization, ApprovalGate } from "@/components/Blocks";
import { agents } from "@/content/agents";
import {
  agentsPage,
  whatItIs,
  roster,
  gateSection,
  personalizationSection,
} from "@/content/agentsIndex";

export const metadata: Metadata = seoFor("/agents");

/**
 * The roster, explained rather than listed. See content/agentsIndex.ts for why
 * this is not a fourth copy of the six-agent grid: it leads on Agent.outcome,
 * which exists for this page, where the home grid leads on bullets and /work
 * leads on the summary.
 */
export default function Agents() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{agentsPage.eyebrow}</p>
          <h1>
            {agentsPage.headline} <span className="hl">{agentsPage.headlineHl}</span>{" "}
            {agentsPage.headlineEnd}
          </h1>
          <p className="lede">{agentsPage.lede}</p>
          <div className="hero-cta">
            <Link href="/contact" className="btn btn-lg">
              {agentsPage.ctaPrimary}
            </Link>
            <Link href="/how-it-works" className="btn btn-lg btn-line">
              {agentsPage.ctaSecondary}
            </Link>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>{whatItIs.heading}</h2>
          <p className="intro">{whatItIs.intro}</p>
          <div className="layers">
            {whatItIs.points.map((p) => (
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
          <h2>{roster.heading}</h2>
          <p className="intro">{roster.intro}</p>
          <div className="roster">
            {agents.map((a) => (
              <Link key={a.slug} href={`/agents/${a.slug}`} className="roster-item">
                <span className="roster-id">
                  <h3>{a.name}</h3>
                  <span className="role">{a.role}</span>
                </span>
                <span className="roster-outcome">{a.outcome}</span>
                <span className="roster-touch">{a.menuLine}</span>
                <span className="go">How {a.name} works &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §7 — a page that is six agent claims states the gate rather than implying it. */}
      <section className="sec">
        <div className="wrap">
          <h2>{gateSection.heading}</h2>
          <div className="prose">
            <p>{gateSection.body}</p>
          </div>
          <ApprovalGate />
          <p className="more">
            <Link href="/human-in-the-loop-ai">{gateSection.linkLabel} &rarr;</Link>
          </p>
        </div>
      </section>

      {/* §6 framing rule — the personalization message closes every agent page. */}
      <section className="sec tint">
        <div className="wrap">
          <h2>{personalizationSection.heading}</h2>
          <p className="intro">{personalizationSection.intro}</p>
          <div className="layers">
            {personalizationSection.points.map((p) => (
              <div className="layer" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
          <Personalization />
        </div>
      </section>

      <Cta />
    </>
  );
}
