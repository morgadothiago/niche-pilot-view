import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export default function Privacy() {
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
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Política de Privacidade</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Última atualização: Janeiro de 2026</p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informações que Coletamos</h2>
              <p>Coletamos informações que você nos fornece diretamente, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Informações de conta (nome, email, senha)</li>
                <li>Informações de perfil (foto, preferências)</li>
                <li>Dados de pagamento (processados por terceiros seguros)</li>
                <li>Conteúdo das conversas com agentes</li>
                <li>Configurações de agentes personalizados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Como Usamos suas Informações</h2>
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar notificações relacionadas</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Treinar e melhorar nossos modelos de IA</li>
                <li>Comunicar sobre atualizações e promoções</li>
                <li>Detectar, investigar e prevenir fraudes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Compartilhamento de Dados</h2>
              <p>Não vendemos suas informações pessoais. Podemos compartilhar dados com:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provedores de serviços que auxiliam nossas operações</li>
                <li>Parceiros de pagamento para processamento de transações</li>
                <li>Autoridades legais quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas
                informações, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pelo tempo necessário para fornecer os serviços
                solicitados ou conforme exigido por lei. Você pode solicitar a exclusão de seus
                dados a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Seus Direitos</h2>
              <p>Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Exportar seus dados em formato legível</li>
                <li>Optar por não receber comunicações de marketing</li>
                <li>Revogar consentimentos previamente concedidos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">
                7. Cookies e Tecnologias Similares
              </h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o
                uso do serviço e personalizar conteúdo. Você pode gerenciar suas preferências de
                cookies nas configurações do navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Dados de Menores</h2>
              <p>
                Nosso serviço não é destinado a menores de 18 anos. Não coletamos intencionalmente
                informações de menores. Se tomarmos conhecimento de que coletamos dados de um menor,
                excluiremos essas informações imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações
                significativas por email ou através de um aviso em nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contato</h2>
              <p>
                Para questões sobre esta Política de Privacidade ou exercer seus direitos, entre em
                contato:
              </p>
              <p className="mt-4">
                Email: privacidade@agentchat.com
                <br />
                Endereço: São Paulo, SP - Brasil
              </p>
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
