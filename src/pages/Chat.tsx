import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ChevronDown, Plus, MoreVertical, Bot, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { Chat as ApiChat, Message as ApiMessage } from "@/services/messageService";

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeChat, setActiveChat] = useState<ApiChat | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [chats, setChats] = useState<ApiChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [newChatAgentId, setNewChatAgentId] = useState<string>("");
  const [newChatTitle, setNewChatTitle] = useState("");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch agents from API
  useEffect(() => {
    async function fetchData() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const [agentsData, chatsData] = await Promise.all([
          agentService.getAgents(user.id),
          messageService.getChats(),
        ]);

        setAgents(agentsData || []);
        setChats(chatsData || []);

        // 1. Verificar se veio um agente via URL (?agent=ID)
        const agentIdFromUrl = searchParams.get("agent");
        if (agentIdFromUrl) {
          const targetedAgent = agentsData.find((a) => a.id === agentIdFromUrl);
          if (targetedAgent) {
            setNewChatAgentId(targetedAgent.id);
            setIsNewChatModalOpen(true);
          }
        }
        // 2. Se não houver agente na URL, seleciona o primeiro chat se existir
        else if (chatsData && chatsData.length > 0 && !activeChat) {
          handleChatClick(chatsData[0]);
        }
      } catch (error: unknown) {
        console.error("Error fetching chat data:", error);
        toast.error("Erro ao carregar dados do chat");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, activeChat, searchParams]); // Adicionadas as dependências faltantes

  const handleOptionClick = (action: string) => {
    toast.success(`Ação "${action}" executada`);
  };

  const handleChatClick = async (chat: ApiChat) => {
    setActiveChat(chat);

    // Encontrar o agente associado a este chat
    const agent = agents.find((a) => a.id === chat.agent_id);
    if (agent) setSelectedAgent(agent);

    setMessages([]); // Placeholder loading
    setSending(true);

    try {
      // Tentar carregar histórico local primeiro
      const storedMessages = messageService.getStoredMessages(chat.id);
      if (storedMessages && storedMessages.length > 0) {
        setMessages(storedMessages as unknown as Message[]);
        toast.info("Histórico da conversa recuperado", { id: `restore-${chat.id}` });
      } else {
        // Backend ainda não suporta histórico via GET, mas o serviço está pronto
        // setMessages(historyMapped...);
        setMessages([]);
      }
    } catch (err) {
      console.warn("History loading handled:", err);
      setMessages([]);
    } finally {
      setSending(false);
    }
  };

  const createNewChatWithAgent = async () => {
    if (!newChatAgentId) {
      toast.error("Selecione um agente");
      return;
    }

    const agent = agents.find((a) => a.id === newChatAgentId);
    const title = newChatTitle.trim() || `Conversa com ${agent?.name || "Agente"}`;

    console.log("🚀 Iniciando criação de chat:", { agent_id: newChatAgentId, title });

    setLoading(true);
    try {
      const newChat = await messageService.createChat(newChatAgentId, title);
      console.log("✅ Chat criado com sucesso:", newChat);

      setChats((prev) => [newChat, ...prev]);
      handleChatClick(newChat);
      setIsNewChatModalOpen(false);
      setNewChatAgentId("");
      setNewChatTitle("");
      toast.success("Nova conversa iniciada!");
    } catch (err) {
      console.error("Error creating new chat:", err);
      toast.error("Erro ao iniciar nova conversa");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedAgent || !user || sending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      if (activeChat) messageService.saveMessages(activeChat.id, newMessages);
      return newMessages;
    });
    setMessage("");
    setSending(true);

    try {
      const response = await messageService.sendMessage(activeChat!.id, userMessage.text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMessage];
        if (activeChat) messageService.saveMessages(activeChat.id, newMessages);
        return newMessages;
      });
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
        setMessages((prev) => {
          const newMessages = [...prev, creditMessage];
          if (activeChat) messageService.saveMessages(activeChat.id, newMessages);
          return newMessages;
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSending(false);
    }
  };

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) => {
      const newMessages = prev.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      );
      if (activeChat) messageService.saveMessages(activeChat.id, newMessages);
      return newMessages;
    });

    // Adiciona uma mensagem de conversão no chat a cada 5 respostas da IA, evitando duplicatas
    setMessages((currentMessages) => {
      const botResponsesCount = currentMessages.filter(
        (m) => m.sender === "bot" && !m.isUpgradeCTA
      ).length;

      const ctaId = `upgrade-cta-${botResponsesCount}`;
      const alreadyHasCTA = currentMessages.some((m) => m.id === ctaId);

      const userPlan = user?.plan?.toUpperCase() || "FREE";
      const isFreePlan = userPlan === "FREE";

      if (isFreePlan && botResponsesCount > 0 && botResponsesCount % 5 === 0 && !alreadyHasCTA) {
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
            const newMessages = [...prev, upgradeMessage];
            if (activeChat) messageService.saveMessages(activeChat.id, newMessages);
            return newMessages;
          });
        }, randomDelay);
      }
      return currentMessages;
    });
  };

  const ChatList = ({ closeSheet }: { closeSheet?: () => void }) => (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      <div className="p-4 pr-12 lg:pr-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Conversas</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsNewChatModalOpen(true);
            closeSheet?.();
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        {loading && chats.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : chats.length > 0 ? (
          chats.map((chat) => {
            const isActive = activeChat?.id === chat.id;
            const agent = agents.find((a) => a.id === chat.agent_id);
            return (
              <button
                key={chat.id}
                onClick={() => {
                  handleChatClick(chat);
                  closeSheet?.();
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-4 hover:bg-secondary/20 transition-colors border-b border-border text-left group",
                  isActive && "bg-secondary/40 border-r-2 border-r-primary"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  {agent?.avatar || "💬"}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-sm block truncate transition-colors",
                      isActive ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                    )}
                  >
                    {chat.title || agent?.name || "Sem título"}
                  </span>
                  <p className="text-[11px] text-muted-foreground/60 truncate">
                    {new Date(chat.created_at).toLocaleDateString()} • {agent?.name || "Agente"}
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Nenhuma conversa ativa</p>
            <p className="text-[11px] mt-1">Clique no + para iniciar</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PageTransition>
      <DashboardLayout hideContentHeader>
        <div className="h-full flex overflow-hidden">
          {/* Chats Sidebar */}
          <div className="w-80 border-r border-border bg-card hidden lg:flex flex-col">
            <ChatList />
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedAgent ? (
              <>
                {/* Chat Header */}
                <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Mobile Chat Selection Button */}
                    <div className="lg:hidden">
                      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10">
                            <MessageSquare className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="left"
                          className="p-0 w-80 bg-card border-r border-border"
                        >
                          <SheetHeader className="sr-only">
                            <SheetTitle>Conversas</SheetTitle>
                          </SheetHeader>
                          <ChatList closeSheet={() => setIsMobileSheetOpen(false)} />
                        </SheetContent>
                      </Sheet>
                    </div>

                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xl flex-shrink-0">
                      {selectedAgent.avatar || "🤖"}
                    </div>
                    <div className="min-w-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 font-semibold hover:text-primary transition-colors">
                          {selectedAgent.name}
                          <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 bg-popover">
                          {agents.map((agent) => (
                            <DropdownMenuItem
                              key={agent.id}
                              onClick={() => {
                                setNewChatAgentId(agent.id);
                                setIsNewChatModalOpen(true);
                              }}
                              className="flex items-center gap-3 p-3 cursor-pointer"
                            >
                              <span className="text-xl">{agent.avatar || "🤖"}</span>
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
                          onClick={() => {
                            setNewChatAgentId(agent.id);
                            setIsNewChatModalOpen(true);
                          }}
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
                  <h2 className="text-xl font-semibold mb-2">Selecione um agente</h2>
                  <p className="text-muted-foreground mb-6">
                    Escolha um agente de IA na lista ao lado para iniciar uma conversa
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <div className="lg:hidden">
                      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                        <Button onClick={() => setIsMobileSheetOpen(true)} className="w-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Ver Conversas
                        </Button>
                        <SheetContent
                          side="left"
                          className="p-0 w-80 bg-card border-r border-border"
                        >
                          <SheetHeader className="sr-only">
                            <SheetTitle>Conversas</SheetTitle>
                          </SheetHeader>
                          <ChatList closeSheet={() => setIsMobileSheetOpen(false)} />
                        </SheetContent>
                      </Sheet>
                    </div>

                    <Button asChild variant="outline">
                      <Link to="/agents/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar novo agente
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Modal */}
        <Dialog open={isNewChatModalOpen} onOpenChange={setIsNewChatModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-card border-border shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Nova Conversa</DialogTitle>
              <DialogDescription>
                Escolha um agente e dê um título para a sua nova conversa.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Selecione o Agente</Label>
                <div className="grid grid-cols-2 gap-3 max-h-[240px] overflow-auto pr-2 custom-scrollbar">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setNewChatAgentId(agent.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                        newChatAgentId === agent.id
                          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {agent.avatar}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{agent.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {agent.category || "Geral"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="chat-title" className="text-sm font-medium">
                  Título da Conversa (Opcional)
                </Label>
                <Input
                  id="chat-title"
                  placeholder="Ex: Minha dúvida sobre Marketing..."
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                  className="bg-muted/30 focus:bg-background h-12 border-border"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsNewChatModalOpen(false)}
                className="h-12 px-6"
              >
                Cancelar
              </Button>
              <Button
                onClick={createNewChatWithAgent}
                disabled={!newChatAgentId || loading}
                className="h-12 px-8 gradient-primary shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Iniciar Chat
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PageTransition>
  );
}

// Simple Label component since it might be missing or in another file
function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
