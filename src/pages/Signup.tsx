import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import GitHubLogin, { GitHubSuccessResponse, GitHubErrorResponse } from "react-github-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, CheckCircle, Loader2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { toast } from "sonner";
import { useFormValidation } from "@/hooks/useFormValidation";
import { signupSchema } from "@/schemas";
import { z } from "zod";

const benefits = [
  "Crie agentes ilimitados",
  "Histórico completo de conversas",
  "Suporte prioritário",
  "Acesso a novos recursos",
];

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithGithub, user } = useAuth();
  const { appName } = useAppConfig();
  const [googleLoading, setGoogleLoading] = useState(false);

  const { form, isSubmitting, handleSubmit, submitError } = useFormValidation<SignupFormValues>({
    schema: signupSchema,
    onSubmit: async (data) => {
      const { error } = await signUp(data.email, data.password, data.fullName);

      if (error) {
        if (error.message.includes("already registered")) {
          throw new Error("Este email já está cadastrado. Tente fazer login.");
        }
        throw error;
      }

      toast.success("Conta criada com sucesso! Você já está logado.");
    },
  });

  // Show error toast if submission fails
  useEffect(() => {
    if (submitError) {
      toast.error(submitError);
    }
  }, [submitError]);

  // Redirect based on user role after signup
  useEffect(() => {
    if (user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    formState: { errors },
  } = form;

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
                Milhares de empresas já usam o {appName} para automatizar tarefas e aumentar a
                produtividade.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 bg-sidebar-accent rounded-xl px-5 py-4"
                >
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
                    "O {appName} transformou a forma como nossa equipe trabalha. Economia de 10+
                    horas por semana!"
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
                <span className="font-bold text-2xl">{appName}</span>
              </Link>
              <h1 className="text-3xl font-bold">Criar sua conta</h1>
              <p className="text-muted-foreground mt-2">
                Comece gratuitamente, sem cartão de crédito
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  placeholder="Seu nome"
                  className="h-12"
                  disabled={isSubmitting}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-12"
                  disabled={isSubmitting}
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="h-12"
                  disabled={isSubmitting}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">ou cadastre-se com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-center w-full bg-transparent overflow-hidden rounded-lg min-h-[40px]">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                      setGoogleLoading(true);
                      try {
                        const { error } = await signInWithGoogle(credentialResponse.credential);
                        if (error) {
                          toast.error(error.message || "Erro ao cadastrar com Google");
                        } else {
                          toast.success("Conta criada com sucesso!");
                        }
                      } catch (err) {
                        console.error("Google signup error:", err);
                        toast.error("Erro ao conectar com Google");
                      } finally {
                        setGoogleLoading(false);
                      }
                    }
                  }}
                  onError={() => {
                    console.error("Google Signup Integrated Error");
                    toast.error("Erro ao conectar com Google");
                  }}
                  theme="filled_black"
                  shape="rectangular"
                  width="210"
                  text="signup_with"
                  logo_alignment="left"
                />
              </div>

              <GitHubLogin
                clientId={import.meta.env.VITE_GITHUB_CLIENT_ID || ""}
                onSuccess={async (response: GitHubSuccessResponse) => {
                  const token = response.code;

                  if (token) {
                    setGoogleLoading(true);
                    try {
                      const { error } = await signInWithGithub(token);
                      if (error) {
                        toast.error(error.message || "Erro ao cadastrar com GitHub");
                      } else {
                        toast.success("Conta criada com sucesso!");
                      }
                    } catch (err) {
                      console.error("GitHub signup error:", err);
                      toast.error("Erro ao conectar com GitHub");
                    } finally {
                      setGoogleLoading(false);
                    }
                  }
                }}
                onFailure={(error: GitHubErrorResponse) => {
                  console.error("GitHub Signup Failure:", error);
                  toast.error("Erro ao conectar com GitHub");
                }}
                buttonText="GitHub"
                className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-[#24292e] text-white hover:bg-[#2c3238] transition-all font-medium text-sm shadow-soft cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </GitHubLogin>
            </div>

            {/* Terms */}
            <p className="text-center text-sm text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{" "}
              <a href="#" className="text-primary hover:underline">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline">
                Política de Privacidade
              </a>
            </p>

            {/* Login link */}
            <p className="text-center text-muted-foreground">
              Já tem uma conta?{" "}
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
