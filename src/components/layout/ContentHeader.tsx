import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
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

export function ContentHeader() {
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
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Início</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {breadcrumbs.map((item, index) => (
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

        {/* Page Title */}
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          {currentPageName}
        </h1>
      </div>
    </div>
  );
}
