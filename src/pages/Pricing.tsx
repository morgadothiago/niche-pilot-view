import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2, X } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { HeroOrbs } from "@/components/HeroOrbs";
import { PricingToggle } from "@/components/PricingToggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ElementType;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  isCustom?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfeito para começar e explorar a plataforma",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: Sparkles,
    features: [
      { text: "LLM: Gemini Free", included: true },
      { text: "1 ou 2 agentes genéricos", included: true },
      { text: "50 créditos totais (não mensal)", included: true },
      { text: "Memória curta", included: true },
      { text: "RAG limitado", included: true },
      { text: "Sem arquétipos", included: false },
      { text: "Sem multi-agente", included: false },
    ],
    cta: "Começar grátis",
  },
  {
    name: "Pro",
    description: "Para profissionais e equipes em crescimento",
    monthlyPrice: 197,
    annualPrice: 157,
    icon: Zap,
    popular: true,
    features: [
      { text: "1.500 créditos/mês", included: true },
      { text: "Agentes especializados", included: true },
      { text: "LLM equilibrado", included: true },
      { text: "RAG completo", included: true },
      { text: "Memória de conversa", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "API de integração", included: true },
    ],
    cta: "Assinar Pro",
  },
  {
    name: "Elite",
    description: "Para escala empresarial com performance máxima",
    monthlyPrice: 497,
    annualPrice: 397,
    icon: Building2,
    features: [
      { text: "5.000 créditos/mês", included: true },
      { text: "Arquétipos avançados", included: true },
      { text: "LLM premium", included: true },
      { text: "Multi-agente real", included: true },
      { text: "Prioridade e fallback", included: true },
      { text: "Deploy on-premise", included: true },
      { text: "Gerente de conta dedicado", included: true },
      { text: "Suporte 24/7", included: true },
    ],
    cta: "Assinar Elite",
  },
];

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade do seu plano quando quiser. As mudanças são aplicadas imediatamente.",
  },
  {
    question: "Existe período de teste?",
    answer:
      "O plano Free é gratuito para sempre. Para o Pro, oferecemos 14 dias de teste grátis sem necessidade de cartão.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Aceitamos cartão de crédito, débito e PIX. O pagamento é mensal e você pode cancelar quando quiser.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim! Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança do mercado.",
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const formatPrice = (plan: Plan) => {
    if (plan.isCustom) return "Personalizado";
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    return `R$ ${price}`;
  };

  const getPeriod = (plan: Plan) => {
    if (plan.isCustom) return "";
    return isAnnual ? "/mês (cobrado anualmente)" : "/mês";
  };

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
              Escolha o plano ideal para{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                seu negócio
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Comece gratuitamente e escale conforme sua necessidade. Sem surpresas, sem taxas
              ocultas.
            </p>

            <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                      "relative bg-card rounded-2xl p-8 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl border-2 hover:border-primary",
                      plan.popular
                        ? "border-primary/50 shadow-soft ring-2 ring-primary/20"
                        : "border-transparent shadow-soft"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        Mais popular
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          plan.popular
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                    <div className="mb-6">
                      <motion.span
                        key={isAnnual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold"
                      >
                        {formatPrice(plan)}
                      </motion.span>
                      <span className="text-muted-foreground text-sm">{getPeriod(plan)}</span>
                      {isAnnual && !plan.isCustom && plan.monthlyPrice > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1"
                        >
                          <span className="text-sm text-muted-foreground line-through">
                            R$ {plan.monthlyPrice}/mês
                          </span>
                          <span className="text-sm text-accent ml-2 font-medium">
                            Economize R$ {(plan.monthlyPrice - plan.annualPrice) * 12}/ano
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <Button
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full mb-6"
                      asChild
                    >
                      <Link to="/signup">{plan.cta}</Link>
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-accent flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                          )}
                          <span
                            className={
                              feature.included ? "text-foreground" : "text-muted-foreground/60"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-xl shadow-soft border border-border"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-accent p-12 rounded-3xl text-white shadow-glow">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Comece gratuitamente hoje e descubra o poder dos agentes de IA personalizados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Começar grátis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/agents">Ver demonstração</Link>
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
