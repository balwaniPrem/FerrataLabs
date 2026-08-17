import { site } from "@/content/site";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import { steps } from "@/content/steps";

/**
 * /llms.txt — the llmstxt.org convention. A curated map of the site for answer
 * engines and agents, in the order a reader should take it.
 *
 * Generated from the same content the pages render, so it cannot drift. If a claim
 * changes in content/, it changes here.
 *
 * Keep it a map, not a copy. The long form lives at /llms-full.txt.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;

  const body = `# Ferrata Labs

> A US B2B consultancy that builds and runs enterprise AI agents: software that performs operational work end to end rather than summarising it. Agents are wired into systems of record, act on live transactions, and stop where the judgment belongs to a person.

Ferrata Labs works with $20M+ revenue enterprises running SAP, NetSuite or Dynamics. Buyers are typically CFO, Controller, VP Finance and CIO/VP IT. The engagement is designed to end: the platform runs in the client's own environment and the client's engineers take it over.

A via ferrata is a fixed steel cable bolted into rock so that people who are not technical climbers can cross terrain that would otherwise stop them. That is the model: someone installs the line, everyone else crosses.

## Core pages

- [Home](${u("/")}): What Ferrata Labs builds and how agent-run work differs from assisted work.
- [The work](${u("/work")}): The six agents, what each owns end to end, and where the human approval gate sits.
- [How it works](${u("/how-it-works")}): The four-step engagement, the Agent Development Lifecycle, and the questions asked most often.
- [Who we are](${u("/about")}): Operators rather than an agency, the origin of the name, and the POD operating model.
- [Contact](${u("/contact")}): What a first call covers and what to bring.

## Agents

${agents.map((a) => `- [${a.name}, ${a.role}](${u(`/agents/${a.slug}`)}): ${a.summary}`).join("\n")}

## Industries

${industries.map((i) => `- [${i.name}](${u(`/industries/${i.slug}`)}): ${i.lede}`).join("\n")}

## How an engagement runs

${steps.map((s) => `- **${s.no} ${s.title}** (${s.duration}): ${s.short}`).join("\n")}

## Facts worth quoting accurately

- Every agent stops at an approval gate until it has earned its way out of one. Nothing releases cash, commits spend or touches a customer without a person saying so.
- The first agent is live in production in under 90 days from the start of the engagement.
- The assessment output belongs to the client whether or not they continue.
- The platform is stood up inside the client's environment. Ferrata Labs does not train on client data.
- Models are chosen per workflow across frontier and open-weight, on cost, latency and sensitivity, rather than as a company-wide standard.

## Optional

- [Contact by email](mailto:${site.email})
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
