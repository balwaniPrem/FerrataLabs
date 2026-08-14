"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconQueue,
  IconRules,
  IconFlow,
  IconChevron,
  IconAgent,
  IconSettings,
  IconData,
  IconCollapse,
} from "./Icons";
import { agents } from "@/content/agents";
import { sterling } from "@/content/sterling";
import {
  subscribeNav,
  getNavSnapshot,
  getServerNavSnapshot,
  toggleNav,
} from "@/lib/navStore";
import { useSyncExternalStore } from "react";

/**
 * The Sterling rail. The product name moved out of the app bar and down here, with
 * its sections as children, and every other agent listed collapsed beneath it.
 *
 * The point of showing the siblings is that this is a framework with many agents on
 * one platform, not a single dashboard. Sterling stays expanded so the focus does not
 * move. The collapsed rows are inert in this mockup — the other consoles do not exist
 * yet, and a row that expands into nothing would be worse than one that does not move.
 */
const SECTIONS = [
  { label: "Cash position", Icon: IconQueue },
  { label: "Approval queue", Icon: IconRules },
  { label: "Ledger", Icon: IconFlow },
];

export default function AgentRail() {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(
    subscribeNav,
    getNavSnapshot,
    getServerNavSnapshot,
  );
  const others = agents.filter((a) => a.slug !== "sterling");

  return (
    <nav className="rail-nav agent-rail" aria-label="Agents">
      <div className="rail-scroll">
        <div className="rail-agent is-open">
          <span className="chev">
            <IconChevron open />
          </span>
          <IconAgent />
          <span className="lbl nm">{sterling.name}</span>
          <span className="lbl st" aria-hidden="true" />
        </div>

        <ul className="rail-sub">
          {SECTIONS.map(({ label, Icon }, i) => (
            <li key={label}>
              <Link
                href="/sterling"
                aria-current={i === 0 && pathname === "/sterling" ? "page" : undefined}
                title={collapsed ? label : undefined}
              >
                <Icon />
                <span className="lbl">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="rail-h lbl">Other agents</p>
        {others.map((a) => (
          <div className="rail-agent" key={a.slug} data-inert="true">
            <span className="chev">
              <IconChevron />
            </span>
            <IconAgent />
            <span className="lbl nm">{a.name}</span>
            <span className="lbl role">{a.role}</span>
          </div>
        ))}
      </div>

      <div className="rail-foot">
        <Link href="/sterling" className="rail-util">
          <IconSettings />
          <span className="lbl">Settings</span>
        </Link>
        <Link href="/sterling" className="rail-util">
          <IconData />
          <span className="lbl">Data</span>
        </Link>
        <button
          type="button"
          className="rail-toggle"
          onClick={toggleNav}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          <IconCollapse collapsed={collapsed} />
          <span className="lbl">Collapse</span>
        </button>
      </div>
    </nav>
  );
}
