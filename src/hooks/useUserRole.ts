import { useAuth } from "@/contexts/AuthContext";

type AppRole = "admin" | "moderator" | "user";

interface UserRoleState {
  role: AppRole | null;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
}

export function useUserRole(): UserRoleState {
  const { user, loading } = useAuth();

  // Return null if user is not logged in, otherwise default to 'user' role
  const role: AppRole | null = user ? (user.role as AppRole) || "user" : null;

  return {
    role,
    isAdmin: role === "admin",
    isModerator: role === "moderator",
    loading,
  };
}
