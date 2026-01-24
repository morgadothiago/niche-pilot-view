import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PricingToggle } from "@/components/PricingToggle";
import { PricingCards } from "@/components/PricingCards";

export function LandingCTA() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-accent p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-glow mb-10 sm:mb-12"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Pronto para revolucionar seu atendimento?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg opacity-90">
              Comece gratuitamente hoje e descubra como nossos agentes podem transformar seu
              negócio.
            </p>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <PricingCards isAnnual={isAnnual} compact />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button variant="link" asChild>
            <Link to="/pricing">Ver todos os detalhes dos planos →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
