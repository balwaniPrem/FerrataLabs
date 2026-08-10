import LiveActivity from "@/components/product/LiveActivity";
import BuyCredits from "@/components/product/BuyCredits";
import {
  pledge,
  metering,
  queue,
  promises,
  credits,
  kpis,
  dollars,
  offPattern,
  patternRules,
  stateLabel,
} from "@/content/pledge";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = (n: number) => n.toLocaleString("en-US");

export default function PledgeDashboard() {
  const usedPct = Math.round((credits.spentThisMonth / credits.monthlyAllowance) * 100);

  return (
    <>
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
                  <th className="num">Inv.</th>
                  <th className="num">Days open</th>
                  <th>Recovery</th>
                  <th>Next action</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((r) => {
                  const off = offPattern(r);
                  return (
                    <tr key={r.account}>
                      <td className="acct">
                        {r.account}
                        {off && (
                          <span className="offpat" title="Beyond this customer's own payment pattern">
                            off pattern
                          </span>
                        )}
                      </td>
                      <td className="num">{usd(r.balance)}</td>
                      <td className="num">{r.invoices}</td>
                      <td className="num">
                        {r.daysOpen}
                        <span className="typ">
                          {r.typicalPayDay === null ? "no pattern" : `typ. ${r.typicalPayDay}`}
                        </span>
                      </td>
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
                  );
                })}
              </tbody>
            </table>
            <p className="tfoot">
              <b>Days open</b> is measured against this customer&rsquo;s learned pattern, not
              your terms — {patternRules.note}
            </p>
          </section>

          <LiveActivity />
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
                  <span
                    className={`state ${
                      p.state === "kept" ? "promised" : p.state === "broken" ? "broken" : "sequencing"
                    }`}
                  >
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
                <span>Allowance used</span>
                <b>
                  {num(credits.spentThisMonth)} / {num(credits.monthlyAllowance)}
                </b>
              </div>
              {credits.breakdown.map((b) => (
                <div className="row" key={b.label}>
                  <span>{b.label}</span>
                  <b>
                    {num(b.value)}
                    <span className="usd"> ${num(Math.round(dollars(b.value)))}</span>
                  </b>
                </div>
              ))}
            </div>

            <BuyCredits />

            <div className="rates">
              <p className="h">Rate card</p>
              <table className="rate-table">
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td className="num">{metering.emailCredits} cr</td>
                    <td className="num">${dollars(metering.emailCredits).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Voice · per 15s</td>
                    <td className="num">{metering.creditsPerIncrement} cr</td>
                    <td className="num">${dollars(metering.creditsPerIncrement).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Voice · per minute</td>
                    <td className="num">{metering.callCreditsPerMinute} cr</td>
                    <td className="num">${dollars(metering.callCreditsPerMinute).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <ul className="rate-rules">
                {metering.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
      </div>

      <p className="app-foot">
        <span>{pledge.domain}</span>
        <span>Unlisted — not linked from ferratalabs.ai</span>
        <span>All figures illustrative</span>
      </p>
    </>
  );
}
