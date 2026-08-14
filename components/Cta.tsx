import Link from "next/link";
import { cta } from "@/content/site";

/**
 * The CTA band. Identical copy everywhere it appears — CLAUDE.md §5.
 * Do not vary it per page.
 */
export default function Cta() {
  return (
    <section className="cta">
      <div className="wrap">
        <h2>{cta.heading}</h2>
        <p>{cta.body}</p>
        <ul className="cta-list">
          {cta.list.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <Link href="/contact" className="btn btn-lg">
          Book a discovery call
        </Link>
      </div>
    </section>
  );
}
