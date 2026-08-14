/**
 * Industry verticals — CLAUDE.md §6.
 * Entry lens for the Solutions mega-menu. Agents stay functional; industries
 * are how a buyer self-identifies. Every industry page closes with the
 * personalization message (§7).
 */

export type Industry = {
  slug: string;
  name: string;
  /** Three sub-descriptors, shown under the name in the mega-menu. */
  tags: string[];
  /** One line for the mega-menu. */
  menuLine: string;
  lede: string;
  /** What actually hurts in this vertical — concrete, not generic. */
  pains: string[];
  /** Agent slugs that apply here, in priority order. */
  agents: string[];
  /** Systems commonly found in this vertical. */
  systems: string[];
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial services",
    tags: ["Banking", "Insurance", "Wealth"],
    menuLine: "Reconciliation depth and an auditable trail on every action",
    lede:
      "Regulated finance operations where the reconciliation burden is heavy, the audit trail is not optional, and an unexplained break is a control finding rather than an inconvenience.",
    pains: [
      "Daily reconciliation across custodians, sub-ledgers and the GL",
      "Breaks that age quietly until they become a control finding",
      "Evidence for audit assembled by hand, after the fact",
      "Fee and premium billing checked against schedules manually",
    ],
    agents: ["tally", "sterling", "clark"],
    systems: ["SAP HANA", "Dynamics 365", "Custodian feeds", "Sub-ledgers"],
  },
  {
    slug: "food-and-beverage",
    name: "Food & beverage",
    tags: ["Restaurants", "Distribution", "Procurement"],
    menuLine: "High-volume invoices, thin margins, volatile input pricing",
    lede:
      "Thin margins and high transaction counts, where input prices move weekly and a small percentage of unnoticed price drift is the whole year's profit.",
    pains: [
      "Thousands of low-value supplier invoices a month",
      "Agreed prices quietly drifting between contract reviews",
      "Credit notes and short deliveries reconciled by hand",
      "Multi-site ordering with no single view of spend",
    ],
    agents: ["clark", "chandler", "swift"],
    systems: ["NetSuite", "SAP HANA", "Supplier portals", "Email"],
  },
  {
    slug: "construction",
    name: "Construction",
    tags: ["Contractors", "Tenders", "Site ops"],
    menuLine: "Tender cycles, subcontractor billing and retention tracking",
    lede:
      "Project-based work where every job has its own commercial terms, and the paperwork between a variation being agreed on site and it being billed is where the margin leaks.",
    pains: [
      "Tender packages assembled and chased across dozens of suppliers",
      "Subcontractor applications checked against contract rates line by line",
      "Retentions tracked across projects and release dates missed",
      "Variations agreed on site and billed months later, if at all",
    ],
    agents: ["chandler", "clark", "sterling"],
    systems: ["SAP HANA", "Dynamics 365", "Email", "SMS"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tags: ["Production", "Quality", "Procurement"],
    menuLine: "PO intake, three-way match and supplier price compliance",
    lede:
      "Where the order book arrives as PDFs in a dozen customer formats and the payables function lives or dies on the three-way match.",
    pains: [
      "Customer POs re-keyed by hand into sales orders",
      "Three-way match exceptions worked through a spreadsheet",
      "Supplier price increases absorbed before anyone notices",
      "Order acknowledgements sent days after receipt",
    ],
    agents: ["swift", "clark", "chandler"],
    systems: ["SAP HANA", "Dynamics 365", "NetSuite", "Customer portals"],
  },
  {
    slug: "venture-and-private-capital",
    name: "Venture & private capital",
    tags: ["VC", "PE", "Fund ops"],
    menuLine: "Fund administration, capital calls and portfolio reporting",
    lede:
      "Small operating teams carrying a disproportionate administrative load across funds, vehicles and portfolio companies, where the constraint is people, not systems.",
    pains: [
      "Capital calls and distributions assembled per LP by hand",
      "Portfolio reporting collated from inconsistent company submissions",
      "Management fee calculations checked manually each quarter",
      "Intercompany and inter-fund positions reconciled at period end",
    ],
    agents: ["tally", "sterling", "quill"],
    systems: ["NetSuite", "Fund administration platforms", "Email"],
  },
  {
    slug: "logistics-and-supply-chain",
    name: "Logistics & supply chain",
    tags: ["Freight", "3PL", "Last mile"],
    menuLine: "Carrier invoice audit, rate compliance and order intake",
    lede:
      "Enormous invoice volume at low unit value, where rates are contractual, accessorial charges are where the money hides, and nobody has time to check every line.",
    pains: [
      "Carrier invoices arriving faster than anyone can audit them",
      "Accessorial charges applied outside the agreed tariff",
      "Rate schedules that change more often than they are checked",
      "Customer bookings arriving in every format imaginable",
    ],
    agents: ["clark", "chandler", "swift"],
    systems: ["SAP HANA", "NetSuite", "Carrier portals", "EDI"],
  },
];

export const industryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);
