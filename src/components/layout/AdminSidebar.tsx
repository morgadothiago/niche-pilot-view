import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bot,
  CreditCard,
  Settings,
  LogOut,
  Shield,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Usuários", href: "/admin/users", icon: Users },
  { label: "Agentes", href: "/admin/agents", icon: Bot },
  { label: "Assinaturas", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Configurações", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
}

export function AdminSidebar({ onNavigate, collapsed = false }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isLoggingOut } = useAuth();

  const handleNavClick = () => {
    onNavigate?.();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Erro ao sair");
    }
  };

  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = location.pathname === item.href;
    const content = (
      <Link
        to={item.href}
        onClick={handleNavClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
          collapsed && "justify-center px-2",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium">{item.label}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "h-full bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div
          className={cn("p-4 border-b border-sidebar-border hidden lg:block", collapsed && "p-3")}
        >
          <Link to="/admin" className="flex items-center gap-2" onClick={handleNavClick}>
            <div className="w-9 h-9 rounded-lg bg-destructive flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-destructive-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg">Admin</span>
                <span className="text-xs text-sidebar-foreground/60">AgentChat</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 p-3 space-y-1 overflow-y-auto", collapsed && "p-2")}>
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Sign Out */}
        <div className={cn("p-3 border-t border-sidebar-border", collapsed && "p-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
            >
              {isLoggingOut ? (
                <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">Sair</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
