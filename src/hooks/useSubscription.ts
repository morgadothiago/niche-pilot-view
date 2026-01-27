import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionService } from "@/services/subscriptionService";
import { Subscription } from "@/types";

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const data = await subscriptionService.getSubscription(user.id);

      // Log detalhado para diagnóstico
      const envPlan = import.meta.env.VITE_TEST_PLAN;
      const envCredits = import.meta.env.VITE_TEST_CREDITS;
      const envLimit = import.meta.env.VITE_TEST_LIMIT;

      const testPlan = envPlan;
      const testCredits = envCredits !== undefined && envCredits !== "" ? Number(envCredits) : NaN;

      const finalSub = {
        ...(data || {}),
        plan: testPlan || data?.plan || "free",
        credits: !isNaN(testCredits) ? testCredits : (data?.credits ?? 0),
      } as Subscription;

      setSubscription(finalSub);
    } catch (error: unknown) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const refetch = () => {
    setLoading(true);
    fetchSubscription();
  };

  return { subscription, loading, refetch };
}
