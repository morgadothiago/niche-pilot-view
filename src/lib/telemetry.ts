export async function initTelemetry(): Promise<void> {
  try {
    const env = import.meta.env as Record<string, string | undefined>;
    const dsn = env?.VITE_SENTRY_DSN;
    if (!dsn) return;
    // Load the package at runtime using a dynamic import constructed
    // via `new Function` so bundlers (Vite/Rollup) won't try to
    // resolve the module at build time. This keeps Sentry optional
    // for environments that don't install the package.
    const mod = await (new Function('return import("@sentry/react")')() as Promise<
      typeof import("@sentry/react")
    >);
    try {
      mod.init({
        dsn,
        environment: env?.MODE,
        release: env?.VITE_COMMIT_SHA,
      });
    } catch {
      // ignore init errors
    }
  } catch {
    // ignore if Sentry not installed
  }
}

export async function captureException(e: unknown): Promise<void> {
  try {
    const env = import.meta.env as Record<string, string | undefined>;
    if (!env?.VITE_SENTRY_DSN) return;
    const mod = await (new Function('return import("@sentry/react")')() as Promise<
      typeof import("@sentry/react")
    >);
    mod.captureException?.(e);
  } catch {
    // ignore
  }
}

export default { initTelemetry, captureException };
