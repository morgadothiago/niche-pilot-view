import { motion } from 'framer-motion';
import { Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanChangeAnimationProps {
  fromPlan: string;
  toPlan: string;
  isVisible: boolean;
}

const planConfig: Record<string, { name: string; icon: React.ElementType; color: string; bgColor: string }> = {
  free: { name: 'Free', icon: Sparkles, color: 'text-muted-foreground', bgColor: 'bg-muted' },
  pro: { name: 'Pro', icon: Zap, color: 'text-primary', bgColor: 'bg-primary/10' },
  custom: { name: 'Enterprise', icon: Crown, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
};

export function PlanChangeAnimation({ fromPlan, toPlan, isVisible }: PlanChangeAnimationProps) {
  const from = planConfig[fromPlan] || planConfig.free;
  const to = planConfig[toPlan] || planConfig.pro;
  const FromIcon = from.icon;
  const ToIcon = to.icon;

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-6">
        {/* From Plan */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: -20, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn('w-24 h-24 rounded-2xl flex items-center justify-center', from.bgColor)}
        >
          <FromIcon className={cn('w-12 h-12', from.color)} />
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ArrowRight className="w-8 h-8 text-muted-foreground" />
        </motion.div>

        {/* To Plan */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
          className={cn('w-24 h-24 rounded-2xl flex items-center justify-center', to.bgColor)}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ToIcon className={cn('w-12 h-12', to.color)} />
          </motion.div>
        </motion.div>
      </div>

      {/* Celebration particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              x: `${50 + (Math.random() - 0.5) * 100}%`, 
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 1,
              delay: 0.8 + i * 0.05,
              ease: 'easeOut'
            }}
            className={cn(
              'absolute w-3 h-3 rounded-full',
              i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-amber-500' : 'bg-green-500'
            )}
          />
        ))}
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-1/3 text-xl font-semibold"
      >
        Bem-vindo ao plano {to.name}! 🎉
      </motion.p>
    </motion.div>
  );
}
