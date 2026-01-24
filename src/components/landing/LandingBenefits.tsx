import { motion } from "framer-motion";
import { Check, Bot } from "lucide-react";

const benefits = [
  "Reduza custos de atendimento em até 80%",
  "Atendimento disponível 24 horas por dia",
  "Escalabilidade ilimitada",
  "Integração com suas ferramentas favoritas",
  "Análises e insights em tempo real",
  "Suporte técnico especializado",
];

export function LandingBenefits() {
  return (
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
              Por que escolher nossa{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                plataforma?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8">
              Milhares de empresas já transformaram seu atendimento com nossos agentes de IA.
              Descubra as vantagens que fazem a diferença.
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
  );
}
