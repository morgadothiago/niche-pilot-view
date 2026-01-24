import { apiClient } from "./apiClient";
import { Session, User, ApiResponse } from "../types";

export const authService = {
  signIn: async (email: string, password: string): Promise<Session> => {
    const response = await apiClient.post<ApiResponse<Session>>("/auth/login", { email, password });
    return response.data.data;
  },

  signUp: async (email: string, password: string, fullName: string): Promise<Session> => {
    const response = await apiClient.post<ApiResponse<Session>>("/auth/register", {
      email,
      password,
      full_name: fullName,
    });
    return response.data.data;
  },

  signOut: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");
    return response.data.data;
  },
};
