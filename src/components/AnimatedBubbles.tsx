import { motion } from 'framer-motion';

interface BubbleProps {
  size: number;
  x: string;
  y: string;
  delay: number;
  isPrimary: boolean;
}

function Bubble({ size, x, y, delay, isPrimary }: BubbleProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${
        isPrimary ? 'bg-primary/20' : 'bg-accent/20'
      }`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.15, 0.9, 1.1, 0.95, 1],
        opacity: [0.3, 0.6, 0.4, 0.5, 0.35, 0.4],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {/* Inner glow */}
      <motion.div
        className={`absolute inset-2 rounded-full ${
          isPrimary ? 'bg-primary/30' : 'bg-accent/30'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          delay: delay + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Highlight */}
      <div
        className="absolute w-1/3 h-1/3 rounded-full bg-white/20 top-2 left-2"
        style={{ filter: 'blur(2px)' }}
      />
    </motion.div>
  );
}

export function AnimatedBubbles() {
  const bubbles = [
    { size: 80, x: '8%', y: '15%', delay: 0, isPrimary: true },
    { size: 50, x: '85%', y: '20%', delay: 0.5, isPrimary: false },
    { size: 65, x: '75%', y: '65%', delay: 1, isPrimary: true },
    { size: 45, x: '12%', y: '70%', delay: 1.5, isPrimary: false },
    { size: 35, x: '45%', y: '12%', delay: 0.8, isPrimary: true },
    { size: 55, x: '55%', y: '80%', delay: 1.2, isPrimary: false },
    { size: 40, x: '92%', y: '45%', delay: 0.3, isPrimary: true },
    { size: 30, x: '3%', y: '45%', delay: 1.8, isPrimary: false },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </div>
  );
}
