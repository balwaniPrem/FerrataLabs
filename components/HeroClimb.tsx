import { arc } from "@/content/home";

/**
 * The hero graphic: the climb from AI absent to AI native, one stage at a time.
 *
 * Replaces the earlier left-to-right arc, which had two axes fighting each other.
 * The cable ran rightward while the stages listed downward, so the graphic argued
 * that progress went one way and the copy argued it went the other. There is now a
 * single axis and it is vertical: the cable descends, the four stages are rungs
 * bolted to it, and reading order and progression are the same direction.
 *
 * Which also makes the metaphor literal rather than decorative. A via ferrata is a
 * fixed vertical line with rungs; that is what this is.
 *
 * Motion: the cable draws downward and each rung goes live as the head reaches it,
 * so the line reads as energised rather than as a diagram. Geometry below is shared
 * with the keyframes in globals.css (.climb-*) — the arrival delays are derived from
 * these Y positions, so moving a rung means recomputing them. See the table there.
 *
 * Drawn to §4: hairline strokes, sharp corners, no radius. Deliberately no oxide.
 * The hero already spends its one accent on the typed vertical in the headline, and
 * §4 allows one highlight per section.
 */
const L = "var(--line)";
const INK = "var(--ink)";
const STEEL = "var(--steel)";

const mono = {
  fontFamily: "var(--mono)",
  fontSize: 9,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

/** Cable x, and the block of stage plates to the right of it. */
const CX = 30;
const BX = 62;
const BW = 458;

/** Block top, row height, and the 1px gap that makes it a hairline grid. */
const TOP = 54;
const ROW = 74;
const STEP = ROW + 1;

/** Rung centres, and therefore the length the cable draws through. */
const centre = (i: number) => TOP + i * STEP + ROW / 2;
const HEAD_START = 26;
const LAST = centre(3);
const RUN = LAST - HEAD_START;
/** Where the fixed line stops and they carry on without it. */
const END = LAST + 94;

export default function HeroClimb() {
  return (
    <svg
      viewBox="0 0 520 430"
      role="img"
      aria-label={`The climb from ${arc.from} to ${arc.to}, in four stages read top to bottom: ${arc.stages
        .map((s) => `${s.t}, ${s.d}`)
        .join(" ")} Below the last stage the fixed line ends and the client carries on without it.`}
      className="hero-climb"
    >
      <text x={BX} y="32" style={mono} fill={STEEL}>
        {arc.from}
      </text>

      {/* both ends of the cable are capped hollow: nothing has happened yet at the
          top, and at the bottom the line is no longer ours */}
      <rect
        x={CX - 4}
        y={HEAD_START - 4}
        width="8"
        height="8"
        transform={`rotate(45 ${CX} ${HEAD_START})`}
        fill="var(--surface)"
        stroke={STEEL}
      />

      {/* the cable, inert underneath and drawn over in ink by .climb-live */}
      <line x1={CX} y1={HEAD_START} x2={CX} y2={LAST} stroke={L} strokeWidth="3" />
      <line
        className="climb-live"
        x1={CX}
        y1={HEAD_START}
        x2={CX}
        y2={LAST}
        stroke={INK}
        strokeWidth="3"
        strokeDasharray={RUN}
      />

      {/* past the last rung the line is no longer fixed */}
      <line
        x1={CX}
        y1={LAST}
        x2={CX}
        y2={END}
        stroke={STEEL}
        strokeDasharray="3 4"
      />

      {/* the hairline grid the plates sit on */}
      <rect x={BX} y={TOP} width={BW} height={STEP * 3 + ROW} fill={L} />

      {arc.stages.map((s, i) => {
        const c = centre(i);
        const d = { "--i": i } as React.CSSProperties;
        return (
          <g key={s.k} className="climb-stage" style={d}>
            <rect
              className="climb-plate"
              x={BX}
              y={TOP + i * STEP}
              width={BW}
              height={ROW}
            />
            <line className="climb-rung" x1={CX} y1={c} x2={BX} y2={c} stroke={L} />
            <rect
              className="climb-node"
              x={CX - 5}
              y={c - 5}
              width="10"
              height="10"
              transform={`rotate(45 ${CX} ${c})`}
            />
            <text x={BX + 20} y={c - 6} style={mono} fill={STEEL}>
              {s.k}
            </text>
            <text
              x={BX + 56}
              y={c - 4}
              style={{
                fontFamily: "var(--display)",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
              fill={INK}
            >
              {s.t}
            </text>
            <text
              x={BX + 20}
              y={c + 18}
              style={{ fontFamily: "var(--body)", fontSize: 10.5 }}
              fill={STEEL}
            >
              {s.d}
            </text>
          </g>
        );
      })}

      {/* the head of the draw, so the cable reads as filling rather than growing */}
      <g className="climb-head">
        <rect
          x={CX - 4}
          y={HEAD_START - 4}
          width="8"
          height="8"
          transform={`rotate(45 ${CX} ${HEAD_START})`}
          fill={INK}
        />
      </g>

      <rect
        x={CX - 4}
        y={END - 4}
        width="8"
        height="8"
        transform={`rotate(45 ${CX} ${END})`}
        fill="var(--surface)"
        stroke={STEEL}
      />
      <text x={BX} y={END + 4} style={mono} fill={INK}>
        {arc.to}
        <tspan fill={STEEL}> · {arc.endNote}</tspan>
      </text>
    </svg>
  );
}
