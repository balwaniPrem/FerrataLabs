/**
 * Deterministic simulation for the Pledge live activity view. CLAUDE.md §12.
 *
 * Seeded and time-driven, never random: the same second of the loop always produces
 * the same frame. A demo that differs on every reload is unusable in a sales call, and
 * Math.random() would also desync server and client. Nothing here runs on the server —
 * consumers start it from an effect.
 *
 * One shared store so the activity feed and the credit meter can never disagree about
 * how many credits have been consumed.
 */

import { callCredits, metering } from "@/content/pledge";

export type Phase = "dialing" | "connected" | "voicemail" | "drafting" | "queued";

export type LiveRun = {
  id: string;
  account: string;
  kind: "call" | "email";
  phase: Phase;
  /** Seconds elapsed in the billable portion. 0 for non-billable phases. */
  elapsed: number;
  /** Credits accrued so far, stepping at each 15s increment. */
  credits: number;
  detail: string;
};

type Script = {
  id: string;
  account: string;
  kind: "call" | "email";
  /** Offset into the loop where this run begins. */
  start: number;
  /** [phase, duration] in order. */
  phases: [Phase, number][];
  detail: string;
};

export const LOOP_SECONDS = 240;

/**
 * Four concurrent instances, staggered so the feed always has something in flight
 * but never all four in the same phase. Durations are chosen so at least one call
 * visibly crosses a 15-second increment boundary every few seconds.
 */
const SCRIPT: Script[] = [
  {
    id: "r1",
    account: "Kessler Industrial",
    kind: "call",
    start: 0,
    phases: [["dialing", 8], ["connected", 132]],
    detail: "Chasing 6 open invoices · $284,100",
  },
  {
    id: "r2",
    account: "Verdon Manufacturing",
    kind: "email",
    start: 12,
    phases: [["drafting", 26], ["queued", 40]],
    detail: "Sequence 3 of 4 · statement attached",
  },
  {
    id: "r3",
    account: "Maddox Freight",
    kind: "call",
    start: 40,
    phases: [["dialing", 14], ["voicemail", 31]],
    detail: "Second attempt · $61,880 across 5 invoices",
  },
  {
    id: "r4",
    account: "Antral Logistics",
    kind: "email",
    start: 96,
    phases: [["drafting", 22], ["queued", 55]],
    detail: "Promise confirmation · holding to 14 Aug",
  },
  {
    id: "r5",
    account: "Corrin Supply Co.",
    kind: "call",
    start: 150,
    phases: [["dialing", 10], ["connected", 62]],
    detail: "Remittance advice follow-up · $76,240",
  },
];

/** Billable phases. Queued and drafting cost nothing until something is delivered. */
const BILLABLE: Record<Phase, boolean> = {
  dialing: false,
  drafting: false,
  queued: false,
  connected: true,
  voicemail: true,
};

function frameAt(t: number): LiveRun[] {
  const out: LiveRun[] = [];
  for (const s of SCRIPT) {
    const total = s.phases.reduce((n, [, d]) => n + d, 0);
    const local = t - s.start;
    if (local < 0 || local >= total) continue;

    let cursor = 0;
    for (const [phase, dur] of s.phases) {
      if (local < cursor + dur) {
        const into = local - cursor;
        const billable = BILLABLE[phase];
        out.push({
          id: s.id,
          account: s.account,
          kind: s.kind,
          phase,
          elapsed: billable ? into : 0,
          credits: billable ? callCredits(into) : s.kind === "email" ? 0 : 0,
          detail: s.detail,
        });
        break;
      }
      cursor += dur;
    }
  }
  return out;
}

/** Credits consumed by everything that has completed earlier in the loop. */
function settledAt(t: number): number {
  let n = 0;
  for (const s of SCRIPT) {
    const total = s.phases.reduce((a, [, d]) => a + d, 0);
    if (t >= s.start + total) {
      for (const [phase, dur] of s.phases) {
        if (BILLABLE[phase]) n += callCredits(dur);
      }
      if (s.kind === "email") n += metering.emailCredits;
    }
  }
  return n;
}

export type SimState = {
  t: number;
  live: LiveRun[];
  /** Credits consumed this loop — live accrual plus everything already settled. */
  consumed: number;
  /** True when the viewer prefers reduced motion and the feed is frozen. */
  reduced: boolean;
};

export function stateAt(t: number): SimState {
  const live = frameAt(t);
  return {
    t,
    live,
    consumed: settledAt(t) + live.reduce((n, r) => n + r.credits, 0),
    reduced: false,
  };
}

/** A representative still frame, used when the viewer prefers reduced motion. */
export const STATIC_FRAME = stateAt(58);

/* ------------------------------------------------------ external store plumbing */

/**
 * Exposed as a useSyncExternalStore source rather than an effect that calls setState.
 * getSnapshot must return a referentially stable object between ticks, so the current
 * frame is cached at module level and only replaced when the second changes.
 */

type Listener = () => void;

let timer: ReturnType<typeof setInterval> | null = null;
let listeners: Listener[] = [];
/**
 * The loop starts mid-action rather than at zero. At t=0 the first instance is still
 * dialing, so the page would open with one row and no credit accrual — a poor first
 * frame for something whose whole point is showing concurrent work being metered.
 */
const START_OFFSET = 58;

let t = START_OFFSET;

/** Stable server snapshot — no live data exists until the browser subscribes. */
const SERVER_SNAPSHOT: SimState = { t: 0, live: [], consumed: 0, reduced: false };

/** Starts equal to the server snapshot so first client render matches the HTML. */
let current: SimState = SERVER_SNAPSHOT;

export function subscribeSim(fn: Listener): () => void {
  listeners.push(fn);

  if (!timer) {
    if (prefersReducedMotion()) {
      // No ticking. Freeze on a representative frame and never start a timer.
      current = { ...STATIC_FRAME, reduced: true };
      fn();
    } else {
      current = stateAt(START_OFFSET);
      fn();
      timer = setInterval(() => {
        t = (t + 1) % LOOP_SECONDS;
        current = stateAt(t);
        listeners.forEach((l) => l());
      }, 1000);
    }
  }

  return () => {
    listeners = listeners.filter((l) => l !== fn);
    if (listeners.length === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export const getSimSnapshot = (): SimState => current;

export const getServerSimSnapshot = (): SimState => SERVER_SNAPSHOT;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const mmss = (s: number) =>
  `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
