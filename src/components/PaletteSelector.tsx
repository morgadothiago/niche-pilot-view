import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface ColorPalette {
  name: string;
  primary: string;
  accent: string;
  preview: { primary: string; accent: string };
}

const palettes: ColorPalette[] = [
  {
    name: "Índigo & Cyan",
    primary: "243 75% 59%",
    accent: "187 92% 45%",
    preview: { primary: "#6366f1", accent: "#06b6d4" },
  },
  {
    name: "Violeta & Rosa",
    primary: "270 70% 60%",
    accent: "330 80% 60%",
    preview: { primary: "#a855f7", accent: "#ec4899" },
  },
  {
    name: "Esmeralda & Lima",
    primary: "160 84% 39%",
    accent: "84 81% 44%",
    preview: { primary: "#10b981", accent: "#84cc16" },
  },
  {
    name: "Laranja & Amarelo",
    primary: "25 95% 53%",
    accent: "45 93% 47%",
    preview: { primary: "#f97316", accent: "#eab308" },
  },
  {
    name: "Azul & Teal",
    primary: "217 91% 60%",
    accent: "174 84% 42%",
    preview: { primary: "#3b82f6", accent: "#14b8a6" },
  },
  {
    name: "Rosa & Coral",
    primary: "340 82% 52%",
    accent: "15 90% 58%",
    preview: { primary: "#e11d48", accent: "#f97352" },
  },
  {
    name: "Slate & Zinc",
    primary: "215 28% 17%",
    accent: "240 5% 34%",
    preview: { primary: "#1e293b", accent: "#52525b" },
  },
];

export function PaletteSelector() {
  const [currentPalette, setCurrentPalette] = useState<string>("Índigo & Cyan");

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
    localStorage.setItem("selected-palette", JSON.stringify(palette));
  };

  useEffect(() => {
    const saved = localStorage.getItem("selected-palette");
    if (saved) {
      const palette = JSON.parse(saved) as ColorPalette;
      applyPalette(palette);
    }
  }, []);

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
