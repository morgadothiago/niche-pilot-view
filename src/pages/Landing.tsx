import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare, Bot, Brain, Shield, Zap, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { HeroOrbs } from '@/components/HeroOrbs';
import { AnimatedNicheText } from '@/components/AnimatedNicheText';
import { PageTransition } from '@/components/PageTransition';
import { Testimonials } from '@/components/Testimonials';
import { LandingTutorial } from '@/components/LandingTutorial';
import { AnimatedBubbles } from '@/components/AnimatedBubbles';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Bot,
    title: 'Agentes Personalizados',
    description: 'Crie agentes de IA com personalidades únicas para cada necessidade do seu negócio.',
  },
  {
    icon: Brain,
    title: 'Inteligência Contextual',
    description: 'Nossos agentes entendem o contexto e mantêm conversas naturais e relevantes.',
  },
  {
    icon: MessageSquare,
    title: 'Múltiplos Canais',
    description: 'Integre com WhatsApp, Telegram, website e muito mais em um só lugar.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Dados criptografados e proteção de ponta a ponta para sua tranquilidade.',
  },
  {
    icon: Zap,
    title: 'Respostas Instantâneas',
    description: 'Atendimento 24/7 com respostas em milissegundos para seus clientes.',
  },
  {
    icon: Sparkles,
    title: 'Aprendizado Contínuo',
    description: 'Os agentes aprendem e melhoram automaticamente com cada interação.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Escolha seu nicho',
    description: 'Selecione entre dezenas de especialidades ou crie um agente totalmente personalizado.',
  },
  {
    number: '02',
    title: 'Configure a personalidade',
    description: 'Defina tom de voz, conhecimentos específicos e comportamentos do seu agente.',
  },
  {
    number: '03',
    title: 'Comece a conversar',
    description: 'Seu agente está pronto! Integre onde quiser e comece a automatizar.',
  },
];

const benefits = [
  'Reduza custos de atendimento em até 80%',
  'Atendimento disponível 24 horas por dia',
  'Escalabilidade ilimitada',
  'Integração com suas ferramentas favoritas',
  'Análises e insights em tempo real',
  'Suporte técnico especializado',
];

export default function Landing() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 relative">
          <HeroOrbs />
          
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Agentes de IA para qualquer nicho</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 px-2"
            >
              O assistente perfeito para{' '}
              <span className="block mt-2">
                <AnimatedNicheText />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4"
            >
              Crie agentes de IA personalizados que entendem seu negócio e atendem seus clientes 24/7 com respostas precisas e naturais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Button size="lg" variant="hero" className="w-full sm:w-auto" asChild>
                <Link to="/auth">
                  Começar gratuitamente
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/auth">Já tenho uma conta</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
                Tudo que você precisa para{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  automatizar
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Recursos poderosos para criar experiências de atendimento excepcionais
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card p-5 sm:p-6 lg:p-8 rounded-2xl shadow-soft border border-border hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 lg:mb-6">
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm lg:text-base">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Como{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  funciona
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Em apenas 3 passos, seu agente estará pronto para atender
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 sm:gap-6 lg:gap-8 items-start mb-8 sm:mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary dark:text-primary/80">{step.number}</span>
                  </div>
                  <div className="pt-1 sm:pt-2 lg:pt-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm lg:text-base">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Benefits Section */}
        <section className="py-16 sm:py-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Por que escolher nossa{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    plataforma?
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8">
                  Milhares de empresas já transformaram seu atendimento com nossos agentes de IA. Descubra as vantagens que fazem a diferença.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                      </div>
                      <span className="text-foreground text-sm sm:text-base">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse-glow">
                      <Bot className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Agente Pronto</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Seu assistente 24/7</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="py-16 sm:py-24 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-accent p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-glow text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Pronto para revolucionar seu atendimento?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6">
                Comece gratuitamente hoje e descubra como nossos agentes podem transformar seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/auth">
                    Começar gratuitamente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/pricing">Ver planos e preços</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <LandingTutorial />
        <AnimatedBubbles />
      </div>
    </PageTransition>
  );
}
