/**
 * Pledge — end-to-end receivables follow-up. See CLAUDE.md §12.
 *
 * DELIBERATELY UNLISTED. This product does not appear anywhere on the marketing site:
 * not in the nav, footer, mega-menu, agent grid or sitemap. It is reached only by direct
 * link at pledge.ferratalabs.ai. Do not add it to content/agents.ts — it is not one of
 * the six, and the credit model below directly contradicts the outcome-pricing claim on
 * /about, which is precisely why it lives off-site.
 *
 * All figures here are ILLUSTRATIVE mock data for the dashboard view.
 */

export const pledge = {
  name: "Pledge",
  domain: "pledge.ferratalabs.ai",
  tagline: "Receivables followed to settlement.",
  lede:
    "Pledge connects to your ERP and runs the entire follow-up cycle — email and voice, sequenced by rule. A promise to pay suppresses both channels until the promised date. If the money doesn't arrive, follow-up resumes the next morning.",
};

/**
 * Metering. Rounding and minimums are assumptions pending confirmation — they are the
 * four questions that decide whether a displayed balance is honest:
 *   - increments round UP
 *   - connected calls bill a 1-increment minimum
 *   - unanswered calls and voicemail consume nothing
 *   - bounced email consumes nothing
 */
export const metering = {
  emailCredits: 20,
  callCreditsPerMinute: 120,
  incrementSeconds: 15,
  creditsPerIncrement: 30,
  roundingRule: "Partial increments round up to the next 15 seconds.",
  minimumRule: "Connected calls bill a one-increment minimum.",
  freeRule: "Unanswered calls, voicemail drops and bounced email consume no credits.",
};

/** Credits for a call of n seconds, under the rules above. */
export function callCredits(seconds: number): number {
  if (seconds <= 0) return 0;
  const increments = Math.max(1, Math.ceil(seconds / metering.incrementSeconds));
  return increments * metering.creditsPerIncrement;
}

export type QueueRow = {
  account: string;
  balance: number;
  daysBeyond: number;
  /** 0–100 likelihood of recovery without escalation. */
  recovery: number;
  next: string;
  state: "sequencing" | "promised" | "broken" | "disputed" | "held";
};

export const queue: QueueRow[] = [
  { account: "Kessler Industrial", balance: 284_100, daysBeyond: 47, recovery: 71, next: "Call — 2:15pm", state: "sequencing" },
  { account: "Brightwater Foods", balance: 196_450, daysBeyond: 62, recovery: 38, next: "Follow-up resumes", state: "broken" },
  { account: "Antral Logistics", balance: 154_900, daysBeyond: 21, recovery: 88, next: "Holding to 14 Aug", state: "promised" },
  { account: "Verdon Manufacturing", balance: 121_300, daysBeyond: 34, recovery: 64, next: "Email — 9:00am", state: "sequencing" },
  { account: "Halloway & Pike", balance: 98_700, daysBeyond: 88, recovery: 22, next: "Suppressed — dispute", state: "disputed" },
  { account: "Corrin Supply Co.", balance: 76_240, daysBeyond: 12, recovery: 92, next: "Holding to 11 Aug", state: "promised" },
  { account: "Maddox Freight", balance: 61_880, daysBeyond: 55, recovery: 44, next: "Call — 4:40pm", state: "sequencing" },
  { account: "Ellsworth Group", balance: 43_010, daysBeyond: 9, recovery: 79, next: "Credit hold — review", state: "held" },
];

export type Promise_ = {
  account: string;
  amount: number;
  promised: string;
  captured: "call" | "email";
  state: "pending" | "kept" | "broken";
};

export const promises: Promise_[] = [
  { account: "Antral Logistics", amount: 154_900, promised: "14 Aug", captured: "call", state: "pending" },
  { account: "Corrin Supply Co.", amount: 76_240, promised: "11 Aug", captured: "email", state: "pending" },
  { account: "Brightwater Foods", amount: 196_450, promised: "6 Aug", captured: "call", state: "broken" },
  { account: "Lindqvist Bros.", amount: 88_500, promised: "2 Aug", captured: "call", state: "kept" },
  { account: "Threshold Devices", amount: 34_720, promised: "31 Jul", captured: "email", state: "kept" },
];

export type Activity = {
  time: string;
  account: string;
  kind: "email" | "call" | "promise" | "payment" | "suppressed";
  detail: string;
  /** Credits consumed. 0 is meaningful — it means the rules made it free. */
  credits: number;
};

export const activity: Activity[] = [
  { time: "09:04", account: "Verdon Manufacturing", kind: "email", detail: "Sequence 2 of 4 — reminder with statement attached", credits: 20 },
  { time: "09:31", account: "Maddox Freight", kind: "call", detail: "No answer, no voicemail left", credits: 0 },
  { time: "10:12", account: "Kessler Industrial", kind: "call", detail: "Connected 3m 20s — AP confirmed invoice in approval", credits: callCredits(200) },
  { time: "10:48", account: "Corrin Supply Co.", kind: "promise", detail: "Promise captured — $76,240 by 11 Aug. Both channels suppressed.", credits: 0 },
  { time: "11:20", account: "Halloway & Pike", kind: "suppressed", detail: "Sequence halted — dispute flag raised in ERP", credits: 0 },
  { time: "12:02", account: "Brightwater Foods", kind: "call", detail: "Connected 1m 05s — promise date passed, follow-up resumed", credits: callCredits(65) },
  { time: "13:15", account: "Ellsworth Group", kind: "email", detail: "Bounced — mailbox full, address flagged for review", credits: 0 },
  { time: "14:07", account: "Lindqvist Bros.", kind: "payment", detail: "Remittance matched — $88,500 cleared, promise kept", credits: 0 },
];

export const credits = {
  balance: 412_600,
  monthlyAllowance: 600_000,
  spentThisMonth: 187_400,
  breakdown: [
    { label: "Voice", value: 128_700 },
    { label: "Email", value: 52_300 },
    { label: "Retries", value: 6_400 },
  ],
};

export const kpis = [
  { label: "Open receivables", value: "$4.21M", note: "across 214 accounts" },
  { label: "Promised this week", value: "$231K", note: "2 promises pending" },
  { label: "Collected month to date", value: "$1.84M", note: "collection cycle down 30%" },
  { label: "At risk", value: "$295K", note: "1 broken promise, 1 dispute" },
];
