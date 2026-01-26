import { useEffect } from "react";
import { useTheme } from "next-themes";

export function PaletteInitializer() {
  const { theme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("selected-palette");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Handle both old format (just palette) and new format (palette + theme)
        const palette = parsed.palette || parsed;

        if (palette && palette.primary && palette.accent) {
          const root = document.documentElement;
          root.style.setProperty("--primary", palette.primary);
          root.style.setProperty("--accent", palette.accent);
          root.style.setProperty("--ring", palette.primary);
          root.style.setProperty("--sidebar-primary", palette.primary);
          root.style.setProperty("--sidebar-ring", palette.primary);
          root.style.setProperty("--chat-user", palette.primary);

          // Optional: You could also add a class to body if needed
          // document.body.setAttribute('data-palette', palette.name);
        }
      } catch (e: unknown) {
        console.error("Error initializing palette:", e);
      }
    }
  }, [theme]);

  // This component doesn't render anything
  return null;
}
