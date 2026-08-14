import type { Metadata } from "next";
import Cta from "@/components/Cta";
import { Proof } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Ferrata Labs is run by operators who scaled a regulated B2B platform from $75M to $1.2B and put AI into production inside it.",
};

export default function About() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">Who we are</p>
          <h1>Operators, not an agency.</h1>
          <p>
            We&rsquo;ve done this from the inside, running the technology organization
            through exactly this kind of transformation, with a P&amp;L attached and a board
            asking about the number. Everything here came out of operating, not advising.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <Proof />

          <div className="prose">
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
              We price against outcomes rather than duration, because we&rsquo;ve been on the
              other side of a statement of work that rewarded elapsed time. The assessment
              output is yours whether or not you continue. And the engagement is designed to
              end, step four exists so your team can build the next agents without us.
            </p>

            <h3>The POD operating model</h3>
            <p>
              The delivery structure we install is the one that produced the numbers above: a
              self-contained unit of one lead, five engineers and one QA, owning a domain end
              to end with its own runbooks and evaluation harness. It is deliberately small
              enough to hold context and large enough to ship without waiting on anyone.
            </p>
            <p>
              It isn&rsquo;t a framework off a slide. It&rsquo;s what worked when the
              alternative was hiring a hundred more people we didn&rsquo;t have budget for.
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
