import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ArrowLeft, Loader2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const emojiAvatars = ["🤖", "🧠", "💡", "🎯", "🚀", "💬", "⚡", "🔮", "🎨", "📊", "💼", "🛠️"];

export default function CreateAgent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "🤖",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Você precisa estar logado para criar um agente");
      navigate("/login");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Nome do agente é obrigatório");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/agents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     user_id: user.id,
      //     name: formData.name.trim(),
      //     avatar: formData.avatar,
      //     description: formData.description.trim() || null,
      //   }),
      // });
      // if (!response.ok) throw new Error('Failed to create agent');

      toast.success("Agente criado com sucesso!");
      navigate("/agents");
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("Erro ao criar agente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
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
              Configure seu agente de IA personalizado
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">Informações do agente</h2>
                  <p className="text-sm text-muted-foreground">Defina nome, avatar e descrição</p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {/* Avatar Selection */}
                <div className="space-y-3">
                  <Label>Avatar</Label>
                  <div className="flex flex-wrap gap-2">
                    {emojiAvatars.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, avatar: emoji }))}
                        className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                          formData.avatar === emoji
                            ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do agente *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: ChatGPT, Assistente de Vendas..."
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o que seu agente faz..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" asChild>
                <Link to="/agents">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Criar agente"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
