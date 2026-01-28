export async function initTelemetry(): Promise<void> {
  try {
    const env = import.meta.env as Record<string, string | undefined>;
    const dsn = env?.VITE_SENTRY_DSN;
    if (!dsn) return;
    const mod = await import("@sentry/react");
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
    const mod = await import("@sentry/react");
    mod.captureException?.(e);
  } catch {
    // ignore
  }
}

export default { initTelemetry, captureException };
