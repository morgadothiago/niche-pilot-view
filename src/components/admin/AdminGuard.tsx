import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  unauthorizedRedirect?: string;
}

export function AdminGuard({
  children,
  redirectTo = "/login",
  unauthorizedRedirect = "/dashboard",
}: AdminGuardProps) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const location = useLocation();

  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={unauthorizedRedirect} replace />;
  }

  return <>{children}</>;
}
