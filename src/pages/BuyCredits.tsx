import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Coins, Zap, Star, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentModal } from '@/components/payment/PaymentModal';

const creditPackages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 100,
    price: 9.90,
    icon: Coins,
    color: 'bg-blue-500',
  },
  {
    id: 'popular',
    name: 'Popular',
    credits: 500,
    price: 39.90,
    icon: Zap,
    popular: true,
    color: 'bg-primary',
    bonus: 50,
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 1000,
    price: 69.90,
    icon: Star,
    color: 'bg-amber-500',
    bonus: 150,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 5000,
    price: 299.90,
    icon: Gem,
    color: 'bg-purple-500',
    bonus: 1000,
  },
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, refetch } = useSubscription();
  const [selectedPackage, setSelectedPackage] = useState<typeof creditPackages[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSelectPackage = (pkg: typeof creditPackages[0]) => {
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
    } catch (error) {
      console.error('Error buying credits:', error);
      toast.error('Erro ao comprar créditos');
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
                  Plano {subscription?.plan?.charAt(0).toUpperCase()}{subscription?.plan?.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-2">Comprar Créditos</h2>
          <p className="text-muted-foreground mb-6">
            Créditos são usados para interações com os agentes de IA
          </p>

          {/* Payment Disabled Notice */}
          <Card className="mb-6 border-amber-500/50 bg-amber-500/10">
            <CardContent className="py-4">
              <p className="text-sm text-amber-600 dark:text-amber-400 text-center font-medium">
                🚧 Sistema de pagamento em manutenção. Em breve você poderá comprar créditos!
              </p>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditPackages.map((pkg) => {
              const Icon = pkg.icon;

              return (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative transition-all duration-200 opacity-60",
                    pkg.popular && "border-primary shadow-md"
                  )}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Mais vendido
                    </Badge>
                  )}

                  <CardHeader className="pb-3">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3",
                      pkg.color
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <CardDescription>
                      {pkg.credits.toLocaleString()} créditos
                      {pkg.bonus && (
                        <span className="text-primary font-medium"> +{pkg.bonus} bônus</span>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">R$ {pkg.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        R$ {(pkg.price / (pkg.credits + (pkg.bonus || 0))).toFixed(3)} por crédito
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      disabled
                    >
                      Em breve
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 bg-muted/50">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground text-center">
                💡 Os créditos não expiram e podem ser usados a qualquer momento.
                Pacotes maiores incluem bônus exclusivos!
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
          itemName={`Pacote ${selectedPackage.name} (${selectedPackage.credits}${selectedPackage.bonus ? ` +${selectedPackage.bonus} bônus` : ''} créditos)`}
          isRecurring={false}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </DashboardLayout>
  );
}
