import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bot } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ContentHeader } from "./ContentHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  hideContentHeader?: boolean;
}

export function DashboardLayout({ children, hideContentHeader = false }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border h-14 flex items-center px-4">
        {/* Mobile toggle with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-sidebar border-sidebar-border w-64">
            <DashboardSidebar onNavigate={() => {}} collapsed={false} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 ml-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">ThinkFlow</span>
        </Link>
      </header>

      {/* Sidebar - Desktop: always visible */}
      <div className="hidden lg:block h-full">
        <DashboardSidebar collapsed={collapsed} />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-background overflow-hidden pt-14 lg:pt-0 flex flex-col">
        {!hideContentHeader && (
          <ContentHeader collapsed={collapsed} onCollapsedChange={setCollapsed} />
        )}
        <div
          className={cn(
            "flex-1",
            hideContentHeader ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
