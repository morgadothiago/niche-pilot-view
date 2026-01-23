import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { agents } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

export default function Agents() {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Agentes</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Explore e converse com agentes especializados
              </p>
            </div>
            <Button variant="hero" asChild className="w-full sm:w-auto">
              <Link to="/agents/create">
                <Plus className="w-4 h-4" />
                Criar agente
              </Link>
            </Button>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-card rounded-xl shadow-soft border border-border overflow-hidden hover:shadow-medium transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="p-4 lg:p-6 pb-3 lg:pb-4">
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl gradient-primary flex items-center justify-center text-2xl lg:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {agent.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base lg:text-lg">{agent.name}</h3>
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mt-1">
                        {agent.niche}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-4 lg:px-6 pb-3 lg:pb-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {agent.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                  <Button variant="hero" className="w-full" asChild>
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
          <div className="mt-8 lg:mt-12 text-center">
            <p className="text-muted-foreground text-sm lg:text-base">
              Não encontrou o que procura?{' '}
              <Link to="/agents/create" className="text-primary hover:underline font-medium">
                Crie seu próprio agente personalizado
              </Link>
            </p>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
