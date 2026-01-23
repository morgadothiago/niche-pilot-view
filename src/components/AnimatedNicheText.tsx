import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NicheWord {
  text: string;
  color: string;
}

const niches: NicheWord[] = [
  { text: 'Marketing', color: 'hsl(243, 75%, 59%)' },      // Índigo
  { text: 'Vendas', color: 'hsl(187, 92%, 45%)' },         // Cyan
  { text: 'Jurídico', color: 'hsl(270, 70%, 60%)' },       // Violeta
  { text: 'Finanças', color: 'hsl(160, 84%, 39%)' },       // Esmeralda
  { text: 'Suporte', color: 'hsl(25, 95%, 53%)' },         // Laranja
  { text: 'RH', color: 'hsl(340, 82%, 52%)' },             // Rosa
  { text: 'Tech', color: 'hsl(217, 91%, 60%)' },           // Azul
];

export function AnimatedNicheText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % niches.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const currentNiche = niches[currentIndex];

  return (
    <span className="relative inline-block min-w-[200px] md:min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentNiche.text}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block font-bold"
          style={{ 
            color: currentNiche.color,
            textShadow: `0 0 40px ${currentNiche.color}40`,
          }}
        >
          {currentNiche.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
