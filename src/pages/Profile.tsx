import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Bell, CreditCard, Trash2, Loader2 } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Profile() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    email: true,
    product: true,
    tips: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Perfil</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Gerencie suas informações e preferências
            </p>
          </div>

          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">Informações pessoais</h2>
                  <p className="text-sm text-muted-foreground">Atualize seus dados de perfil</p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" defaultValue={user?.user_metadata?.full_name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" placeholder="Nome da sua empresa" />
                </div>
                <Button variant="hero" className="w-full sm:w-auto">Salvar alterações</Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-semibold">Notificações</h2>
                  <p className="text-sm text-muted-foreground">Configure suas preferências de notificação</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Notificações por email</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receba atualizações sobre suas conversas</p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Novidades do produto</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Fique por dentro de novos recursos</p>
                  </div>
                  <Switch 
                    checked={notifications.product} 
                    onCheckedChange={(checked) => setNotifications({...notifications, product: checked})}
                  />
                </div>
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Dicas e tutoriais</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receba dicas para usar melhor a plataforma</p>
                  </div>
                  <Switch 
                    checked={notifications.tips} 
                    onCheckedChange={(checked) => setNotifications({...notifications, tips: checked})}
                  />
                </div>
              </div>
            </div>

            {/* Current Plan */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="font-semibold">Plano atual</h2>
                  <p className="text-sm text-muted-foreground">Gerencie sua assinatura</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="bg-primary/5 rounded-xl p-4 sm:p-6 border border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Plano Atual</span>
                      <h3 className="text-xl sm:text-2xl font-bold mt-1">Pro</h3>
                      <p className="text-sm text-muted-foreground">Renovação em 15/02/2024</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-bold">R$ 49</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                    <Button variant="outline" className="flex-1">Alterar plano</Button>
                    <Button variant="outline" className="flex-1">Histórico de pagamentos</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Sessão</h2>
                  <p className="text-sm text-muted-foreground">Gerenciar sua sessão</p>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sair da conta
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card rounded-xl shadow-soft border border-destructive/30 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-destructive/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="font-semibold">Zona de perigo</h2>
                  <p className="text-sm text-muted-foreground">Ações irreversíveis</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
                </p>
                <Button variant="destructive" size="sm">Excluir minha conta</Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
