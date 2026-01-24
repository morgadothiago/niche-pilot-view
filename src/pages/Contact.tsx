import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Building2, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido').max(255),
  company: z.string().optional(),
  subject: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres').max(200),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres').max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactOptions = [
  {
    icon: Building2,
    title: 'Plano Enterprise',
    description: 'Soluções personalizadas para grandes empresas com SSO, SLA e suporte dedicado.',
  },
  {
    icon: MessageSquare,
    title: 'Suporte Técnico',
    description: 'Ajuda com problemas técnicos, integrações e uso da plataforma.',
  },
  {
    icon: Mail,
    title: 'Parcerias',
    description: 'Interessado em se tornar parceiro ou revendedor? Entre em contato.',
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(form);
      setErrors({});
      setLoading(true);

      // TODO: Replace with your API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: form.name,
      //     email: form.email,
      //     company: form.company || undefined,
      //     subject: form.subject,
      //     message: form.message,
      //   }),
      // });
      // if (!response.ok) throw new Error('Failed to send message');

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setForm({ name: '', email: '', company: '', subject: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactForm> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ContactForm;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Unexpected error:', error);
        toast.error('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="p-4 border-b border-border">
          <div className="container mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Entre em{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  contato
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Estamos aqui para ajudar. Entre em contato para saber mais sobre nossos planos 
                Enterprise ou obter suporte técnico.
              </p>
            </motion.div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index} className="bg-card border-border hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {/* Form and Info */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-6">Envie sua mensagem</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome *</Label>
                          <Input
                            id="name"
                            placeholder="Seu nome"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            disabled={loading}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            disabled={loading}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa (opcional)</Label>
                        <Input
                          id="company"
                          placeholder="Nome da sua empresa"
                          value={form.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          placeholder="Sobre o que você quer falar?"
                          value={form.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          disabled={loading}
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive">{errors.subject}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem *</Label>
                        <Textarea
                          id="message"
                          placeholder="Descreva sua necessidade em detalhes..."
                          rows={5}
                          value={form.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          disabled={loading}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message}</p>
                        )}
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
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                <Card className="bg-gradient-to-br from-primary to-accent text-white">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold mb-4">Plano Enterprise</h3>
                    <p className="text-white/90 mb-6">
                      Soluções sob medida para empresas que precisam de escala, segurança e suporte premium.
                    </p>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        SSO e autenticação corporativa
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        SLA garantido de 99.9%
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Gerente de conta dedicado
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Deploy on-premise disponível
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Suporte 24/7
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Outras formas de contato</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">contato@agentchat.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Telefone</p>
                          <p className="font-medium">+55 (11) 99999-9999</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
