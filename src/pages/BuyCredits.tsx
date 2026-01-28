import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { subscriptionService } from "@/services/subscriptionService";
import { Plan, CreditPackage } from "@/types";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Coins, Zap, Star, Gem, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentModal } from "@/components/payment/PaymentModal";

// Icon mapping for packages (API returns icon name as string)
const iconMap: Record<string, LucideIcon> = {
  coins: Coins,
  zap: Zap,
  star: Star,
  gem: Gem,
};

// Default color mapping
const defaultColors: Record<string, string> = {
  starter: "bg-blue-500/20 text-blue-500",
  popular: "bg-primary text-primary-foreground",
  pro: "bg-indigo-500/20 text-indigo-500",
  elite: "bg-purple-500/20 text-purple-500",
};

export default function BuyCredits() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, refetch } = useSubscription();

  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch credit packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setPackagesLoading(true);
        setPackagesError(null);
        const data = await subscriptionService.getCreditPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching credit packages:", error);
        setPackagesError("Erro ao carregar pacotes de créditos");
      } finally {
        setPackagesLoading(false);
      }
    };

    if (user) {
      fetchPackages();
    }
  }, [user]);

  const handleSelectPackage = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !subscription || !selectedPackage) return;

    try {
      setPurchasing(true);

      const result = await subscriptionService.buyCredits(selectedPackage.id);

      toast.success(`${result.credits_added} créditos adicionados com sucesso!`);
      refetch();
      setShowPayment(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error("Error buying credits:", error);
      toast.error("Erro ao comprar créditos. Tente novamente.");
    } finally {
      setPurchasing(false);
    }
  };

  // Helper to get total credits (base + bonus)
  const getTotalCredits = (pkg: CreditPackage) => pkg.credits + (pkg.bonus || 0);

  // Helper to get price per credit
  const getPricePerCredit = (pkg: CreditPackage) => {
    const total = getTotalCredits(pkg);
    return total > 0 ? pkg.price / total : 0;
  };

  // Helper to get icon component
  const getIcon = (pkg: CreditPackage): LucideIcon => {
    if (pkg.icon && iconMap[pkg.icon.toLowerCase()]) {
      return iconMap[pkg.icon.toLowerCase()];
    }
    // Default icons based on package name/id
    const id = pkg.id.toLowerCase();
    if (id.includes("elite") || id.includes("gem")) return Gem;
    if (id.includes("pro") || id.includes("star")) return Star;
    if (id.includes("popular") || id.includes("zap")) return Zap;
    return Coins;
  };

  // Helper to get color
  const getColor = (pkg: CreditPackage): string => {
    if (pkg.color) return pkg.color;
    const id = pkg.id.toLowerCase();
    return defaultColors[id] || "bg-blue-500/20 text-blue-500";
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

          {/* Loading State */}
          {packagesLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {packagesError && !packagesLoading && (
            <Card className="py-12">
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{packagesError}</p>
                <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
              </CardContent>
            </Card>
          )}

          {/* Packages Grid */}
          {!packagesLoading && !packagesError && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => {
                const Icon = getIcon(pkg);
                const color = getColor(pkg);
                const _totalCredits = getTotalCredits(pkg);
                const pricePerCredit = getPricePerCredit(pkg);

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
                            color
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
                        {pkg.bonus && pkg.bonus > 0 && (
                          <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">
                            +{pkg.bonus.toLocaleString()} bônus
                          </p>
                        )}

                        <div className="flex items-baseline gap-1 mt-auto">
                          <span className="text-3xl font-black">
                            R$ {pkg.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 opacity-70">
                          R$ {pricePerCredit.toLocaleString("pt-BR", { minimumFractionDigits: 3 })}{" "}
                          por crédito
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
          )}

          {/* Empty State */}
          {!packagesLoading && !packagesError && packages.length === 0 && (
            <Card className="py-12">
              <CardContent className="text-center">
                <Coins className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum pacote disponível no momento.</p>
              </CardContent>
            </Card>
          )}

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
          onOpenChange={(open) => {
            if (!purchasing) {
              setShowPayment(open);
              if (!open) setSelectedPackage(null);
            }
          }}
          title="Comprar créditos"
          description={`Você está comprando ${getTotalCredits(selectedPackage).toLocaleString()} créditos`}
          amount={selectedPackage.price}
          itemName={`Pacote ${selectedPackage.name} (${selectedPackage.credits.toLocaleString()}${selectedPackage.bonus ? ` +${selectedPackage.bonus.toLocaleString()} bônus` : ""} créditos)`}
          isRecurring={false}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </DashboardLayout>
  );
}
