/**
 * Per-step diagrams for /how-it-works — CLAUDE.md item 4.
 *
 * Drawn to §4: hairline strokes, zero radius, accent used sparingly, no shadows,
 * no fills beyond the wash. Each one shows the actual mechanism of its step rather
 * than decorating it. Text uses the mono/display stacks via CSS variables so the
 * figures stay typographically consistent with the page.
 */

const L = "var(--line)";
const A = "var(--accent)";
const AW = "var(--accent-wash)";
const AL = "var(--accent-line)";
const INK = "var(--ink)";
const STEEL = "var(--steel)";
const MIST = "var(--mist)";
const CANVAS = "var(--canvas)";

const mono = {
  fontFamily: "var(--mono)",
  fontSize: 8.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};
const label = { fontFamily: "var(--display)", fontSize: 11, fontWeight: 600 };
const small = { fontFamily: "var(--body)", fontSize: 9.5 };

/** 01 — Assess: one business function, its workflows, and what it costs today. */
export function FigAssess() {
  const flows = [
    { name: "Invoice intake and coding", vol: "14,200 / mo" },
    { name: "Three-way match exceptions", vol: "2,900 / mo" },
    { name: "Vendor query handling", vol: "1,450 / mo" },
    { name: "Payment run preparation", vol: "4 / mo" },
  ];
  // 418 + 96 = 514. Bars are drawn to that proportion, not eyeballed.
  const BAR = 196;
  const fteW = Math.round(BAR * (418 / 514));
  const swW = Math.round(BAR * (96 / 514));

  return (
    <svg
      viewBox="0 0 620 268"
      role="img"
      aria-label="One business function, accounts payable, with its four workflows measured by volume and its annual cost split into 418,000 dollars of people and 96,000 dollars of software, totalling 514,000 dollars"
    >
      {/* left: the workflows they will actually see */}
      <text x="0" y="10" style={mono} fill={STEEL}>Your workflows, mapped</text>
      <line x1="0" y1="18" x2="286" y2="18" stroke={L} />
      <text x="0" y="42" style={{ ...label, fontSize: 15 }} fill={INK}>Accounts payable</text>

      {flows.map((f, i) => {
        const y = 68 + i * 30;
        return (
          <g key={f.name}>
            <rect x="0" y={y - 11} width="3" height="14" fill={i === 0 ? A : L} />
            <text x="12" y={y} style={{ ...small, fontSize: 11 }} fill={INK}>{f.name}</text>
            <text x="286" y={y} style={{ ...small, fontSize: 10 }} fill={STEEL} textAnchor="end">{f.vol}</text>
          </g>
        );
      })}

      <line x1="0" y1="196" x2="286" y2="196" stroke={L} />
      <text x="0" y="214" style={{ ...small, fontSize: 10 }} fill={STEEL}>
        Measured in your systems, not benchmarked
      </text>

      {/* divider between what is observed and what it costs */}
      <line x1="318" y1="0" x2="318" y2="240" stroke={L} />

      {/* right: the cost of running it, split */}
      <text x="350" y="10" style={mono} fill={STEEL}>What it costs today</text>
      <line x1="350" y1="18" x2="620" y2="18" stroke={L} />

      <text x="350" y="48" style={{ ...small, fontSize: 11 }} fill={INK}>People</text>
      <text x="350" y="62" style={{ ...small, fontSize: 9.5 }} fill={STEEL}>6.4 FTE, fully loaded</text>
      <rect x="350" y="70" width={fteW} height="10" fill={INK} />
      <text x="620" y="62" style={{ ...label, fontSize: 14 }} fill={INK} textAnchor="end">$418,000</text>

      <text x="350" y="110" style={{ ...small, fontSize: 11 }} fill={INK}>Software</text>
      <text x="350" y="124" style={{ ...small, fontSize: 9.5 }} fill={STEEL}>3 subscriptions, annual</text>
      <rect x="350" y="132" width={swW} height="10" fill={CANVAS} stroke={MIST} />
      <text x="620" y="124" style={{ ...label, fontSize: 14 }} fill={INK} textAnchor="end">$96,000</text>

      <line x1="350" y1="164" x2="620" y2="164" stroke={INK} />
      <text x="350" y="192" style={mono} fill={STEEL}>Cost of the function</text>
      <text x="620" y="200" style={{ fontFamily: "var(--display)", fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em" }} fill={INK} textAnchor="end">
        $514,000
      </text>
      <text x="620" y="216" style={{ ...small, fontSize: 9.5 }} fill={STEEL} textAnchor="end">a year, before errors</text>

      <rect x="350" y="232" width="270" height="1" fill={L} />
      <text x="350" y="250" style={{ ...small, fontSize: 10 }} fill={STEEL}>
        Figures illustrative. Every candidate workflow gets this treatment
      </text>
    </svg>
  );
}

/** 02 — Anchor: the platform stands inside the client's boundary. */
export function FigAnchor() {
  const blocks = [
    "Model gateway",
    "Retrieval",
    "Evaluation",
    "Audit logging",
    "Identity",
  ];
  return (
    <svg viewBox="0 0 620 214" role="img" aria-label="The intelligence platform standing inside your environment, with frontier and open-weight models routed through a gateway">
      <rect x="1" y="26" width="618" height="164" fill="none" stroke={A} strokeDasharray="3 3" />
      <rect x="14" y="18" width="150" height="16" fill="var(--surface)" />
      <text x="18" y="30" style={mono} fill={A}>Your environment</text>

      {blocks.map((b, i) => (
        <g key={b}>
          <rect x={24 + i * 116} y="60" width="104" height="52" fill={CANVAS} stroke={L} />
          <text x={76 + i * 116} y="90" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">{b}</text>
        </g>
      ))}

      <line x1="76" y1="112" x2="76" y2="140" stroke={L} />
      <line x1="192" y1="112" x2="192" y2="140" stroke={L} />
      <line x1="76" y1="140" x2="424" y2="140" stroke={L} />
      <line x1="308" y1="112" x2="308" y2="140" stroke={L} />
      <line x1="424" y1="112" x2="424" y2="140" stroke={L} />
      <line x1="540" y1="112" x2="540" y2="140" stroke={L} />
      <line x1="424" y1="140" x2="540" y2="140" stroke={L} />

      <rect x="24" y="152" width="240" height="26" fill={AW} stroke={A} />
      <text x="144" y="169" style={{ ...small, fontSize: 10 }} fill={A} textAnchor="middle">Open-weight, served in your VPC</text>
      <rect x="284" y="152" width="240" height="26" fill="none" stroke={L} />
      <text x="404" y="169" style={{ ...small, fontSize: 10 }} fill={STEEL} textAnchor="middle">Frontier, called out under policy</text>

      <text x="0" y="10" style={mono} fill={MIST}>The asset you keep</text>
    </svg>
  );
}

/** 03 — First agent live: everything consequential passes a gate. */
export function FigLive() {
  return (
    <svg viewBox="0 0 620 190" role="img" aria-label="Live transactions flow through the agent to a human approval gate; approved actions post, rejected ones return as signal">
      <text x="0" y="10" style={mono} fill={MIST}>Real transactions</text>

      <rect x="0" y="60" width="112" height="46" fill={CANVAS} stroke={L} />
      <text x="56" y="82" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">Live</text>
      <text x="56" y="95" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">transactions</text>

      <line x1="112" y1="83" x2="164" y2="83" stroke={L} />
      <path d="M158 79 L164 83 L158 87" fill="none" stroke={L} />

      <rect x="164" y="52" width="128" height="62" fill="var(--surface)" stroke={A} />
      <text x="228" y="76" style={label} fill={INK} textAnchor="middle">Agent</text>
      <text x="228" y="92" style={{ ...small, fontSize: 9 }} fill={STEEL} textAnchor="middle">reads · decides · drafts</text>

      <line x1="292" y1="83" x2="344" y2="83" stroke={L} />
      <path d="M338 79 L344 83 L338 87" fill="none" stroke={L} />

      <rect x="344" y="46" width="120" height="74" fill={AW} stroke={A} strokeWidth="1.5" />
      <text x="404" y="72" style={mono} fill={A} textAnchor="middle">Gate</text>
      <text x="404" y="90" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">A person</text>
      <text x="404" y="103" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">approves</text>

      <line x1="464" y1="83" x2="516" y2="83" stroke={A} />
      <path d="M510 79 L516 83 L510 87" fill="none" stroke={A} />

      <rect x="516" y="60" width="104" height="46" fill={CANVAS} stroke={L} />
      <text x="568" y="82" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">Posted to</text>
      <text x="568" y="95" style={{ ...small, fontSize: 10 }} fill={INK} textAnchor="middle">the ERP</text>

      {/* override path, the improvement signal */}
      <path d="M404 120 L404 150 L228 150 L228 114" fill="none" stroke={MIST} strokeDasharray="3 3" />
      <path d="M224 120 L228 114 L232 120" fill="none" stroke={MIST} />
      <text x="316" y="164" style={{ ...small, fontSize: 9 }} fill={MIST} textAnchor="middle">Overrides return as training signal</text>

      <text x="620" y="10" style={mono} fill={A} textAnchor="end">Under 90 days</text>
    </svg>
  );
}

/** 04 — Expand then hand over: the POD, and the line going quiet. */
export function FigHandover() {
  const pod = [
    { l: "Lead", n: 1 },
    { l: "Product owner", n: 1 },
    { l: "AI developers", n: 2 },
  ];
  return (
    <svg viewBox="0 0 620 200" role="img" aria-label="Agents added over time while ownership transfers from Ferrata Labs to your own POD">
      <text x="0" y="10" style={mono} fill={MIST}>Ferrata operates</text>
      <text x="620" y="10" style={mono} fill={A} textAnchor="end">You operate</text>

      <line x1="0" y1="26" x2="620" y2="26" stroke={L} />
      <rect x="0" y="24" width="248" height="4" fill={MIST} />
      <rect x="248" y="24" width="372" height="4" fill={A} />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={i * 104} y="56" width="88" height="34" fill={i < 2 ? CANVAS : AW} stroke={i < 2 ? L : AL} />
          <text x={i * 104 + 44} y="77" style={{ ...small, fontSize: 9.5 }} fill={i < 2 ? STEEL : A} textAnchor="middle">
            Agent {i + 1}
          </text>
        </g>
      ))}

      <rect x="0" y="118" width="360" height="66" fill="none" stroke={L} />
      <text x="14" y="136" style={mono} fill={A}>The POD</text>
      {pod.map((p, i) => (
        <g key={p.l}>
          <text x={14 + i * 118} y="160" style={label} fill={INK}>{p.n}</text>
          <text x={14 + i * 118} y="174" style={{ ...small, fontSize: 9.5 }} fill={STEEL}>{p.l}</text>
        </g>
      ))}

      <rect x="380" y="118" width="240" height="66" fill={AW} stroke={AL} />
      <text x="394" y="136" style={mono} fill={A}>Handed over</text>
      <text x="394" y="156" style={{ ...small, fontSize: 10 }} fill={INK}>Runbooks · eval harness</text>
      <text x="394" y="172" style={{ ...small, fontSize: 10 }} fill={INK}>Platform in your environment</text>
    </svg>
  );
}

export const stepFigures = [FigAssess, FigAnchor, FigLive, FigHandover];
