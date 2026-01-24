import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ChevronDown, Plus, MoreVertical, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string | null;
}

export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch agents from API
  useEffect(() => {
    async function fetchAgents() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // TODO: Replace with your API call
        // const response = await fetch(`/api/agents?user_id=${user.id}`);
        // const data = await response.json();
        // setAgents(data);

        // Default empty agents for now
        setAgents([]);
      } catch (error: unknown) {
        console.error("Error fetching agents:", error);
        toast.error("Erro ao carregar agentes");
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, [user]);

  const handleOptionClick = (action: string) => {
    toast.success(`Ação "${action}" executada`);
  };

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  return (
    <PageTransition>
      <DashboardLayout hideContentHeader>
        <div className="h-full flex overflow-hidden">
          {/* Agents Sidebar */}
          <div className="w-80 border-r border-border bg-card hidden lg:flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Agentes</h2>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/agents/create">
                  <Plus className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : agents.length > 0 ? (
                agents.map((agent) => {
                  const isActive = selectedAgent?.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => handleSelectAgent(agent)}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors border-b border-border text-left",
                        isActive && "bg-secondary"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                        {agent.avatar || "🤖"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block truncate">{agent.name}</span>
                        {agent.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {agent.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Nenhum agente cadastrado</p>
                  <Button variant="link" size="sm" asChild className="mt-2">
                    <Link to="/agents/create">Criar primeiro agente</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedAgent ? (
              <>
                {/* Chat Header */}
                <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xl">
                      {selectedAgent.avatar || "🤖"}
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 font-semibold hover:text-primary transition-colors">
                          {selectedAgent.name}
                          <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 bg-popover">
                          {agents.map((agent) => (
                            <DropdownMenuItem
                              key={agent.id}
                              onClick={() => handleSelectAgent(agent)}
                              className="flex items-center gap-3 p-3"
                            >
                              <span className="text-xl">{agent.avatar}</span>
                              <div>
                                <div className="font-medium">{agent.name}</div>
                                {agent.description && (
                                  <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                                    {agent.description}
                                  </div>
                                )}
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {selectedAgent.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {selectedAgent.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Agents Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-popover">
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Trocar agente
                      </div>
                      {agents.map((agent) => (
                        <DropdownMenuItem
                          key={agent.id}
                          onClick={() => handleSelectAgent(agent)}
                          className={cn(
                            "flex items-center gap-3 p-3",
                            selectedAgent?.id === agent.id && "bg-secondary"
                          )}
                        >
                          <span className="text-xl">{agent.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{agent.name}</div>
                            {agent.description && (
                              <div className="text-xs text-muted-foreground truncate">
                                {agent.description}
                              </div>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                      {agents.length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                          Nenhum agente cadastrado
                        </div>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="gap-2">
                        <Link to="/agents/create">
                          <Plus className="w-4 h-4" />
                          Criar novo agente
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-auto p-4">
                  <div className="flex-1 flex items-center justify-center h-full">
                    <div className="text-center max-w-md">
                      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl mx-auto mb-4">
                        {selectedAgent.avatar || "🤖"}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        Comece uma conversa com {selectedAgent.name}
                      </h3>
                      {selectedAgent.description && (
                        <p className="text-muted-foreground text-sm">{selectedAgent.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && message.trim() && setMessage("")}
                    />
                    <Button size="icon" disabled={!message.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State - No Agent Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {loading ? "Carregando agentes..." : "Selecione um agente"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {agents.length > 0
                      ? "Escolha um agente de IA na lista ao lado para iniciar uma conversa"
                      : "Crie seu primeiro agente de IA para começar a conversar"}
                  </p>
                  <Button asChild>
                    <Link to="/agents/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar novo agente
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
