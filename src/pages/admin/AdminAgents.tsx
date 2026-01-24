import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageTransition } from "@/components/PageTransition";
import { Loader2, Trash2, Plus, Bot, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  avatar: string | null;
  created_at: string;
  owner_name?: string;
}

interface UserProfile {
  user_id: string;
  full_name: string | null;
}

const emojiAvatars = ["🤖", "🧠", "💡", "🎯", "🚀", "💬", "⚡", "🔮", "🎨", "📊", "💼", "🛠️"];

export default function AdminAgents() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "🤖",
    description: "",
    user_id: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/admin/agents');
      // const data = await response.json();
      // setAgents(data.agents);
      // setUsers(data.users);

      // Default empty data for now
      setAgents([]);
      setUsers([]);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAgent(agentId: string) {
    setDeleting(agentId);
    try {
      // TODO: Replace with your API call
      // const response = await fetch(`/api/admin/agents/${agentId}`, { method: 'DELETE' });
      // if (!response.ok) throw new Error('Failed to delete agent');

      toast.success("Agente deletado com sucesso");
      fetchData();
    } catch (error: unknown) {
      console.error("Error deleting agent:", error);
      toast.error("Erro ao deletar agente");
    } finally {
      setDeleting(null);
    }
  }

  async function createAgent(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Nome do agente é obrigatório");
      return;
    }

    if (!formData.user_id) {
      toast.error("Selecione um usuário");
      return;
    }

    setCreating(true);
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/admin/agents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     user_id: formData.user_id,
      //     name: formData.name.trim(),
      //     avatar: formData.avatar,
      //     description: formData.description.trim() || null,
      //   }),
      // });
      // if (!response.ok) throw new Error('Failed to create agent');

      toast.success("Agente criado com sucesso!");
      setShowCreateDialog(false);
      setFormData({ name: "", avatar: "🤖", description: "", user_id: "" });
      fetchData();
    } catch (error: unknown) {
      console.error("Error creating agent:", error);
      toast.error("Erro ao criar agente");
    } finally {
      setCreating(false);
    }
  }

  return (
    <AdminGuard>
      <PageTransition>
        <AdminLayout title="Agentes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Gerenciar Agentes</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os agentes do sistema ({agents.length} agentes)
                </CardDescription>
              </div>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Agente
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      Criar Novo Agente
                    </DialogTitle>
                    <DialogDescription>
                      Crie um agente para qualquer usuário do sistema
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={createAgent} className="space-y-4 mt-4">
                    {/* User Selection */}
                    <div className="space-y-2">
                      <Label>Usuário proprietário *</Label>
                      <Select
                        value={formData.user_id}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, user_id: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.user_id} value={u.user_id}>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {u.full_name || `Usuário ${u.user_id.slice(0, 8)}...`}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Avatar Selection */}
                    <div className="space-y-2">
                      <Label>Avatar</Label>
                      <div className="flex flex-wrap gap-2">
                        {emojiAvatars.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, avatar: emoji }))}
                            className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                              formData.avatar === emoji
                                ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "bg-muted hover:bg-muted/80"
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="agent-name">Nome do agente *</Label>
                      <Input
                        id="agent-name"
                        placeholder="Ex: Assistente de Vendas"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="agent-description">Descrição (opcional)</Label>
                      <Textarea
                        id="agent-description"
                        placeholder="Descreva o que o agente faz..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={creating}>
                        {creating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Criando...
                          </>
                        ) : (
                          "Criar Agente"
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agente</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Proprietário</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            Nenhum agente encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        agents.map((agent) => (
                          <TableRow key={agent.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                                  {agent.avatar || "🤖"}
                                </div>
                                <span className="font-medium">{agent.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {agent.description || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span>{agent.owner_name || "Sem nome"}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(agent.created_at).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    disabled={deleting === agent.id}
                                  >
                                    {deleting === agent.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Deletar Agente</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja deletar o agente "{agent.name}"? Esta
                                      ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteAgent(agent.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Deletar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </AdminLayout>
      </PageTransition>
    </AdminGuard>
  );
}
