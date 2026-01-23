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
  const [changingPlan, setChangingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleChangePlan = async (planId: string) => {
    if (!user || planId === subscription?.plan) return;

    if (planId === 'custom') {
      toast.info('Entre em contato para planos Enterprise');
      return;
    }

    setChangingPlan(planId);

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan: planId as 'free' | 'pro' | 'custom' })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success(`Plano alterado para ${plans.find(p => p.id === planId)?.name}!`);
      refetch();
    } catch (error) {
      console.error('Error changing plan:', error);
      toast.error('Erro ao alterar plano');
    } finally {
      setChangingPlan(null);
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
                    "relative transition-all duration-200 hover:shadow-lg",
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
                      disabled={isCurrentPlan || changingPlan !== null}
                      onClick={() => handleChangePlan(plan.id)}
                    >
                      {changingPlan === plan.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : isCurrentPlan ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : null}
                      {isCurrentPlan ? 'Plano atual' : 'Selecionar'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
