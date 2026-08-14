import {
  sterling,
  kpis,
  queue,
  stateLabel,
  patternNote,
  drafts,
  brief,
  runLog,
} from "@/content/sterling";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function SterlingConsole() {
  return (
    <>
      <div className="app-head">
        <h1>{sterling.tagline}</h1>
        <p>{sterling.lede}</p>
      </div>

      <div className="kpis">
        {kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <p className="k">{k.label}</p>
            <p className="v">{k.value}</p>
            <p className="n">{k.note}</p>
          </div>
        ))}
      </div>

      <div className="cols">
        <div>
          <section className="card2">
            <div className="hd">
              <h2>Account queue</h2>
              <span className="sub">Ranked by recovery odds</span>
            </div>
            <table className="grid2">
              <thead>
                <tr>
                  <th>Account</th>
                  <th className="num">Balance</th>
                  <th className="num">Inv.</th>
                  <th className="num">Days open</th>
                  <th>Score</th>
                  <th>Next step</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((r) => {
                  const off =
                    r.typicalPayDay !== null && r.daysOpen > r.typicalPayDay + 7;
                  return (
                    <tr key={r.account}>
                      <td className="acct">
                        {r.account}
                        {off && <span className="offpat">off pattern</span>}
                      </td>
                      <td className="num">{usd(r.balance)}</td>
                      <td className="num">{r.invoices}</td>
                      <td className="num">
                        {r.daysOpen}
                        <span className="typ">
                          {r.typicalPayDay === null
                            ? "no pattern"
                            : `typ. ${r.typicalPayDay}`}
                        </span>
                      </td>
                      <td>
                        <span className="meter">
                          <span className="bar">
                            <span
                              className={`fill${r.score < 40 ? " low" : ""}`}
                              style={{ width: `${r.score}%` }}
                            />
                          </span>
                          <span className="pct">{r.score}</span>
                        </span>
                      </td>
                      <td className="muted">{r.next}</td>
                      <td>
                        <span
                          className={`state ${
                            r.state === "drafted"
                              ? "sequencing"
                              : r.state === "watching"
                                ? "promised"
                                : r.state === "disputed"
                                  ? "disputed"
                                  : r.state === "held"
                                    ? "held"
                                    : "bounced"
                          }`}
                        >
                          {stateLabel[r.state]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="tfoot">{patternNote}</p>
          </section>

          <section className="card2">
            <div className="hd">
              <h2>This morning</h2>
              <span className="sub">Written, not charted</span>
            </div>
            <ul className="brief">
              {brief.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside>
          <section className="card2">
            <div className="hd">
              <h2>Awaiting release</h2>
              <span className="sub">{drafts.length} drafts</span>
            </div>
            {drafts.map((d) => (
              <div className="draft" key={d.account}>
                <span className="a">{d.account}</span>
                <span className="amt">{usd(d.amount)}</span>
                <span className="s">
                  {d.channel}. {d.subject}
                </span>
                <span className="why">{d.basis}</span>
                <span className="act">
                  <button type="button" className="mini">
                    Release
                  </button>
                  <button type="button" className="mini ghost">
                    Edit
                  </button>
                  <button type="button" className="mini ghost">
                    Skip
                  </button>
                </span>
              </div>
            ))}
            <p className="gate-note">
              Sterling drafts. A person releases. Nothing reaches a customer before that.
            </p>
          </section>

          <section className="card2">
            <div className="hd">
              <h2>Run log</h2>
              <span className="sub">Today</span>
            </div>
            <ul className="runlog">
              {runLog.map((r) => (
                <li key={r.text} data-state={r.state}>
                  <span className="t">{r.time}</span>
                  <span className="k">{r.state === "done" ? "✓" : "◆"}</span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <p className="app-foot">
        <span>Sterling console</span>
        <span>Unlisted, not linked from ferratalabs.ai</span>
        <span>All figures illustrative</span>
      </p>
    </>
  );
}
