import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroOrbs } from "@/components/HeroOrbs";
import { AnimatedNicheText } from "@/components/AnimatedNicheText";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
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
          O assistente perfeito para{" "}
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
          Crie agentes de IA personalizados que entendem seu negócio e atendem seus clientes 24/7
          com respostas precisas e naturais.
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
  );
}
