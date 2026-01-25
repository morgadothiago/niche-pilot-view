import { apiClient } from "./apiClient";
import { Agent, ApiResponse } from "../types";

export const agentService = {
  getAgents: async (userId?: string): Promise<Agent[]> => {
    const response = await apiClient.get<Agent[] | ApiResponse<Agent[]>>("/api/agents", {
      params: userId ? { user_id: userId } : {},
    });
    console.log("getAgents response:", response.data);
    // Handle both wrapped and unwrapped responses
    if (Array.isArray(response.data)) return response.data;
    return (response.data as ApiResponse<Agent[]>).data || [];
  },

  getAgent: async (id: string): Promise<Agent> => {
    const response = await apiClient.get<Agent | ApiResponse<Agent>>(`/api/agents/${id}`);
    console.log("getAgent response:", response.data);
    const data = response.data;
    return (data as ApiResponse<Agent>).data || (data as Agent);
  },

  createAgent: async (data: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.post<Agent | ApiResponse<Agent>>("/api/agents", data);
    console.log("createAgent response:", response.data);
    const responseData = response.data;
    return (responseData as ApiResponse<Agent>).data || (responseData as Agent);
  },

  updateAgent: async (id: string, data: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.patch<Agent | ApiResponse<Agent>>(`/api/agents/${id}`, data);
    console.log("updateAgent response:", response.data);
    const responseData = response.data;
    return (responseData as ApiResponse<Agent>).data || (responseData as Agent);
  },

  deleteAgent: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/agents/${id}`);
  },
};
