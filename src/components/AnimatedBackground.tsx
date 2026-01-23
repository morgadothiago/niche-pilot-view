import { motion } from 'framer-motion';

interface FloatingOrbProps {
  size: number;
  color: string;
  delay: number;
  duration: number;
  initialX: string;
  initialY: string;
}

function FloatingOrb({ size, color, delay, duration, initialX, initialY }: FloatingOrbProps) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-40 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: initialX,
        top: initialY,
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        scale: [1, 1.1, 1, 0.95, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AnimatedBackground() {
  const orbs = [
    { size: 400, color: 'hsl(var(--primary) / 0.3)', delay: 0, duration: 8, initialX: '10%', initialY: '20%' },
    { size: 300, color: 'hsl(var(--accent) / 0.25)', delay: 1, duration: 10, initialX: '70%', initialY: '10%' },
    { size: 250, color: 'hsl(var(--primary) / 0.2)', delay: 2, duration: 12, initialX: '80%', initialY: '60%' },
    { size: 350, color: 'hsl(var(--accent) / 0.2)', delay: 0.5, duration: 9, initialX: '5%', initialY: '70%' },
    { size: 200, color: 'hsl(var(--primary) / 0.25)', delay: 1.5, duration: 11, initialX: '50%', initialY: '40%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {orbs.map((orb, index) => (
        <FloatingOrb key={index} {...orb} />
      ))}
    </div>
  );
}
