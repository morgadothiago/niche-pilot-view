import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Check, Sparkles, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { PlanChangeAnimation } from "@/components/payment/PlanChangeAnimation";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Para começar a explorar",
    price: 0,
    icon: Sparkles,
    features: [
      "LLM: Gemini Free",
      "1 ou 2 agentes genéricos",
      "RAG limitado",
      "50 créditos totais (não mensal)",
      "Memória curta",
    ],
    color: "bg-muted",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para uso profissional",
    price: 197.0,
    icon: Zap,
    features: [
      "1.500 créditos/mês",
      "Agentes especializados",
      "LLM equilibrado",
      "RAG completo",
      "Memória de conversa",
    ],
    popular: true,
    color: "bg-primary",
  },
  {
    id: "elite",
    name: "Elite",
    description: "Para escala e performance",
    price: 497.0,
    icon: Crown,
    features: [
      "5.000 créditos/mês",
      "Arquétipos avançados",
      "LLM premium",
      "Multi-agente real",
      "Prioridade e fallback",
    ],
    color: "bg-red-500",
  },
];

export default function ChangePlan() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, refetch } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPlans, setAnimationPlans] = useState({ from: "free", to: "pro" });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    // Get current plan from user object, normalized to lowercase
    const currentPlan = user?.plan?.toLowerCase() || subscription?.plan || "free";

    if (!user || plan.id === currentPlan) return;

    if (plan.id === "custom") {
      toast.info("Entre em contato para planos Enterprise");
      return;
    }

    // Free plan doesn't need payment
    if (plan.id === "free") {
      handleDowngrade();
      return;
    }

    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleDowngrade = async () => {
    if (!user) return;

    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/subscriptions/downgrade', { method: 'POST' });
      // if (!response.ok) throw new Error('Failed to downgrade');

      const fromPlan = typeof subscription?.plan === "string" ? subscription.plan : "pro";
      setAnimationPlans({ from: fromPlan, to: "free" });
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        refetch();
        toast.success("Plano alterado para Free");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error downgrading plan:", error);
      toast.error("Erro ao alterar plano");
    }
  };

  const handlePaymentSuccess = async () => {
    if (!user || !selectedPlan) return;

    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/subscriptions/upgrade', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plan: selectedPlan.id }),
      // });
      // if (!response.ok) throw new Error('Failed to upgrade');

      const fromPlan = typeof subscription?.plan === "string" ? subscription.plan : "free";
      setAnimationPlans({ from: fromPlan, to: selectedPlan.id });
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        refetch();
      }, 2000);
    } catch (error: unknown) {
      console.error("Error changing plan:", error);
      toast.error("Erro ao alterar plano");
    }
  };

  if (authLoading || subLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Current Plan Banner */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    // Get current plan from user object, normalized to lowercase
                    const currentUserPlan =
                      user?.plan?.toLowerCase() || subscription?.plan || "free";
                    const currentPlanConfig = plans.find((p) => p.id === currentUserPlan);
                    const Icon = currentPlanConfig?.icon || Sparkles;

                    return (
                      <>
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                            currentPlanConfig?.color || "bg-muted"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Seu plano atual</p>
                          <p className="font-semibold text-lg">
                            {currentPlanConfig?.name || "Free"}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Badge variant="secondary" className="text-sm">
                  {subscription?.status === "active" ? "Ativo" : subscription?.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-2">Escolha seu plano</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              // Get current plan from user object, normalized to lowercase
              const currentUserPlan = user?.plan?.toLowerCase() || subscription?.plan || "free";
              const isCurrentPlan = currentUserPlan === plan.id;
              const Icon = plan.icon;

              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative transition-all duration-300 ease-in-out cursor-pointer border-2",
                    "hover:scale-[1.02] hover:shadow-xl hover:border-primary",
                    isCurrentPlan
                      ? "border-primary ring-2 ring-primary"
                      : "border-transparent bg-card/50",
                    plan.popular && !isCurrentPlan && "border-primary/20",
                    !isCurrentPlan && "opacity-80 hover:opacity-100"
                  )}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Mais popular
                    </Badge>
                  )}

                  <CardHeader>
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3",
                        plan.color
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      {plan.price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">R$ {plan.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold">Sob consulta</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={isCurrentPlan ? "secondary" : plan.popular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan)}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Plano atual
                        </>
                      ) : (
                        "Selecionar Plano"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PageTransition>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          open={showPayment}
          onOpenChange={setShowPayment}
          title="Assinar plano"
          description={`Você está assinando o plano ${selectedPlan.name}`}
          amount={selectedPlan.price || 0}
          itemName={`Plano ${selectedPlan.name} (mensal)`}
          isRecurring={true}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Plan Change Animation */}
      <PlanChangeAnimation
        fromPlan={animationPlans.from}
        toPlan={animationPlans.to}
        isVisible={showAnimation}
      />
    </DashboardLayout>
  );
}
