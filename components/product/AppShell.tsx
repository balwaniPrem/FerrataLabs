"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import Mark from "@/components/Mark";
import { IconQueue, IconRules, IconFlow, IconCollapse } from "./Icons";
import { pledge, workspace, credits, dollars } from "@/content/pledge";
import { sterling } from "@/content/sterling";
import CreditMeter from "./CreditMeter";
import {
  subscribeNav,
  getNavSnapshot,
  getServerNavSnapshot,
  toggleNav,
} from "@/lib/navStore";

type NavItem = {
  href: string;
  label: string;
  Icon: () => React.ReactElement;
  exact?: boolean;
};

const PLEDGE_NAV: NavItem[] = [
  { href: "/pledge", label: "Dashboard", Icon: IconQueue, exact: true },
  { href: "/pledge/rules", label: "Rules Engine", Icon: IconRules },
  { href: "/pledge/orchestration", label: "Orchestration", Icon: IconFlow },
];

const STERLING_NAV: NavItem[] = [
  { href: "/sterling", label: "Cash position", Icon: IconQueue, exact: true },
  { href: "/sterling", label: "Approval queue", Icon: IconRules },
  { href: "/sterling", label: "Ledger", Icon: IconFlow },
];

/**
 * Shared product chrome. Both consoles use it, so the pill treatment stays
 * consistent between them and with the marketing nav.
 *
 * The app bar is three levels: brand, product, workspace. The mark belongs to
 * Ferrata Labs and sits at the first level only — it is not the product's logo.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(
    subscribeNav,
    getNavSnapshot,
    getServerNavSnapshot,
  );

  const isSterling = pathname.startsWith("/sterling");
  const nav = isSterling ? STERLING_NAV : PLEDGE_NAV;
  const product = isSterling
    ? { name: sterling.name, home: "/sterling", ws: sterling.workspace, erp: sterling.erp }
    : { name: pledge.name, home: "/pledge", ws: workspace.name, erp: workspace.erp };

  return (
    <div className="shell" data-collapsed={collapsed}>
      <header className="appbar">
        <div className="appbar-in">
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
          <Link className="lvl product" href={product.home}>
            {product.name}
          </Link>
          <span className="lvl-sep" aria-hidden="true" />
          <span className="lvl ws">
            <span className="ws-name">{product.ws}</span>
            <span className="ws-meta">{product.erp}</span>
          </span>

          <span className="chip">Illustrative data</span>
          {/* Credits are a Pledge concept. Sterling drafts and stops, so it has
              no meter to show. */}
          {!isSterling && (
            <CreditMeter
              initial={credits.balance}
              low={credits.lowThreshold}
              usd={dollars(credits.balance)}
            />
          )}
        </div>
      </header>

      <div className="shell-body">
        <nav className="rail-nav" aria-label={`${product.name} sections`}>
          <ul>
            {nav.map(({ href, label, Icon, exact }, i) => {
              const active = exact ? pathname === href : i === 0 && pathname === href;
              return (
                <li key={label}>
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
