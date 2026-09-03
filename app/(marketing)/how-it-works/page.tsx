import type { Metadata } from "next";
import Cta from "@/components/Cta";
import { steps } from "@/content/steps";
import { faq } from "@/content/faq";
import { adlc, adlcIntro, adlcCompare } from "@/content/adlc";
import { stepFigures } from "@/components/StepFigures";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The Ferrata Labs engagement model: assess, anchor the platform, first agent live, expand and hand over, all run on a disciplined Agent Development Lifecycle.",
};

export default function HowItWorks() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h1>
            Unlock your <span className="hl">organizational intelligence</span>.
          </h1>
          <p>
            A via ferrata is a fixed steel line bolted into rock so that people who
            aren&rsquo;t technical climbers can cross terrain they otherwise couldn&rsquo;t.
            The line goes in before anyone climbs. Same order of operations here, foundation
            first, agents second, your team third.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          {steps.map((s, i) => {
            const Figure = stepFigures[i];
            return (
              <div className="dstep" key={s.no}>
                <div className="step-no">{s.no}</div>
                <div>
                  <h3>{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  <p className="dur">{s.durationLong}</p>
                </div>
                <div className="aside">
                  <p className="h">{s.deliverablesHeading}</p>
                  <ul>
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="fig">
                  <Figure />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* id so the Platform and How it works menus can deep-link to it */}
      <section className="sec tint" id="adlc">
        <div className="wrap">
          <p className="eyebrow">{adlcIntro.eyebrow}</p>
          <h2>{adlcIntro.heading}</h2>
          <p className="intro">{adlcIntro.intro}</p>

          <div className="adlc">
            {adlc.map((p) => (
              <div className="adlc-ph" key={p.n}>
                <p className="n">{p.n}</p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className="compare">
            <div>
              <p className="h">{adlcCompare.left.heading}</p>
              <ul>
                {adlcCompare.left.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="h">{adlcCompare.right.heading}</p>
              <ul>
                {adlcCompare.right.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="note">{adlcIntro.closer}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Questions we get asked early.</h2>
          <p className="intro">
            The ones that come up in nearly every first conversation, answered the way
            we&rsquo;d answer them on the call.
          </p>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>

          {/* FAQPage schema, built from the same array the list renders, so the
              markup cannot describe answers the page does not show. Placed inside
              <main> deliberately: export-theme.mjs extracts the inner HTML of
              <main>, so this travels to the WordPress theme with the rest of the
              part rather than needing a second implementation there. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      <Cta />
    </>
  );
}
