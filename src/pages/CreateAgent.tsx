import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { niches, tones } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

export default function CreateAgent() {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-8 max-w-3xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/agents">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Agentes
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Criar novo agente</h1>
            </div>
            <p className="text-muted-foreground">
              Configure seu agente de IA personalizado para atender suas necessidades específicas
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Basic Info */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Informações básicas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do agente</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Marketing Expert"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche">Nicho / Área</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione um nicho" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Objetivo do agente</Label>
                <Textarea
                  id="objective"
                  placeholder="Descreva o objetivo principal deste agente. Ex: Ajudar na criação de estratégias de marketing digital e copywriting..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* Personality */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Personalidade</h2>

              <div className="space-y-2">
                <Label htmlFor="tone">Tom de voz</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione o tom de voz" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {tones.map((tone) => (
                      <SelectItem key={tone} value={tone}>
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
                  className="min-h-[150px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Separe cada regra em uma nova linha para melhor organização
                </p>
              </div>
            </div>

            {/* Advanced (optional) */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Configurações avançadas</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Opcional
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contexto adicional</Label>
                <Textarea
                  id="context"
                  placeholder="Adicione informações de contexto que o agente deve sempre considerar. Ex: Informações sobre sua empresa, produtos, público-alvo..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="examples">Exemplos de interação</Label>
                <Textarea
                  id="examples"
                  placeholder="Forneça exemplos de perguntas e respostas ideais para treinar o comportamento do agente..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <Link to="/agents">Cancelar</Link>
              </Button>
              <Button variant="hero" size="lg" className="flex-1" asChild>
                <Link to="/agents">
                  <Sparkles className="w-4 h-4" />
                  Criar agente
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
}
