import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Escolha seu nicho",
    description:
      "Selecione entre dezenas de especialidades ou crie um agente totalmente personalizado.",
  },
  {
    number: "02",
    title: "Configure a personalidade",
    description: "Defina tom de voz, conhecimentos específicos e comportamentos do seu agente.",
  },
  {
    number: "03",
    title: "Comece a conversar",
    description: "Seu agente está pronto! Integre onde quiser e comece a automatizar.",
  },
];

export function LandingSteps() {
  return (
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
            Como{" "}
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
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary dark:text-primary/80">
                  {step.number}
                </span>
              </div>
              <div className="pt-1 sm:pt-2 lg:pt-4">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
