/**
 * The agent roster — CLAUDE.md §6.
 * Six agents. Names are semantically loaded; see §6 for the mapping.
 * Every agent page must close with the personalization message (§7).
 */

export type RunbookStep = {
  title: string;
  body: string;
};

export type Agent = {
  slug: string;
  name: string;
  /** Functional domain — this is the label used in the Solutions mega-menu. */
  role: string;
  /** One line for the mega-menu. */
  menuLine: string;
  /** Short summary used on card grids. */
  summary: string;
  /** Tight, function-targeted bullets (CLAUDE.md item 2). */
  bullets: string[];
  /** Detail page: the opening statement of what this agent owns. */
  lede: string;
  /** Detail page: explicit sequence of how the agent does the work. */
  runbook: RunbookStep[];
  /** Systems it reads from and writes to. */
  systems: string[];
  /** What lands on a person's desk. */
  outputs: string[];
  /** Where the agent stops — the approval gate for this specific agent. */
  gate: string;
};

export const agents: Agent[] = [
  {
    slug: "sterling",
    name: "Sterling",
    role: "Working capital",
    menuLine: "Cash position, collections and receivables risk",
    summary:
      "Reads receivables and payables from the ERP, narrates the cash position daily, and drafts collection sequences ranked by recovery odds.",
    bullets: [
      "Daily cash position, written not charted",
      "Collections ranked by recovery odds",
      "Disputed invoices held back automatically",
      "Promise-to-pay tracked to the date",
    ],
    lede:
      "Sterling owns the distance between an invoice being raised and the cash arriving. It reads the ledger every morning, decides who is worth chasing today, and writes the chase.",
    runbook: [
      {
        title: "Reads the ledger before anyone is awake",
        body:
          "Pulls open receivables, payables and the bank position directly from SAP HANA, NetSuite or Dynamics. Not an export: a live read against the tables. Aging buckets are recomputed rather than trusted.",
      },
      {
        title: "Scores every open account",
        body:
          "Each account gets a recovery likelihood from payment history, current disputes, days beyond terms, recent contact and the size of the balance. A 90-day balance at a customer who always pays on day 95 is not the same problem as a 40-day balance at one who has gone quiet.",
      },
      {
        title: "Writes the cash position in prose",
        body:
          "A short daily note: what came in, what did not, what changed, and what it means for the week. Written, not charted, because a controller reads a paragraph faster than they read a dashboard.",
      },
      {
        title: "Drafts the chase, in order",
        body:
          "Collection sequences are drafted per account and sequenced by recovery odds, with the tone matched to the relationship and the history attached. Accounts in active dispute are suppressed automatically so nobody chases money that is already being argued about.",
      },
      {
        title: "Tracks what was promised",
        body:
          "Every promise-to-pay is recorded against a date. When the date passes without cash, the account re-enters the queue at the top with the broken promise in the context.",
      },
    ],
    systems: ["SAP HANA", "NetSuite", "Dynamics 365", "Bank feeds", "Email"],
    outputs: [
      "Daily written cash position",
      "Ranked collection queue with drafted messages",
      "Promise-to-pay register",
      "Aged debt movement, week over week",
    ],
    gate:
      "Sterling drafts collection messages; it does not send them until a person releases the sequence. Nothing is written back to the customer master.",
  },
  {
    slug: "clark",
    name: "Clark",
    role: "Payables",
    menuLine: "Invoice capture, matching and posting into the ERP",
    summary:
      "Extracts vendor invoices from any format and posts the payable straight into SAP or NetSuite, with duplicate detection before anything is released.",
    bullets: [
      "Any format: PDF, scan, portal or email body",
      "Duplicate and near-duplicate detection",
      "Three-way match with tolerance rules",
      "Coding proposed from history, not guessed",
    ],
    lede:
      "Clark takes a vendor invoice in whatever shape it arrived and turns it into a posted, matched, correctly coded payable, or an exception with a reason attached.",
    runbook: [
      {
        title: "Takes the invoice however it comes",
        body:
          "A PDF attachment, a scan of a scan, a line item buried in an email body, a supplier portal that only renders in a browser. Clark reads all of them and normalizes to the same internal record.",
      },
      {
        title: "Checks it isn't already in the system",
        body:
          "Exact duplicates are trivial. The real exposure is near-duplicates: the same invoice re-sent with a new number, a credit note reissued as an invoice, the same work billed by two entities of one supplier group. Clark checks amount, date proximity, line structure and vendor group before anything posts.",
      },
      {
        title: "Runs the three-way match",
        body:
          "Invoice against purchase order against goods receipt, with your tolerance rules, not generic ones. Quantity and price variances inside tolerance pass; outside tolerance they become a specific exception naming the line and the delta.",
      },
      {
        title: "Proposes the coding",
        body:
          "GL account, cost center and tax treatment proposed from how this vendor's invoices have been coded historically, with the confidence stated. Where history is thin or conflicting, Clark says so rather than picking.",
      },
      {
        title: "Posts, or explains",
        body:
          "Clean invoices post into SAP or NetSuite as payables ready for the payment run. Everything else lands on a person's desk already diagnosed: which check failed, on which line, by how much.",
      },
    ],
    systems: ["SAP HANA", "NetSuite", "Dynamics 365", "Supplier portals", "Email"],
    outputs: [
      "Posted payables ready for the payment run",
      "Exception list with the failed check named",
      "Duplicate and near-duplicate flags",
      "Coding proposals with confidence stated",
    ],
    gate:
      "Clark posts payables. It never releases payment. The payment run stays with a person, always.",
  },
  {
    slug: "tally",
    name: "Tally",
    role: "Reconciliation",
    menuLine: "Sub-ledger to GL, continuously rather than at close",
    summary:
      "Balances sub-ledgers to the GL line by line and hands back a clean exception list instead of a spreadsheet nobody wants to open.",
    bullets: [
      "Runs continuously, not at month-end",
      "Variance commentary drafted for review",
      "Accrual proposals with support attached",
      "Break aging, so nothing sits unexplained",
    ],
    lede:
      "Tally does the reconciliation every day so that close is a review rather than an excavation. The number that matters is not how fast it reconciles, it is how few breaks are still unexplained on day one of close.",
    runbook: [
      {
        title: "Reconciles daily, not monthly",
        body:
          "Sub-ledger to GL, bank to cash, intercompany to intercompany, matched line by line every day. A break found on the day it happens is a five-minute question to someone who still remembers. The same break found at close is an investigation.",
      },
      {
        title: "Matches on substance, not just reference",
        body:
          "Exact reference matches are the easy half. Tally also matches on amount-and-date proximity, partial settlements against one invoice, and payments that arrived netted across several, the cases that normally get manually unpicked.",
      },
      {
        title: "Ages every break",
        body:
          "Each unmatched item carries its age, its size and its history. A three-day-old break is noise; the same break at forty days is a control problem, and it is reported as one.",
      },
      {
        title: "Drafts the variance commentary",
        body:
          "Movement against prior period and against budget, with a written explanation drawn from the underlying transactions. The controller edits a draft instead of starting from a blank cell.",
      },
      {
        title: "Proposes accruals with their support",
        body:
          "Where goods are received and not invoiced, or a service period straddles the cut-off, Tally proposes the accrual and attaches the documents it based it on. The support is in the proposal, not requested afterwards.",
      },
    ],
    systems: ["SAP HANA", "NetSuite", "Dynamics 365", "Bank statements", "Sub-ledgers"],
    outputs: [
      "Daily reconciliation status by account",
      "Aged break list with size and history",
      "Drafted variance commentary",
      "Accrual proposals with support attached",
    ],
    gate:
      "Tally proposes journals. It does not post them. Every entry that touches the GL is approved by a person first.",
  },
  {
    slug: "chandler",
    name: "Chandler",
    role: "Procurement",
    menuLine: "RFQ to PO, negotiation and price compliance",
    summary:
      "Runs RFQ to PO with multi-vendor negotiation across email, SMS and voice, then holds suppliers to the pricing schedule they agreed to.",
    bullets: [
      "Multi-vendor RFQ across channels",
      "Contract terms extracted and monitored",
      "Price variance flagged against schedule",
      "Award recommendation with the math shown",
    ],
    lede:
      "Chandler runs the part of procurement that is mostly chasing: getting quotes back from vendors who are slow to respond, then making sure the price on the invoice matches the price that was agreed.",
    runbook: [
      {
        title: "Issues the RFQ to everyone at once",
        body:
          "The same specification goes to every qualified vendor simultaneously, in whichever channel that vendor actually answers: email for some, SMS for others, and a phone call for the ones who never read either.",
      },
      {
        title: "Chases the non-responders",
        body:
          "Most of the elapsed time in an RFQ is waiting. Chandler follows up on a schedule, escalates to a second contact when the first goes quiet, and reports which vendors are habitually slow so the panel can be pruned.",
      },
      {
        title: "Normalizes the responses",
        body:
          "Quotes arrive in different units, currencies, incoterms and payment terms. Chandler restates them on one basis so the comparison is real, and flags where a headline price hides a freight or minimum-order difference.",
      },
      {
        title: "Recommends the award, with the math",
        body:
          "A ranked recommendation showing landed cost, lead time, terms and past performance, with the arithmetic shown, so the buyer can disagree with a number rather than a conclusion.",
      },
      {
        title: "Holds the price after the handshake",
        body:
          "The agreed schedule is extracted from the contract and monitored. When an invoice arrives above the agreed rate, or a rate rises before its review date, Chandler flags it against the clause it breaches.",
      },
    ],
    systems: ["SAP HANA", "NetSuite", "Dynamics 365", "Email", "SMS", "Voice"],
    outputs: [
      "Normalized quote comparison",
      "Ranked award recommendation with workings",
      "Extracted contract terms and review dates",
      "Price variance alerts against schedule",
    ],
    gate:
      "Chandler negotiates and recommends. It does not commit spend. The award and the purchase order are released by a person.",
  },
  {
    slug: "swift",
    name: "Swift",
    role: "Order management",
    menuLine: "Customer POs into clean sales orders",
    summary:
      "Turns inbound customer purchase order PDFs into clean sales orders in minutes rather than days, flagging only what genuinely needs a decision.",
    bullets: [
      "PO document to sales order in minutes",
      "Pricing and terms validated on intake",
      "Only true exceptions routed to a person",
      "Acknowledgement sent the same hour",
    ],
    lede:
      "Swift removes the queue between a customer sending a purchase order and that order existing in your system. The work is not hard, it is just constant, which is exactly why it backs up.",
    runbook: [
      {
        title: "Reads the customer's PO as sent",
        body:
          "Every customer has their own PO layout, and none of them are yours. Swift reads the document as it arrives, whether that is a PDF, a portal download or an email body, and extracts lines, quantities, dates and ship-to without a template per customer.",
      },
      {
        title: "Validates against your own rules",
        body:
          "Prices checked against the contracted price list for that customer, not list price. Quantities checked against minimum order and multiples. Requested dates checked against lead time. Credit status checked before anything is promised.",
      },
      {
        title: "Resolves what it can",
        body:
          "Part numbers given in the customer's nomenclature are mapped to yours. Rounding, unit-of-measure differences and known abbreviations are handled silently, because escalating those is what makes people ignore an exception queue.",
      },
      {
        title: "Escalates only real decisions",
        body:
          "A price that does not match the contract, a date that cannot be met, a customer over their credit limit: these go to a person, with the conflict stated and a proposed resolution. Everything else just becomes an order.",
      },
      {
        title: "Acknowledges to the customer",
        body:
          "Order acknowledgement with confirmed lines and dates goes back the same hour, which is where most of the perceived improvement comes from.",
      },
    ],
    systems: ["SAP HANA", "NetSuite", "Dynamics 365", "Customer portals", "Email"],
    outputs: [
      "Sales orders created and confirmed",
      "Exception queue with proposed resolutions",
      "Same-hour order acknowledgements",
      "Intake accuracy and cycle-time reporting",
    ],
    gate:
      "Swift creates orders inside your rules. Anything outside them stops and waits for a person: off-contract pricing, credit holds, unmeetable dates.",
  },
  {
    slug: "quill",
    name: "Quill",
    role: "Quotes & CRM",
    menuLine: "Inbound enquiries priced and drafted in the CRM",
    summary:
      "Reads every inbound enquiry, prices it against your rules, and drafts the quote in your CRM so a rep is editing rather than starting cold.",
    bullets: [
      "Every enquiry read, none dropped",
      "Priced against your own rule set",
      "Drafted in the CRM, ready to edit",
      "Follow-up scheduled and tracked",
    ],
    lede:
      "Quill makes sure no inbound enquiry goes unanswered and no rep starts a quote from a blank screen. The volume problem and the quality problem have the same fix.",
    runbook: [
      {
        title: "Reads everything that comes in",
        body:
          "Shared inboxes, web forms, portal messages, forwarded threads. Every enquiry is read and classified, including the ones that arrive at 6pm on a Friday and would otherwise be found on Monday.",
      },
      {
        title: "Works out what is actually being asked for",
        body:
          "Customer language mapped to your catalog, with quantity, specification and timing pulled out of prose. Where the enquiry is genuinely ambiguous, Quill drafts the clarifying question rather than guessing the product.",
      },
      {
        title: "Prices it against your rules",
        body:
          "Contracted rates where the customer has them, volume breaks, regional differences, and the margin floors your business actually enforces. Not a suggested price, your price.",
      },
      {
        title: "Drafts the quote where the rep works",
        body:
          "The quote is created in the CRM against the right account and opportunity, with the drafted message attached. The rep opens something 80% finished and applies the judgment that is genuinely theirs.",
      },
      {
        title: "Schedules the follow-up",
        body:
          "Follow-up cadence set at the moment the quote goes out and tracked against response. Quotes that go quiet are resurfaced with their history rather than quietly aging out of the pipeline.",
      },
    ],
    systems: ["Salesforce", "HubSpot", "Dynamics 365", "SAP HANA", "Shared inboxes"],
    outputs: [
      "Drafted quotes in the CRM, ready to send",
      "Enquiry classification and response times",
      "Clarifying questions drafted where needed",
      "Follow-up schedule with outcomes tracked",
    ],
    gate:
      "Quill drafts. A rep sends. No quote reaches a customer without a person reading it first.",
  },
];

export const agentBySlug = (slug: string) => agents.find((a) => a.slug === slug);

/** §7 — load-bearing. Must close every agent and industry page. */
export const personalization = {
  heading: "Your agents are built around your organization.",
  body:
    "The way you price, route, approve and escalate is years of accumulated judgment, and it's a real advantage. It belongs to you and it stays with you, we're not asking you to hand over your playbook or fit yourself into someone else's template. We start from how your business already works, encode that logic into agents built for your environment, and leave you with an operation that runs faster with exactly the things that make you good at it still intact.",
};

/** §7 — non-negotiable, appears wherever agent capability is claimed. */
export const approvalGate =
  "Every agent stops at an approval gate until it has earned its way out of one. Nothing releases cash, commits spend or touches a customer without a person saying so.";
