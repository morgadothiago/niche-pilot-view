import { motion } from 'framer-motion';

interface FloatingBallProps {
  size: number;
  colorClass: string;
  delay: number;
  x: string;
  y: string;
  blur?: boolean;
}

function FloatingBall({ size, colorClass, delay, x, y, blur = false }: FloatingBallProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 8 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div 
        className={`w-full h-full rounded-full transition-colors duration-500 ${colorClass} ${blur ? 'blur-xl' : ''}`}
      />
    </motion.div>
  );
}

export function HeroOrbs() {
  const balls = [
    // Large blurred background orbs
    { size: 300, colorClass: 'bg-primary/30', delay: 0, x: '5%', y: '10%', blur: true },
    { size: 250, colorClass: 'bg-accent/25', delay: 0.3, x: '75%', y: '5%', blur: true },
    { size: 200, colorClass: 'bg-primary/20', delay: 0.6, x: '85%', y: '50%', blur: true },
    { size: 280, colorClass: 'bg-accent/20', delay: 0.4, x: '0%', y: '60%', blur: true },
    
    // Smaller solid balls with glow
    { size: 60, colorClass: 'bg-primary opacity-70 shadow-[0_0_40px_hsl(var(--primary)/0.6)]', delay: 0.2, x: '15%', y: '25%', blur: false },
    { size: 40, colorClass: 'bg-accent opacity-70 shadow-[0_0_30px_hsl(var(--accent)/0.6)]', delay: 0.4, x: '85%', y: '20%', blur: false },
    { size: 50, colorClass: 'bg-gradient-to-br from-primary to-accent opacity-80 shadow-[0_0_35px_hsl(var(--primary)/0.5)]', delay: 0.5, x: '75%', y: '65%', blur: false },
    { size: 35, colorClass: 'bg-gradient-to-br from-accent to-primary opacity-70 shadow-[0_0_25px_hsl(var(--accent)/0.5)]', delay: 0.7, x: '10%', y: '70%', blur: false },
    { size: 25, colorClass: 'bg-primary opacity-60 shadow-[0_0_20px_hsl(var(--primary)/0.5)]', delay: 0.8, x: '45%', y: '15%', blur: false },
    { size: 30, colorClass: 'bg-accent opacity-60 shadow-[0_0_20px_hsl(var(--accent)/0.5)]', delay: 0.9, x: '55%', y: '75%', blur: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {balls.map((ball, index) => (
        <FloatingBall key={index} {...ball} />
      ))}
    </div>
  );
}
