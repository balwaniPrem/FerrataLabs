"use client";

import { useEffect, useRef } from "react";

/**
 * The via ferrata cable — CLAUDE.md §4. A 1px fixed line at left:64px that fills
 * with accent as the page scrolls. Hidden below 1040px, inert under
 * prefers-reduced-motion.
 */
export default function Rail() {
  const run = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = run.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const tick = () => {
      frame = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      el.style.height = `${Math.min(100, p * 100)}vh`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-run" ref={run} />
    </div>
  );
}
