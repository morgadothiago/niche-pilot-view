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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageTransition } from "@/components/PageTransition";
import { Loader2, Plus, CreditCard, User, Coins, Sparkles, Zap, Crown, Pencil } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  credits: number;
  created_at: string;
  owner_email?: string;
  updated_at: string;
  owner_name?: string;
}

interface UserProfile {
  user_id: string;
  full_name: string | null;
  email: string | null;
}

const planConfig: Record<string, { name: string; icon: React.ElementType; color: string }> = {
  free: { name: "Free", icon: Sparkles, color: "bg-muted text-muted-foreground" },
  pro: { name: "Pro", icon: Zap, color: "bg-primary text-primary-foreground" },
  custom: { name: "Enterprise", icon: Crown, color: "bg-amber-500 text-white" },
};

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [_users, setUsers] = useState<UserProfile[]>([]);
  const [usersWithoutSub, setUsersWithoutSub] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [creating, setCreating] = useState(false);

  const [createForm, setCreateForm] = useState({
    user_id: "",
    plan: "free" as "free" | "pro" | "custom",
    status: "active",
    credits: 0,
  });

  const [editForm, setEditForm] = useState({
    plan: "free" as "free" | "pro" | "custom",
    status: "active",
    credits: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/admin/subscriptions');
      // const data = await response.json();
      // setSubscriptions(data.subscriptions);
      // setUsers(data.users);
      // setUsersWithoutSub(data.usersWithoutSub);

      // Default empty data for now
      setSubscriptions([]);
      setUsers([]);
      setUsersWithoutSub([]);
    } catch (_error: unknown) {
      console.error("Error fetching data:", _error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  async function createSubscription(e: React.FormEvent) {
    e.preventDefault();

    if (!createForm.user_id) {
      toast.error("Selecione um usuário");
      return;
    }

    setCreating(true);
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/admin/subscriptions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(createForm),
      // });
      // if (!response.ok) throw new Error('Failed to create subscription');

      toast.success("Assinatura criada com sucesso!");
      setShowCreateDialog(false);
      setCreateForm({ user_id: "", plan: "free", status: "active", credits: 0 });
      fetchData();
    } catch (_error: unknown) {
      console.error("Error creating subscription:", _error);
      toast.error("Erro ao criar assinatura");
    } finally {
      setCreating(false);
    }
  }

  async function updateSubscription(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSub) return;

    setUpdating(selectedSub.id);
    try {
      // TODO: Replace with your API call
      // const response = await fetch(`/api/admin/subscriptions/${selectedSub.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editForm),
      // });
      // if (!response.ok) throw new Error('Failed to update subscription');

      toast.success("Assinatura atualizada com sucesso!");
      setShowEditDialog(false);
      setSelectedSub(null);
      fetchData();
    } catch (_error: unknown) {
      console.error("Error updating subscription:", _error);
      toast.error("Erro ao atualizar assinatura");
    } finally {
      setUpdating(null);
    }
  }

  const openEditDialog = (sub: Subscription) => {
    setSelectedSub(sub);
    setEditForm({
      plan: sub.plan as "free" | "pro" | "custom",
      status: sub.status,
      credits: sub.credits,
    });
    setShowEditDialog(true);
  };

  const getPlanBadge = (plan: string) => {
    const config = planConfig[plan] || planConfig.free;
    const Icon = config.icon;
    return (
      <Badge className={cn("gap-1", config.color)}>
        <Icon className="w-3 h-3" />
        {config.name}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
            Ativo
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">
            Cancelado
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
          >
            Pendente
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminGuard>
      <PageTransition>
        <AdminLayout title="Assinaturas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Gerenciar Assinaturas</CardTitle>
                <CardDescription>
                  Visualize e gerencie as assinaturas dos usuários ({subscriptions.length}{" "}
                  assinaturas)
                </CardDescription>
              </div>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2" disabled={usersWithoutSub.length === 0}>
                    <Plus className="w-4 h-4" />
                    Nova Assinatura
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Criar Assinatura
                    </DialogTitle>
                    <DialogDescription>
                      Crie uma assinatura para um usuário sem plano
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={createSubscription} className="space-y-4 mt-4">
                    {/* User Selection */}
                    <div className="space-y-2">
                      <Label>Usuário *</Label>
                      <Select
                        value={createForm.user_id}
                        onValueChange={(value) =>
                          setCreateForm((prev) => ({ ...prev, user_id: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                        <SelectContent>
                          {usersWithoutSub.map((u) => (
                            <SelectItem key={u.user_id} value={u.user_id}>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {u.full_name || `Usuário ${u.user_id.slice(0, 8)}...`}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {usersWithoutSub.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Todos os usuários já possuem assinatura
                        </p>
                      )}
                    </div>

                    {/* Plan */}
                    <div className="space-y-2">
                      <Label>Plano</Label>
                      <Select
                        value={createForm.plan}
                        onValueChange={(value) =>
                          setCreateForm((prev) => ({
                            ...prev,
                            plan: value as "free" | "pro" | "custom",
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="custom">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={createForm.status}
                        onValueChange={(value) =>
                          setCreateForm((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="canceled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Credits */}
                    <div className="space-y-2">
                      <Label>Créditos iniciais</Label>
                      <Input
                        type="number"
                        min="0"
                        value={createForm.credits}
                        onChange={(e) =>
                          setCreateForm((prev) => ({
                            ...prev,
                            credits: parseInt(e.target.value) || 0,
                          }))
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
                          "Criar Assinatura"
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
                        <TableHead>Usuário</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Créditos</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            Nenhuma assinatura encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        subscriptions.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="font-medium truncate">
                                    {sub.owner_name || "Sem nome"}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {sub.owner_email || "Sem email"}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getPlanBadge(sub.plan)}</TableCell>
                            <TableCell>{getStatusBadge(sub.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <Coins className="w-4 h-4 text-amber-500" />
                                <span className="font-medium">
                                  {sub.credits?.toLocaleString() || 0}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(sub)}
                                disabled={updating === sub.id}
                              >
                                {updating === sub.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Pencil className="w-4 h-4" />
                                )}
                              </Button>
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

          {/* Edit Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-primary" />
                  Editar Assinatura
                </DialogTitle>
                <DialogDescription>
                  Ajuste o plano, status e créditos de {selectedSub?.owner_name || "usuário"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={updateSubscription} className="space-y-4 mt-4">
                {/* Plan */}
                <div className="space-y-2">
                  <Label>Plano</Label>
                  <Select
                    value={editForm.plan}
                    onValueChange={(value) =>
                      setEditForm((prev) => ({ ...prev, plan: value as "free" | "pro" | "custom" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="custom">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) => setEditForm((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Credits */}
                <div className="space-y-2">
                  <Label>Créditos</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.credits}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, credits: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={updating !== null}>
                    {updating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </AdminLayout>
      </PageTransition>
    </AdminGuard>
  );
}
