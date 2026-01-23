import { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { ContentHeader } from './ContentHeader';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronLeft, ChevronRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Header - Always visible */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border h-14 flex items-center px-4">
        {/* Desktop toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {/* Logo - visible on mobile */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-2 ml-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">AgentChat</span>
        </Link>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 pt-14"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: always visible, Mobile: overlay drawer */}
      <div className={`
        fixed lg:static z-50 lg:z-auto h-full pt-14
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <DashboardSidebar 
          onNavigate={() => setMobileMenuOpen(false)} 
          collapsed={collapsed}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-background overflow-y-auto overflow-x-hidden pt-14 flex flex-col">
        <ContentHeader />
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
