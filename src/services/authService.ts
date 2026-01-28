import { apiClient } from "./apiClient";
import { Session, User } from "../types";

// Response types from API
interface LoginResponse {
  user: {
    id: string;
    email: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string | null;
    };
  };
  token: string;
}

interface ProfileResponse {
  user: {
    id: string;
    email: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string | null;
    };
  };
}

// Helper to decode JWT and extract role
function decodeJwtRole(token: string): "admin" | "free" {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.role?.toLowerCase() === "admin" ? "admin" : "free";
  } catch {
    return "free";
  }
}

export const authService = {
  signIn: async (email: string, password: string): Promise<Session> => {
    const response = await apiClient.post<LoginResponse>("/api/auth/login", { email, password });
    const { user, token } = response.data;
    const role = decodeJwtRole(token);

    return {
      user: { ...user },
      access_token: token,
    };
  },

  signUp: async (email: string, password: string, fullName: string): Promise<Session> => {
    const response = await apiClient.post<LoginResponse>("/api/auth/register", {
      email,
      password,
      full_name: fullName,
    });
    const { user, token } = response.data;
    const role = decodeJwtRole(token);

    return {
      user: { ...user },
      access_token: token,
    };
  },

  signInWithGoogle: async (googleToken: string): Promise<Session> => {
    const response = await apiClient.post<LoginResponse>("/api/auth/google", {
      google_token: googleToken,
    });
    const { user, token } = response.data;

    return {
      user: { ...user },
      access_token: token,
    };
  },

  signOut: async (): Promise<void> => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch {
      // Ignore logout errors
    }
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ProfileResponse>("/api/auth/me");

    return {
      ...response.data.user,
    };
  },
};
