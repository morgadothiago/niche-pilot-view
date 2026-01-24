import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Silva",
    role: "CEO",
    company: "TechStart Brasil",
    avatar: "👩‍💼",
    content:
      "Os agentes de IA transformaram completamente nosso atendimento ao cliente. Reduzimos o tempo de resposta em 80% e a satisfação dos clientes aumentou significativamente.",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Diretor de Marketing",
    company: "Agência Digital Pro",
    avatar: "👨‍💻",
    content:
      "Incrível como a plataforma é intuitiva. Em poucos minutos configurei agentes personalizados para diferentes campanhas. O ROI foi impressionante!",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    role: "Fundadora",
    company: "E-commerce Plus",
    avatar: "👩‍🚀",
    content:
      "A melhor decisão que tomamos foi implementar os agentes de IA. Nosso suporte funciona 24/7 e as vendas aumentaram 40% no primeiro mês.",
    rating: 5,
  },
  {
    name: "Roberto Alves",
    role: "CTO",
    company: "FinTech Solutions",
    avatar: "👨‍🔬",
    content:
      "A segurança e a personalização são excepcionais. Conseguimos integrar com todos os nossos sistemas existentes sem problemas.",
    rating: 5,
  },
  {
    name: "Juliana Santos",
    role: "Head de Produto",
    company: "SaaS Company",
    avatar: "👩‍💻",
    content:
      "O suporte da equipe é fantástico e a plataforma evolui constantemente. Já recomendei para várias empresas do nosso grupo.",
    rating: 5,
  },
  {
    name: "Fernando Lima",
    role: "Empreendedor",
    company: "Startup Hub",
    avatar: "🧑‍💼",
    content:
      "Como startup, precisávamos de uma solução escalável e acessível. Encontramos tudo isso aqui, além de uma experiência incrível.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card p-6 rounded-2xl shadow-soft border border-border hover:shadow-medium transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground truncate">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
        <Quote className="w-8 h-8 text-primary/20 flex-shrink-0 group-hover:text-primary/40 transition-colors" />
      </div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 10.000 empresas já transformaram seus negócios com nossos agentes de IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10,000+", label: "Empresas ativas" },
            { value: "50M+", label: "Mensagens processadas" },
            { value: "99.9%", label: "Uptime garantido" },
            { value: "4.9/5", label: "Avaliação média" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
