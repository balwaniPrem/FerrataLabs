import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import { Personalization, ApprovalGate } from "@/components/Blocks";
import { industries, industryBySlug } from "@/content/industries";
import { agentBySlug } from "@/content/agents";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  const title = `${industry.name}, enterprise AI agents`;
  return {
    title: industry.name,
    description: industry.lede,
    openGraph: { title, description: industry.lede },
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const applied = industry.agents
    .map((s) => agentBySlug(s))
    .filter((a) => a !== undefined);

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <h1>
            {industry.name}
            <span className="h1-sub">{industry.tags.join(" · ")}</span>
          </h1>
          <p>{industry.lede}</p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div>
              <h2>What actually hurts here.</h2>
              <p className="intro">
                Every assessment starts by measuring these rather than assuming them, but
                these are the workflows that rank highest in {industry.name.toLowerCase()}{" "}
                more often than not.
              </p>
              <ol className="runbook">
                {industry.pains.map((p, i) => (
                  <li key={p}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{p}</h4>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside>
              <div className="panel">
                <p className="h">Systems we see here</p>
                <ul>
                  {industry.systems.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="panel">
                <p className="h">Typical first agent</p>
                <ul>
                  <li>{applied[0]?.name} · {applied[0]?.role}</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <h2>The agents that apply.</h2>
          <p className="intro">
            In priority order, based on where the recoverable cost usually sits in this
            sector. Which one goes first is decided by your assessment, not by this page.
          </p>
          <div className="tiles">
            {applied.map((a) => (
              <Link key={a.slug} href={`/agents/${a.slug}`} className="tile">
                <h3>{a.name}</h3>
                <p className="sub">{a.role}</p>
                <p>{a.summary}</p>
                <span className="go">How {a.name} works &rarr;</span>
              </Link>
            ))}
          </div>
          <ApprovalGate />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Personalization />
        </div>
      </section>

      <Cta />
    </>
  );
}
