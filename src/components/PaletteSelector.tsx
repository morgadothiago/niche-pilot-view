import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

interface ColorPalette {
  name: string;
  primary: string;
  accent: string;
  preview: {
    primary: string;
    accent: string;
  };
}

const palettes: ColorPalette[] = [
  {
    name: "Índigo & Cyan",
    primary: "243 75% 59%",
    accent: "187 92% 50%",
    preview: { primary: "#635BFF", accent: "#00D4FF" },
  },
  {
    name: "Roxo & Rosa",
    primary: "270 70% 60%",
    accent: "330 80% 60%",
    preview: { primary: "#9B59B6", accent: "#E84393" },
  },
  {
    name: "Verde & Teal",
    primary: "160 60% 45%",
    accent: "180 70% 45%",
    preview: { primary: "#27AE60", accent: "#1ABC9C" },
  },
  {
    name: "Laranja & Amarelo",
    primary: "25 95% 55%",
    accent: "45 100% 50%",
    preview: { primary: "#F39C12", accent: "#F1C40F" },
  },
  {
    name: "Azul & Verde",
    primary: "210 80% 55%",
    accent: "140 70% 50%",
    preview: { primary: "#3498DB", accent: "#2ECC71" },
  },
  {
    name: "Vermelho & Coral",
    primary: "0 70% 55%",
    accent: "16 80% 60%",
    preview: { primary: "#E74C3C", accent: "#E67E22" },
  },
  {
    name: "Escuro & Neon",
    primary: "260 80% 65%",
    accent: "160 100% 50%",
    preview: { primary: "#8B5CF6", accent: "#00FF88" },
  },
];

export function PaletteSelector() {
  const [currentPalette, setCurrentPalette] = useState<string>("Índigo & Cyan");
  const { theme } = useTheme();

  const applyPalette = (palette: ColorPalette) => {
    const root = document.documentElement;
    
    // Update CSS variables for light mode
    root.style.setProperty("--primary", palette.primary);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--ring", palette.primary);
    root.style.setProperty("--sidebar-primary", palette.primary);
    root.style.setProperty("--sidebar-ring", palette.primary);
    root.style.setProperty("--chat-user", palette.primary);
    
    setCurrentPalette(palette.name);
    
    // Save palette with current theme
    const savedData = {
      palette,
      theme: theme || 'light'
    };
    localStorage.setItem("selected-palette", JSON.stringify(savedData));
  };

  // Load saved palette on mount and when theme changes
  useEffect(() => {
    const saved = localStorage.getItem("selected-palette");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Handle both old format (just palette) and new format (palette + theme)
        const palette = parsed.palette || parsed;
        if (palette.primary && palette.accent) {
          const root = document.documentElement;
          root.style.setProperty("--primary", palette.primary);
          root.style.setProperty("--accent", palette.accent);
          root.style.setProperty("--ring", palette.primary);
          root.style.setProperty("--sidebar-primary", palette.primary);
          root.style.setProperty("--sidebar-ring", palette.primary);
          root.style.setProperty("--chat-user", palette.primary);
          setCurrentPalette(palette.name);
        }
      } catch (e) {
        console.error("Error parsing saved palette:", e);
      }
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Mudar paleta de cores</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover">
        <DropdownMenuLabel>Paleta de cores</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {palettes.map((palette) => (
          <DropdownMenuItem
            key={palette.name}
            onClick={() => applyPalette(palette)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex gap-1">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: palette.preview.primary }}
              />
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: palette.preview.accent }}
              />
            </div>
            <span className={currentPalette === palette.name ? "font-semibold" : ""}>
              {palette.name}
            </span>
            {currentPalette === palette.name && (
              <span className="ml-auto text-xs text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
