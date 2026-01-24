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
      // TODO: Replace with your API call
      // const response = await fetch(`/api/subscriptions/${user.id}`);
      // const data = await response.json();
      // setSubscription(data);

      // Default subscription for now
      setSubscription({
        id: "default",
        user_id: user.id,
        plan: "free",
        status: "active",
        credits: 0,
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
