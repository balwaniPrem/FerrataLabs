import Link from "next/link";
import { agents } from "@/content/agents";

/**
 * The six-agent grid. `detail` controls whether the capability bullets show —
 * home uses the tight version (CLAUDE.md item 2), /work the fuller one.
 */
export default function AgentGrid({ detail = false }: { detail?: boolean }) {
  return (
    <div className="crew">
      {agents.map((a) => (
        <Link key={a.slug} href={`/agents/${a.slug}`} className="agent">
          <span className="nm">
            <i />
            <h3>{a.name}</h3>
          </span>
          <p className="role">{a.role}</p>
          {detail && <p>{a.summary}</p>}
          <ul>
            {a.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <span className="go">How {a.name} works &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
