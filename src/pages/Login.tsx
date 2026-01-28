import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Loader2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signInWithGoogle, user, loading: authLoading } = useAuth();
  const { appName } = useAppConfig();
  const navigate = useNavigate();

  // Check if user is already logged in and redirect based on role
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "email") fieldErrors.email = err.message;
          if (err.path[0] === "password") fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Login realizado com sucesso!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-2xl text-gradient">{appName}</span>
              </Link>
              <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
              <p className="text-muted-foreground mt-2">Entre com sua conta para continuar</p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  disabled={loading}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">ou continue com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <div className="flex justify-center w-full bg-transparent overflow-hidden rounded-lg min-h-[40px]">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                      setLoading(true);
                      try {
                        const { error } = await signInWithGoogle(credentialResponse.credential);
                        if (error) {
                          toast.error(error.message || "Erro ao fazer login com Google");
                        } else {
                          toast.success("Login realizado com sucesso!");
                        }
                      } catch (err) {
                        console.error("Google login error:", err);
                        toast.error("Erro ao conectar com Google");
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                  onError={() => {
                    console.error("Google Login integrated error");
                    toast.error("Erro ao conectar com Google");
                  }}
                  width="300"
                  text="signin_with"
                  logo_alignment="left"
                />
              </div>
            </div>

            {/* Sign up link */}
            <p className="text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
