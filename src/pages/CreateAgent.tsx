import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  ArrowLeft,
  ArrowRight,
  Loader2,
  UserCircle,
  Sparkles,
  Wand2,
  Settings2,
  Lock,
} from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { agentService } from "@/services/agentService";

const emojiAvatars = ["🤖", "🧠", "💡", "🎯", "🚀", "💬", "⚡", "🔮", "🎨", "📊", "💼", "🛠️"];

const TABS_ORDER = ["identity", "personality", "behavior", "settings"];

export default function CreateAgent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription, loading: loadingSub } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("identity");
  const [formData, setFormData] = useState({
    name: "",
    avatar: "🤖",
    description: "",
    prompt: "",
    category: "",
    type: "",
    tone: "",
    style: "",
    focus: "",
    rules: "",
    visibility: "PRIVATE" as "PRIVATE" | "PUBLIC",
  });

  const isFreePlan = subscription?.plan === "free";

  const handleNext = () => {
    if (currentTab === "identity" && !formData.name.trim()) {
      toast.error("Nome do agente é obrigatório");
      return;
    }

    const currentIndex = TABS_ORDER.indexOf(currentTab);
    if (currentIndex < TABS_ORDER.length - 1) {
      setCurrentTab(TABS_ORDER[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = TABS_ORDER.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(TABS_ORDER[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentTab !== "settings") {
      handleNext();
      return;
    }

    if (!user) {
      toast.error("Você precisa estar logado para criar um agente");
      navigate("/login");
      return;
    }

    if (isFreePlan) {
      toast.error("Faça um upgrade para criar agentes");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Nome do agente é obrigatório");
      setCurrentTab("identity");
      return;
    }

    setLoading(true);
    try {
      await agentService.createAgent({
        name: formData.name.trim(),
        avatar: formData.avatar,
        description: formData.description.trim() || undefined,
        prompt: formData.prompt.trim() || undefined,
        category: formData.category.trim() || undefined,
        type: formData.type.trim() || undefined,
        tone: formData.tone.trim() || undefined,
        style: formData.style.trim() || undefined,
        focus: formData.focus.trim() || undefined,
        rules: formData.rules.trim() || undefined,
        visibility: formData.visibility,
      });

      toast.success("Agente criado com sucesso!");
      navigate("/agents");
    } catch (error: unknown) {
      console.error("Error creating agent:", error);
      toast.error("Erro ao criar agente");
    } finally {
      setLoading(false);
    }
  };

  if (loadingSub) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (isFreePlan) {
    return (
      <PageTransition>
        <DashboardLayout>
          <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Funcionalidade Premium</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              A criação de agentes personalizados está disponível apenas em nossos planos pagos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/agents">Voltar</Link>
              </Button>
              <Button asChild className="gradient-primary">
                <Link to="/pricing">Ver Planos e Preços</Link>
              </Button>
            </div>
          </div>
        </DashboardLayout>
      </PageTransition>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Prevents Enter from submitting the form
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar para agentes</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">Criar novo agente</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Personalize a identidade e o comportamento da sua IA
            </p>
          </div>

          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-muted/50">
                <TabsTrigger value="identity" className="py-2.5 gap-2">
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Identidade</span>
                </TabsTrigger>
                <TabsTrigger
                  value="personality"
                  className="py-2.5 gap-2"
                  disabled={!formData.name.trim()}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Personalidade</span>
                </TabsTrigger>
                <TabsTrigger
                  value="behavior"
                  className="py-2.5 gap-2"
                  disabled={!formData.name.trim()}
                >
                  <Wand2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Comportamento</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="py-2.5 gap-2"
                  disabled={!formData.name.trim()}
                >
                  <Settings2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Configurações</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 bg-card rounded-xl shadow-soft border border-border p-4 sm:p-8">
                {/* Identidade */}
                <TabsContent value="identity" className="space-y-6 mt-0">
                  <div className="space-y-3">
                    <Label className="text-base">Escolha um Avatar</Label>
                    <div className="flex flex-wrap gap-2.5">
                      {emojiAvatars.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, avatar: emoji }))}
                          className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all duration-200 ${
                            formData.avatar === emoji
                              ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-4 ring-offset-background scale-110 shadow-lg"
                              : "bg-muted hover:bg-muted/80 opacity-60 hover:opacity-100"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Nome do agente *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ex: ChatGPT, Assistente de Vendas..."
                      className="bg-muted/30 focus:bg-background h-12"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base">
                      Descrição curta
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Uma breve apresentação do que o agente faz..."
                      rows={3}
                      className="bg-muted/30 focus:bg-background resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </div>
                </TabsContent>

                {/* Personalidade */}
                <TabsContent value="personality" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="focus" className="text-base">
                      Foco Principal
                    </Label>
                    <Input
                      id="focus"
                      placeholder="Ex: Suporte técnico especializado em Imóveis"
                      className="bg-muted/30 focus:bg-background h-12"
                      value={formData.focus}
                      onChange={(e) => setFormData((prev) => ({ ...prev, focus: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tone" className="text-base">
                        Tom de voz
                      </Label>
                      <Input
                        id="tone"
                        placeholder="Ex: Profissional, Amigável, Engraçado..."
                        className="bg-muted/30 focus:bg-background h-12"
                        value={formData.tone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="style" className="text-base">
                        Estilo de escrita
                      </Label>
                      <Input
                        id="style"
                        placeholder="Ex: Formal, Técnico, Conciso..."
                        className="bg-muted/30 focus:bg-background h-12"
                        value={formData.style}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, style: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Comportamento */}
                <TabsContent value="behavior" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-base">
                      Prompt (Instruções detalhadas)
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Defina como a IA deve se comportar e qual sua persona.
                    </p>
                    <Textarea
                      id="prompt"
                      placeholder="Você é um assistente prestativo da empresa X..."
                      rows={6}
                      className="bg-muted/30 focus:bg-background min-h-[150px]"
                      value={formData.prompt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rules" className="text-base">
                      Regras e Limites
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      O que o agente NÃO pode fazer ou regras inegociáveis.
                    </p>
                    <Textarea
                      id="rules"
                      placeholder="Nunca mencione concorrentes, não dê descontos acima de 10%..."
                      rows={4}
                      className="bg-muted/30 focus:bg-background"
                      value={formData.rules}
                      onChange={(e) => setFormData((prev) => ({ ...prev, rules: e.target.value }))}
                    />
                  </div>
                </TabsContent>

                {/* Configurações */}
                <TabsContent value="settings" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base">
                        Categoria *
                      </Label>
                      <Input
                        id="category"
                        placeholder="Ex: Vendas, Atendimento..."
                        className="bg-muted/30 focus:bg-background h-12"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, category: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-base">
                        Tipo de Agente *
                      </Label>
                      <Input
                        id="type"
                        placeholder="Ex: Assistente Virtual"
                        className="bg-muted/30 focus:bg-background h-12"
                        value={formData.type}
                        onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                      />
                    </div>
                  </div>

                  {user?.role === "admin" && (
                    <div className="space-y-2">
                      <Label htmlFor="visibility" className="text-base">
                        Visibilidade
                      </Label>
                      <Select
                        value={formData.visibility}
                        onValueChange={(value: "PRIVATE" | "PUBLIC") =>
                          setFormData((prev) => ({ ...prev, visibility: value }))
                        }
                      >
                        <SelectTrigger id="visibility" className="h-12 bg-muted/30">
                          <SelectValue placeholder="Selecione a visibilidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PRIVATE">🔒 Privado (Apenas eu)</SelectItem>
                          <SelectItem value="PUBLIC">🌐 Público (Todos podem ver)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4">
              {currentTab === "identity" ? (
                <Button type="button" variant="ghost" asChild className="h-12 sm:px-8">
                  <Link to="/agents">Cancelar</Link>
                </Button>
              ) : (
                <Button type="button" variant="ghost" onClick={handleBack} className="h-12 sm:px-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}

              {currentTab === "settings" ? (
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.name.trim() ||
                    !formData.category.trim() ||
                    !formData.type.trim()
                  }
                  className="h-12 sm:px-12 shadow-md gradient-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      Criar Agente
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={currentTab === "identity" && !formData.name.trim()}
                  className="h-12 sm:px-12 shadow-md"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
