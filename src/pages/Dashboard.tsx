import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Bot, Clock } from 'lucide-react';
import { chats, agents } from '@/data/mockData';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Olá, Maria! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Bem-vinda ao seu painel de controle
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/chat/new">
              <Plus className="w-4 h-4" />
              Novo chat
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{chats.length}</p>
                <p className="text-muted-foreground text-sm">Conversas ativas</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{agents.length}</p>
                <p className="text-muted-foreground text-sm">Agentes disponíveis</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-muted-foreground text-sm">Disponibilidade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="bg-card rounded-xl shadow-soft border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Conversas recentes</h2>
          </div>
          <div className="divide-y divide-border">
            {chats.map((chat) => {
              const agent = agents.find((a) => a.id === chat.agentId);
              return (
                <Link
                  key={chat.id}
                  to={`/chat/${chat.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {agent?.avatar || '🤖'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{chat.title}</span>
                      {chat.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.agentName}: {chat.lastMessage}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{chat.timestamp}</span>
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t border-border text-center">
            <Button variant="ghost" asChild>
              <Link to="/chats">Ver todas as conversas</Link>
            </Button>
          </div>
        </div>

        {/* Quick Access Agents */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Acesso rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agents.slice(0, 4).map((agent) => (
              <Link
                key={agent.id}
                to={`/chat/new?agent=${agent.id}`}
                className="bg-card rounded-xl p-4 shadow-soft border border-border hover:shadow-medium hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-3">
                  {agent.avatar}
                </div>
                <h3 className="font-medium truncate">{agent.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{agent.niche}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
