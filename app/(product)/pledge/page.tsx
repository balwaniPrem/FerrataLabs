import Mark from "@/components/Mark";
import {
  pledge,
  metering,
  queue,
  promises,
  activity,
  credits,
  kpis,
} from "@/content/pledge";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = (n: number) => n.toLocaleString("en-US");

const stateLabel: Record<string, string> = {
  sequencing: "Sequencing",
  promised: "Promised",
  broken: "Promise broken",
  disputed: "Suppressed",
  held: "Credit hold",
};

const kindGlyph: Record<string, string> = {
  email: "✉",
  call: "☏",
  promise: "◆",
  payment: "✓",
  suppressed: "×",
};

export default function PledgeDashboard() {
  const usedPct = Math.round((credits.spentThisMonth / credits.monthlyAllowance) * 100);

  return (
    <>
      <header className="appbar">
        <div className="appbar-in">
          <span className="brand">
            <Mark size={19} />
            {pledge.name}
          </span>
          <span className="chip">Illustrative data</span>
          <span className="bal">
            <span className="k">Credits remaining</span>
            <span className="v">{num(credits.balance)}</span>
          </span>
        </div>
      </header>

      <main className="app-wrap">
        <div className="app-head">
          <h1>{pledge.tagline}</h1>
          <p>{pledge.lede}</p>
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
                    <th className="num">Days beyond</th>
                    <th>Recovery</th>
                    <th>Next action</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((r) => (
                    <tr key={r.account}>
                      <td className="acct">{r.account}</td>
                      <td className="num">{usd(r.balance)}</td>
                      <td className="num">{r.daysBeyond}</td>
                      <td>
                        <span className="meter">
                          <span className="bar">
                            <span
                              className={`fill${r.recovery < 40 ? " low" : ""}`}
                              style={{ width: `${r.recovery}%` }}
                            />
                          </span>
                          <span className="pct">{r.recovery}</span>
                        </span>
                      </td>
                      <td className="muted">{r.next}</td>
                      <td>
                        <span className={`state ${r.state}`}>{stateLabel[r.state]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="card2">
              <div className="hd">
                <h2>Activity</h2>
                <span className="sub">Every action logged, every credit attributable</span>
              </div>
              <ul className="stream">
                {activity.map((a, i) => (
                  <li key={`${a.time}-${i}`}>
                    <span className="t">{a.time}</span>
                    <span className={`ic${a.credits === 0 ? " zero" : ""}`}>
                      {kindGlyph[a.kind]}
                    </span>
                    <span>
                      <span className="acct">{a.account}</span>
                      <span className="det"> — {a.detail}</span>
                    </span>
                    <span className={`cr${a.credits === 0 ? " zero" : ""}`}>
                      {a.credits === 0 ? "—" : `${num(a.credits)} cr`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside>
            <section className="card2">
              <div className="hd">
                <h2>Promise register</h2>
              </div>
              <ul className="promises">
                {promises.map((p) => (
                  <li key={`${p.account}-${p.promised}`}>
                    <span className="a">{p.account}</span>
                    <span className="amt">{usd(p.amount)}</span>
                    <span className="d">
                      {p.promised} · captured on {p.captured}
                    </span>
                    <span className={`state ${p.state === "kept" ? "promised" : p.state === "broken" ? "broken" : "sequencing"}`}>
                      {p.state}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card2">
              <div className="hd">
                <h2>Credit usage</h2>
                <span className="sub">This month</span>
              </div>
              <div className="burn">
                <div className="track">
                  <span style={{ width: `${usedPct}%` }} />
                </div>
                <div className="row">
                  <span>Spent</span>
                  <b>
                    {num(credits.spentThisMonth)} / {num(credits.monthlyAllowance)}
                  </b>
                </div>
                {credits.breakdown.map((b) => (
                  <div className="row" key={b.label}>
                    <span>{b.label}</span>
                    <b>{num(b.value)}</b>
                  </div>
                ))}
              </div>
              <div className="rates">
                <p className="h">Rate card</p>
                <p>Email — {metering.emailCredits} credits each.</p>
                <p>
                  Voice — {metering.callCreditsPerMinute} credits per minute, billed in{" "}
                  {metering.incrementSeconds}-second increments of{" "}
                  {metering.creditsPerIncrement} credits.
                </p>
                <p>{metering.roundingRule}</p>
                <p>{metering.minimumRule}</p>
                <p>{metering.freeRule}</p>
              </div>
            </section>
          </aside>
        </div>

        <p className="app-foot">
          <span>{pledge.domain}</span>
          <span>Unlisted — not linked from ferratalabs.ai</span>
          <span>All figures illustrative</span>
        </p>
      </main>
    </>
  );
}
