/**
 * Pledge — end-to-end receivables follow-up. See CLAUDE.md §12.
 *
 * DELIBERATELY UNLISTED. This product does not appear anywhere on the marketing site:
 * not in the nav, footer, mega-menu, agent grid or sitemap. Reached only by direct link
 * at pledge.ferratalabs.ai. Do not add it to content/agents.ts — it is not one of the six,
 * and the credit model contradicts the outcome-pricing claim on /about, which is precisely
 * why it lives off-site.
 *
 * VOCABULARY — kept strict so the two senses of "account" never collide:
 *   workspace  the tenant, i.e. the client running Pledge (Acme Industries)
 *   account    a customer of the workspace who owes it money (Kessler Industrial)
 *
 * All figures here are ILLUSTRATIVE mock data.
 */

export const pledge = {
  name: "Pledge",
  brand: "Ferrata Labs",
  domain: "pledge.ferratalabs.ai",
  tagline: "Receivables followed to settlement.",
  lede:
    "Pledge connects to your ERP and runs the entire follow-up cycle, email and voice, sequenced by rule. A promise to pay suppresses both channels until the promised date. If the money doesn't arrive, follow-up resumes the next morning.",
};

/** The tenant. Fixed rather than switchable — this reads as a real deployment. */
export const workspace = {
  name: "Acme Industries",
  erp: "SAP S/4HANA",
  entity: "Acme Industries Inc. · US",
};

/* ------------------------------------------------------------------ metering */

/**
 * Credits. 1 credit = $0.01, sold in packs of 1,000 ($10).
 *
 * Voicemail drops and bounced email ARE charged — a bounce still performed the work,
 * and a voicemail still delivered a message. The single remaining exemption is a call
 * that rings out with nothing left behind, where nothing was delivered at all.
 */
export const metering = {
  emailCredits: 20,
  callCreditsPerMinute: 120,
  incrementSeconds: 15,
  creditsPerIncrement: 30,
  centsPerCredit: 1,
  packSize: 1000,
  packPriceUsd: 10,
  rules: [
    "Partial increments round up to the next 15 seconds.",
    "Connected calls bill a one-increment minimum.",
    "Voicemail drops bill on message duration, same rate as a call.",
    "Bounced email bills as a send, the work was performed.",
    "A call that rings out with no voicemail left bills nothing.",
  ],
};

export const dollars = (creditAmount: number) =>
  (creditAmount * metering.centsPerCredit) / 100;

/** Credits for n seconds of connected call or voicemail, under the rules above. */
export function callCredits(seconds: number): number {
  if (seconds <= 0) return 0;
  const increments = Math.max(1, Math.ceil(seconds / metering.incrementSeconds));
  return increments * metering.creditsPerIncrement;
}

/* -------------------------------------------------------------- value model */

/**
 * Human-time equivalence. Exploratory — see CLAUDE.md §12. Hours returned is the
 * headline; the dollar figure is secondary and only defensible with the rate shown.
 * Bounces are excluded deliberately: a bounce creates work rather than saving it.
 */
export const valueModel = {
  minutesPerEmail: 10,
  minutesPerCall: 20,
  minutesPerNoAnswer: 3,
  loadedHourlyUsd: 40,
  excluded: "Bounced email is excluded, it creates work rather than saving it.",
};

export function minutesSaved(kind: Activity["kind"], outcome?: Activity["outcome"]) {
  if (outcome === "bounced") return 0;
  if (kind === "call") {
    return outcome === "no-answer"
      ? valueModel.minutesPerNoAnswer
      : valueModel.minutesPerCall;
  }
  if (kind === "email") return valueModel.minutesPerEmail;
  return 0;
}

/* ------------------------------------------------------------- account queue */

export type AccountState =
  | "sequencing"
  | "promised"
  | "broken"
  | "disputed"
  | "held"
  | "bounced";

export type QueueRow = {
  account: string;
  balance: number;
  invoices: number;
  /** Days beyond the workspace's terms. */
  daysBeyond: number;
  /** Days this balance has been open. */
  daysOpen: number;
  /** Learned settlement day for this customer. null = not enough history. */
  typicalPayDay: number | null;
  /** 0–100 likelihood of recovery without escalation. */
  recovery: number;
  next: string;
  state: AccountState;
};

/** True when the balance has crept past this customer's own learned pattern. */
export function offPattern(r: QueueRow): boolean {
  if (r.typicalPayDay === null) return false;
  return r.daysOpen > r.typicalPayDay + patternRules.toleranceDays;
}

export const patternRules = {
  minPayments: 3,
  toleranceDays: 7,
  note: "A pattern needs 3 settled invoices. Within 7 days of the learned day is normal.",
};

export const queue: QueueRow[] = [
  { account: "Kessler Industrial", balance: 284_100, invoices: 6, daysBeyond: 47, daysOpen: 77, typicalPayDay: 55, recovery: 71, next: "Call, 2:15pm", state: "sequencing" },
  { account: "Brightwater Foods", balance: 196_450, invoices: 3, daysBeyond: 62, daysOpen: 92, typicalPayDay: 45, recovery: 38, next: "Follow-up resumes", state: "broken" },
  { account: "Antral Logistics", balance: 154_900, invoices: 2, daysBeyond: 21, daysOpen: 51, typicalPayDay: 60, recovery: 88, next: "Holding to 14 Aug", state: "promised" },
  { account: "Verdon Manufacturing", balance: 121_300, invoices: 9, daysBeyond: 34, daysOpen: 64, typicalPayDay: 40, recovery: 64, next: "Email, 9:00am", state: "sequencing" },
  { account: "Halloway & Pike", balance: 98_700, invoices: 4, daysBeyond: 88, daysOpen: 118, typicalPayDay: 35, recovery: 22, next: "Suppressed, dispute", state: "disputed" },
  { account: "Corrin Supply Co.", balance: 76_240, invoices: 1, daysBeyond: 12, daysOpen: 42, typicalPayDay: 45, recovery: 92, next: "Holding to 11 Aug", state: "promised" },
  { account: "Maddox Freight", balance: 61_880, invoices: 5, daysBeyond: 55, daysOpen: 85, typicalPayDay: 60, recovery: 44, next: "Call, 4:40pm", state: "sequencing" },
  { account: "Ellsworth Group", balance: 43_010, invoices: 2, daysBeyond: 9, daysOpen: 39, typicalPayDay: null, recovery: 79, next: "Fix contact email", state: "bounced" },
];

export const stateLabel: Record<AccountState, string> = {
  sequencing: "Sequencing",
  promised: "Promised",
  broken: "Promise broken",
  disputed: "Suppressed",
  held: "Credit hold",
  bounced: "Address invalid",
};

/* ------------------------------------------------------------------ promises */

export type PromiseRow = {
  account: string;
  amount: number;
  promised: string;
  captured: "call" | "email";
  state: "pending" | "kept" | "broken";
};

export const promises: PromiseRow[] = [
  { account: "Antral Logistics", amount: 154_900, promised: "14 Aug", captured: "call", state: "pending" },
  { account: "Corrin Supply Co.", amount: 76_240, promised: "11 Aug", captured: "email", state: "pending" },
  { account: "Brightwater Foods", amount: 196_450, promised: "6 Aug", captured: "call", state: "broken" },
  { account: "Lindqvist Bros.", amount: 88_500, promised: "2 Aug", captured: "call", state: "kept" },
  { account: "Threshold Devices", amount: 34_720, promised: "31 Jul", captured: "email", state: "kept" },
];

/* ------------------------------------------------------------------ activity */

export type Activity = {
  time: string;
  account: string;
  kind: "email" | "call" | "promise" | "payment" | "suppressed";
  detail: string;
  credits: number;
  outcome?: "connected" | "voicemail" | "no-answer" | "bounced" | "sent";
};

/** Completed today. The live zone is generated client-side — see LiveActivity. */
export const completed: Activity[] = [
  { time: "09:04", account: "Verdon Manufacturing", kind: "email", detail: "Sequence 2 of 4, reminder with statement attached", credits: 20, outcome: "sent" },
  { time: "09:31", account: "Maddox Freight", kind: "call", detail: "Rang out, no voicemail left", credits: 0, outcome: "no-answer" },
  { time: "09:58", account: "Threshold Devices", kind: "call", detail: "Voicemail left, 24s, callback requested", credits: callCredits(24), outcome: "voicemail" },
  { time: "10:12", account: "Kessler Industrial", kind: "call", detail: "Connected 3m 20s. AP confirmed invoice in approval", credits: callCredits(200), outcome: "connected" },
  { time: "10:48", account: "Corrin Supply Co.", kind: "promise", detail: "Promise captured, $76,240 by 11 Aug. Both channels suppressed.", credits: 0 },
  { time: "11:20", account: "Halloway & Pike", kind: "suppressed", detail: "Sequence halted, dispute flag raised in ERP", credits: 0 },
  { time: "12:02", account: "Brightwater Foods", kind: "call", detail: "Connected 1m 05s, promise date passed, follow-up resumed", credits: callCredits(65), outcome: "connected" },
  { time: "13:15", account: "Ellsworth Group", kind: "email", detail: "Hard bounce, address invalid, flagged for correction", credits: 20, outcome: "bounced" },
  { time: "14:07", account: "Lindqvist Bros.", kind: "payment", detail: "Remittance matched, $88,500 cleared, promise kept", credits: 0 },
];

/* ------------------------------------------------------------------- credits */

export const credits = {
  /** Purchased credits, carried over. */
  balance: 412_600,
  /** Included with the subscription, resets monthly, does not roll over. */
  monthlyAllowance: 600_000,
  spentThisMonth: 187_400,
  breakdown: [
    { label: "Voice", value: 128_700 },
    { label: "Email", value: 52_300 },
    { label: "Retries and bounces", value: 6_400 },
  ],
  lowThreshold: 50_000,
};

export const kpis = [
  { label: "Open receivables", value: "$4.21M", note: "across 214 accounts" },
  { label: "Promised this week", value: "$231K", note: "2 promises pending" },
  { label: "Collected month to date", value: "$1.84M", note: "collection cycle down 30%" },
  { label: "At risk", value: "$295K", note: "1 broken promise, 1 dispute" },
];
