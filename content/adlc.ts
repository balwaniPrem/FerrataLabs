/**
 * ADLC — the Agent Development Lifecycle. CLAUDE.md §1.
 *
 * Positioned as the SDLC analogue: the engineering discipline that makes agent
 * delivery repeatable. It runs INSIDE step 03 of the commercial sequence and does
 * not replace it. The four commercial steps are what a CFO buys; this is proof of craft.
 */

export type Phase = {
  n: string;
  title: string;
  body: string;
};

export const adlcIntro = {
  eyebrow: "ADLC",
  heading: "Agent development is a discipline now. We run it like one.",
  intro:
    "Software got reliable when teams stopped treating each build as a one-off and adopted a lifecycle around it. Agents are at the same point, and most of what goes wrong in enterprise AI is not the model — it is shipping without a lifecycle. Ours has eight phases, and every agent we put into production goes through all of them.",
  closer:
    "The harnesses, runbooks and gates that come out of this are documented and handed to your team in step 04. The lifecycle is the transferable part; the agents are just what it produces.",
};

export const adlc: Phase[] = [
  {
    n: "01",
    title: "Scope",
    body: "One workflow, stated as a contract: the inputs, the decision boundary, what the agent may never do.",
  },
  {
    n: "02",
    title: "Ground",
    body: "Wire the agent to real systems of record and real documents. No demo data — grounding failures surface here or in production.",
  },
  {
    n: "03",
    title: "Build",
    body: "Tools, prompts, routing and fallbacks. Frontier or open-weight decided per task on cost, latency and sensitivity.",
  },
  {
    n: "04",
    title: "Evaluate",
    body: "A harness of real historical cases with known-correct outcomes. The agent is scored against them, not demonstrated on a happy path.",
  },
  {
    n: "05",
    title: "Gate",
    body: "Human approval on every consequential action, plus the rollback path — both defined before go-live rather than after an incident.",
  },
  {
    n: "06",
    title: "Deploy",
    body: "Into your environment, against live transactions, at a volume you choose. Logged and attributable from the first action.",
  },
  {
    n: "07",
    title: "Observe",
    body: "Accuracy, exception rate, cost per transaction and gate overrides tracked continuously. Drift is caught by the harness, not by a person noticing.",
  },
  {
    n: "08",
    title: "Improve",
    body: "Overrides are the training signal. Each one is examined, and the agent earns wider autonomy only on evidence.",
  },
];

/** SDLC → ADLC comparison, used on /how-it-works. */
export const adlcCompare = {
  left: {
    heading: "What SDLC settled",
    items: [
      "Version control and reproducible builds",
      "Automated test suites before release",
      "Staging environments and rollback plans",
      "Monitoring, alerting and on-call",
      "Postmortems that change the next build",
    ],
  },
  right: {
    heading: "What ADLC settles",
    items: [
      "Evaluation harnesses over historical cases",
      "Grounding against systems of record, not demo data",
      "Approval gates as the default, autonomy as earned",
      "Cost, latency and accuracy watched per transaction",
      "Overrides fed back as the improvement signal",
    ],
  },
};
