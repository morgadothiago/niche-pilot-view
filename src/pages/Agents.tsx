import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Loader2, Bot, Trash2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { agentService } from "@/services/agentService";
import { Agent } from "@/types";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Agents() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await agentService.getAgents(user.id);
        setAgents(data || []);
      } catch (_error: unknown) {
        console.error("Error fetching agents:", _error);
        toast.error("Erro ao carregar agentes");
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, [user?.id]);

  const handleDeleteAgent = async (id: string) => {
    try {
      await agentService.deleteAgent(id);
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
      toast.success("Agente excluído com sucesso");
    } catch (_error: unknown) {
      console.error("Error deleting agent:", _error);
      toast.error("Erro ao excluir agente");
    }
  };

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

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Carregando seus agentes...</p>
            </div>
          ) : agents.length > 0 ? (
            /* Agents Grid */
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
                        {agent.avatar || "🤖"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-base lg:text-lg truncate">
                            {agent.name}
                          </h3>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o
                                  agente "{agent.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteAgent(agent.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mt-1">
                          Personalizado
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 lg:px-6 pb-3 lg:pb-4">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {agent.description || "Sem descrição disponível"}
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
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Bot className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Nenhum agente encontrado</h2>
              <p className="text-muted-foreground max-w-sm mb-8">
                Você ainda não criou nenhum agente de IA. Comece agora mesmo clicando no botão
                abaixo!
              </p>
              <Button asChild>
                <Link to="/agents/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar meu primeiro agente
                </Link>
              </Button>
            </div>
          )}

          {/* Empty State Hint (only show if there are agents) */}
          {agents.length > 0 && (
            <div className="mt-8 lg:mt-12 text-center">
              <p className="text-muted-foreground text-sm lg:text-base">
                Não encontrou o que procura?{" "}
                <Link to="/agents/create" className="text-primary hover:underline font-medium">
                  Crie seu próprio agente personalizado
                </Link>
              </p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
