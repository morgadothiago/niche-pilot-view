import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { agentService } from "@/services/agentService";
import { messageService } from "@/services/messageService";
import { Agent } from "@/types";
import { useRef } from "react";
import { TypingText } from "@/components/chat/TypingText";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  isUpgradeCTA?: boolean;
  isCreditsCTA?: boolean;
}

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch agents from API
  useEffect(() => {
    async function fetchAgents() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await agentService.getAgents(user.id);
        setAgents(data || []);

        // Auto-select first agent if none selected
        if (data && data.length > 0 && !selectedAgent) {
          setSelectedAgent(data[0]);
        }
      } catch (error: unknown) {
        console.error("Error fetching agents:", error);
        toast.error("Erro ao carregar agentes");
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, [user?.id, selectedAgent]);

  const handleOptionClick = (action: string) => {
    toast.success(`Ação "${action}" executada`);
  };

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setMessages([]); // Clear chat when switching agents
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedAgent || !user || sending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setSending(true);

    try {
      const response = await messageService.sendMessage(
        selectedAgent.id,
        user.id,
        userMessage.text
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar mensagem";
      const isCreditsError = errorMessage.includes("Credits free finish");

      if (isCreditsError) {
        const creditMessage: Message = {
          id: `credit-cta-${Date.now()}`,
          text: "🚫 **Seus créditos acabaram!**\n\nVocê atingiu o limite do plano gratuito. Para continuar conversando, você pode comprar mais créditos avulsos ou assinar um de nossos planos PRO.",
          sender: "bot",
          timestamp: new Date(),
          isCreditsCTA: true,
        };
        setMessages((prev) => [...prev, creditMessage]);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSending(false);
    }
  };

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, isTyping: false } : msg))
    );

    // Adiciona uma mensagem de conversão no chat a cada 5 respostas da IA, evitando duplicatas
    setMessages((currentMessages) => {
      const botResponsesCount = currentMessages.filter(
        (m) => m.sender === "bot" && !m.isUpgradeCTA
      ).length;

      const ctaId = `upgrade-cta-${botResponsesCount}`;
      const alreadyHasCTA = currentMessages.some((m) => m.id === ctaId);

      if (botResponsesCount > 0 && botResponsesCount % 5 === 0 && !alreadyHasCTA) {
        const randomDelay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;

        setTimeout(() => {
          setMessages((prev) => {
            // Re-verificar no momento de adicionar para evitar condições de corrida
            if (prev.some((m) => m.id === ctaId)) return prev;

            const upgradeMessage: Message = {
              id: ctaId,
              text: "⚡ **Gostou da conversa?**\n\nLibere conversas ilimitadas, agentes exclusivos e muito mais assinando o Plano PRO hoje mesmo!",
              sender: "bot",
              timestamp: new Date(),
              isUpgradeCTA: true,
            };
            return [...prev, upgradeMessage];
          });
        }, randomDelay);
      }
      return currentMessages;
    });
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
                <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center h-full">
                      <div className="text-center max-w-md">
                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl mx-auto mb-4">
                          {selectedAgent.avatar || "🤖"}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          Comece uma conversa com {selectedAgent.name}
                        </h3>
                        {selectedAgent.description && (
                          <p className="text-muted-foreground text-sm">
                            {selectedAgent.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex w-full mb-4",
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm animate-fade-in",
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none prose-p:text-primary-foreground prose-strong:text-white"
                              : "bg-muted text-foreground rounded-tl-none"
                          )}
                        >
                          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-card prose-pre:text-foreground prose-code:text-primary prose-strong:text-current">
                            {msg.sender === "bot" && msg.isTyping ? (
                              <TypingText
                                text={msg.text}
                                onComplete={() => handleTypingComplete(msg.id)}
                              />
                            ) : (
                              <ReactMarkdown>{msg.text}</ReactMarkdown>
                            )}

                            {msg.isUpgradeCTA && (
                              <div className="mt-4 pt-4 border-t border-foreground/10">
                                <Button
                                  variant="hero"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => navigate("/change-plan")}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Assinar Plano PRO
                                </Button>
                              </div>
                            )}

                            {msg.isCreditsCTA && (
                              <div className="mt-4 pt-4 border-t border-foreground/10 space-y-2">
                                <Button
                                  variant="hero"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => navigate("/buy-credits")}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Comprar Créditos
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
                                  onClick={() => navigate("/change-plan")}
                                >
                                  Mudar de Plano
                                </Button>
                              </div>
                            )}
                          </div>
                          <div
                            className={cn(
                              "text-[10px] mt-1 opacity-70",
                              msg.sender === "user" ? "text-right" : "text-left"
                            )}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {sending && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-muted/50 border border-border/50 text-foreground rounded-2xl rounded-tl-none px-4 py-3 shadow-md animate-pulse-glow">
                        <div className="flex gap-1.5">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s] shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s] shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={sending}
                    />
                    <Button
                      size="icon"
                      disabled={!message.trim() || sending}
                      onClick={handleSendMessage}
                    >
                      {sending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
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
