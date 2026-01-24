import { apiClient } from "./apiClient";
import { Subscription, Plan, ApiResponse } from "../types";

export const subscriptionService = {
  getSubscription: async (): Promise<Subscription> => {
    const response = await apiClient.get<ApiResponse<Subscription>>("/subscription/me");
    return response.data.data;
  },

  getPlans: async (): Promise<Plan[]> => {
    const response = await apiClient.get<ApiResponse<Plan[]>>("/plans");
    return response.data.data;
  },

  changePlan: async (planId: string): Promise<Subscription> => {
    const response = await apiClient.post<ApiResponse<Subscription>>("/subscription/change-plan", {
      planId,
    });
    return response.data.data;
  },

  buyCredits: async (amount: number): Promise<{ credits_added: number; new_balance: number }> => {
    const response = await apiClient.post<
      ApiResponse<{ credits_added: number; new_balance: number }>
    >("/subscription/buy-credits", { amount });
    return response.data.data;
  },
};
