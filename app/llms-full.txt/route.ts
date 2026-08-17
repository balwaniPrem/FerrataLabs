import { site } from "@/content/site";
import { agents, approvalGate, personalization } from "@/content/agents";
import { industries } from "@/content/industries";
import { steps } from "@/content/steps";
import { faq } from "@/content/faq";
import { adlc, adlcIntro } from "@/content/adlc";

/**
 * /llms-full.txt — the long form. Everything an answer engine needs to describe
 * Ferrata Labs accurately without crawling every page, generated from the same
 * content the site renders.
 *
 * Deliberately excludes the unlisted product consoles (Pledge, Sterling). Those
 * carry noindex and are not part of what should be answered about publicly.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# Ferrata Labs, full reference

> A US B2B consultancy that builds and runs enterprise AI agents which perform operational
> work end to end rather than summarising it.

Source: ${site.url}. Contact: ${site.email}.

## Positioning

Most enterprise AI summarises the work. Ferrata Labs builds agents that do it, wired into
systems of record, acting on live transactions, and stopping where the judgment belongs to
a person. Every deployment is designed around how the client's business already runs.

Ideal customer: $20M+ revenue enterprises running SAP, NetSuite or Dynamics. Buyers are
CFO, Controller, VP Finance, CIO/VP IT.

## The approval gate

${approvalGate}

This is not a caveat, it is the operating model. Agents begin behind a gate and earn their
way out of one with evidence.

## The engagement

${steps
  .map(
    (s) => `### ${s.no}. ${s.title} (${s.durationLong})

${s.body.join("\n\n")}

${s.deliverablesHeading}:
${s.deliverables.map((d) => `- ${d}`).join("\n")}`,
  )
  .join("\n\n")}

## ${adlcIntro.heading}

${adlcIntro.intro}

${adlc.map((p) => `- **${p.n} ${p.title}**: ${p.body}`).join("\n")}

${adlcIntro.closer}

## The agents

${agents
  .map(
    (a) => `### ${a.name}, ${a.role}

${a.lede}

How it works:
${a.runbook.map((r, i) => `${i + 1}. **${r.title}** ${r.body}`).join("\n")}

Connects to: ${a.systems.join(", ")}.
Returns: ${a.outputs.join("; ")}.
Where it stops: ${a.gate}`,
  )
  .join("\n\n")}

## Industries

${industries
  .map(
    (i) => `### ${i.name} (${i.tags.join(", ")})

${i.lede}

What typically hurts:
${i.pains.map((p) => `- ${p}`).join("\n")}

Agents that apply, in priority order: ${i.agents.join(", ")}.`,
  )
  .join("\n\n")}

## Personalization

${personalization.body}

## Frequently asked

${faq.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
