/**
 * Orchestration view data. CLAUDE.md §12.
 *
 * Two panels, matching the reference: the integration layer (discrete flows that move
 * data in and out) and durable execution (one long-running workflow per account, with
 * invoices as line-state inside it).
 *
 * The engines are named because a technical buyer finds that concrete and credible.
 * If that reads as too much disclosure, `engines` is the only place to change it.
 */

export const engines = {
  integration: "Activepieces",
  durable: "Temporal",
  note: "Integration layer moves data; durable execution holds state per account.",
};

export type Flow = {
  name: string;
  desc: string;
  runsToday: number;
  state: "healthy" | "degraded";
};

export const flows: Flow[] = [
  { name: "Nightly AR sync", desc: "02:00 local · ERP → collections ledger", runsToday: 1, state: "healthy" },
  { name: "Inbound reply router", desc: "Classify → signal the account workflow", runsToday: 47, state: "healthy" },
  { name: "Send outreach", desc: "Email dispatch with statement generation", runsToday: 128, state: "healthy" },
  { name: "Place call", desc: "Dial, consent, record, transcribe, meter", runsToday: 34, state: "healthy" },
  { name: "Payment posted", desc: "Receipt + allocation → settle and exit chase", runsToday: 19, state: "healthy" },
  { name: "Statement generator", desc: "Figures read at generation time, never cached", runsToday: 128, state: "healthy" },
  { name: "Bounce handler", desc: "Hard/soft classification → correction task", runsToday: 3, state: "degraded" },
];

export type Workflow = {
  account: string;
  openLines: number;
  state: "active" | "partly-paused" | "paused" | "idle";
  note: string;
};

/** Mirrors content/pledge.ts queue — these two views must never disagree. */
export const workflows: Workflow[] = [
  { account: "Kessler Industrial", openLines: 6, state: "active", note: "Step 3 of 5 · call in progress" },
  { account: "Brightwater Foods", openLines: 3, state: "active", note: "Resumed after broken promise" },
  { account: "Antral Logistics", openLines: 2, state: "paused", note: "Promise held to 14 Aug" },
  { account: "Verdon Manufacturing", openLines: 9, state: "active", note: "Consolidated statement queued" },
  { account: "Halloway & Pike", openLines: 4, state: "partly-paused", note: "Dispute on $98,700 · remainder chasing" },
  { account: "Corrin Supply Co.", openLines: 1, state: "paused", note: "Promise held to 11 Aug" },
  { account: "Maddox Freight", openLines: 5, state: "active", note: "Step 2 of 5 · voicemail left" },
  { account: "Ellsworth Group", openLines: 2, state: "partly-paused", note: "Address invalid · awaiting correction" },
  { account: "Lindqvist Bros.", openLines: 0, state: "idle", note: "Settled — no open lines" },
];

export const workflowStateLabel: Record<Workflow["state"], string> = {
  active: "Active",
  "partly-paused": "Partly paused",
  paused: "Paused",
  idle: "Idle",
};

/** The pipeline every account workflow moves through. Rendered as a hairline diagram. */
export const pipeline = [
  { step: "Resolve", body: "Segment ladder and step list for each open invoice" },
  { step: "Wait", body: "Durable timer to the next step's day offset" },
  { step: "Compose", body: "Consolidated statement, channel chosen by rule" },
  { step: "Gate", body: "Auto-send inside authorization, or draft for release" },
  { step: "Deliver", body: "Email or call, metered and recorded" },
  { step: "Listen", body: "Reply, payment or dispute interrupts the wait" },
  { step: "Settle", body: "Verify against ledger, exit or resume" },
];
