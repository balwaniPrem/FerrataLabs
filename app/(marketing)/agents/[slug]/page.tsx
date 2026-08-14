import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import ConsolePreview from "@/components/ConsolePreview";
import { Personalization } from "@/components/Blocks";
import { agents, agentBySlug } from "@/content/agents";
import { industries } from "@/content/industries";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/agents/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const agent = agentBySlug(slug);
  if (!agent) return {};
  return {
    title: `${agent.name}, ${agent.role}`,
    description: agent.summary,
    openGraph: { title: `${agent.name}, ${agent.role}`, description: agent.summary },
  };
}

export default async function AgentPage({ params }: PageProps<"/agents/[slug]">) {
  const { slug } = await params;
  const agent = agentBySlug(slug);
  if (!agent) notFound();

  const appearsIn = industries.filter((i) => i.agents.includes(agent.slug));

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <h1>
            {agent.name}
            <span className="h1-sub">{agent.role}</span>
          </h1>
          <p>{agent.lede}</p>
        </div>
      </header>

      {agent.console && (
        <section className="sec console-sec">
          <div className="wrap-wide">
            <ConsolePreview {...agent.console} />
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div>
              <h2>How {agent.name} does the work.</h2>
              <p className="intro">{agent.summary}</p>

              <ol className="runbook">
                {agent.runbook.map((r, i) => (
                  <li key={r.title}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{r.title}</h4>
                      <p>{r.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside>
              <div className="panel">
                <p className="h">Connects to</p>
                <ul>
                  {agent.systems.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="panel">
                <p className="h">What you get back</p>
                <ul>
                  {agent.outputs.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              {appearsIn.length > 0 && (
                <div className="panel">
                  <p className="h">Deployed in</p>
                  <ul>
                    {appearsIn.map((i) => (
                      <li key={i.slug}>
                        <Link href={`/industries/${i.slug}`}>{i.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          <p className="gate">
            <strong>Where {agent.name} stops.</strong> {agent.gate}
          </p>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <Personalization />
          <p className="more">
            <Link href="/work">See all six agents &rarr;</Link>
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
