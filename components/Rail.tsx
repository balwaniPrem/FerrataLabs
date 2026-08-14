/**
 * The via ferrata cable. CLAUDE.md §4.
 *
 * Driven by a CSS scroll-driven animation rather than a scroll event listener,
 * so this is a server component with zero client JS. Where
 * `animation-timeline` is unsupported the rail renders as a static hairline,
 * which is a fine degradation. Hidden below 1040px, inert under
 * prefers-reduced-motion.
 */
export default function Rail() {
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-run" />
    </div>
  );
}
