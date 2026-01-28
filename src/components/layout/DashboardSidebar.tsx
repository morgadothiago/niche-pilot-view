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
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { CreditIndicator } from "@/components/CreditIndicator";

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
  const getUser = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isLoggingOut } = useAuth();
  const { subscription } = useSubscription();
  const { appName } = useAppConfig();

  const planConfig = {
    free: { name: "Free", color: "bg-muted text-muted-foreground" },
    pro: { name: "Pro", color: "bg-primary text-primary-foreground" },
    elite: { name: "Elite", color: "bg-red-500 text-white" },
    custom: { name: "Enterprise", color: "bg-amber-500 text-white" },
  };

  // Get plan from user object and normalize to lowercase
  const userPlan = getUser.user?.plan?.toLowerCase() as keyof typeof planConfig | undefined;
  const currentPlanKey = userPlan || subscription?.plan || "free";
  const currentPlan = planConfig[currentPlanKey] || planConfig.free;

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
                <span className="font-bold text-lg text-gradient">{appName}</span>
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
            <div className="flex flex-col gap-1 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70">
                    <Sparkles className="w-5 h-5 flex-shrink-0" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Plano {currentPlan.name}</TooltipContent>
              </Tooltip>
              <CreditIndicator
                credits={subscription?.credits ?? 0}
                plan={currentPlanKey}
                limit={subscription?.credits_limit ?? 0}
                size="sm"
                tooltipSide="right"
              />
            </div>
          ) : (
            <div className="bg-sidebar-accent/30 rounded-xl p-1.5 border border-sidebar-border/50">
              {/* Plan - Informative only */}
              <div className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground/70">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">Plano</span>
                <span
                  className={cn(
                    "ml-auto px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    currentPlan.color
                  )}
                >
                  {currentPlan.name}
                </span>
              </div>
              {/* Credits - Clickable to buy */}
              <Link
                to="/buy-credits"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 group"
              >
                <Coins className="w-4 h-4 flex-shrink-0 group-hover:text-sidebar-primary transition-colors" />
                <span className="text-xs font-medium transition-colors">Créditos</span>
                <div className="ml-auto flex items-center gap-2">
                  {subscription?.credits === 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold border border-red-500/30 animate-pulse">
                      Sem crédito
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
                      {subscription?.credits?.toLocaleString() || 0}
                    </span>
                  )}
                </div>
              </Link>
            </div>
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
