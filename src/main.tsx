import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
async function bootstrap() {
  // initialize optional telemetry (Sentry) if configured
  try {
    const telemetry = await import("@/lib/telemetry");
    telemetry.initTelemetry?.();
  } catch {
    // ignore if telemetry lib not present or fails
  }

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

void bootstrap();
