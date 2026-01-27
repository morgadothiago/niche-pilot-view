import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_API_URL || "https://api-saas-1.onrender.com";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (401, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear session if unauthorized and redirect to login
      localStorage.removeItem("auth_token");
      // Optional: Trigger a custom event or use a global state manager to handle redirection
      // window.location.href = '/login'; // Avoid direct window manipulation if possible, but safe fallback
    }
    return Promise.reject(error);
  }
);
