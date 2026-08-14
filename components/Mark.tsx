/**
 * The Ferrata Labs mark. CLAUDE.md §4.
 *
 * A cable and three rungs cut into a solid field: the via ferrata itself. The rungs
 * are deliberately unequal so it reads as a climbing line rather than as a letter E.
 *
 * The field uses `var(--ink)` rather than a literal, so the mark always matches the
 * wordmark beside it. Note this mark does not reverse — it is a dark field with white
 * strokes, so it needs a light background. Every surface it currently sits on (nav,
 * footer, product app bar) is light.
 */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Ferrata Labs"
    >
      <rect width="48" height="48" fill="var(--ink)" />
      <g
        transform="translate(8,8)"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="square"
        fill="none"
      >
        <path d="M4 27 V5" />
        <path d="M4 23 H20" />
        <path d="M4 16 H26" />
        <path d="M4 9 H16" />
      </g>
    </svg>
  );
}

export default Mark;
