import { motion } from 'framer-motion';

export function AnimatedNicheText() {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="inline-block font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      style={{ 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.3))',
      }}
    >
      cada nicho
    </motion.span>
  );
}
