import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { agents } from '@/data/mockData';

export default function Agents() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Agentes</h1>
            <p className="text-muted-foreground mt-1">
              Explore e converse com agentes especializados
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/agents/create">
              <Plus className="w-4 h-4" />
              Criar agente
            </Link>
          </Button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-card rounded-xl shadow-soft border border-border overflow-hidden hover:shadow-medium transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {agent.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mt-1">
                      {agent.niche}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 pb-4">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {agent.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <Button variant="hero" className="flex-1" asChild>
                  <Link to={`/chat/new?agent=${agent.id}`}>
                    <MessageSquare className="w-4 h-4" />
                    Conversar
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Hint */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Não encontrou o que procura?{' '}
            <Link to="/agents/create" className="text-primary hover:underline font-medium">
              Crie seu próprio agente personalizado
            </Link>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
