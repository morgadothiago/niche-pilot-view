// util de prefetch para páginas lazy-loaded
export function preloadDashboard() {
  return import("../pages/Dashboard");
}

export function preloadChat() {
  return import("../pages/Chat");
}

export function preloadAgents() {
  return import("../pages/Agents");
}

export function preloadCreateAgent() {
  return import("../pages/CreateAgent");
}

export function preloadAdmin() {
  return Promise.all([
    import("../pages/admin/AdminDashboard"),
    import("../pages/admin/AdminUsers"),
    import("../pages/admin/AdminAgents"),
    import("../pages/admin/AdminSubscriptions"),
    import("../pages/admin/AdminSettings"),
  ]);
}

export function preloadRoute(path: string) {
  try {
    if (path.startsWith("/dashboard")) return preloadDashboard();
    if (path.startsWith("/chat")) return preloadChat();
    if (path.startsWith("/agents")) return preloadAgents();
    if (path.startsWith("/admin")) return preloadAdmin();
  } catch (_e) {
    // ignore prefetch errors
  }
  return Promise.resolve();
}
