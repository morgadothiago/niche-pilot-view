import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address").optional(), // Usually email is read-only or requires separate flow
  avatar_url: z.string().optional(),
});

export const agentSchema = z.object({
  name: z.string().min(3, "Agent name must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "training"]).default("active"),
  config: z.record(z.unknown()).optional(),
});

export const buyCreditsSchema = z.object({
  amount: z.number().min(10, "Minimum purchase is $10").max(1000, "Maximum purchase is $1000"),
});

export const changePlanSchema = z.object({
  planId: z.string().min(1, "Please select a plan"),
});
