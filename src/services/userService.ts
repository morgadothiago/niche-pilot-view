import { apiClient } from "./apiClient";
import { User, ApiResponse } from "../types";

export const userService = {
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>("/users/me", data);
    return response.data.data;
  },

  uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await apiClient.post<ApiResponse<{ avatar_url: string }>>(
      "/users/me/avatar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },
};
