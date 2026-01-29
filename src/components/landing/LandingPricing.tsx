import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    headline: "Experimente agentes de IA no seu dia a dia e entenda como eles economizam tempo.",
    description: "Serve pra testar, aprender e sentir o ganho — não pra operar de verdade.",
    footer: "Se não virar habito, não é pra ficar aqui.",
    price: 0,
    color: "bg-muted",
    iconColor: "text-foreground",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    headline:
      "Produza conteúdo, responda clientes e analise conversas sem virar refém do trabalho.",
    description:
      "Substitui horas semanais de execução manual para quem vive de marketing, vendas ou social media.",
    footer: "É o plano onde a IA começa a pagar a própria assinatura.",
    price: 197,
    popular: true,
    color: "bg-primary",
    iconColor: "text-white",
  },
  {
    id: "elite",
    name: "Elite",
    icon: Crown,
    headline: "IA rodando como parte da sua operação, não como ferramenta.",
    description:
      "Para quem precisa escalar conteúdo, atendimento e análise sem contratar gente nova.",
    footer: "Aqui você não usa IA — você delega trabalho.",
    price: 497,
    color: "bg-red-500/80",
    iconColor: "text-white",
  },
];

export function LandingPricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Escolha seu plano</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-6 transition-all duration-300",
                  "bg-card/50 backdrop-blur-sm",
                  plan.popular
                    ? "border-2 border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]"
                    : "border border-border/50"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais popular
                  </Badge>
                )}

                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    plan.color
                  )}
                >
                  <Icon className={cn("w-6 h-6", plan.iconColor)} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>

                <p
                  className={cn(
                    "text-sm mb-3 leading-relaxed",
                    plan.popular ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {plan.headline}
                </p>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {plan.description}
                </p>

                <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">
                  {plan.footer}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate("/register")}
                >
                  Selecionar Plano
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
