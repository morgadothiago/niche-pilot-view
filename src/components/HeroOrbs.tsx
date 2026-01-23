import { motion } from 'framer-motion';

interface FloatingBallProps {
  size: number;
  color: string;
  delay: number;
  x: string;
  y: string;
  blur?: boolean;
}

function FloatingBall({ size, color, delay, x, y, blur = false }: FloatingBallProps) {
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
        className={`w-full h-full rounded-full ${blur ? 'blur-xl opacity-60' : 'opacity-80'}`}
        style={{
          background: color,
          boxShadow: blur ? 'none' : `0 0 40px ${color}`,
        }}
      />
    </motion.div>
  );
}

export function HeroOrbs() {
  const balls = [
    // Large blurred background orbs
    { size: 300, color: 'hsl(var(--primary) / 0.3)', delay: 0, x: '5%', y: '10%', blur: true },
    { size: 250, color: 'hsl(var(--accent) / 0.25)', delay: 0.3, x: '75%', y: '5%', blur: true },
    { size: 200, color: 'hsl(var(--primary) / 0.2)', delay: 0.6, x: '85%', y: '50%', blur: true },
    
    // Smaller solid balls with glow
    { size: 60, color: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%)', delay: 0.2, x: '15%', y: '25%', blur: false },
    { size: 40, color: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 100%)', delay: 0.4, x: '85%', y: '20%', blur: false },
    { size: 50, color: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)', delay: 0.5, x: '75%', y: '65%', blur: false },
    { size: 35, color: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)', delay: 0.7, x: '10%', y: '70%', blur: false },
    { size: 25, color: 'hsl(var(--primary))', delay: 0.8, x: '45%', y: '15%', blur: false },
    { size: 30, color: 'hsl(var(--accent))', delay: 0.9, x: '55%', y: '75%', blur: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {balls.map((ball, index) => (
        <FloatingBall key={index} {...ball} />
      ))}
    </div>
  );
}
