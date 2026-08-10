"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeSim,
  getSimSnapshot,
  getServerSimSnapshot,
  mmss,
  type LiveRun,
} from "@/lib/pledgeSim";
import { completed, minutesSaved, valueModel, type Activity } from "@/content/pledge";

const phaseLabel: Record<LiveRun["phase"], string> = {
  dialing: "Dialing",
  connected: "Connected",
  voicemail: "Leaving voicemail",
  drafting: "Drafting",
  queued: "Queued for approval",
};

const glyph: Record<string, string> = {
  email: "✉",
  call: "☏",
  promise: "◆",
  payment: "✓",
  suppressed: "×",
};

function LiveRow({ r }: { r: LiveRun }) {
  const billing = r.phase === "connected" || r.phase === "voicemail";
  return (
    <li className="live-row">
      <span className="pulse" aria-hidden="true" />
      <span className={`ic${billing ? "" : " zero"}`}>{glyph[r.kind]}</span>
      <span>
        <span className="acct">{r.account}</span>
        <span className="det"> — {r.detail}</span>
      </span>
      <span className="phase">{phaseLabel[r.phase]}</span>
      <span className="dur">{billing ? mmss(r.elapsed) : "—"}</span>
      <span className={`cr${billing ? "" : " zero"}`}>
        {billing ? `${r.credits} cr` : "—"}
      </span>
    </li>
  );
}

function CompletedRow({ a }: { a: Activity }) {
  const mins = minutesSaved(a.kind, a.outcome);
  return (
    <li>
      <span className="t">{a.time}</span>
      <span className={`ic${a.credits === 0 ? " zero" : ""}`}>{glyph[a.kind]}</span>
      <span>
        <span className="acct">{a.account}</span>
        <span className="det"> — {a.detail}</span>
        {mins > 0 && <span className="saved">{mins} min of manual work avoided</span>}
      </span>
      <span className={`cr${a.credits === 0 ? " zero" : ""}`}>
        {a.credits === 0 ? "—" : `${a.credits} cr`}
      </span>
    </li>
  );
}

export default function LiveActivity() {
  const sim = useSyncExternalStore(subscribeSim, getSimSnapshot, getServerSimSnapshot);
  const live = sim.live;
  const reduced = sim.reduced;
  const savedMinutes = completed.reduce(
    (n, a) => n + minutesSaved(a.kind, a.outcome),
    0,
  );
  const savedHours = (savedMinutes / 60).toFixed(1);
  const savedUsd = Math.round((savedMinutes / 60) * valueModel.loadedHourlyUsd);

  return (
    <section className="card2">
      <div className="hd">
        <h2>Activity</h2>
        <span className="sub">
          {sim ? `${live.length} instance${live.length === 1 ? "" : "s"} running` : " "}
        </span>
      </div>

      <div className="live-hd">
        <span className="lbl">Live now</span>
        {reduced && <span className="note">paused — reduced motion</span>}
      </div>

      {/* Narrow live region: announces the set of running instances, not every tick. */}
      <ul className="stream live" aria-live="polite" aria-relevant="additions removals">
        {live.length === 0 && <li className="empty">No instances running</li>}
        {live.map((r) => (
          <LiveRow key={r.id} r={r} />
        ))}
      </ul>

      <div className="live-hd">
        <span className="lbl">Completed today</span>
        <span className="note">
          {savedHours} hours of manual work avoided · ≈ ${savedUsd.toLocaleString("en-US")} at $
          {valueModel.loadedHourlyUsd}/hr
        </span>
      </div>

      <ul className="stream">
        {completed.map((a, i) => (
          <CompletedRow key={`${a.time}-${i}`} a={a} />
        ))}
      </ul>
    </section>
  );
}
