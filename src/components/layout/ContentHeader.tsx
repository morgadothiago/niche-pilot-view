import { useLocation, Link } from "react-router-dom";
import {
  ChevronRight,
  Home,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Bell,
  MessageSquare,
  Crown,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSubscription } from "@/hooks/useSubscription";

const planConfig: Record<string, { name: string; icon: React.ElementType }> = {
  free: { name: "Free", icon: Sparkles },
  pro: { name: "Pro", icon: Zap },
  custom: { name: "Enterprise", icon: Crown },
};

const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/chat/new": "Novo Chat",
  "/chat": "Chat",
  "/agents": "Agentes",
  "/agents/create": "Criar Agente",
  "/profile": "Perfil",
  "/pricing": "Preços",
  "/change-plan": "Mudar Plano",
  "/buy-credits": "Comprar Créditos",
};

// Ações contextuais por rota
const routeActions: Record<string, { label: string; href: string; icon: React.ElementType }[]> = {
  "/dashboard": [{ label: "Novo Chat", href: "/chat/new", icon: MessageSquare }],
  "/agents": [{ label: "Criar Agente", href: "/agents/create", icon: Plus }],
  "/chat/new": [],
  "/profile": [],
  "/change-plan": [],
  "/buy-credits": [],
};

interface ContentHeaderProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function ContentHeader({ collapsed, onCollapsedChange }: ContentHeaderProps) {
  const location = useLocation();
  const { subscription } = useSubscription();

  const currentPlan = planConfig[subscription?.plan || "free"];
  const PlanIcon = currentPlan.icon;
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = routeNames[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === pathSegments.length - 1;

    return { path, name, isLast };
  });

  // Get current page name
  const currentPageName =
    routeNames[location.pathname] ||
    pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() +
      pathSegments[pathSegments.length - 1]?.slice(1) ||
    "Dashboard";

  // Get actions for current route
  const actions = routeActions[location.pathname] || [];

  // Mock notification count
  const notificationCount = 3;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 mb-2">
            {/* Toggle sidebar button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCollapsedChange(!collapsed)}
                  className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  {collapsed ? (
                    <PanelLeft className="w-5 h-5" />
                  ) : (
                    <PanelLeftClose className="w-5 h-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{collapsed ? "Expandir menu" : "Recolher menu"}</TooltipContent>
            </Tooltip>

            {/* Breadcrumbs */}
            <Breadcrumb className="flex-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="w-4 h-4" />
                      <span className="hidden sm:inline">Início</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((item) => (
                  <BreadcrumbItem key={item.path}>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    {item.isLast ? (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={item.path}>{item.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* User Plan Badge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/change-plan">
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                    >
                      <PlanIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">{currentPlan.name}</span>
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Plano {currentPlan.name}</TooltipContent>
              </Tooltip>

              {/* Contextual Actions */}
              {actions.map((action) => (
                <Tooltip key={action.href}>
                  <TooltipTrigger asChild>
                    <Button asChild size="icon" variant="ghost" className="h-8 w-8">
                      <Link to={action.href}>
                        <action.icon className="w-5 h-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{action.label}</TooltipContent>
                </Tooltip>
              ))}

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium flex items-center justify-center">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notificações</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Page Title */}
          <h1 className="text-xl md:text-2xl font-bold text-foreground">{currentPageName}</h1>
        </div>
      </div>
    </TooltipProvider>
  );
}
