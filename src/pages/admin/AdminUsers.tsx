import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageTransition } from '@/components/PageTransition';
import { Loader2, Shield, User, UserCog, Sparkles, Zap, Crown, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserWithDetails {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  role: string | null;
  plan: string | null;
  status: string | null;
  credits: number | null;
}

const planConfig: Record<string, { name: string; icon: React.ElementType; color: string }> = {
  free: { name: 'Free', icon: Sparkles, color: 'bg-muted text-muted-foreground' },
  pro: { name: 'Pro', icon: Zap, color: 'bg-primary text-primary-foreground' },
  custom: { name: 'Enterprise', icon: Crown, color: 'bg-amber-500 text-white' },
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/admin/users');
      // const data = await response.json();
      // setUsers(data);

      // Default empty users for now
      setUsers([]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    setUpdating(userId);
    try {
      // TODO: Replace with your API call
      // const response = await fetch(`/api/admin/users/${userId}/role`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: newRole }),
      // });
      // if (!response.ok) throw new Error('Failed to update role');

      toast.success('Role atualizada com sucesso');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erro ao atualizar role');
    } finally {
      setUpdating(null);
    }
  }

  const getRoleBadge = (role: string | null) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive" className="gap-1"><Shield className="w-3 h-3" />Admin</Badge>;
      case 'moderator':
        return <Badge variant="secondary" className="gap-1"><UserCog className="w-3 h-3" />Moderador</Badge>;
      default:
        return <Badge variant="outline" className="gap-1"><User className="w-3 h-3" />Usuário</Badge>;
    }
  };

  const getPlanBadge = (plan: string | null) => {
    const config = planConfig[plan || 'free'];
    const Icon = config.icon;
    return (
      <Badge className={cn("gap-1", config.color)}>
        <Icon className="w-3 h-3" />
        {config.name}
      </Badge>
    );
  };

  const getStatusBadge = (status: string | null, role: string | null) => {
    // Admins are always considered active
    if (role === 'admin' || status === 'active') {
      return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">Ativo</Badge>;
    }
    if (status === 'inactive') {
      return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">Inativo</Badge>;
    }
    return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">Pendente</Badge>;
  };

  return (
    <AdminGuard>
      <PageTransition>
        <AdminLayout title="Usuários">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
              <CardDescription>
                Visualize e gerencie os usuários do sistema ({users.length} usuários)
              </CardDescription>
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
                        <TableHead>Role</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Créditos</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Alterar Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            Nenhum usuário encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  {user.avatar_url ? (
                                    <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                                  ) : (
                                    <User className="w-5 h-5 text-primary" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium truncate">{user.full_name || 'Sem nome'}</p>
                                  <p className="text-xs text-muted-foreground font-mono">{user.user_id.slice(0, 8)}...</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell>{getPlanBadge(user.plan)}</TableCell>
                            <TableCell>{getStatusBadge(user.status, user.role)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <Coins className="w-4 h-4 text-amber-500" />
                                <span className="font-medium">{user.credits?.toLocaleString() || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={user.role || 'none'}
                                onValueChange={(value) => updateUserRole(user.user_id, value)}
                                disabled={updating === user.user_id}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">Usuário</SelectItem>
                                  <SelectItem value="moderator">Moderador</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
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
