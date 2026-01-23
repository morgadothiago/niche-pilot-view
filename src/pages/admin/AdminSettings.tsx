import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PageTransition } from '@/components/PageTransition';
import { Shield, Mail, Bell, Database } from 'lucide-react';

export default function AdminSettings() {
  return (
    <AdminGuard>
      <PageTransition>
        <AdminLayout title="Configurações">
          <div className="space-y-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Configurações de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de dois fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir 2FA para administradores
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bloquear após tentativas falhas</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloquear conta após 5 tentativas de login falhas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  E-mail
                </CardTitle>
                <CardDescription>
                  Configurações de e-mail e notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Confirmação de e-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir confirmação de e-mail no cadastro
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>E-mails de boas-vindas</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar e-mail de boas-vindas para novos usuários
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificações Admin
                </CardTitle>
                <CardDescription>
                  Receba alertas sobre eventos importantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos usuários</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando um novo usuário se cadastrar
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas assinaturas Pro</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando alguém assinar o plano Pro
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Database */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Banco de Dados
                </CardTitle>
                <CardDescription>
                  Operações de manutenção do banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup diário automático às 3:00 AM
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline">Exportar Dados</Button>
                  <Button variant="outline">Limpar Cache</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </PageTransition>
    </AdminGuard>
  );
}
