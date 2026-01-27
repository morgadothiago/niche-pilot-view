import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppConfig {
  appName: string;
  setAppName: (name: string) => void;
}

const DEFAULT_APP_NAME = "ThinkFlow";

const AppConfigContext = createContext<AppConfig | undefined>(undefined);

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const [appName, setAppName] = useState(DEFAULT_APP_NAME);

  useEffect(() => {
    const saved = localStorage.getItem("selected-palette");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const palette = parsed.palette || parsed;
        if (palette.appName) {
          setAppName(palette.appName);
        }
      } catch {
        // Use default
      }
    }
  }, []);

  return (
    <AppConfigContext.Provider value={{ appName, setAppName }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }
  return context;
}

export { DEFAULT_APP_NAME };
