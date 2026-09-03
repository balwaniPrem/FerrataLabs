import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { Proof } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Ferrata Labs is run by operators who scaled a regulated B2B platform from $75M to over $2.5B and put AI into production inside it.",
};

export default function About() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <h1>Operators, not an agency.</h1>
          <p>
            We&rsquo;ve done this from the inside. We ran the technology organization
            through exactly this kind of transformation, with a P&amp;L attached and a board
            asking about the number. Everything here came out of operating, not advising.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <Proof />

          <div className="prose">
            <h3>Why an operator, and not an adviser</h3>
            <p>
              Going from AI Absent to AI Native is not a technology problem. The models
              work. What stops it is everything an operator recognises on sight: the
              integration surface nobody scoped, the exception that turns out to be forty
              per cent of volume, the controller who will not sign anything off until the
              audit trail exists.
            </p>
            <p>
              We have been on the inside of that, with a P&amp;L attached and a board asking
              about the number. It is why the engagement opens with two weeks of measurement
              rather than a workshop, and why the first agent goes live behind an approval
              gate rather than a launch announcement.
            </p>

            <h3>Why the name</h3>
            <p>
              A <em>via ferrata</em> is a fixed steel line bolted into rock, cable, rungs and
              bridges anchored into a face so that people who aren&rsquo;t technical climbers
              can cross terrain they otherwise couldn&rsquo;t. They were built through the
              Dolomites so ordinary soldiers could move through mountains that had previously
              stopped them.
            </p>
            <p>
              That&rsquo;s the job. Your people are not going to become machine learning
              engineers, and they shouldn&rsquo;t have to. Someone installs the line; everyone
              else crosses.
            </p>

            <h3>How we&rsquo;re different from a consultancy</h3>
            <p>
              Most firms selling AI work are staffed by people who have advised on
              transformations rather than survived one. The difference shows up in the second
              month, when the integration surface turns out to be uglier than the diagram and
              someone has to decide what to cut.
            </p>
            <p>
              We price against outcomes rather than duration, because we have been on the
              other side of a statement of work that rewarded elapsed time. That is why the
              commitment is specific rather than a slogan: the metric and the baseline are
              agreed during the assessment, and if the number does not move you do not pay
              for the work that was meant to move it.
            </p>
            <p>
              The assessment output is yours whether or not you continue. And the engagement
              is designed to end. Step four exists so your team builds the next agent
              without us.
            </p>

            <h3>The POD operating model</h3>
            <p>
              The delivery structure we install is the one that produced the numbers above.
              It isn&rsquo;t a framework off a slide. It is what worked when the alternative
              was hiring a hundred more people we did not have budget for, and it is the
              thing we hand over at the end rather than the thing we keep.
            </p>
            <p className="more">
              <Link href="/embedded-ai-team">
                How the team embeds, and how ownership transfers &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
