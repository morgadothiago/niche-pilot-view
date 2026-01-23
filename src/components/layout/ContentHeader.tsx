import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/chat/new': 'Novo Chat',
  '/chat': 'Chat',
  '/agents': 'Agentes',
  '/agents/create': 'Criar Agente',
  '/profile': 'Perfil',
  '/pricing': 'Preços',
};

interface ContentHeaderProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function ContentHeader({ collapsed, onCollapsedChange }: ContentHeaderProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = routeNames[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === pathSegments.length - 1;
    
    return { path, name, isLast };
  });

  // Get current page name
  const currentPageName = routeNames[location.pathname] || 
    pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() + 
    pathSegments[pathSegments.length - 1]?.slice(1) || 
    'Dashboard';

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 mb-2">
          {/* Toggle sidebar button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(!collapsed)}
            className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
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
        </div>

        {/* Page Title */}
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          {currentPageName}
        </h1>
      </div>
    </div>
  );
}
