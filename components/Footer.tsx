import Link from "next/link";
import { site } from "@/content/site";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import Mark from "./Mark";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="mark">
              <Mark size={20} />
              Ferrata Labs
            </Link>
            <p className="foot-blurb">{site.blurb}</p>
          </div>
          <div>
            <h4>Agents</h4>
            <ul>
              {agents.map((a) => (
                <li key={a.slug}>
                  <Link href={`/agents/${a.slug}`}>
                    {a.name} · {a.role}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Industries</h4>
            <ul>
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`}>{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              <li>
                <Link href="/work">The work</Link>
              </li>
              <li>
                <Link href="/how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/about">Who we are</Link>
              </li>
              <li>
                <Link href="/contact">Book a discovery call</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot">
          <span>FERRATA LABS</span>
          <span className="sp">&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
