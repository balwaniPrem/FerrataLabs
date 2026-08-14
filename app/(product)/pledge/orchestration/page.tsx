import { workspace } from "@/content/pledge";
import {
  engines,
  flows,
  workflows,
  workflowStateLabel,
  pipeline,
} from "@/content/pledgeOrchestration";

export default function OrchestrationPage() {
  const active = workflows.filter((w) => w.state === "active").length;
  const openLines = workflows.reduce((n, w) => n + w.openLines, 0);

  return (
    <>
      <div className="app-head">
        <h1>Orchestration</h1>
        <p>
          {engines.integration} moves data in and out. {engines.durable} holds one durable
          workflow per account, with individual invoices as line-state inside it, which is
          what lets {workspace.name} chase an account once rather than chase six invoices
          separately.
        </p>
      </div>

      <section className="card2">
        <div className="hd">
          <h2>The account pipeline</h2>
          <span className="sub">Every workflow moves through these states</span>
        </div>
        <ol className="pipe">
          {pipeline.map((p, i) => (
            <li key={p.step}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="s">{p.step}</span>
              <span className="b">{p.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="cols orch">
        <section className="card2">
          <div className="hd">
            <h2>Integration flows</h2>
            <span className="sub">{engines.integration}</span>
          </div>
          <table className="grid2">
            <thead>
              <tr>
                <th>Flow</th>
                <th className="num">Runs today</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {flows.map((f) => (
                <tr key={f.name}>
                  <td>
                    <span className="acct">{f.name}</span>
                    <span className="rule-desc">{f.desc}</span>
                  </td>
                  <td className="num">{f.runsToday}</td>
                  <td>
                    <span className={`state ${f.state === "healthy" ? "promised" : "disputed"}`}>
                      {f.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card2">
          <div className="hd">
            <h2>Durable workflows</h2>
            <span className="sub">
              {engines.durable} · {active} active · {openLines} open lines
            </span>
          </div>
          <table className="grid2">
            <thead>
              <tr>
                <th>Workflow</th>
                <th className="num">Lines</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((w) => (
                <tr key={w.account}>
                  <td>
                    <span className="wfid">
                      collect-{w.account.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "")}
                    </span>
                    <span className="rule-desc">{w.note}</span>
                  </td>
                  <td className="num">{w.openLines}</td>
                  <td>
                    <span
                      className={`state ${
                        w.state === "active"
                          ? "sequencing"
                          : w.state === "idle"
                            ? "held"
                            : w.state === "paused"
                              ? "promised"
                              : "disputed"
                      }`}
                    >
                      {workflowStateLabel[w.state]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <p className="app-foot">
        <span>{engines.note}</span>
        <span>All figures illustrative</span>
      </p>
    </>
  );
}
