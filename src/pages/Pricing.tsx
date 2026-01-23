import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { HeroOrbs } from '@/components/HeroOrbs';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: React.ElementType;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Perfeito para começar e explorar a plataforma',
    price: 'R$ 0',
    period: '/mês',
    icon: Sparkles,
    features: [
      { text: '3 agentes ativos', included: true },
      { text: '100 mensagens/mês', included: true },
      { text: 'Histórico de 7 dias', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Agentes personalizados', included: false },
      { text: 'API de integração', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'SSO e segurança avançada', included: false },
    ],
    cta: 'Começar grátis',
  },
  {
    name: 'Pro',
    description: 'Para profissionais e equipes em crescimento',
    price: 'R$ 49',
    period: '/mês',
    icon: Zap,
    popular: true,
    features: [
      { text: 'Agentes ilimitados', included: true },
      { text: 'Mensagens ilimitadas', included: true },
      { text: 'Histórico completo', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Agentes personalizados', included: true },
      { text: 'API de integração', included: true },
      { text: 'Exportação de dados', included: true },
      { text: 'SSO e segurança avançada', included: false },
    ],
    cta: 'Assinar Pro',
  },
  {
    name: 'Enterprise',
    description: 'Para grandes empresas com necessidades específicas',
    price: 'Personalizado',
    period: '',
    icon: Building2,
    features: [
      { text: 'Tudo do Pro', included: true },
      { text: 'SSO e segurança avançada', included: true },
      { text: 'SLA garantido 99.9%', included: true },
      { text: 'Gerente de conta dedicado', included: true },
      { text: 'Treinamento personalizado', included: true },
      { text: 'Integrações customizadas', included: true },
      { text: 'Deploy on-premise', included: true },
      { text: 'Suporte 24/7', included: true },
    ],
    cta: 'Falar com vendas',
  },
];

const faqs = [
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano quando quiser. As mudanças são aplicadas imediatamente.',
  },
  {
    question: 'Existe período de teste?',
    answer: 'O plano Free é gratuito para sempre. Para o Pro, oferecemos 14 dias de teste grátis sem necessidade de cartão.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Aceitamos cartão de crédito, débito e PIX. O pagamento é mensal e você pode cancelar quando quiser.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança do mercado.',
  },
];

export default function Pricing() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <HeroOrbs />
          
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Preços simples e transparentes</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Escolha o plano ideal para{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                seu negócio
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece gratuitamente e escale conforme sua necessidade. Sem surpresas, sem taxas escondidas.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-card rounded-2xl shadow-soft border transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="gradient-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                        Mais popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.popular ? 'gradient-primary' : 'bg-primary/10'
                      }`}>
                        <plan.icon className={`w-6 h-6 ${
                          plan.popular ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={plan.popular ? 'hero' : 'outline'}
                      size="lg"
                      className="w-full mb-8"
                      asChild
                    >
                      <Link to="/signup">{plan.cta}</Link>
                    </Button>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-3 text-sm ${
                            feature.included ? '' : 'text-muted-foreground/50'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 flex-shrink-0 ${
                              feature.included ? 'text-primary' : 'text-muted-foreground/30'
                            }`}
                          />
                          <span className={feature.included ? '' : 'line-through'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perguntas frequentes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-soft border border-border"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="bg-sidebar text-sidebar-foreground rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ainda tem dúvidas?
              </h2>
              <p className="text-xl text-sidebar-foreground/70 mb-8 max-w-xl mx-auto">
                Nossa equipe está pronta para ajudar você a escolher o melhor plano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/signup">Começar grátis</Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-sidebar-foreground/30 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  Falar com especialista
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
