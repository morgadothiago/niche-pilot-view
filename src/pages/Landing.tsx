import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap, Shield, MessageSquare, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { HeroOrbs } from '@/components/HeroOrbs';
import { AnimatedNicheText } from '@/components/AnimatedNicheText';

const features = [
  {
    icon: Bot,
    title: 'Agentes Especializados',
    description: 'Crie agentes de IA personalizados para cada área do seu negócio.',
  },
  {
    icon: Sparkles,
    title: 'IA de Última Geração',
    description: 'Powered by modelos de linguagem avançados para respostas precisas.',
  },
  {
    icon: Zap,
    title: 'Respostas Instantâneas',
    description: 'Obtenha insights e soluções em segundos, não em horas.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Seus dados protegidos com criptografia de ponta a ponta.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Crie seu agente',
    description: 'Defina o nicho, tom de voz e regras do seu agente especializado.',
  },
  {
    number: '02',
    title: 'Configure o comportamento',
    description: 'Personalize como o agente deve responder e interagir.',
  },
  {
    number: '03',
    title: 'Comece a conversar',
    description: 'Inicie conversas e obtenha respostas especializadas instantaneamente.',
  },
];

const benefits = [
  'Economize horas de trabalho por semana',
  'Respostas consistentes e profissionais',
  'Disponível 24 horas por dia',
  'Múltiplos agentes para diferentes áreas',
  'Histórico completo de conversas',
  'Integração fácil com seu workflow',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden relative">
        {/* Animated background orbs */}
        <HeroOrbs />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Plataforma de IA para empresas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Agentes de IA para{' '}
              <AnimatedNicheText />
              <br />do seu negócio
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Crie assistentes virtuais especializados que entendem seu negócio. 
              Marketing, vendas, suporte, jurídico — tudo em uma plataforma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Começar gratuitamente
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/login">Ver demonstração</Link>
              </Button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-16 relative">
            <div className="bg-card rounded-2xl shadow-medium border border-border p-4 max-w-4xl mx-auto animate-slide-up stagger-2">
              <div className="bg-sidebar rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sidebar-foreground">Marketing Pro</div>
                    <div className="text-xs text-sidebar-foreground/60">Especialista em Marketing Digital</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-sidebar-accent rounded-lg px-4 py-3 text-sidebar-foreground text-sm text-left max-w-[80%]">
                    Vou te ajudar a criar uma estratégia de lançamento completa. Qual é o seu público-alvo principal?
                  </div>
                  <div className="bg-primary rounded-lg px-4 py-3 text-primary-foreground text-sm text-right ml-auto max-w-[80%]">
                    Startups de tecnologia B2B no Brasil
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
              <div className="bg-card rounded-xl shadow-soft border border-border p-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="absolute -right-4 top-1/3 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-card rounded-xl shadow-soft border border-border p-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tudo que você precisa em uma plataforma
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos poderosos para criar, gerenciar e escalar seus agentes de IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para começar a usar agentes de IA no seu dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-7xl font-bold text-primary/20 dark:text-primary/30 mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-sidebar text-sidebar-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Por que escolher o AgentChat?
              </h2>
              <p className="text-xl text-sidebar-foreground/70 mb-8">
                Uma plataforma completa para automatizar tarefas e aumentar a produtividade da sua equipe.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sidebar-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-sidebar-accent rounded-2xl p-8">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-sidebar rounded-xl p-4">
                      <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-lg">
                        {['📈', '💻', '🤝'][i - 1]}
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-sidebar-foreground/20 rounded w-3/4 mb-2" />
                        <div className="h-2 bg-sidebar-foreground/10 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background orbs for CTA */}
        <HeroOrbs />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="bg-card rounded-3xl shadow-medium border border-border p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Crie sua conta gratuita e comece a usar agentes de IA hoje mesmo.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                Criar conta grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
