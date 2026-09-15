/**
 * Search metadata, imported from the live site. CLAUDE.md §5, §11.
 *
 * These titles and descriptions were written in Rank Math against focus
 * keywords and existed only in the WordPress database: they were never in this
 * repo, and `pull.sh` could not have retrieved them because it fetches theme
 * files rather than post meta. Recorded here so the work is version controlled
 * and so an export cannot quietly replace it with the older repo copy.
 *
 * Rank Math still wins on the live site, because it renders its own tags and the
 * theme now stands down when it does. This file is what keeps the two saying the
 * same thing, and what any future Next deployment would serve.
 *
 * Titles are used with `absolute`, because they are already complete. The
 * layout's "%s. Ferrata Labs" template would push them past the length Google
 * displays.
 *
 * `keyword` is the Rank Math focus keyword. It is not rendered anywhere; it is
 * kept so a later edit can see what the line was written to rank for.
 *
 * To refresh after further Rank Math edits, re-read the live values rather than
 * retyping them.
 */

export type SeoEntry = {
  title: string;
  description: string;
  keyword: string;
};

export const seo: Record<string, SeoEntry> = {
  "/": {
    title: "AI Agent Development Company for Enterprise AI Implementation",
    description:
      "Ferrata Labs is an AI agent development company running enterprise AI implementation end to end: digital transformation that reaches production.",
    keyword: "AI agent development company,AI implementation,digital transformation",
  },
  "/work": {
    title: "AI Agents in Production: What the Work Actually Looks Like",
    description:
      "What AI agents look like in production: six agents, the work each one owns end to end, and where the human approval gate sits in every workflow.",
    keyword: "AI agents in production",
  },
  "/how-it-works": {
    title: "How an Enterprise AI Agent Deployment Runs, Step by Step",
    description:
      "The Ferrata Labs engagement, step by step: assess, anchor the platform, first agent live, expand and hand over, on a disciplined agent lifecycle.",
    keyword: "AI agent deployment process",
  },
  "/about": {
    title: "The Operators Behind Ferrata Labs | Enterprise AI Team",
    description:
      "Ferrata Labs is run by operators who have put AI into production inside a regulated B2B platform, not by an agency selling pilots and roadmaps.",
    keyword: "enterprise AI operators",
  },
  "/contact": {
    title: "Book an AI Discovery Call: Bring Us One Workflow",
    description:
      "Bring one workflow to a 30-minute call. We will pressure-test whether an AI agent is genuinely the right answer for it, and say so if it is not.",
    keyword: "AI discovery call",
  },
  "/platform": {
    title: "Enterprise AI Platform You Own and Run in Your Environment",
    description:
      "The enterprise AI platform stood up in your environment: model gateway, retrieval over your ERP, evaluation harnesses, audit logging and identity.",
    keyword: "enterprise AI platform",
  },
  "/embedded-ai-team": {
    title: "Embedded AI Team: A Dedicated AI Pod Inside Your Business",
    description:
      "An embedded AI team of four: one lead, one product owner, two full-stack AI developers, inside your standups and structured so ownership transfers.",
    keyword: "embedded AI team",
  },
  "/human-in-the-loop-ai": {
    title: "Human-in-the-Loop AI: How Approval Gates Work in Production",
    description:
      "How human-in-the-loop AI works in production: approval gates as a queue, the guardrails beneath them, and what earns an agent its way out of one.",
    keyword: "human in the loop AI",
  },
  "/blog": {
    title: "Enterprise AI Playbooks and Field Notes | Ferrata Labs",
    description:
      "Playbooks and field notes from AI transformation work in production: what shipped, what stalled, and what separated the two. From Ferrata Labs.",
    keyword: "enterprise AI playbooks",
  },
  "/agents/ar-automation-software-sterling": {
    title: "AR Automation Software: AI Collections Agent for B2B Teams",
    description:
      "AR automation software that reads receivables from your ERP, ranks open accounts by recovery odds and drafts the collection sequence for approval.",
    keyword: "AR automation software",
  },
  "/agents/accounts-payable-automation-clark": {
    title: "SAP Accounts Payable Automation with an AI AP Agent | Clark",
    description:
      "SAP accounts payable automation that extracts vendor invoices from any format, posts the payable into SAP, and stops at a person before release.",
    keyword: "SAP accounts payable automation",
  },
  "/agents/account-reconciliation-automation-tally": {
    title: "Account Reconciliation Automation with an AI Agent | Tally",
    description:
      "Reconciliation automation that balances sub-ledgers to the GL line by line and hands back a clean exception list instead of another spreadsheet.",
    keyword: "account reconciliation automation",
  },
  "/agents/purchase-order-automation-chandler": {
    title: "Purchase Order Automation: AI Procurement Agent, RFQ to PO",
    description:
      "Purchase order automation from RFQ to PO: multi-vendor negotiation across email, SMS and voice, then suppliers held to the schedule they agreed.",
    keyword: "purchase order automation",
  },
  "/agents/sales-order-automation-swift": {
    title: "Sales Order Automation: Customer PO to Sales Order in Minutes",
    description:
      "Sales order automation that turns inbound customer purchase order PDFs into clean sales orders in minutes, flagging only what needs a decision.",
    keyword: "sales order automation",
  },
  "/agents/ai-quoting-agent-quill": {
    title: "AI Quoting Agent: Draft Quotes Inside Your CRM Automatically",
    description:
      "An AI quoting agent that reads every inbound enquiry, prices it against your rules and drafts the quote in your CRM for a rep to edit and send.",
    keyword: "AI quoting agent",
  },
  "/industries/financial-services": {
    title: "AI Agents for Financial Services: Reconciliation and Audit",
    description:
      "AI agents for regulated finance operations, where the reconciliation burden is heavy, the audit trail is not optional and a break is a control issue.",
    keyword: "AI agents for financial services",
  },
  "/industries/food-and-beverage": {
    title: "AI Agents for Food &amp; Beverage: Margins and Price Drift",
    description:
      "AI agents for food and beverage: thin margins, high transaction counts, and input prices that move weekly while small price drift goes unnoticed.",
    keyword: "AI agents for food and beverage",
  },
  "/industries/construction": {
    title: "AI Agents for Construction: Variations, Billing, Payables",
    description:
      "AI agents for construction, where every job carries its own commercial terms and margin leaks between a variation agreed on site and it being billed.",
    keyword: "AI agents for construction",
  },
  "/industries/manufacturing": {
    title: "AI Agents for Manufacturing: Orders, Payables, Procurement",
    description:
      "AI agents for manufacturing: customer POs re-keyed by hand, three-way match exceptions, absorbed supplier price rises and late acknowledgements.",
    keyword: "AI agents for manufacturing",
  },
  "/industries/venture-and-private-capital": {
    title: "AI Agents for Venture and Private Capital Operations",
    description:
      "AI agents for venture and private capital: capital calls, portfolio reporting, quarterly management fee checks and period-end fund reconciliation.",
    keyword: "AI agents for private capital",
  },
  "/industries/logistics-and-supply-chain": {
    title: "AI Agents for Logistics and Supply Chain Operations",
    description:
      "AI agents for logistics: carrier invoice audit at volume, accessorial charges applied outside the agreed tariff, and rate schedules nobody checks.",
    keyword: "AI agents for logistics",
  },
};

/** Metadata for a route, ready to spread into a Next `metadata` export. */
export function seoFor(route: string) {
  const e = seo[route];
  if (!e) return {};
  return {
    title: { absolute: e.title },
    description: e.description,
    openGraph: { title: e.title, description: e.description, url: route },
    twitter: { title: e.title, description: e.description },
  };
}
