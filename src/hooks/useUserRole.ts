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

  const role: AppRole | null = (user?.role as AppRole) || "user"; // Default to user if undefined but logged in? Or null?

  // If we want to be strict:
  // const role = user?.role || null;

  return {
    role,
    isAdmin: role === "admin",
    isModerator: role === "moderator",
    loading,
  };
}
