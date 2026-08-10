/**
 * The Ferrata Labs mark — "Ascent". CLAUDE.md §4.
 *
 * A monotone step function with an anchor bolt at the summit. Reads as a plot and
 * as rungs cut into rock; the four risers are the four engagement steps. The bolt
 * (a square rotated 45°) is retained from the previous mark and becomes the summit
 * anchor rather than a standalone glyph.
 *
 * The path uses currentColor so the mark reverses cleanly on ink. The bolt stays
 * accent unless `mono` is set.
 */
export default function Mark({
  size = 21,
  /** 2.6 holds its own beside the 800-weight wordmark; lighter reads timid. */
  weight = 2.6,
  mono = false,
  className,
}: {
  size?: number;
  /** Stroke width in viewBox units. Increase for small renderings. */
  weight?: number;
  /** Drop the accent bolt and draw everything in currentColor. */
  mono?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 35 H12 V26 H21 V17 H30 V8"
        stroke="currentColor"
        strokeWidth={weight}
      />
      <rect
        x={30 - weight * 1.35}
        y={8 - weight * 1.35}
        width={weight * 2.7}
        height={weight * 2.7}
        transform="rotate(45 30 8)"
        fill={mono ? "currentColor" : "var(--accent)"}
      />
    </svg>
  );
}
