import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Coins, ShieldAlert } from "lucide-react";
import { planLimits } from "@/constants/plans";

interface CreditIndicatorProps {
  credits: number;
  plan: string;
  size?: "sm" | "md";
  showTooltip?: boolean;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function CreditIndicator({
  credits,
  plan,
  size = "md",
  showTooltip = true,
  tooltipSide = "bottom",
  className,
}: CreditIndicatorProps) {
  const testLimit = Number(import.meta.env.VITE_TEST_LIMIT);
  const limit = !isNaN(testLimit) && testLimit > 0 ? testLimit : planLimits[plan] || 50;
  const percentage = Math.max(0, Math.min(100, (credits / limit) * 100));

  const radius = size === "md" ? 12 : 10;
  const circumference = 2 * Math.PI * radius;
  const isCritical = percentage <= 20 || credits === 0;

  const getColors = () => {
    if (credits === 0 || percentage <= 20)
      return {
        stroke: "rgb(239, 68, 68)", // Red-500
        glow: "rgba(239, 68, 68, 0.4)",
        bg: "rgba(239, 68, 68, 0.1)",
        text: "text-red-500",
      };
    if (percentage <= 50)
      return {
        stroke: "rgb(234, 179, 8)", // Yellow-500
        glow: "rgba(234, 179, 8, 0.4)",
        bg: "rgba(234, 179, 8, 0.1)",
        text: "text-yellow-500",
      };
    return {
      stroke: "rgb(34, 197, 94)", // Green-500
      glow: "rgba(34, 197, 94, 0.4)",
      bg: "rgba(34, 197, 94, 0.1)",
      text: "text-green-500",
    };
  };

  const colors = getColors();
  const svgSize = size === "md" ? "w-10 h-10" : "w-8 h-8";
  const containerSize = size === "md" ? "w-11 h-11" : "w-9 h-9";
  const fontSize = size === "md" ? "text-[10px]" : "text-[9px]";

  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative group cursor-pointer", className)}
    >
      <Link
        to="/buy-credits"
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300",
          containerSize
        )}
      >
        {/* Background Glow */}
        <div
          className="absolute inset-0 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: colors.glow }}
        />

        <svg className={cn(svgSize, "-rotate-90 drop-shadow-sm")} viewBox="0 0 32 32">
          {/* Track Background */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted-foreground/10"
          />

          {/* Progress Path */}
          <motion.circle
            cx="16"
            cy="16"
            r={radius}
            fill="transparent"
            stroke={colors.stroke}
            strokeWidth="3"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 2px ${colors.stroke})` }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className={cn(
              "font-black tracking-tighter leading-none transition-colors duration-300",
              fontSize,
              colors.text
            )}
          >
            {credits}
          </span>
        </div>
      </Link>
    </motion.div>
  );

  if (!showTooltip) return content;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side={tooltipSide}
          className="p-3 border-border/50 bg-background/95 backdrop-blur-md shadow-xl"
        >
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-md", colors.bg)}>
                {credits === 0 ? (
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                ) : (
                  <Coins className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">{credits} Créditos</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Disponíveis
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Uso do plano</span>
                <span className={cn("font-bold", colors.text)}>{percentage.toFixed(0)}%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: colors.stroke }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between border-t border-border/50 mt-1">
              <span className="text-[9px] text-muted-foreground">Plano {plan.toUpperCase()}</span>
              {credits < limit * 0.1 && (
                <span className="text-[9px] font-bold text-primary animate-pulse">
                  Recarregar agora
                </span>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
