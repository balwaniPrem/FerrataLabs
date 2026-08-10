"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeSim,
  getSimSnapshot,
  getServerSimSnapshot,
} from "@/lib/pledgeSim";

/**
 * Live credit balance in the app bar. Falls as in-flight work consumes credits, so the
 * number visibly steps at each 15-second increment rather than sitting frozen while the
 * activity feed moves. Reduced motion freezes it on a representative frame.
 */
export default function CreditMeter({
  initial,
  low,
  usd,
}: {
  initial: number;
  low: number;
  usd: number;
}) {
  const sim = useSyncExternalStore(subscribeSim, getSimSnapshot, getServerSimSnapshot);

  const balance = initial - sim.consumed;
  const isLow = balance < low;

  return (
    <span className="bal">
      <span className="k">Credits remaining</span>
      <span className={`v${isLow ? " low" : ""}`}>
        {balance.toLocaleString("en-US")}
      </span>
      <span className="usd">
        ${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      </span>
    </span>
  );
}
