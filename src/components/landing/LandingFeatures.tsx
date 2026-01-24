import { motion } from "framer-motion";
import { Bot, Brain, MessageSquare, Shield, Zap, Sparkles } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Agentes Personalizados",
    description:
      "Crie agentes de IA com personalidades únicas para cada necessidade do seu negócio.",
  },
  {
    icon: Brain,
    title: "Inteligência Contextual",
    description: "Nossos agentes entendem o contexto e mantêm conversas naturais e relevantes.",
  },
  {
    icon: MessageSquare,
    title: "Múltiplos Canais",
    description: "Integre com WhatsApp, Telegram, website e muito mais em um só lugar.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Dados criptografados e proteção de ponta a ponta para sua tranquilidade.",
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description: "Atendimento 24/7 com respostas em milissegundos para seus clientes.",
  },
  {
    icon: Sparkles,
    title: "Aprendizado Contínuo",
    description: "Os agentes aprendem e melhoram automaticamente com cada interação.",
  },
];

export function LandingFeatures() {
  return (
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
            Tudo que você precisa para{" "}
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
  );
}
