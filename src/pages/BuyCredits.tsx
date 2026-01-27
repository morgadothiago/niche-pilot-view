import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { Plan } from "@/types";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Coins, Zap, Star, Gem, Check, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentModal } from "@/components/payment/PaymentModal";

const creditPackages = [
  {
    id: "starter",
    name: "Starter",
    credits: 100,
    price: 9.9,
    icon: Coins,
    color: "bg-blue-500/20 text-blue-500",
  },
  {
    id: "popular",
    name: "Popular",
    credits: 500,
    price: 39.9,
    icon: Zap,
    popular: true,
    color: "bg-primary text-primary-foreground",
    bonus: 50,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 1000,
    price: 69.9,
    icon: Star,
    color: "bg-indigo-500/20 text-indigo-500",
    bonus: 150,
  },
  {
    id: "elite",
    name: "Elite",
    credits: 5000,
    price: 299.9,
    icon: Gem,
    color: "bg-purple-500/20 text-purple-500",
    bonus: 1000,
  },
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, refetch } = useSubscription();
  const [selectedPackage, setSelectedPackage] = useState<(typeof creditPackages)[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleSelectPackage = (pkg: (typeof creditPackages)[0]) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !subscription || !selectedPackage) return;

    try {
      const totalCredits = selectedPackage.credits + (selectedPackage.bonus || 0);

      // TODO: Replace with your API call
      // const response = await fetch('/api/credits/purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ credits: totalCredits, package_id: selectedPackage.id }),
      // });
      // if (!response.ok) throw new Error('Failed to purchase credits');

      toast.success(`${totalCredits} créditos adicionados com sucesso!`);
      refetch();
    } catch (error: unknown) {
      console.error("Error buying credits:", error);
      toast.error("Erro ao comprar créditos");
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
          {/* Current Credits Banner */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Coins className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seus créditos</p>
                    <p className="text-3xl font-bold text-primary">
                      {subscription?.credits?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {(() => {
                    const planName =
                      user?.plan ||
                      (typeof subscription?.plan === "string"
                        ? subscription?.plan
                        : (subscription?.plan as Plan | undefined)?.name) ||
                      "Free";
                    return `Plano ${planName.charAt(0).toUpperCase()}${planName.slice(1).toLowerCase()}`;
                  })()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-2">Comprar Créditos</h2>
          <p className="text-muted-foreground mb-6">
            Desbloqueie todo o potencial dos seus agentes. Escolha o pacote ideal e{" "}
            <strong>nunca pare de criar</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {creditPackages.map((pkg, index) => {
              const Icon = pkg.icon;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative bg-card rounded-2xl p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl border-2 cursor-pointer",
                    pkg.popular
                      ? "border-primary/50 shadow-soft ring-2 ring-primary/10"
                      : "border-border/30 hover:border-primary/50"
                  )}
                  onClick={() => handleSelectPackage(pkg)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          pkg.color
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                        {pkg.credits.toLocaleString()} créditos
                      </p>
                      {pkg.bonus && (
                        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">
                          +{pkg.bonus.toLocaleString()} bônus
                        </p>
                      )}

                      <div className="flex items-baseline gap-1 mt-auto">
                        <span className="text-3xl font-black">R$ {pkg.price.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 opacity-70">
                        R$ {(pkg.price / (pkg.credits + (pkg.bonus || 0))).toFixed(3)} por crédito
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Créditos vitalícios</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-500/50" />
                        <span>Acesso total aos agentes</span>
                      </li>
                    </ul>

                    <Button
                      className={cn(
                        "w-full transition-all duration-300",
                        pkg.popular ? "bg-primary hover:bg-primary/90" : "variant-outline"
                      )}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Selecionar pack
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Card className="mt-8 bg-muted/50">
            <CardContent className="py-5">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                🚀 <strong>Sua produtividade sem limites.</strong> Os créditos são o combustível dos
                seus agentes e <strong>nunca expiram</strong>. Garanta o melhor custo-benefício
                aproveitando os <strong>bônus exclusivos</strong> dos pacotes maiores!
              </p>
            </CardContent>
          </Card>
        </div>
      </PageTransition>

      {/* Payment Modal */}
      {selectedPackage && (
        <PaymentModal
          open={showPayment}
          onOpenChange={setShowPayment}
          title="Comprar créditos"
          description={`Você está comprando ${selectedPackage.credits + (selectedPackage.bonus || 0)} créditos`}
          amount={selectedPackage.price}
          itemName={`Pacote ${selectedPackage.name} (${selectedPackage.credits}${selectedPackage.bonus ? ` +${selectedPackage.bonus} bônus` : ""} créditos)`}
          isRecurring={false}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </DashboardLayout>
  );
}
