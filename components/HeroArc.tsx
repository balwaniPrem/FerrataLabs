import { arc } from "@/content/home";

/**
 * The hero graphic: the arc from AI absent to AI native, with the four stages
 * a client passes through and where we are alongside them.
 *
 * Drawn to §4 — hairline strokes, sharp corners, ink and one accent. It is the
 * via ferrata cable read left to right: fixed at both ends, rungs along the way.
 * Static by design; the marketing site has one moving element and this is not it.
 */
const L = "var(--line)";
const INK = "var(--ink)";
const STEEL = "var(--steel)";
const CANVAS = "var(--canvas)";
const A2 = "var(--accent-2)";

const mono = {
  fontFamily: "var(--mono)",
  fontSize: 9,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};
const small = { fontFamily: "var(--body)", fontSize: 10.5 };

export default function HeroArc() {
  return (
    <svg
      viewBox="0 0 520 420"
      role="img"
      aria-label="The path from AI absent to AI native in four stages: absent, grounded, running, native. Ferrata Labs works alongside the client through every stage and steps back at the end."
      className="hero-arc"
    >
      <text x="0" y="10" style={mono} fill={A2}>{arc.from}</text>
      <text x="520" y="10" style={mono} fill={INK} textAnchor="end">{arc.to}</text>

      {/* the cable: light where they start, solid where they end */}
      <line x1="26" y1="26" x2="270" y2="26" stroke={L} strokeWidth="3" />
      <line x1="270" y1="26" x2="494" y2="26" stroke={INK} strokeWidth="3" />
      <rect x="22" y="22" width="8" height="8" transform="rotate(45 26 26)" fill={A2} />
      <rect x="490" y="22" width="8" height="8" transform="rotate(45 494 26)" fill={INK} />

      {arc.stages.map((s, i) => {
        const y = 78 + i * 84;
        const live = i >= 2;
        return (
          <g key={s.k}>
            {/* rung down from the cable */}
            <line x1="26" y1={i === 0 ? 30 : y - 54} x2="26" y2={y - 14} stroke={L} />
            <rect
              x="21" y={y - 19} width="10" height="10"
              transform={`rotate(45 26 ${y - 14})`}
              fill={live ? INK : "var(--surface)"}
              stroke={live ? INK : STEEL}
            />
            <rect x="52" y={y - 34} width="468" height="60" fill={live ? CANVAS : "none"} stroke={L} />
            <text x="70" y={y - 14} style={mono} fill={live ? INK : STEEL}>{s.k}</text>
            <text x="106" y={y - 12} style={{ fontFamily: "var(--display)", fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }} fill={INK}>
              {s.t}
            </text>
            <text x="70" y={y + 10} style={small} fill={STEEL}>{s.d}</text>
          </g>
        );
      })}

      {/* we are on the line the whole way, and then we are not */}
      <line x1="26" y1="330" x2="26" y2="392" stroke={L} />
      <text x="52" y="380" style={mono} fill={STEEL}>Ferrata alongside</text>
      <line x1="196" y1="376" x2="330" y2="376" stroke={L} strokeDasharray="3 3" />
      <text x="344" y="380" style={mono} fill={INK}>You, on your own feet</text>
    </svg>
  );
}
