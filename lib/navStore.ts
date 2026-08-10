/**
 * Pledge nav collapse state, as an external store so components can read it with
 * useSyncExternalStore instead of a setState-in-effect. Backed by localStorage, which
 * only exists on the client — the server snapshot is always "expanded".
 */

const KEY = "pledge:nav-collapsed";

let listeners: (() => void)[] = [];
let collapsed = false;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  try {
    collapsed = window.localStorage.getItem(KEY) === "1";
  } catch {
    /* private mode — expanded is a fine default */
  }
  loaded = true;
}

export function subscribeNav(fn: () => void): () => void {
  listeners.push(fn);
  if (!loaded) {
    load();
    fn();
  }
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export const getNavSnapshot = () => collapsed;
export const getServerNavSnapshot = () => false;

export function toggleNav() {
  collapsed = !collapsed;
  try {
    window.localStorage.setItem(KEY, collapsed ? "1" : "0");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}
