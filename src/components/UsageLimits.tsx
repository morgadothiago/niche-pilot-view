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

  const plan = subPlanName || userPlan || "free";

  // Get values from API (with fallbacks)
  const credits = subscription?.credits ?? 0;
  const creditsLimit = subscription?.credits_limit ?? 0;
  const messagesUsed = subscription?.messages_used ?? 0;
  const messagesLimit = subscription?.messages_limit ?? 0; // 0 or -1 = unlimited
  const agentsUsed = subscription?.agents_used ?? 0;
  const agentsLimit = subscription?.agents_limit ?? 0; // 0 or -1 = unlimited

  const getPercentage = (used: number, limit: number) => {
    if (limit <= 0) return 0; // unlimited
    return Math.min((used / limit) * 100, 100);
  };

  // For credits: calculate usage percentage (how much was consumed)
  const getCreditsUsagePercentage = () => {
    if (creditsLimit > 0) {
      // Has limit: show percentage of credits used
      return Math.min(((creditsLimit - credits) / creditsLimit) * 100, 100);
    }
    // No limit: use thresholds based on remaining credits
    // Assume 100 as a reference for visual display
    const referenceLimit = 100;
    const used = Math.max(0, referenceLimit - credits);
    return Math.min((used / referenceLimit) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 70) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Color based on credits remaining (for when there's no limit)
  const _getCreditsColor = () => {
    if (credits === 0) return "bg-red-500";
    if (credits <= 10) return "bg-orange-500";
    if (credits <= 25) return "bg-yellow-500";
    return "bg-green-500";
  };

  const isUnlimited = (limit: number) => limit <= 0;

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
              {isUnlimited(messagesLimit) ? (
                <span className="text-accent">Ilimitado</span>
              ) : (
                `${messagesUsed.toLocaleString()}/${messagesLimit.toLocaleString()}`
              )}
            </span>
          </div>
          {!isUnlimited(messagesLimit) && (
            <Progress
              value={getPercentage(messagesUsed, messagesLimit)}
              className="h-2"
              indicatorClassName={getProgressColor(getPercentage(messagesUsed, messagesLimit))}
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
              {isUnlimited(agentsLimit) ? (
                <span className="text-accent">Ilimitado</span>
              ) : (
                `${agentsUsed}/${agentsLimit}`
              )}
            </span>
          </div>
          {!isUnlimited(agentsLimit) && (
            <Progress
              value={getPercentage(agentsUsed, agentsLimit)}
              className="h-2"
              indicatorClassName={getProgressColor(getPercentage(agentsUsed, agentsLimit))}
            />
          )}
        </div>

        {/* Credits */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Créditos disponíveis</span>
            </div>
            <span className="text-sm font-medium">
              <span
                className={cn(
                  credits === 0
                    ? "text-red-500"
                    : getCreditsUsagePercentage() >= 90
                      ? "text-red-500"
                      : getCreditsUsagePercentage() >= 75
                        ? "text-orange-500"
                        : getCreditsUsagePercentage() >= 50
                          ? "text-yellow-500"
                          : "text-green-500"
                )}
              >
                {credits.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                {" "}
                / {creditsLimit > 0 ? creditsLimit.toLocaleString() : "100"}
              </span>
            </span>
          </div>
          <Progress
            value={getCreditsUsagePercentage()}
            className="h-2"
            indicatorClassName={getProgressColor(getCreditsUsagePercentage())}
          />
          {credits === 0 && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              Sem créditos! Recarregue para continuar usando.
            </p>
          )}
          {credits > 0 && credits <= 10 && (
            <p className="text-xs text-orange-500 mt-1">Créditos baixos. Considere recarregar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
