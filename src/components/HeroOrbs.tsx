import { motion } from "framer-motion";

interface FloatingBallProps {
  size: number;
  isPrimary: boolean;
  delay: number;
  x: string;
  y: string;
  blur?: boolean;
  opacity?: number;
}

function FloatingBall({
  size,
  isPrimary,
  delay,
  x,
  y,
  blur = false,
  opacity = 0.6,
}: FloatingBallProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${blur ? "blur-2xl" : ""}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        opacity: opacity,
        background: isPrimary ? "hsl(var(--primary))" : "hsl(var(--accent))",
        transition: "background 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: opacity,
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
    />
  );
}

export function HeroOrbs() {
  const balls = [
    // Large blurred background orbs
    { size: 350, isPrimary: true, delay: 0, x: "5%", y: "10%", blur: true, opacity: 0.25 },
    { size: 280, isPrimary: false, delay: 0.3, x: "70%", y: "5%", blur: true, opacity: 0.2 },
    { size: 220, isPrimary: true, delay: 0.6, x: "80%", y: "55%", blur: true, opacity: 0.2 },
    { size: 300, isPrimary: false, delay: 0.4, x: "-5%", y: "60%", blur: true, opacity: 0.2 },

    // Smaller solid balls
    { size: 50, isPrimary: true, delay: 0.2, x: "12%", y: "30%", blur: false, opacity: 0.7 },
    { size: 35, isPrimary: false, delay: 0.4, x: "88%", y: "25%", blur: false, opacity: 0.7 },
    { size: 45, isPrimary: true, delay: 0.5, x: "78%", y: "70%", blur: false, opacity: 0.6 },
    { size: 30, isPrimary: false, delay: 0.7, x: "8%", y: "75%", blur: false, opacity: 0.6 },
    { size: 20, isPrimary: true, delay: 0.8, x: "42%", y: "18%", blur: false, opacity: 0.5 },
    { size: 25, isPrimary: false, delay: 0.9, x: "58%", y: "78%", blur: false, opacity: 0.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {balls.map((ball, index) => (
        <FloatingBall key={index} {...ball} />
      ))}
    </div>
  );
}
