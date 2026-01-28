import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import {
  Bot,
  Brain,
  Sparkles,
  Cpu,
  Zap,
  Globe,
  MessageSquare,
  Search,
  LucideIcon,
} from "lucide-react";

interface FloatingBallProps {
  size: number;
  isPrimary: boolean;
  delay: number;
  x: string;
  y: string;
  blur?: boolean;
  opacity?: number;
  icon?: LucideIcon;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth: number;
}

function FloatingBall({
  size,
  isPrimary,
  delay,
  x,
  y,
  blur = false,
  opacity = 0.6,
  icon: Icon,
  mouseX,
  mouseY,
  depth,
}: FloatingBallProps) {
  // Parallax effect based on mouse position and depth
  const xMotion = useTransform(
    mouseX,
    (val: number) => (val - window.innerWidth / 2) * depth * 0.05
  );
  const yMotion = useTransform(
    mouseY,
    (val: number) => (val - window.innerHeight / 2) * depth * 0.05
  );

  // Smooth out the mouse movement
  const xSpring = useSpring(xMotion, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(yMotion, { stiffness: 50, damping: 20 });

  // Generate random organic movement parameters
  const durationX = 15 + Math.random() * 10;
  const durationY = 12 + Math.random() * 10;
  const durationRotate = 20 + Math.random() * 10; // Slower rotation

  // Random drift range
  const drift = blur ? 40 : 20;

  return (
    // Outer wrapper handles positioning, parallax, and entrance "pop"
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        x: xSpring,
        y: ySpring,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay, // Staggered pop entrance
      }}
    >
      {/* Inner container handles visual styles, breathing, and organic drift */}
      <motion.div
        className={`w-full h-full rounded-full flex items-center justify-center ${
          blur ? "blur-3xl" : "shadow-lg border border-white/20 backdrop-blur-[2px]"
        }`}
        style={{
          background: isPrimary
            ? `linear-gradient(135deg, hsl(var(--primary) / ${blur ? "0.2" : "0.8"}), hsl(var(--primary) / ${blur ? "0.05" : "0.4"}))`
            : `linear-gradient(135deg, hsl(var(--accent) / ${blur ? "0.2" : "0.8"}), hsl(var(--accent) / ${blur ? "0.05" : "0.4"}))`,
          boxShadow: blur
            ? "none"
            : "inset 0 2px 10px 0 rgba(255, 255, 255, 0.15), 0 10px 40px -10px rgba(0, 0, 0, 0.4)",
        }}
        animate={{
          opacity: [opacity, opacity * 0.8, opacity], // Breathing opacity
          scale: [1, 0.98, 1], // Breathing scale
          translateX: [0, drift, 0, -drift, 0], // Organic drift X
          translateY: [0, -drift, 0, drift, 0], // Organic drift Y
          rotate: Icon ? [0, 5, -5, 0] : 0, // Very subtle rotation for container
        }}
        transition={{
          opacity: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
          translateX: { duration: durationX, repeat: Infinity, ease: "easeInOut" },
          translateY: { duration: durationY, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: durationRotate, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {Icon && !blur && (
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
              y: [0, -2, 0, 2, 0], // Icon floats slightly inside the bubble
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon
              className="text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              size={size * 0.5}
              strokeWidth={1.5}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function HeroOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initialize
    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  const balls = [
    // Large blurred background orbs - Low depth (move slowly)
    {
      size: 500,
      isPrimary: true,
      delay: 0,
      x: "5%",
      y: "10%",
      blur: true,
      opacity: 0.25,
      depth: 0.2,
    },
    {
      size: 400,
      isPrimary: false,
      delay: 0.3,
      x: "70%",
      y: "5%",
      blur: true,
      opacity: 0.2,
      depth: 0.3,
    },
    {
      size: 350,
      isPrimary: true,
      delay: 0.6,
      x: "80%",
      y: "55%",
      blur: true,
      opacity: 0.2,
      depth: 0.25,
    },
    {
      size: 450,
      isPrimary: false,
      delay: 0.4,
      x: "-5%",
      y: "60%",
      blur: true,
      opacity: 0.2,
      depth: 0.35,
    },

    // Smaller solid balls with icons - High depth (move more with mouse)
    {
      size: 64,
      isPrimary: true,
      delay: 0.2,
      x: "12%",
      y: "30%",
      blur: false,
      opacity: 0.9,
      icon: Bot,
      depth: 1.2,
    },
    {
      size: 48,
      isPrimary: false,
      delay: 0.4,
      x: "88%",
      y: "25%",
      blur: false,
      opacity: 0.9,
      icon: Brain,
      depth: 1.5,
    },
    {
      size: 56,
      isPrimary: true,
      delay: 0.5,
      x: "78%",
      y: "70%",
      blur: false,
      opacity: 0.8,
      icon: Sparkles,
      depth: 1.1,
    },
    {
      size: 40,
      isPrimary: false,
      delay: 0.7,
      x: "8%",
      y: "75%",
      blur: false,
      opacity: 0.8,
      icon: Cpu,
      depth: 1.3,
    },
    {
      size: 32,
      isPrimary: true,
      delay: 0.8,
      x: "42%",
      y: "12%",
      blur: false,
      opacity: 0.7,
      icon: Zap,
      depth: 1.8,
    },
    {
      size: 36,
      isPrimary: false,
      delay: 0.9,
      x: "58%",
      y: "85%",
      blur: false,
      opacity: 0.7,
      icon: Globe,
      depth: 1.4,
    },
    {
      size: 28,
      isPrimary: true,
      delay: 1.1,
      x: "25%",
      y: "65%",
      blur: false,
      opacity: 0.6,
      icon: MessageSquare,
      depth: 1.6,
    },
    {
      size: 44,
      isPrimary: false,
      delay: 1.2,
      x: "15%",
      y: "15%",
      blur: false,
      opacity: 0.8,
      icon: Search,
      depth: 1.25,
    },
  ];

  if (windowSize.width === 0) return null; // Wait for hydration/resize

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {balls.map((ball, index) => (
        <FloatingBall key={index} {...ball} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}
