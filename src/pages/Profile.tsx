import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Shield, CreditCard, LogOut, Trash2, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PageTransition } from '@/components/PageTransition';

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState({
    email: true,
    product: true,
    tips: false,
  });

  const [profile, setProfile] = useState({
    full_name: '',
    avatar_url: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setProfile({
            full_name: data.full_name || '',
            avatar_url: data.avatar_url || '',
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !user) return;

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    setUploading(true);
    try {
      // Delete old avatar if exists
      await supabase.storage.from('avatars').remove([filePath]);
      
      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      toast.success('Avatar atualizado com sucesso!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Erro ao fazer upload do avatar');
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || 'U';

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
              <CardDescription>
                Clique na imagem para alterar seu avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
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
                <p className="font-medium">{profile.full_name || 'Seu Nome'}</p>
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
              <CardDescription>
                Atualize suas informações de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input 
                    id="name" 
                    value={profile.full_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar alterações'
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
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualizações por email</p>
                  <p className="text-sm text-muted-foreground">Receba novidades sobre sua conta</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novidades do produto</p>
                  <p className="text-sm text-muted-foreground">Seja o primeiro a saber sobre novos recursos</p>
                </div>
                <Switch 
                  checked={notifications.product}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, product: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dicas e tutoriais</p>
                  <p className="text-sm text-muted-foreground">Aprenda a usar melhor a plataforma</p>
                </div>
                <Switch 
                  checked={notifications.tips}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, tips: checked }))}
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
              <CardDescription>
                Gerencie sua assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-lg">Plano Pro</p>
                  <p className="text-sm text-muted-foreground">R$ 97/mês • Renova em 15/02/2024</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Mudar plano</Button>
                  <Button variant="ghost" size="sm">Ver histórico</Button>
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
              <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
                <LogOut className="w-4 h-4 mr-2" />
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
