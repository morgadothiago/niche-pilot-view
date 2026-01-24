import { useSubscription } from "@/hooks/useSubscription";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Bot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageLimitsProps {
  className?: string;
}

export function UsageLimits({ className }: UsageLimitsProps) {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div
        className={cn(
          "bg-card rounded-xl p-4 lg:p-6 shadow-soft border border-border animate-pulse",
          className
        )}
      >
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
      </div>
    );
  }

  const plan = subscription?.plan || "free";
  const credits = subscription?.credits || 0;

  // Define limits based on plan
  const limits = {
    free: { messages: 100, agents: 3, credits: 50 },
    pro: { messages: -1, agents: -1, credits: 500 }, // -1 = unlimited
    custom: { messages: -1, agents: -1, credits: 1000 },
  };

  const currentLimits = limits[plan as keyof typeof limits] || limits.free;

  // Mock usage data (in production, this would come from the backend)
  const usage = {
    messages: 42,
    agents: 2,
  };

  const getPercentage = (used: number, limit: number) => {
    if (limit === -1) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-primary";
  };

  return (
    <div
      className={cn("bg-card rounded-xl p-4 lg:p-6 shadow-soft border border-border", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm lg:text-base">Limites de Uso</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
          Plano {plan}
        </span>
      </div>

      <div className="space-y-4">
        {/* Messages */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Mensagens/mês</span>
            </div>
            <span className="text-sm font-medium">
              {currentLimits.messages === -1 ? (
                <span className="text-accent">Ilimitado</span>
              ) : (
                `${usage.messages}/${currentLimits.messages}`
              )}
            </span>
          </div>
          {currentLimits.messages !== -1 && (
            <Progress
              value={getPercentage(usage.messages, currentLimits.messages)}
              className="h-2"
            />
          )}
        </div>

        {/* Agents */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Agentes ativos</span>
            </div>
            <span className="text-sm font-medium">
              {currentLimits.agents === -1 ? (
                <span className="text-accent">Ilimitado</span>
              ) : (
                `${usage.agents}/${currentLimits.agents}`
              )}
            </span>
          </div>
          {currentLimits.agents !== -1 && (
            <Progress value={getPercentage(usage.agents, currentLimits.agents)} className="h-2" />
          )}
        </div>

        {/* Credits */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Créditos disponíveis</span>
            </div>
            <span className="text-sm font-medium text-accent">{credits}</span>
          </div>
          <Progress value={getPercentage(credits, currentLimits.credits)} className="h-2" />
        </div>
      </div>
    </div>
  );
}
