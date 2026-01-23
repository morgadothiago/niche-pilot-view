import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock, Bell, CreditCard, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { PageTransition } from '@/components/PageTransition';

export default function Profile() {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-8 max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Perfil</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas informações e preferências
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Info */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Maria Silva</h2>
                  <p className="text-muted-foreground text-sm">maria@empresa.com</p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Alterar foto
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        defaultValue="Maria Silva"
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue="maria@empresa.com"
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button variant="default">Salvar alterações</Button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Alterar senha</h2>
                  <p className="text-muted-foreground text-sm">Atualize sua senha de acesso</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input id="current-password" type="password" className="h-12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input id="new-password" type="password" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input id="confirm-password" type="password" className="h-12" />
                  </div>
                </div>
                <Button variant="default">Atualizar senha</Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Notificações</h2>
                  <p className="text-muted-foreground text-sm">Configure suas preferências de notificação</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Notificações por email</p>
                    <p className="text-sm text-muted-foreground">Receba atualizações sobre suas conversas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Novidades do produto</p>
                    <p className="text-sm text-muted-foreground">Fique por dentro de novos recursos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Dicas e tutoriais</p>
                    <p className="text-sm text-muted-foreground">Receba dicas para usar melhor a plataforma</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Plano atual</h2>
                  <p className="text-muted-foreground text-sm">Gerencie sua assinatura</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">Plano Atual</span>
                    <h3 className="text-2xl font-bold mt-1">Pro</h3>
                    <p className="text-muted-foreground text-sm">Renovação em 15/02/2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">R$ 49</p>
                    <p className="text-muted-foreground text-sm">/mês</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">Alterar plano</Button>
                <Button variant="outline" className="flex-1">Histórico de pagamentos</Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card rounded-xl shadow-soft border border-destructive/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Zona de perigo</h2>
                  <p className="text-muted-foreground text-sm">Ações irreversíveis</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
              <Button variant="destructive">Excluir minha conta</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
