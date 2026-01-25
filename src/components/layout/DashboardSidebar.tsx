import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  User,
  LogOut,
  Sparkles,
  CreditCard,
  Coins,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat/new", icon: MessageSquare },
  { label: "Agentes", href: "/agents", icon: Bot },
  { label: "Mudar Plano", href: "/change-plan", icon: CreditCard },
  { label: "Comprar Créditos", href: "/buy-credits", icon: Coins },
  { label: "Perfil", href: "/profile", icon: User },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
}

export function DashboardSidebar({ onNavigate, collapsed = false }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isLoggingOut } = useAuth();
  const { subscription } = useSubscription();

  const planConfig = {
    free: { name: "Free", color: "bg-muted text-muted-foreground" },
    pro: { name: "Pro", color: "bg-primary text-primary-foreground" },
    custom: { name: "Enterprise", color: "bg-amber-500 text-white" },
  };

  const currentPlan = planConfig[subscription?.plan || "free"];

  const handleNavClick = () => {
    onNavigate?.();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Erro ao sair");
    }
  };

  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive =
      location.pathname === item.href ||
      (item.href === "/chat/new" && location.pathname.startsWith("/chat"));
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
          <Link to="/dashboard" className="flex items-center gap-2" onClick={handleNavClick}>
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg">AgentChat</span>
                <span className="text-xs text-sidebar-foreground/60">AI Assistant</span>
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

        {/* User Plan & Credits Display */}
        <div className={cn("p-3 border-t border-sidebar-border", collapsed && "p-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/change-plan"
                  className="flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent"
                >
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Plano {currentPlan.name} • {subscription?.credits || 0} créditos
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              to="/change-plan"
              className="flex flex-col gap-2 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Plano</span>
                <span
                  className={cn(
                    "ml-auto px-2 py-0.5 rounded text-xs font-medium",
                    currentPlan.color
                  )}
                >
                  {currentPlan.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Coins className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Créditos</span>
                <span className="ml-auto text-sm font-semibold text-foreground">
                  {subscription?.credits?.toLocaleString() || 0}
                </span>
              </div>
            </Link>
          )}
        </div>

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
