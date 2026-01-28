// Prefetch lazy routes when the browser is idle. Safe fallback to setTimeout.
import { preloadDashboard, preloadAdmin } from "./preload";

const win = window as unknown as {
  requestIdleCallback?: (cb: () => void) => number;
  cancelIdleCallback?: (id: number) => void;
};

const rIC: (cb: () => void) => number =
  win.requestIdleCallback ??
  function (cb: () => void) {
    return window.setTimeout(cb, 2000);
  };

const rICCancel: (id: number) => void =
  win.cancelIdleCallback ??
  function (id: number) {
    clearTimeout(id);
  };

let idleHandle: number | null = null;

export function scheduleIdlePrefetch() {
  if (idleHandle != null) return;
  idleHandle = rIC(() => {
    // Preload most important heavy routes
    preloadDashboard().catch(() => {});
    preloadAdmin().catch(() => {});
    idleHandle = null;
  });
}

export function cancelIdlePrefetch() {
  if (idleHandle == null) return;
  rICCancel(idleHandle as number);
  idleHandle = null;
}

export default scheduleIdlePrefetch;
