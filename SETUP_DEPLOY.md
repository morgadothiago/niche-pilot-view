# Guia de Configuração: Testes e Deploy

## 1. Configuração dos Testes (Vitest)

### Executar testes localmente

```bash
# Rodar testes uma vez
npm run test

# Rodar testes em modo watch (observa mudanças)
npm run test:watch

# Rodar testes com cobertura
npm run test:coverage

# Rodar testes com interface visual
npm run test:ui
```

### Arquivos de teste existentes

```
src/
├── test/
│   ├── setup.ts          # Configuração global dos testes
│   └── example.test.ts   # Teste de exemplo
├── hooks/
│   ├── useUserRole.test.ts
│   └── useSubscription.test.ts
└── contexts/
    └── AuthContext.test.tsx
```

### Criar novos testes

Crie arquivos com extensão `.test.ts` ou `.test.tsx`:

```typescript
// src/components/MeuComponente.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MeuComponente from "./MeuComponente";

describe("MeuComponente", () => {
  it("deve renderizar corretamente", () => {
    render(<MeuComponente />);
    expect(screen.getByText("Texto esperado")).toBeInTheDocument();
  });
});
```

---

## 2. Configuração do GitHub Actions (CI/CD)

### Secrets necessários no GitHub

1. Acesse: https://github.com/SEU_USUARIO/niche-pilot-view/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Adicione:

| Nome                    | Valor                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| `VITE_GOOGLE_CLIENT_ID` | `1057915139605-grl0c89baua30s8h0n0l41sjg18b5470.apps.googleusercontent.com` |
| `VITE_PUBLIC_API_URL`   | `https://api-saas-1.onrender.com`                                           |
| `VERCEL_TOKEN`          | Token da Vercel (veja seção 3)                                              |

### Resolver problema de billing do GitHub Actions

Se aparecer erro "account is locked due to a billing issue":

1. Vá em: https://github.com/settings/billing/payment_information
2. Adicione um método de pagamento (cartão de crédito)
3. Mesmo para repos públicos, o GitHub pode exigir isso

**OU**

1. Vá em: https://github.com/settings/billing/spending_limit
2. Verifique se há um spending limit bloqueando
3. Aumente ou remova o limite

**OU**

- Aguarde o reset mensal (seu limite reseta em 4 dias)

---

## 3. Configuração da Vercel

### Opção A: Deploy Automático (Recomendado)

A Vercel faz deploy automático a cada push, sem precisar do GitHub Actions.

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto **niche-pilot-view**
3. Vá em **Settings** → **Environment Variables**
4. Adicione as variáveis:

| Nome                    | Valor                                                                       | Environments                     |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| `VITE_GOOGLE_CLIENT_ID` | `1057915139605-grl0c89baua30s8h0n0l41sjg18b5470.apps.googleusercontent.com` | Production, Preview, Development |
| `VITE_PUBLIC_API_URL`   | `https://api-saas-1.onrender.com`                                           | Production, Preview, Development |

5. Vá em **Deployments**
6. Clique nos **3 pontinhos** do último deploy → **Redeploy**

### Opção B: Deploy via GitHub Actions

Se quiser usar o CI/CD do GitHub para controlar o deploy:

1. Gere um token na Vercel:
   - Acesse: https://vercel.com/account/tokens
   - Clique em **Create Token**
   - Nome: `github-actions`
   - Copie o token

2. Adicione o token no GitHub:
   - Vá em: https://github.com/SEU_USUARIO/niche-pilot-view/settings/secrets/actions
   - Clique em **New repository secret**
   - Nome: `VERCEL_TOKEN`
   - Valor: (cole o token)

3. Vincule o projeto (rode no terminal):
   ```bash
   npx vercel link
   ```

---

## 4. Configuração do Google Login

Para o login com Google funcionar na Vercel:

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Edite seu **OAuth 2.0 Client ID**
3. Em **Authorized JavaScript origins**, adicione:
   - `https://seu-projeto.vercel.app`
   - `https://niche-pilot-view.vercel.app` (ou sua URL)

4. Em **Authorized redirect URIs**, adicione:
   - `https://seu-projeto.vercel.app`
   - `https://niche-pilot-view.vercel.app`

5. Clique em **Save**

---

## 5. Fluxo Completo de Deploy

### Com GitHub Actions funcionando:

```
Push → GitHub Actions (Lint + TypeCheck + Tests) → Build → Deploy Vercel
```

### Sem GitHub Actions (deploy direto):

```
Push → Vercel detecta → Build automático → Deploy
```

---

## 6. Comandos Úteis

```bash
# Verificar lint
npm run lint

# Verificar tipos TypeScript
npm run typecheck

# Rodar testes
npm run test

# Build local
npm run build

# Rodar todos os checks (como no CI)
npm run lint && npm run typecheck && npm run test && npm run build
```

---

## 7. Troubleshooting

### Testes falhando no CI mas passando localmente

- Verifique se as variáveis de ambiente estão configuradas nos secrets do GitHub
- Rode `npm run test` localmente para comparar

### Deploy na Vercel não atualiza

1. Verifique se o push foi feito: `git log --oneline -1`
2. Verifique o status no dashboard da Vercel
3. Force um redeploy manual se necessário

### Login com Google não funciona na Vercel

1. Verifique as variáveis de ambiente na Vercel
2. Verifique as URLs autorizadas no Google Cloud Console
3. Limpe o cache do navegador e tente novamente

---

## 8. Estrutura do CI/CD

```yaml
# .github/workflows/ci.yml

Pipeline: ├── Lint (paralelo)
  ├── TypeScript Check (paralelo)
  ├── Tests (paralelo)
  │
  └── Build (após todos passarem)
  │
  └── Deploy to Vercel (apenas na branch main)
```

---

## Links Úteis

- **GitHub Actions**: https://github.com/SEU_USUARIO/niche-pilot-view/actions
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Cloud Console**: https://console.cloud.google.com/apis/credentials
- **GitHub Billing**: https://github.com/settings/billing
