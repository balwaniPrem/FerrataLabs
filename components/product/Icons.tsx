/**
 * Product icon set — CLAUDE.md §4 / §12.
 *
 * Drawn rather than imported. Every off-the-shelf set (Lucide, Heroicons, Feather)
 * ships round caps and round joins, which §4 forbids outright. These use butt caps,
 * miter joins, a 1.5 stroke on a 20 grid, and the same rotated-square node as the
 * Ascent mark, so the rail reads as part of the same system.
 *
 * Keep new icons to those primitives: horizontal rules, right angles, rotated squares.
 */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "butt" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Dashboard — the queue: a header rule over stacked rows. */
export function IconQueue() {
  return (
    <svg {...base}>
      <path d="M2.5 4.5 H17.5" />
      <path d="M2.5 8.5 H17.5" />
      <path d="M2.5 12.5 H13" />
      <path d="M2.5 16 H9" />
    </svg>
  );
}

/** Rules — governed switches: rules with a node set on each. */
export function IconRules() {
  return (
    <svg {...base}>
      <path d="M2.5 5.5 H17.5" />
      <path d="M2.5 10 H17.5" />
      <path d="M2.5 14.5 H17.5" />
      <rect x="5.4" y="3.9" width="3.2" height="3.2" transform="rotate(45 7 5.5)" fill="currentColor" stroke="none" />
      <rect x="11.4" y="8.4" width="3.2" height="3.2" transform="rotate(45 13 10)" fill="currentColor" stroke="none" />
      <rect x="7.4" y="12.9" width="3.2" height="3.2" transform="rotate(45 9 14.5)" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Orchestration — a branching flow: one source, two paths, one join. */
export function IconFlow() {
  return (
    <svg {...base}>
      <path d="M2.5 10 H6" />
      <path d="M6 4.5 V15.5" />
      <path d="M6 4.5 H11" />
      <path d="M6 15.5 H11" />
      <path d="M14 4.5 H17.5" />
      <path d="M14 15.5 H17.5" />
      <rect x="9.4" y="2.9" width="3.2" height="3.2" transform="rotate(45 11 4.5)" fill="currentColor" stroke="none" />
      <rect x="9.4" y="13.9" width="3.2" height="3.2" transform="rotate(45 11 15.5)" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Rail collapse/expand. */
export function IconCollapse({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <svg {...base} style={{ transform: collapsed ? "scaleX(-1)" : undefined }}>
      <path d="M12.5 5 L7.5 10 L12.5 15" />
      <path d="M3.5 4 V16" />
    </svg>
  );
}

export const navIcons = {
  queue: IconQueue,
  rules: IconRules,
  flow: IconFlow,
};

/** Collapsed/expanded disclosure for the agent tree. */
export function IconChevron({ open = false }: { open?: boolean }) {
  return (
    <svg {...base} width={14} height={14} viewBox="0 0 20 20"
      style={{ transform: open ? "rotate(90deg)" : undefined, transition: "transform .14s ease" }}>
      <path d="M7.5 4.5 L13 10 L7.5 15.5" />
    </svg>
  );
}

/** An agent in the tree. The rotated square is the bolt from the mark. */
export function IconAgent() {
  return (
    <svg {...base} viewBox="0 0 20 20">
      <rect x="6.6" y="6.6" width="6.8" height="6.8" transform="rotate(45 10 10)" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Settings: vertical sliders, so it does not collide with the horizontal Rules glyph. */
export function IconSettings() {
  return (
    <svg {...base}>
      <path d="M5.5 2.5 V17.5" />
      <path d="M10 2.5 V17.5" />
      <path d="M14.5 2.5 V17.5" />
      <rect x="3.9" y="5.4" width="3.2" height="3.2" transform="rotate(45 5.5 7)" fill="currentColor" stroke="none" />
      <rect x="8.4" y="11.4" width="3.2" height="3.2" transform="rotate(45 10 13)" fill="currentColor" stroke="none" />
      <rect x="12.9" y="7.4" width="3.2" height="3.2" transform="rotate(45 14.5 9)" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Data: stacked layers. */
export function IconData() {
  return (
    <svg {...base}>
      <path d="M2.5 5.5 H17.5 V8.5 H2.5 Z" />
      <path d="M2.5 11.5 H17.5 V14.5 H2.5 Z" />
    </svg>
  );
}
