import { motion } from "framer-motion";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <button
        onClick={() => onToggle(false)}
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Mensal
      </button>

      <button
        onClick={() => onToggle(!isAnnual)}
        className="relative w-14 h-8 rounded-full bg-secondary border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <motion.div
          className="absolute top-1 w-6 h-6 rounded-full bg-primary shadow-md"
          animate={{ left: isAnnual ? "calc(100% - 28px)" : "4px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(true)}
          className={`text-sm font-medium transition-colors ${
            isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Anual
        </button>
        {isAnnual && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 py-0.5 text-xs font-semibold bg-accent text-accent-foreground rounded-full"
          >
            -20%
          </motion.span>
        )}
      </div>
    </div>
  );
}
