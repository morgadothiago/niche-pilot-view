import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, Zap, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ElementType;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  isCustom?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfeito para começar",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: Sparkles,
    features: [
      { text: "LLM: Gemini Free", included: true },
      { text: "1 ou 2 agentes genéricos", included: true },
      { text: "50 créditos totais (não mensal)", included: true },
      { text: "Memória curta", included: true },
      { text: "RAG limitado", included: true },
      { text: "Sem multi-agente", included: false },
    ],
    cta: "Começar grátis",
  },
  {
    name: "Pro",
    description: "Para profissionais",
    monthlyPrice: 197,
    annualPrice: 157,
    icon: Zap,
    popular: true,
    features: [
      { text: "1.500 créditos/mês", included: true },
      { text: "Agentes especializados", included: true },
      { text: "LLM equilibrado", included: true },
      { text: "RAG completo", included: true },
      { text: "Memória de conversa", included: true },
      { text: "Suporte prioritário", included: true },
    ],
    cta: "Assinar Pro",
  },
  {
    name: "Elite",
    description: "Para grandes empresas",
    monthlyPrice: 497,
    annualPrice: 397,
    icon: Building2,
    features: [
      { text: "5.000 créditos/mês", included: true },
      { text: "Arquétipos avançados", included: true },
      { text: "LLM premium", included: true },
      { text: "Multi-agente real", included: true },
      { text: "Prioridade e fallback", included: true },
      { text: "Suporte 24/7", included: true },
    ],
    cta: "Assinar Elite",
  },
];

interface PricingCardsProps {
  isAnnual: boolean;
  compact?: boolean;
}

export function PricingCards({ isAnnual, compact = false }: PricingCardsProps) {
  const formatPrice = (plan: Plan) => {
    if (plan.isCustom) return "Personalizado";
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    return `R$ ${price}`;
  };

  const getPeriod = (plan: Plan) => {
    if (plan.isCustom) return "";
    return "/mês";
  };

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        compact ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-3 lg:gap-8"
      )}
    >
      {plans.map((plan, index) => {
        const Icon = plan.icon;
        return (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "relative bg-card rounded-2xl border-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:border-primary",
              plan.popular
                ? "border-primary/50 shadow-soft ring-2 ring-primary/20"
                : "border-transparent shadow-soft"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                  Mais popular
                </span>
              </div>
            )}

            <div className={cn("p-5 sm:p-6", compact && "p-4 sm:p-5")}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-primary/10"
                  )}
                >
                  <Icon className={cn("w-5 h-5", !plan.popular && "text-primary")} />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{plan.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold">{formatPrice(plan)}</span>
                  <span className="text-sm text-muted-foreground">{getPeriod(plan)}</span>
                </div>
                {isAnnual && !plan.isCustom && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-accent font-medium mt-1">
                    Economize R$ {(plan.monthlyPrice - plan.annualPrice) * 12}/ano
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className={cn("space-y-2 mb-4 sm:mb-6", compact && "space-y-1.5")}>
                {plan.features.slice(0, compact ? 4 : undefined).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-xs sm:text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground/60"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size={compact ? "sm" : "default"}
                asChild
              >
                <Link to={plan.isCustom ? "/contact" : "/signup"}>{plan.cta}</Link>
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
