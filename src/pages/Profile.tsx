import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, CreditCard, LogOut, Trash2, Camera, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { useFormValidation } from "@/hooks/useFormValidation";
import { profileSchema } from "@/schemas";
import { userService } from "@/services/userService";
import { z } from "zod";
import { useState } from "react";

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, loading: authLoading, signOut, refreshProfile, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // We rely on AuthContext for initial user data.
  // If we wanted to fetch fresh data on mount, we could call userService.getProfile() in an effect,
  // but AuthContext usually holds the session user.

  const {
    form,
    isSubmitting: saving,
    handleSubmit,
  } = useFormValidation<ProfileFormValues>({
    schema: profileSchema,
    defaultValues: {
      full_name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      avatar_url: user?.user_metadata?.avatar_url || "",
    },
    onSubmit: async (data) => {
      // Only update full_name for now as email is separate and avatar is handled separately
      await userService.updateProfile({ user_metadata: { full_name: data.full_name } });
      await refreshProfile();
      toast.success("Perfil atualizado com sucesso!");
    },
  });

  const { register } = form;

  const [notifications, setNotifications] = useState({
    email: true,
    product: true,
    tips: false,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/", { replace: true });
    } catch (_error) {
      toast.error("Erro ao sair");
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !user) return;

    const file = event.target.files[0];

    setUploading(true);
    try {
      await userService.uploadAvatar(file);
      await refreshProfile();
      toast.success("Avatar atualizado com sucesso!");
    } catch (_error: unknown) {
      console.error("Error uploading avatar:", _error);
      toast.error("Erro ao fazer upload do avatar");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Meu Perfil</h1>
            <p className="text-muted-foreground mt-1">Gerencie suas informações e preferências</p>
          </div>

          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Foto de Perfil
              </CardTitle>
              <CardDescription>Clique na imagem para alterar seu avatar</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url ?? undefined}
                    alt={user?.user_metadata?.full_name}
                  />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
              <div>
                <p className="font-medium">{user?.user_metadata?.full_name || "Seu Nome"}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>Atualize suas informações de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome completo</Label>
                  <Input
                    id="full_name"
                    placeholder="Seu nome completo"
                    {...register("full_name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ""} disabled />
                </div>
              </div>
              <Button onClick={() => handleSubmit()} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
              <CardDescription>Configure suas preferências de notificação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualizações por email</p>
                  <p className="text-sm text-muted-foreground">Receba novidades sobre sua conta</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, email: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novidades do produto</p>
                  <p className="text-sm text-muted-foreground">
                    Seja o primeiro a saber sobre novos recursos
                  </p>
                </div>
                <Switch
                  checked={notifications.product}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, product: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dicas e tutoriais</p>
                  <p className="text-sm text-muted-foreground">
                    Aprenda a usar melhor a plataforma
                  </p>
                </div>
                <Switch
                  checked={notifications.tips}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, tips: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Plano Atual
              </CardTitle>
              <CardDescription>Gerencie sua assinatura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-lg">Plano Pro</p>
                  <p className="text-sm text-muted-foreground">R$ 97/mês • Renova em 15/02/2024</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Mudar plano
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ver histórico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Danger Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full sm:w-auto"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-2" />
                )}
                Sair da conta
              </Button>

              <div className="pt-4 border-t border-border">
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <p className="font-medium text-destructive">Zona de Perigo</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Ações irreversíveis que afetam sua conta
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir minha conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
