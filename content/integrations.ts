/**
 * Integration marquee — CLAUDE.md item 3 / §8.
 *
 * RULE: every name on this list must be a real, working connection. The framing is
 * "connects with" — never partnership, never certification, never a vendor logo lockup.
 * SAP in particular polices its marks. Rendered as wordmarks in the muted palette,
 * not brand-colored logos, which would wreck §4.
 *
 * `primary: true` gives SAP HANA its subtle prominence without a banner.
 */

export type Integration = {
  name: string;
  primary?: boolean;
};

export const integrations: Integration[] = [
  { name: "SAP HANA", primary: true },
  { name: "SAP S/4HANA", primary: true },
  { name: "NetSuite" },
  { name: "Dynamics 365" },
  { name: "Salesforce" },
  { name: "HubSpot" },
  { name: "Snowflake" },
  { name: "Databricks" },
  { name: "Azure" },
  { name: "AWS" },
  { name: "SharePoint" },
  { name: "OneDrive" },
  { name: "Outlook" },
  { name: "Gmail" },
  { name: "Slack" },
  { name: "Teams" },
  { name: "Power BI" },
  { name: "Coupa" },
  { name: "Concur" },
  { name: "Stripe" },
  { name: "Xero" },
  { name: "Jira" },
  { name: "ServiceNow" },
  { name: "EDI" },
];

export const integrationsCopy = {
  eyebrow: "Systems of record",
  heading: "SAP first, because that's where the work is.",
  intro:
    "Our deepest work is against SAP HANA, reading the ledger live, transforming it, and writing back through the same controls your team already uses. Two of our recent deployments started there. Everything else on this list connects too, and the agents don't care which of them holds the data.",
};
