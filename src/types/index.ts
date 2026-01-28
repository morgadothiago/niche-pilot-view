export interface User {
  id: string;
  email: string;
  plan?: "FREE" | "PRO" | "ELITE";
  role?: "free" | "admin";
  user_metadata?: {
    full_name?: string;
    avatar_url?: string | null;
  };
  created_at?: string;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  avatar: string;
  description?: string;
  prompt?: string;
  category?: string;
  type?: string;
  tone?: string;
  style?: string;
  focus?: string;
  rules?: string;
  visibility?: "PRIVATE" | "PUBLIC";
  status?: "active" | "inactive" | "training";
  created_at?: string;
  updated_at?: string;
  config?: Record<string, unknown>;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  credits_monthly: number;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  icon?: string;
  color?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "canceled" | "past_due";
  credits?: number;
  credits_limit?: number;
  messages_used?: number;
  messages_limit?: number;
  agents_used?: number;
  agents_limit?: number;
  current_period_end?: string;
  created_at?: string;
  updated_at?: string;
  plan?: string | Plan;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
