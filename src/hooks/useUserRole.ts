import { useAuth } from "@/contexts/AuthContext";

type AppRole = "admin" | "free";

interface UserRoleState {
  role: AppRole | null;
  isAdmin: boolean;
  isFree: boolean;
  loading: boolean;
}

export function useUserRole(): UserRoleState {
  const { user, loading } = useAuth();

  // Return null if user is not logged in, otherwise default to 'free' role
  const role: AppRole | null = user ? (user.role as AppRole) || "free" : null;

  return {
    role,
    isAdmin: role === "admin",
    isFree: role === "free",
    loading,
  };
}
