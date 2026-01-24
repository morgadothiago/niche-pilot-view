import { Link } from "react-router-dom";
import { Bot, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">AgentChat</span>
            </Link>
            <p className="text-sidebar-foreground/70 text-sm">
              Plataforma de agentes de IA especializados para transformar sua produtividade.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Recursos
                </a>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Preços
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Integrações
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Carreiras
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Termos
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sidebar-border text-center text-sidebar-foreground/50 text-sm">
          © 2024 AgentChat. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
