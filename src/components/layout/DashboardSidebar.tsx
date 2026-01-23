import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Bot, 
  Users, 
  LogOut,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Novo Chat', href: '/chat/new', icon: MessageSquare },
  { label: 'Agentes', href: '/agents', icon: Bot },
  { label: 'Perfil', href: '/profile', icon: Users },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
}

// Mock user plan - in production this would come from database/Stripe
const userPlan = {
  name: 'Pro',
  color: 'bg-primary',
};

export function DashboardSidebar({ onNavigate, collapsed = false }: DashboardSidebarProps) {
  const location = useLocation();

  const handleNavClick = () => {
    onNavigate?.();
  };

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.href;
    const content = (
      <Link
        to={item.href}
        onClick={handleNavClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
          collapsed && "justify-center px-2",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
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
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "h-full bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Logo - Desktop only */}
        <div className={cn("p-4 border-b border-sidebar-border hidden lg:block", collapsed && "p-3")}>
          <Link to="/dashboard" className="flex items-center gap-2" onClick={handleNavClick}>
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && <span className="font-bold text-lg">AgentChat</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 p-3 space-y-1 overflow-y-auto", collapsed && "p-2")}>
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* User Plan */}
        <div className={cn("px-3 pb-2", collapsed && "px-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center p-2 rounded-lg bg-sidebar-accent">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Plano {userPlan.name}</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent">
              <Crown className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-sidebar-foreground/70">Seu plano</p>
                <p className="font-semibold text-sm">{userPlan.name}</p>
              </div>
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", userPlan.color, "text-primary-foreground")}>
                Ativo
              </span>
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className={cn("p-3 border-t border-sidebar-border", collapsed && "p-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className="flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Sair</span>
            </Link>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
