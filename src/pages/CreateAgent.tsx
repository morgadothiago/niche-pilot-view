import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Sparkles, ArrowLeft } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { Link } from 'react-router-dom';

const niches = [
  'Atendimento ao Cliente',
  'Vendas',
  'Suporte Técnico',
  'Marketing',
  'RH',
  'Financeiro',
  'Jurídico',
  'Saúde',
  'Educação',
  'Imobiliário',
  'Outro',
];

const tones = [
  'Profissional',
  'Amigável',
  'Formal',
  'Casual',
  'Técnico',
  'Empático',
];

export default function CreateAgent() {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
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

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">Informações básicas</h2>
                  <p className="text-sm text-muted-foreground">Defina o nome e nicho do seu agente</p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do agente</Label>
                    <Input id="name" placeholder="Ex: Assistente de Vendas" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Nicho de atuação</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nicho" />
                      </SelectTrigger>
                      <SelectContent>
                        {niches.map((niche) => (
                          <SelectItem key={niche} value={niche.toLowerCase()}>
                            {niche}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva o que seu agente faz e como ele pode ajudar seus clientes..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Personality */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-semibold">Personalidade</h2>
                  <p className="text-sm text-muted-foreground">Configure o comportamento do agente</p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tom de voz</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tom de voz" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone} value={tone.toLowerCase()}>
                          {tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rules">Regras e diretrizes</Label>
                  <Textarea 
                    id="rules" 
                    placeholder="Defina regras específicas para o comportamento do agente. Ex: Sempre responder em português formal, não fazer suposições sem perguntar, incluir exemplos práticos..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Separe cada regra em uma nova linha para melhor organização</p>
                </div>
              </div>
            </div>

            {/* Advanced */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Configurações avançadas</h2>
                    <p className="text-sm text-muted-foreground">Ajustes opcionais</p>
                  </div>
                </div>
                <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">Opcional</span>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="context">Contexto adicional</Label>
                  <Textarea 
                    id="context" 
                    placeholder="Adicione informações de contexto que o agente deve sempre considerar. Ex: Informações sobre sua empresa, produtos, público-alvo..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examples">Exemplos de interação</Label>
                  <Textarea 
                    id="examples" 
                    placeholder="Forneça exemplos de perguntas e respostas ideais para treinar o comportamento do agente..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/agents">Cancelar</Link>
              </Button>
              <Button variant="hero" className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Criar agente
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
