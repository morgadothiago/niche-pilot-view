import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Palette,
  MessageSquare,
  CreditCard,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Bem-vindo ao ThinkFlow! 👋",
    description:
      "Crie agentes de IA personalizados que entendem seu negócio e atendem seus clientes 24/7.",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Personalize as Cores",
    description:
      "Use o seletor de paleta no canto superior direito para escolher as cores que combinam com sua marca.",
    icon: <Palette className="w-8 h-8" />,
    highlight: "palette",
  },
  {
    id: 3,
    title: "Agentes Especializados",
    description:
      "Crie agentes para diferentes nichos: vendas, suporte, marketing, fitness e muito mais!",
    icon: <MessageSquare className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Planos Flexíveis",
    description:
      "Escolha entre planos Free, Pro ou Personalizado. Economize 20% com planos anuais!",
    icon: <CreditCard className="w-8 h-8" />,
  },
  {
    id: 5,
    title: "Comece Agora!",
    description:
      'Clique em "Começar gratuitamente" para criar sua conta e seu primeiro agente de IA.',
    icon: <Zap className="w-8 h-8" />,
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per step

export function LandingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const autoplayTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current);
      autoplayTimeout.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!isAutoPlaying || !isOpen) return;

    clearTimers();
    setProgress(0);

    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearTimers();
      }
    }, 50);

    autoplayTimeout.current = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev < tutorialSteps.length - 1) {
          return prev + 1;
        } else {
          setIsAutoPlaying(false);
          return prev;
        }
      });
    }, AUTOPLAY_DURATION);
  }, [isAutoPlaying, isOpen, clearTimers]);

  useEffect(() => {
    if (isOpen && isAutoPlaying) {
      startAutoplay();
    }
    return clearTimers;
  }, [currentStep, isOpen, isAutoPlaying, startAutoplay, clearTimers]);

  useEffect(() => {
    const seen = localStorage.getItem("landing-tutorial-seen");
    if (!seen) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleClose = () => {
    clearTimers();
    setIsOpen(false);
    localStorage.setItem("landing-tutorial-seen", "true");
    setHasSeenTutorial(true);
  };

  const handleNext = () => {
    clearTimers();
    setProgress(0);
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    clearTimers();
    setProgress(0);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsAutoPlaying(true);
    setProgress(0);
    setIsOpen(true);
  };

  const toggleAutoplay = () => {
    if (isAutoPlaying) {
      clearTimers();
      setIsAutoPlaying(false);
    } else {
      setIsAutoPlaying(true);
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <>
      {/* Tutorial trigger button - only shows after tutorial has been seen */}
      {hasSeenTutorial && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center text-white hover:scale-110 transition-transform"
          onClick={handleRestart}
          title="Ver tutorial"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}

      {/* Tutorial modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md"
            >
              <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                {/* Header */}
                <div className="relative gradient-primary p-6 pb-12">
                  {/* Step indicator with progress */}
                  <div className="flex gap-1.5 mb-4 pr-10">
                    {tutorialSteps.map((_, index) => (
                      <div
                        key={index}
                        className="h-1.5 flex-1 rounded-full bg-white/30 overflow-hidden"
                      >
                        {index < currentStep ? (
                          <div className="h-full w-full bg-white rounded-full" />
                        ) : index === currentStep ? (
                          <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.05, ease: "linear" }}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="text-white/80 text-sm">
                    Passo {currentStep + 1} de {tutorialSteps.length}
                  </div>

                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Icon badge */}
                <div className="relative -mt-8 flex justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ scale: 0.5, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.5, opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.4,
                      }}
                      className="w-16 h-16 rounded-2xl bg-card border-4 border-card shadow-lg flex items-center justify-center text-primary"
                    >
                      {step.icon}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-6 pt-4 text-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                      transition={{
                        duration: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <Button variant="hero" onClick={handleNext} className="flex-1">
                    {currentStep === tutorialSteps.length - 1 ? (
                      "Começar!"
                    ) : (
                      <>
                        Próximo
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
