import { apiClient } from "./apiClient";
import { User, Agent, Subscription, ApiResponse } from "../types";

export interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  activeSubscriptions: number;
}

export const adminService = {
  getStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
    return response.data.data;
  },

  getUsers: async (page = 1, limit = 10): Promise<{ users: User[]; total: number }> => {
    const response = await apiClient.get<ApiResponse<{ users: User[]; total: number }>>(
      "/admin/users",
      { params: { page, limit } }
    );
    return response.data.data;
  },

  getAllAgents: async (page = 1, limit = 10): Promise<{ agents: Agent[]; total: number }> => {
    const response = await apiClient.get<ApiResponse<{ agents: Agent[]; total: number }>>(
      "/admin/agents",
      { params: { page, limit } }
    );
    return response.data.data;
  },

  getAllSubscriptions: async (
    page = 1,
    limit = 10
  ): Promise<{ subscriptions: Subscription[]; total: number }> => {
    const response = await apiClient.get<
      ApiResponse<{ subscriptions: Subscription[]; total: number }>
    >("/admin/subscriptions", { params: { page, limit } });
    return response.data.data;
  },

  updateUserRole: async (userId: string, role: "user" | "admin"): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/admin/users/${userId}/role`, {
      role,
    });
    return response.data.data;
  },
};
