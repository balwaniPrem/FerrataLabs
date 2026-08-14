/**
 * prefers-reduced-motion as a useSyncExternalStore source, so components can read it
 * without a setState-in-effect (which the lint rule rejects).
 */
const QUERY = "(prefers-reduced-motion: reduce)";

let mql: MediaQueryList | null = null;

export function subscribeReducedMotion(fn: () => void) {
  if (typeof window === "undefined") return () => {};
  mql ??= window.matchMedia(QUERY);
  mql.addEventListener("change", fn);
  return () => mql?.removeEventListener("change", fn);
}

export const getReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(QUERY).matches;

/** Server renders the still frame; the browser upgrades to video if motion is welcome. */
export const getServerReducedMotion = () => true;
