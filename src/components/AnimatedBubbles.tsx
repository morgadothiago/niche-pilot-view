import { motion } from 'framer-motion';
import { Bot, Brain, Sparkles, MessageSquare, Cpu, Zap, Wand2, CircuitBoard } from 'lucide-react';

interface BubbleProps {
  size: number;
  x: string;
  y: string;
  delay: number;
  isPrimary: boolean;
  icon: React.ReactNode;
  label?: string;
}

function Bubble({ size, x, y, delay, isPrimary, icon, label }: BubbleProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none flex items-center justify-center ${
        isPrimary ? 'bg-primary/15' : 'bg-accent/15'
      } backdrop-blur-sm border ${
        isPrimary ? 'border-primary/20' : 'border-accent/20'
      }`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transition: 'background 0.8s ease, border-color 0.8s ease',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.1, 0.95, 1.05, 1],
        opacity: [0.3, 0.7, 0.5, 0.6, 0.5],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {/* Icon container */}
      <motion.div
        className={`${isPrimary ? 'text-primary' : 'text-accent'}`}
        style={{
          transition: 'color 0.8s ease',
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          delay: delay + 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>
      
      {/* Label tooltip */}
      {label && (
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground whitespace-nowrap opacity-0"
          animate={{
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 4,
            delay: delay + 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {label}
        </motion.div>
      )}
      
      {/* Inner glow ring */}
      <motion.div
        className={`absolute inset-2 rounded-full ${
          isPrimary ? 'bg-primary/10' : 'bg-accent/10'
        }`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          delay: delay + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

export function AnimatedBubbles() {
  const bubbles = [
    { 
      size: 80, 
      x: '8%', 
      y: '15%', 
      delay: 0, 
      isPrimary: true, 
      icon: <Bot className="w-8 h-8" />,
      label: 'Claude'
    },
    { 
      size: 70, 
      x: '85%', 
      y: '18%', 
      delay: 0.5, 
      isPrimary: false, 
      icon: <Sparkles className="w-7 h-7" />,
      label: 'ChatGPT'
    },
    { 
      size: 75, 
      x: '78%', 
      y: '65%', 
      delay: 1, 
      isPrimary: true, 
      icon: <Brain className="w-7 h-7" />,
      label: 'Gemini'
    },
    { 
      size: 65, 
      x: '10%', 
      y: '70%', 
      delay: 1.5, 
      isPrimary: false, 
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'Copilot'
    },
    { 
      size: 55, 
      x: '45%', 
      y: '8%', 
      delay: 0.8, 
      isPrimary: true, 
      icon: <Cpu className="w-5 h-5" />,
      label: 'Llama'
    },
    { 
      size: 60, 
      x: '55%', 
      y: '82%', 
      delay: 1.2, 
      isPrimary: false, 
      icon: <Zap className="w-5 h-5" />,
      label: 'Mistral'
    },
    { 
      size: 50, 
      x: '92%', 
      y: '42%', 
      delay: 0.3, 
      isPrimary: true, 
      icon: <Wand2 className="w-5 h-5" />,
      label: 'Perplexity'
    },
    { 
      size: 45, 
      x: '3%', 
      y: '45%', 
      delay: 1.8, 
      isPrimary: false, 
      icon: <CircuitBoard className="w-4 h-4" />,
      label: 'Grok'
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </div>
  );
}
