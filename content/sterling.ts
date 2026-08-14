/**
 * Sterling console — the mockup captured for /agents/sterling. CLAUDE.md §13.
 *
 * UNLISTED, like Pledge. Exists to be rendered and recorded, not to be found.
 *
 * The distinction from Pledge matters and is deliberate. Pledge executes inside an
 * authorized sequence and meters credits. Sterling drafts and stops: every outbound
 * action sits in an approval queue until a person releases it, which is what §7
 * promises on every page of the marketing site. Same underlying data, different verb.
 * Do not add credits, autonomous sending or a rate card to this console.
 *
 * All figures are ILLUSTRATIVE.
 */

export const sterling = {
  name: "Sterling",
  role: "Working capital",
  brand: "Ferrata Labs",
  workspace: "Redmond Fabrication",
  erp: "SAP S/4HANA",
  tagline: "The cash position, written every morning.",
  lede:
    "Sterling reads receivables and payables straight from the ERP, scores every open account, and drafts the day's chase. Nothing leaves the building until a person releases it.",
};

export const kpis = [
  { label: "Open receivables", value: "$3.84M", note: "across 186 accounts" },
  { label: "Due this week", value: "$412K", note: "11 accounts" },
  { label: "Drafts awaiting release", value: "7", note: "4 email, 3 call scripts" },
  { label: "Beyond pattern", value: "$596K", note: "5 accounts drifting" },
];

export type AccountRow = {
  account: string;
  balance: number;
  invoices: number;
  daysOpen: number;
  typicalPayDay: number | null;
  /** 0-100 likelihood of recovery without escalation. */
  score: number;
  next: string;
  state: "drafted" | "queued" | "watching" | "disputed" | "held";
};

export const queue: AccountRow[] = [
  { account: "Kessler Industrial", balance: 284_100, invoices: 6, daysOpen: 77, typicalPayDay: 55, score: 71, next: "Call script drafted", state: "drafted" },
  { account: "Brightwater Foods", balance: 196_450, invoices: 3, daysOpen: 92, typicalPayDay: 45, score: 38, next: "Escalation drafted", state: "drafted" },
  { account: "Antral Logistics", balance: 154_900, invoices: 2, daysOpen: 51, typicalPayDay: 60, score: 88, next: "No action, inside pattern", state: "watching" },
  { account: "Verdon Manufacturing", balance: 121_300, invoices: 9, daysOpen: 64, typicalPayDay: 40, score: 64, next: "Statement drafted", state: "drafted" },
  { account: "Halloway & Pike", balance: 98_700, invoices: 4, daysOpen: 118, typicalPayDay: 35, score: 22, next: "Held, dispute open", state: "disputed" },
  { account: "Corrin Supply Co.", balance: 76_240, invoices: 1, daysOpen: 42, typicalPayDay: 45, score: 92, next: "No action, inside pattern", state: "watching" },
  { account: "Maddox Freight", balance: 61_880, invoices: 5, daysOpen: 85, typicalPayDay: 60, score: 44, next: "Reminder queued", state: "queued" },
  { account: "Ellsworth Group", balance: 43_010, invoices: 2, daysOpen: 39, typicalPayDay: null, score: 79, next: "Credit review", state: "held" },
];

export const stateLabel: Record<AccountRow["state"], string> = {
  drafted: "Draft ready",
  queued: "Queued",
  watching: "Watching",
  disputed: "Held, dispute",
  held: "Credit hold",
};

export const patternNote =
  "Days open is measured against each customer's own settlement pattern, not your terms. A customer who always pays on day 55 is not late at 51.";

/** The approval queue. This is what makes Sterling Sterling. */
export type Draft = {
  account: string;
  channel: "Email" | "Call script";
  subject: string;
  amount: number;
  basis: string;
};

export const drafts: Draft[] = [
  { account: "Kessler Industrial", channel: "Call script", subject: "Six invoices, oldest 77 days", amount: 284_100, basis: "Pays ~day 55. Drifted 22 days past pattern." },
  { account: "Brightwater Foods", channel: "Email", subject: "Escalation to controller", amount: 196_450, basis: "Promise broken 6 Aug. Score fell 38." },
  { account: "Verdon Manufacturing", channel: "Email", subject: "Consolidated statement, 9 invoices", amount: 121_300, basis: "One statement rather than nine reminders." },
];

/** The morning note, written not charted. */
export const brief = [
  "$412K falls due this week across 11 accounts. Nothing in that set has broken a promise before.",
  "Kessler has drifted 22 days past its own pattern for the first time in fourteen months. Worth a call rather than an email.",
  "Brightwater broke its 6 August promise. Draft escalates to the controller, not the AP clerk.",
  "Halloway stays held while the dispute is open. No contact drafted.",
];

/** Steps the console walks through in the recorded capture. */
export const runLog = [
  { time: "06:02", text: "Read 186 accounts from SAP S/4HANA", state: "done" },
  { time: "06:04", text: "Recomputed aging, matched 14 overnight receipts", state: "done" },
  { time: "06:07", text: "Scored every open account against its own pattern", state: "done" },
  { time: "06:11", text: "Drafted 7 actions, ranked by recovery odds", state: "done" },
  { time: "06:11", text: "Waiting for a person to release them", state: "waiting" },
];
