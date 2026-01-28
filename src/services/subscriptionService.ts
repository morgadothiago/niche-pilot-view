import { apiClient } from "./apiClient";
import { Subscription, Plan, CreditPackage, ApiResponse } from "../types";

export const subscriptionService = {
  getSubscription: async (userId?: string): Promise<Subscription> => {
    const endpoint = userId ? `/api/subscriptions/${userId}` : "/api/subscriptions/me";
    const response = await apiClient.get<Subscription | ApiResponse<Subscription>>(endpoint);
    // Retorna data.data se for o padrão ApiResponse, senão o objeto direto
    return (response.data as ApiResponse<Subscription>).data || (response.data as Subscription);
  },

  getPlans: async (): Promise<Plan[]> => {
    const response = await apiClient.get<ApiResponse<Plan[]>>("/api/plans");
    return response.data.data;
  },

  changePlan: async (planId: string): Promise<Subscription> => {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      "/api/subscriptions/change-plan",
      {
        planId,
      }
    );
    return response.data.data;
  },

  buyCredits: async (
    packageId: string
  ): Promise<{ credits_added: number; new_balance: number }> => {
    const response = await apiClient.post<
      ApiResponse<{ credits_added: number; new_balance: number }>
    >("/api/subscriptions/buy-credits", { package_id: packageId });
    return response.data.data;
  },

  getCreditPackages: async (): Promise<CreditPackage[]> => {
    const response = await apiClient.get<ApiResponse<CreditPackage[]>>("/api/credit-packages");
    return response.data.data;
  },
};
