import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ChevronDown, Plus, MoreVertical, Trash2, Edit, Share, Pin, Archive } from 'lucide-react';
import { chats, messages, agents } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/PageTransition';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function Chat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  const currentChat = chats.find((c) => c.id === chatId);
  const currentAgent = currentChat
    ? agents.find((a) => a.id === currentChat.agentId)
    : selectedAgent;

  const handleOptionClick = (action: string) => {
    toast.success(`Ação "${action}" executada`);
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="h-[calc(100vh-theme(spacing.14))] lg:h-screen flex">
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-border bg-card hidden lg:flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Chats</h2>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/chat/new">
                  <Plus className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              {chats.map((chat) => {
                const agent = agents.find((a) => a.id === chat.agentId);
                const isActive = chat.id === chatId;
                return (
                  <Link
                    key={chat.id}
                    to={`/chat/${chat.id}`}
                    className={cn(
                      "flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors border-b border-border",
                      isActive && "bg-secondary"
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                      {agent?.avatar || '🤖'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{chat.title}</span>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xl">
                  {currentAgent?.avatar || '🤖'}
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 font-semibold hover:text-primary transition-colors">
                      {currentAgent?.name || 'Selecionar agente'}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 bg-popover">
                      {agents.map((agent) => (
                        <DropdownMenuItem
                          key={agent.id}
                          onClick={() => setSelectedAgent(agent)}
                          className="flex items-center gap-3 p-3"
                        >
                          <span className="text-xl">{agent.avatar}</span>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">{agent.niche}</div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground">{currentAgent?.niche}</p>
                </div>
              </div>

              {/* Options Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover">
                  <DropdownMenuItem onClick={() => handleOptionClick('Fixar conversa')} className="gap-2">
                    <Pin className="w-4 h-4" />
                    Fixar conversa
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOptionClick('Renomear')} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Renomear
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOptionClick('Compartilhar')} className="gap-2">
                    <Share className="w-4 h-4" />
                    Compartilhar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOptionClick('Arquivar')} className="gap-2">
                    <Archive className="w-4 h-4" />
                    Arquivar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleOptionClick('Excluir conversa')} 
                    className="gap-2 text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir conversa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chatId && messages[chatId] ? (
                messages[chatId].map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3",
                        msg.role === 'user'
                          ? 'bg-chat-user text-chat-user-foreground'
                          : 'bg-chat-agent text-chat-agent-foreground'
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center h-full">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl mx-auto mb-4">
                      {currentAgent?.avatar || '🤖'}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      Comece uma conversa com {currentAgent?.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {currentAgent?.description}
                    </p>
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
                  onKeyPress={(e) => e.key === 'Enter' && message.trim() && setMessage('')}
                />
                <Button size="icon" disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
