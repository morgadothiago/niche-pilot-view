import { apiClient } from "./apiClient";
import { Agent, ApiResponse } from "../types";

export const agentService = {
  getAgents: async (): Promise<Agent[]> => {
    const response = await apiClient.get<ApiResponse<Agent[]>>("/agents");
    return response.data.data;
  },

  getAgent: async (id: string): Promise<Agent> => {
    const response = await apiClient.get<ApiResponse<Agent>>(`/agents/${id}`);
    return response.data.data;
  },

  createAgent: async (data: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.post<ApiResponse<Agent>>("/agents", data);
    return response.data.data;
  },

  updateAgent: async (id: string, data: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.patch<ApiResponse<Agent>>(`/agents/${id}`, data);
    return response.data.data;
  },

  deleteAgent: async (id: string): Promise<void> => {
    await apiClient.delete(`/agents/${id}`);
  },
};
