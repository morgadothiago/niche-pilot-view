import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

export interface Subscription {
  id: string;
  user_id: string;
  plan: "free" | "pro" | "custom";
  status: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

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
      // Variáveis de ambiente para teste rápido da UI
      const testPlan = import.meta.env.VITE_TEST_PLAN as Subscription["plan"];
      const testCredits = Number(import.meta.env.VITE_TEST_CREDITS);

      // Default subscription for now
      setSubscription({
        id: "default",
        user_id: user.id,
        plan: testPlan || "free",
        status: "active",
        credits: !isNaN(testCredits) ? testCredits : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
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
