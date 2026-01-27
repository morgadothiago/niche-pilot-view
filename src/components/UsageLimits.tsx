import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Bot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from "@/types";

interface UsageLimitsProps {
  className?: string;
}

export function UsageLimits({ className }: UsageLimitsProps) {
  const { user } = useAuth();
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

  const userPlan = user?.plan?.toLowerCase();
  const subPlanName =
    typeof subscription?.plan === "string"
      ? subscription.plan.toLowerCase()
      : (subscription?.plan as Plan | undefined)?.name?.toLowerCase();

  const plan = userPlan || subPlanName || "free";
  const credits = subscription?.credits || 0;

  // Define limits based on plan
  const limits = {
    free: { messages: 100, agents: 3, credits: 50 },
    pro: { messages: -1, agents: -1, credits: 1500 }, // -1 = unlimited
    elite: { messages: -1, agents: -1, credits: 5000 },
    custom: { messages: -1, agents: -1, credits: 5000 },
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
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 70) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
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
              indicatorClassName={getProgressColor(
                getPercentage(usage.messages, currentLimits.messages)
              )}
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
            <Progress
              value={getPercentage(usage.agents, currentLimits.agents)}
              className="h-2"
              indicatorClassName={getProgressColor(
                getPercentage(usage.agents, currentLimits.agents)
              )}
            />
          )}
        </div>

        {/* Credits */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Créditos de uso</span>
            </div>
            <span className="text-sm font-medium text-accent">
              {credits}/{currentLimits.credits}
            </span>
          </div>
          <Progress
            value={getPercentage(currentLimits.credits - credits, currentLimits.credits)}
            className="h-2"
            indicatorClassName={getProgressColor(
              getPercentage(currentLimits.credits - credits, currentLimits.credits)
            )}
          />
        </div>
      </div>
    </div>
  );
}
