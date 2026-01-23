import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Bot, 
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Chat', href: '/chat/new', icon: MessageSquare },
  { label: 'Agentes', href: '/agents', icon: Bot },
  { label: 'Perfil', href: '/profile', icon: User },
];

const userPlan = {
  name: 'Pro',
  color: 'bg-primary'
};

interface DashboardSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
}

export function DashboardSidebar({ onNavigate, collapsed = false }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleNavClick = () => {
    onNavigate?.();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.href || 
      (item.href === '/chat/new' && location.pathname.startsWith('/chat'));
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
        {/* Logo */}
        <div className={cn("p-4 border-b border-sidebar-border hidden lg:block", collapsed && "p-3")}>
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

        {/* User Plan Display */}
        <div className={cn("p-3 border-t border-sidebar-border", collapsed && "p-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Plano {userPlan.name}</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70">
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Plano</span>
              <span className={cn("ml-auto px-2 py-0.5 rounded text-xs font-medium text-primary-foreground", userPlan.color)}>
                {userPlan.name}
              </span>
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
                  className="w-full flex items-center justify-center px-2 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Sair</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
