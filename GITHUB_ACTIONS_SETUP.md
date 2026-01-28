# Configuração do GitHub Actions + Vercel

## Como funciona o Pipeline atual

```
Push no GitHub
     ↓
┌─────────────────────────────────┐
│  Lint + TypeCheck + Tests       │  ← Rodam em paralelo
│  (Se qualquer um falhar, PARA)  │
└─────────────────────────────────┘
     ↓ (só se todos passarem)
┌─────────────────────────────────┐
│  Build                          │
└─────────────────────────────────┘
     ↓ (só na branch main)
┌─────────────────────────────────┐
│  Deploy na Vercel               │
└─────────────────────────────────┘
```

---

## Secrets configurados no GitHub

| Nome                    | Descrição                 |
| ----------------------- | ------------------------- |
| `VITE_GOOGLE_CLIENT_ID` | Client ID do Google OAuth |
| `VITE_PUBLIC_API_URL`   | URL da API backend        |
| `VERCEL_TOKEN`          | Token de acesso da Vercel |

---

## Quando o GitHub Actions billing resetar

O limite de minutos reseta todo mês. Quando voltar a funcionar, você tem **2 opções**:

---

### Opção A: GitHub Actions faz tudo (testes + deploy)

**Vantagem:** Deploy só acontece se testes passarem

**Configuração:**

1. Desative o deploy automático na Vercel:
   - Acesse: https://vercel.com/dashboard → seu projeto
   - Vá em **Settings** → **Git**
   - Em **Ignored Build Step**, adicione: `exit 0` (isso cancela o build automático)

2. O GitHub Actions vai:
   - Rodar testes
   - Se passarem, fazer o deploy na Vercel

---

### Opção B: Vercel faz deploy, GitHub Actions só testa (Recomendado)

**Vantagem:** Deploy rápido + notificação se testes falharem

**Como funciona:**

- Vercel faz deploy automático a cada push (rápido)
- GitHub Actions roda testes em paralelo
- Se testes falharem, você recebe notificação no GitHub

**Configuração:**

1. Mantenha a Vercel com deploy automático (já está assim)
2. Modifique o CI para não fazer deploy (veja abaixo)

---

## Arquivo CI/CD simplificado (só testes)

Se quiser a **Opção B**, substitua o `.github/workflows/ci.yml` por:

```yaml
name: CI - Tests Only

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: "20"
  CI: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
      - run: npm install --legacy-peer-deps
      - run: npm run lint -- --max-warnings 10

  typecheck:
    name: TypeScript Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
      - run: npm install --legacy-peer-deps
      - run: npm run typecheck

  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
      - run: npm install --legacy-peer-deps
      - run: npm run test
        env:
          VITE_GOOGLE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_CLIENT_ID }}
          VITE_PUBLIC_API_URL: ${{ secrets.VITE_PUBLIC_API_URL }}

  build:
    name: Build Check
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
      - run: npm install --legacy-peer-deps
      - run: npm run build
        env:
          VITE_GOOGLE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_CLIENT_ID }}
          VITE_PUBLIC_API_URL: ${{ secrets.VITE_PUBLIC_API_URL }}
```

---

## Variáveis de ambiente na Vercel

Já configuradas em: https://vercel.com/dashboard → seu projeto → Settings → Environment Variables

| Nome                    | Valor                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| `VITE_GOOGLE_CLIENT_ID` | `1057915139605-grl0c89baua30s8h0n0l41sjg18b5470.apps.googleusercontent.com` |
| `VITE_PUBLIC_API_URL`   | `https://api-saas-1.onrender.com`                                           |

---

## Comandos úteis locais

```bash
# Rodar todos os checks (como no CI)
npm run lint && npm run typecheck && npm run test && npm run build

# Só testes
npm run test

# Testes com watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

---

## Troubleshooting

### GitHub Actions com erro de billing

- Aguarde o reset mensal do limite
- Ou adicione método de pagamento em: https://github.com/settings/billing/payment_information

### Testes passam local mas falham no CI

- Verifique se os secrets estão configurados no GitHub
- Verifique se `npm install --legacy-peer-deps` está sendo usado

### Deploy na Vercel não atualiza

- Verifique se o push foi feito: `git status`
- Force redeploy manual na Vercel

### Login com Google não funciona

- Verifique variáveis de ambiente na Vercel
- Verifique URLs autorizadas no Google Cloud Console

---

## Links importantes

- **GitHub Actions:** https://github.com/morgadothiago/niche-pilot-view/actions
- **GitHub Secrets:** https://github.com/morgadothiago/niche-pilot-view/settings/secrets/actions
- **GitHub Billing:** https://github.com/settings/billing
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials
