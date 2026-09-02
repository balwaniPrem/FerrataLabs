"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import Mark from "./Mark";

/**
 * `prefix` means a post lights the Blog item too, matching ferrata_current_blog()
 * in the theme, which lights it for the index, any post and any archive.
 */
const pages = [
  { href: "/work", label: "The work" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "Who we are" },
  { href: "/blog", label: "Blog", prefix: true },
];

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
 */
export default function Nav() {
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const megaWrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  /**
   * Tracks how the menu was opened. Without this, hovering the trigger opens the
   * menu and the click that follows immediately toggles it shut.
   */
  const openedBy = useRef<"hover" | "click" | null>(null);

  const close = useCallback(() => {
    openedBy.current = null;
    setOpenMega(false);
  }, []);

  const openByHover = useCallback(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      openedBy.current ??= "hover";
      setOpenMega(true);
    }
  }, []);

  const toggleByClick = useCallback(() => {
    if (openMega && openedBy.current === "click") {
      close();
      return;
    }
    openedBy.current = "click";
    setOpenMega(true);
  }, [openMega, close]);

  const closeAll = useCallback(() => {
    openedBy.current = null;
    setOpenMega(false);
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    if (!openMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        trigger.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!megaWrap.current?.contains(e.target as Node)) close();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (!megaWrap.current?.contains(e.target as Node)) close();
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

  const inSolutions =
    pathname.startsWith("/agents") || pathname.startsWith("/industries");

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-in">
        <div className="nav-shell">
        <Link href="/" className="nav-brand" onClick={closeAll}>
          <Mark size={20} />
          <span>Ferrata Labs</span>
        </Link>

        <div className="nav-pill">
          <div
            className="mega-wrap"
            ref={megaWrap}
            data-open={openMega}
            onMouseEnter={openByHover}
            onMouseLeave={close}
          >
            <button
              ref={trigger}
              type="button"
              className="nav-item mega-caret"
              aria-expanded={openMega}
              aria-haspopup="true"
              data-active={inSolutions}
              onClick={toggleByClick}
            >
              Solutions
              <Caret />
            </button>

            {openMega && (
              <div className="mega">
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
              </div>
            )}
          </div>

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
