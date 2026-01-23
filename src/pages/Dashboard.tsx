import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Bot, Clock, Loader2 } from 'lucide-react';
import { chats, agents } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Olá, {userName}! 👋</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Bem-vindo ao seu painel de controle
              </p>
            </div>
            <Button variant="hero" asChild className="w-full sm:w-auto">
              <Link to="/chat/new">
                <Plus className="w-4 h-4" />
                Novo chat
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-card rounded-xl p-4 lg:p-6 shadow-soft border border-border">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">{chats.length}</p>
                  <p className="text-muted-foreground text-xs lg:text-sm">Conversas ativas</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 lg:p-6 shadow-soft border border-border">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">{agents.length}</p>
                  <p className="text-muted-foreground text-xs lg:text-sm">Agentes disponíveis</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 lg:p-6 shadow-soft border border-border sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">24h</p>
                  <p className="text-muted-foreground text-xs lg:text-sm">Disponibilidade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Chats */}
          <div className="bg-card rounded-xl shadow-soft border border-border">
            <div className="p-4 lg:p-6 border-b border-border">
              <h2 className="text-lg lg:text-xl font-semibold">Conversas recentes</h2>
            </div>
            <div className="divide-y divide-border">
              {chats.map((chat) => {
                const agent = agents.find((a) => a.id === chat.agentId);
                return (
                  <Link
                    key={chat.id}
                    to={`/chat/${chat.id}`}
                    className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl lg:text-2xl flex-shrink-0">
                      {agent?.avatar || '🤖'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate text-sm lg:text-base">{chat.title}</span>
                        {chat.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs lg:text-sm text-muted-foreground truncate">
                        {chat.agentName}: {chat.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs lg:text-sm text-muted-foreground hidden sm:block">{chat.timestamp}</span>
                  </Link>
                );
              })}
            </div>
            <div className="p-3 lg:p-4 border-t border-border text-center">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/chats">Ver todas as conversas</Link>
              </Button>
            </div>
          </div>

          {/* Quick Access Agents */}
          <div className="mt-6 lg:mt-8">
            <h2 className="text-lg lg:text-xl font-semibold mb-4">Acesso rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {agents.slice(0, 4).map((agent) => (
                <Link
                  key={agent.id}
                  to={`/chat/new?agent=${agent.id}`}
                  className="bg-card rounded-xl p-3 lg:p-4 shadow-soft border border-border hover:shadow-medium hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl lg:text-3xl mx-auto mb-2 lg:mb-3">
                    {agent.avatar}
                  </div>
                  <h3 className="font-medium truncate text-sm lg:text-base">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{agent.niche}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
