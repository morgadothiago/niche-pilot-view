import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, CheckCircle, Loader2 } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const benefits = [
  'Crie agentes ilimitados',
  'Histórico completo de conversas',
  'Suporte prioritário',
  'Acesso a novos recursos',
];

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }
    
    if (!email.trim()) {
      toast.error('Por favor, informe seu email');
      return;
    }
    
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Este email já está cadastrado. Tente fazer login.');
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success('Conta criada com sucesso! Você já está logado.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        toast.error('Erro ao conectar com Google');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error('Erro ao conectar com Google');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left side - Visual */}
        <div className="hidden lg:flex flex-1 bg-sidebar items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">
                Comece sua jornada com IA
              </h2>
              <p className="text-sidebar-foreground/70 text-lg">
                Milhares de empresas já usam o AgentChat para automatizar tarefas e aumentar a produtividade.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 bg-sidebar-accent rounded-xl px-5 py-4">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sidebar-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-sidebar-accent rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-sidebar-foreground italic">
                    "O AgentChat transformou a forma como nossa equipe trabalha. Economia de 10+ horas por semana!"
                  </p>
                  <p className="text-sidebar-foreground/60 text-sm mt-2">
                    — Maria Silva, CEO da TechStartup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-2xl">AgentChat</span>
              </Link>
              <h1 className="text-3xl font-bold">Criar sua conta</h1>
              <p className="text-muted-foreground mt-2">
                Comece gratuitamente, sem cartão de crédito
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  ou cadastre-se com
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="social" 
                size="lg" 
                className="w-full"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button 
                variant="social" 
                size="lg" 
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="flex items-center gap-1">
                  GitHub
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Em breve</span>
                </span>
              </Button>
            </div>

            {/* Terms */}
            <p className="text-center text-sm text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{' '}
              <a href="#" className="text-primary hover:underline">Termos de Serviço</a>
              {' '}e{' '}
              <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
            </p>

            {/* Login link */}
            <p className="text-center text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
