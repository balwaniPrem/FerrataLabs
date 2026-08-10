"use client";

import { useMemo, useState } from "react";
import { families, rules, type Rule } from "@/content/pledgeRules";

/**
 * Rules Engine table. Toggles are interactive but not persisted — there is no backend,
 * and pretending otherwise would be worse than saying so. Locked rules cannot be
 * disabled: they are the promises the product makes (approval gate, compliance,
 * metering, audit), and a UI that lets you switch them off implies they are optional.
 */
export default function RuleTable() {
  const [off, setOff] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Rule | null>(null);
  const [q, setQ] = useState("");

  const toggle = (r: Rule) => {
    if (r.locked) return;
    setOff((prev) => {
      const next = new Set(prev);
      if (next.has(r.id)) next.delete(r.id);
      else next.add(r.id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rules;
    return rules.filter(
      (r) =>
        r.name.toLowerCase().includes(needle) ||
        r.desc.toLowerCase().includes(needle) ||
        r.id.toLowerCase().includes(needle),
    );
  }, [q]);

  const enabled = rules.length - off.size;

  return (
    <>
      <div className="rules-bar">
        <span className="count">
          <b>{enabled}</b> / {rules.length} rules enabled
        </span>
        <span className="locked-note">
          {rules.filter((r) => r.locked).length} locked — approval, compliance, metering and
          audit cannot be disabled
        </span>
        <input
          className="rule-search"
          type="search"
          placeholder="Filter rules…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter rules"
        />
      </div>

      {families.map((f) => {
        const fam = filtered.filter((r) => r.fam === f.key);
        if (fam.length === 0) return null;
        return (
          <section className="card2 fam" key={f.key}>
            <div className="hd">
              <span className="fam-key">{f.key}</span>
              <h2>{f.label}</h2>
              <span className="sub">{f.blurb}</span>
            </div>
            <table className="grid2 rules">
              <tbody>
                {fam.map((r) => {
                  const isOff = off.has(r.id);
                  return (
                    <tr key={r.id} className={isOff ? "is-off" : undefined}>
                      <td className="rid">{r.id}</td>
                      <td>
                        <button
                          type="button"
                          className="rule-name"
                          onClick={() => setOpen(r)}
                          aria-haspopup="dialog"
                        >
                          {r.name}
                        </button>
                        <span className="rule-desc">{r.desc}</span>
                      </td>
                      <td className="rtrig">{r.trigger}</td>
                      <td className="rout">{r.output}</td>
                      <td className="rtog">
                        <button
                          type="button"
                          className={`sw${isOff ? "" : " on"}${r.locked ? " locked" : ""}`}
                          onClick={() => toggle(r)}
                          disabled={r.locked}
                          aria-pressed={!isOff}
                          aria-label={`${r.name} — ${isOff ? "disabled" : "enabled"}${
                            r.locked ? ", locked" : ""
                          }`}
                        >
                          <span className="knob" />
                        </button>
                        {r.locked && <span className="lk">locked</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}

      {open && (
        <div className="ovl" role="dialog" aria-modal="true" aria-label={open.name}>
          <div className="ovl-card">
            <div className="ovl-hd">
              <span className="rid">{open.id}</span>
              <h3>{open.name}</h3>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close">
                ×
              </button>
            </div>
            <p className="ovl-desc">{open.desc}</p>
            <dl className="ovl-meta">
              <div>
                <dt>Trigger</dt>
                <dd>{open.trigger}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{open.output}</dd>
              </div>
              <div>
                <dt>Family</dt>
                <dd>{families.find((f) => f.key === open.fam)?.label}</dd>
              </div>
              <div>
                <dt>State</dt>
                <dd>{open.locked ? "Locked on" : off.has(open.id) ? "Disabled" : "Enabled"}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
