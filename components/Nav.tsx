"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import { platformMenu } from "@/content/platform";
import { processMenu } from "@/content/hitl";
import Mark from "./Mark";

/**
 * `prefix` means a child route lights the parent item, matching
 * ferrata_current_blog() and the platform check in the theme.
 */
const pages = [
  { href: "/about", label: "Who we are" },
  { href: "/blog", label: "Blog", prefix: true },
];

/** Menu key -> the routes that should mark its trigger active. */
const MENUS = {
  solutions: {
    label: "Solutions",
    active: (p: string) => p.startsWith("/agents") || p.startsWith("/industries"),
  },
  platform: {
    label: "Platform",
    active: (p: string) => p.startsWith("/platform") || p.startsWith("/embedded-ai-team"),
  },
  process: {
    label: "How it works",
    active: (p: string) =>
      p.startsWith("/how-it-works") ||
      p.startsWith("/work") ||
      p.startsWith("/human-in-the-loop-ai"),
  },
} as const;

type MenuKey = keyof typeof MENUS;

function Caret() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
      <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Floating chrome rather than a header bar. Two pills sit over one continuous
 * scrolling surface: the brand on the left, everything else on the right with the
 * CTA inside the same pill. The page scrolls beneath them, which is why the hero
 * and page headers carry extra top padding to clear it.
 *
 * Three mega-menus now, so open state is a key rather than a boolean. Only one
 * can be open at a time: moving from one trigger to the other swaps them rather
 * than opening both.
 *
 * The top level is Solutions / Platform / How it works / Who we are / Blog / CTA.
 * "The work" sits under How it works: the two read as near-duplicates side by
 * side and between them ate two slots, and the engagement is the parent idea.
 */
export default function Nav() {
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<MenuKey | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  /** One wrapper element per menu, so outside-click can test all of them. */
  const wraps = useRef<Partial<Record<MenuKey, HTMLDivElement | null>>>({});
  const triggers = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  /**
   * Tracks how the menu was opened. Without this, hovering the trigger opens the
   * menu and the click that follows immediately toggles it shut.
   */
  const openedBy = useRef<"hover" | "click" | null>(null);

  const close = useCallback(() => {
    openedBy.current = null;
    setOpenMega(null);
  }, []);

  const openByHover = useCallback((key: MenuKey) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      openedBy.current ??= "hover";
      setOpenMega(key);
    }
  }, []);

  const toggleByClick = useCallback(
    (key: MenuKey) => {
      setOpenMega((cur) => {
        if (cur === key && openedBy.current === "click") {
          openedBy.current = null;
          return null;
        }
        openedBy.current = "click";
        return key;
      });
    },
    []
  );

  const closeAll = useCallback(() => {
    openedBy.current = null;
    setOpenMega(null);
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    if (!openMega) return;
    const inside = (t: Node) =>
      Object.values(wraps.current).some((el) => el?.contains(t));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const t = triggers.current[openMega];
        close();
        t?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!inside(e.target as Node)) close();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (!inside(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openMega, close]);

  /** Both data-driven menus share this shape; Solutions builds its own. */
  const columns = (cols: { h: string; items: { t: string; d: string; href: string }[] }[]) => (
    <>
      {cols.map((col) => (
        <div className="mega-col" key={col.h}>
          <p className="mega-h">{col.h}</p>
          {col.items.map((i) => (
            <Link key={i.href} href={i.href} className="mega-item" onClick={closeAll}>
              <span className="t">{i.t}</span>
              <span className="d">{i.d}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );

  /** Trigger plus panel. The panel's contents differ; the mechanics do not. */
  const mega = (key: MenuKey, panel: React.ReactNode) => (
    <div
      className="mega-wrap"
      ref={(el) => {
        wraps.current[key] = el;
      }}
      data-open={openMega === key}
      onMouseEnter={() => openByHover(key)}
      onMouseLeave={close}
    >
      <button
        ref={(el) => {
          triggers.current[key] = el;
        }}
        type="button"
        className="nav-item mega-caret"
        aria-expanded={openMega === key}
        aria-haspopup="true"
        data-active={MENUS[key].active(pathname)}
        onClick={() => toggleByClick(key)}
      >
        {MENUS[key].label}
        <Caret />
      </button>
      {openMega === key && <div className="mega">{panel}</div>}
    </div>
  );

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-in">
        <div className="nav-shell">
          <Link href="/" className="nav-brand" onClick={closeAll}>
            <Mark size={20} />
            <span>Ferrata Labs</span>
          </Link>

          <div className="nav-pill">
            {mega(
              "solutions",
              <>
                <div className="mega-col">
                  <p className="mega-h">By function</p>
                  {agents.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/agents/${a.slug}`}
                      className="mega-item"
                      onClick={closeAll}
                    >
                      <span className="t">
                        {a.role} · {a.name}
                      </span>
                      <span className="d">{a.menuLine}</span>
                    </Link>
                  ))}
                </div>
                <div className="mega-col">
                  <p className="mega-h">By industry</p>
                  {industries.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      className="mega-item"
                      onClick={closeAll}
                    >
                      <span className="t">{i.name}</span>
                      <span className="d">{i.tags.join(" · ")}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {mega("platform", columns(platformMenu.columns))}

            {mega("process", columns(processMenu.columns))}

            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="nav-item"
                aria-current={
                  (p.prefix ? pathname.startsWith(p.href) : pathname === p.href)
                    ? "page"
                    : undefined
                }
              >
                {p.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="nav-cta"
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Book a discovery call
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={openDrawer}
          aria-controls="mobile-drawer"
          onClick={() => setOpenDrawer((v) => !v)}
        >
          {openDrawer ? "Close" : "Menu"}
        </button>
      </div>

      {openDrawer && (
        <div className="drawer" id="mobile-drawer">
          {pages.map((p) => (
            <Link key={p.href} href={p.href} onClick={closeAll}>
              {p.label}
            </Link>
          ))}
          <Link href="/contact" onClick={closeAll}>
            Book a discovery call
          </Link>
          {[...platformMenu.columns, ...processMenu.columns].map((col) => (
            <div key={col.h}>
              <p className="grp">{col.h}</p>
              {col.items.map((i) => (
                <Link key={i.href} href={i.href} onClick={closeAll}>
                  {i.t}
                </Link>
              ))}
            </div>
          ))}
          <p className="grp">By function</p>
          {agents.map((a) => (
            <Link key={a.slug} href={`/agents/${a.slug}`} onClick={closeAll}>
              {a.role} · {a.name}
            </Link>
          ))}
          <p className="grp">By industry</p>
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} onClick={closeAll}>
              {i.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
