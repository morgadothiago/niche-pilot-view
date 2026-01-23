import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NicheWord {
  text: string;
  colorVar: string;
}

const niches: NicheWord[] = [
  { text: 'Marketing', colorVar: 'hsl(var(--primary))' },
  { text: 'Vendas', colorVar: 'hsl(var(--accent))' },
  { text: 'Jurídico', colorVar: 'hsl(var(--primary) / 0.85)' },
  { text: 'Finanças', colorVar: 'hsl(var(--accent) / 0.9)' },
  { text: 'Suporte', colorVar: 'hsl(var(--primary))' },
  { text: 'RH', colorVar: 'hsl(var(--accent))' },
  { text: 'Tech', colorVar: 'hsl(var(--primary) / 0.9)' },
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
  const isPrimary = currentIndex % 2 === 0;

  return (
    <span className="relative inline-block min-w-[200px] md:min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentNiche.text}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`inline-block font-bold ${isPrimary ? 'text-primary' : 'text-accent'}`}
          style={{ 
            textShadow: isPrimary 
              ? '0 0 40px hsl(var(--primary) / 0.4)' 
              : '0 0 40px hsl(var(--accent) / 0.4)',
          }}
        >
          {currentNiche.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
