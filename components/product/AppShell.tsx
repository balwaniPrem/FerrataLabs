"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import Mark from "@/components/Mark";
import { IconQueue, IconRules, IconFlow, IconCollapse } from "./Icons";
import { pledge, workspace, credits, dollars } from "@/content/pledge";
import CreditMeter from "./CreditMeter";
import {
  subscribeNav,
  getNavSnapshot,
  getServerNavSnapshot,
  toggleNav,
} from "@/lib/navStore";

const NAV = [
  { href: "/pledge", label: "Dashboard", Icon: IconQueue },
  { href: "/pledge/rules", label: "Rules Engine", Icon: IconRules },
  { href: "/pledge/orchestration", label: "Orchestration", Icon: IconFlow },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(
    subscribeNav,
    getNavSnapshot,
    getServerNavSnapshot,
  );

  return (
    <div className="shell" data-collapsed={collapsed}>
      <header className="appbar">
        <div className="appbar-in">
          {/* Three levels: brand → product → workspace. The mark belongs to Ferrata
              Labs, not to Pledge, which is why it sits at the first level only. */}
          <a
            className="lvl brand"
            href="https://ferratalabs.ai"
            rel="noreferrer"
            title="Ferrata Labs"
          >
            <Mark size={19} />
            <span>{pledge.brand}</span>
          </a>
          <span className="lvl-sep" aria-hidden="true" />
          <Link className="lvl product" href="/pledge">
            {pledge.name}
          </Link>
          <span className="lvl-sep" aria-hidden="true" />
          <span className="lvl ws">
            <span className="ws-name">{workspace.name}</span>
            <span className="ws-meta">{workspace.erp}</span>
          </span>

          <span className="chip">Illustrative data</span>
          <CreditMeter
            initial={credits.balance}
            low={credits.lowThreshold}
            usd={dollars(credits.balance)}
          />
        </div>
      </header>

      <div className="shell-body">
        <nav className="rail-nav" aria-label="Pledge sections">
          <ul>
            {NAV.map(({ href, label, Icon }) => {
              const active =
                href === "/pledge" ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? label : undefined}
                  >
                    <Icon />
                    <span className="lbl">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

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
        </nav>

        <main className="shell-main">{children}</main>
      </div>
    </div>
  );
}
