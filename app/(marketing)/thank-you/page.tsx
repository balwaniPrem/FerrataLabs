import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { thankYou } from "@/content/thankYou";

export const metadata: Metadata = {
  title: thankYou.title,
  // A conversion destination. A search result landing someone here shows them a
  // thank-you for something they never did.
  robots: { index: false, follow: false },
};

/** See content/thankYou.ts for why the bordered card is gone. */
export default function ThankYou() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="eyebrow">{thankYou.eyebrow}</p>
          <h1>{thankYou.headline}</h1>
          <p className="lede">
            We&rsquo;ll come back to you within one business day to find a time. If
            it&rsquo;s urgent, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and it reaches the same
            place.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <h2>{thankYou.next.heading}</h2>
          <ul className="crit">
            {thankYou.next.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="more">
            {thankYou.onward.text}{" "}
            <Link href={thankYou.onward.href}>{thankYou.onward.label} &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
