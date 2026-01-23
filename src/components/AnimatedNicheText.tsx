import { motion } from 'framer-motion';

export function AnimatedNicheText() {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="inline-block font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse-glow"
      style={{ 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      cada nicho
    </motion.span>
  );
}
