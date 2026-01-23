import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ChevronDown, Plus, MoreVertical } from 'lucide-react';
import { chats, messages, agents } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/PageTransition';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Chat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  const currentChat = chats.find((c) => c.id === chatId);
  const currentAgent = currentChat
    ? agents.find((a) => a.id === currentChat.agentId)
    : selectedAgent;

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="h-screen flex">
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
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-6 space-y-4 bg-secondary/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.sender === 'user'
                        ? 'bg-chat-user text-chat-user-foreground rounded-br-md'
                        : 'bg-chat-agent text-chat-agent-foreground rounded-bl-md shadow-soft'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        msg.sender === 'user' ? 'text-chat-user-foreground/70' : 'text-muted-foreground'
                      )}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessage('');
                }}
                className="flex items-center gap-3"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 h-12"
                />
                <Button type="submit" variant="hero" size="icon" className="h-12 w-12">
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
