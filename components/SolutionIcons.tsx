/**
 * Three marks for the solution cards. Drawn rather than imported, in the same
 * primitives as the logo: hairlines, right angles, rotated squares, butt caps.
 * Any icon library would bring round caps and joins, which §4 forbids.
 */
const base = {
  width: 30,
  height: 30,
  viewBox: "0 0 30 30",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "butt" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Embedded: us inside your outline, not alongside it. */
export function IconEmbed() {
  return (
    <svg {...base}>
      <rect x="1.5" y="1.5" width="27" height="27" strokeDasharray="3 3" />
      <rect x="9" y="9" width="12" height="12" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Your process: the cable and its rungs, unequal because your process is. */
export function IconProcess() {
  return (
    <svg {...base}>
      <path d="M4 2 V28" />
      <path d="M4 8 H22" />
      <path d="M4 15 H27" />
      <path d="M4 22 H17" />
    </svg>
  );
}

/**
 * Handed over: the ascent continues without us. Solid while we are on the line,
 * dashed past the handover point. Drawn as a rising step rather than a flat arrow
 * so it carries the same visual mass as the other two; a single horizontal rule
 * reads as a hairline next to them and unbalances the row.
 */
export function IconHandover() {
  return (
    <svg {...base}>
      <path d="M2 26 H9 V18 H15" />
      <path d="M15 18 H21 V10 H28" strokeDasharray="3 3" />
      <rect x="12.2" y="15.2" width="5.6" height="5.6" transform="rotate(45 15 18)" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const solutionIcons = [IconEmbed, IconProcess, IconHandover];
