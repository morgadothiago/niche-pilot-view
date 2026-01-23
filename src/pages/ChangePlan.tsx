import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Check, Sparkles, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { PlanChangeAnimation } from '@/components/payment/PlanChangeAnimation';

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Para começar a explorar',
    price: 0,
    icon: Sparkles,
    features: [
      '5 conversas por dia',
      '1 agente personalizado',
      'Suporte por email',
    ],
    color: 'bg-muted',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para uso profissional',
    price: 49.90,
    icon: Zap,
    features: [
      'Conversas ilimitadas',
      '10 agentes personalizados',
      'Suporte prioritário',
      'API access',
    ],
    popular: true,
    color: 'bg-primary',
  },
  {
    id: 'custom',
    name: 'Enterprise',
    description: 'Soluções sob medida',
    price: null,
    icon: Crown,
    features: [
      'Tudo do Pro',
      'Agentes ilimitados',
      'Suporte dedicado',
      'SLA garantido',
      'Customizações',
    ],
    color: 'bg-amber-500',
  },
];

export default function ChangePlan() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, refetch } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPlans, setAnimationPlans] = useState({ from: 'free', to: 'pro' });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!user || plan.id === subscription?.plan) return;

    if (plan.id === 'custom') {
      toast.info('Entre em contato para planos Enterprise');
      return;
    }

    // Free plan doesn't need payment
    if (plan.id === 'free') {
      handleDowngrade();
      return;
    }

    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleDowngrade = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan: 'free' })
        .eq('user_id', user.id);

      if (error) throw error;

      setAnimationPlans({ from: subscription?.plan || 'pro', to: 'free' });
      setShowAnimation(true);
      
      setTimeout(() => {
        setShowAnimation(false);
        refetch();
        toast.success('Plano alterado para Free');
      }, 2000);
    } catch (error) {
      console.error('Error downgrading plan:', error);
      toast.error('Erro ao alterar plano');
    }
  };

  const handlePaymentSuccess = async () => {
    if (!user || !selectedPlan) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan: selectedPlan.id as 'free' | 'pro' | 'custom' })
        .eq('user_id', user.id);

      if (error) throw error;

      setAnimationPlans({ from: subscription?.plan || 'free', to: selectedPlan.id });
      setShowAnimation(true);
      
      setTimeout(() => {
        setShowAnimation(false);
        refetch();
      }, 2000);
    } catch (error) {
      console.error('Error changing plan:', error);
      toast.error('Erro ao alterar plano');
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
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                    plans.find(p => p.id === subscription?.plan)?.color || 'bg-muted'
                  )}>
                    {(() => {
                      const Icon = plans.find(p => p.id === subscription?.plan)?.icon || Sparkles;
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seu plano atual</p>
                    <p className="font-semibold text-lg">
                      {plans.find(p => p.id === subscription?.plan)?.name || 'Free'}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {subscription?.status === 'active' ? 'Ativo' : subscription?.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6">Escolha seu plano</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isCurrentPlan = subscription?.plan === plan.id;
              const Icon = plan.icon;

              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                    plan.popular && "border-primary shadow-md",
                    isCurrentPlan && "ring-2 ring-primary"
                  )}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Mais popular
                    </Badge>
                  )}

                  <CardHeader>
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3",
                      plan.color
                    )}>
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
                      disabled={isCurrentPlan}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {isCurrentPlan ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Plano atual
                        </>
                      ) : (
                        'Selecionar'
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
