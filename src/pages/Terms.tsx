import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export default function Terms() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Termos de Serviço</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Última atualização: Janeiro de 2026</p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o AgentChat, você concorda em cumprir e estar vinculado a estes
                Termos de Serviço. Se você não concordar com qualquer parte destes termos, não
                poderá acessar o serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Descrição do Serviço</h2>
              <p>
                O AgentChat é uma plataforma de agentes de inteligência artificial que permite aos
                usuários criar, configurar e interagir com assistentes virtuais personalizados para
                diversos nichos de negócio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Uso Aceitável</h2>
              <p>Você concorda em não usar o serviço para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violar qualquer lei ou regulamento aplicável</li>
                <li>Enviar conteúdo ilegal, ofensivo ou prejudicial</li>
                <li>Tentar acessar sistemas ou dados não autorizados</li>
                <li>Interferir na operação normal do serviço</li>
                <li>Revender ou redistribuir o serviço sem autorização</li>
                <li>Usar bots ou automação não autorizada</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limites de Uso</h2>
              <p>
                Cada plano possui limites específicos de uso, incluindo número de agentes, mensagens
                mensais e funcionalidades disponíveis. Os limites são aplicados conforme o plano
                contratado e podem ser consultados na página de preços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Conta do Usuário</h2>
              <p>
                Você é responsável por manter a confidencialidade de sua conta e senha. Qualquer
                atividade realizada em sua conta é de sua responsabilidade. Notifique-nos
                imediatamente sobre qualquer uso não autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Propriedade Intelectual</h2>
              <p>
                O serviço e seu conteúdo original, recursos e funcionalidades são de propriedade do
                AgentChat e estão protegidos por leis de direitos autorais, marcas registradas e
                outras leis de propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Pagamentos e Reembolsos</h2>
              <p>
                Os pagamentos são processados de forma segura. Reembolsos podem ser solicitados
                dentro de 7 dias após a compra, sujeitos à nossa análise. Créditos não utilizados
                não são reembolsáveis após o período de garantia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitação de Responsabilidade</h2>
              <p>
                O AgentChat não será responsável por quaisquer danos indiretos, incidentais,
                especiais, consequenciais ou punitivos resultantes do uso ou incapacidade de usar o
                serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modificações</h2>
              <p>
                Reservamo-nos o direito de modificar ou substituir estes termos a qualquer momento.
                Alterações materiais serão notificadas com pelo menos 30 dias de antecedência.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco
                pelo email: suporte@agentchat.com
              </p>
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
