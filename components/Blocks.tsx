import { proof, worlds } from "@/content/site";
import { personalization, approvalGate } from "@/content/agents";

/** §8 claims. Same four figures on / and /about — keep them in sync via content/site.ts. */
export function Proof() {
  return (
    <div className="proof">
      {proof.map((p) => (
        <div key={p.fig}>
          <p className="fig">{p.fig}</p>
          <p className="cap">{p.cap}</p>
        </div>
      ))}
    </div>
  );
}

/** Assisted vs agent-run. Both columns end with a person releasing the money. */
export function Worlds() {
  return (
    <div className="worlds">
      <div className="world manual">
        <p className="tag">{worlds.manual.tag}</p>
        <ul>
          {worlds.manual.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="world agentic">
        <p className="tag">{worlds.agentic.tag}</p>
        <ul>
          {worlds.agentic.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
          <li className="human">{worlds.agentic.human}</li>
        </ul>
      </div>
    </div>
  );
}

/** §7 — load-bearing. Must follow every agent listing and close every detail page. */
export function Personalization() {
  return (
    <div className="bespoke">
      <h3>{personalization.heading}</h3>
      <p>{personalization.body}</p>
    </div>
  );
}

/** §7 — non-negotiable wherever agent capability is claimed. */
export function ApprovalGate({ inline = false }: { inline?: boolean }) {
  return inline ? (
    <p className="gate">{approvalGate}</p>
  ) : (
    <p className="note">{approvalGate}</p>
  );
}
