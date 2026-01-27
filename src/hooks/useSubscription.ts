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
      const data = await subscriptionService.getSubscription();

      // Permitir overrides via env vars para teste
      const testPlan = import.meta.env.VITE_TEST_PLAN;
      const testCredits = Number(import.meta.env.VITE_TEST_CREDITS);

      setSubscription({
        ...data,
        plan: testPlan || data.plan,
        credits: !isNaN(testCredits) ? testCredits : data.credits,
      } as Subscription);
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
