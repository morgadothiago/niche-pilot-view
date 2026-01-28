# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploy em Produção & Telemetria (Sentry)

Seguem passos claros para garantir que o projeto faça build e envie erros para o Sentry em produção.

- Instalar dependências e gerar lockfile (use um único gerenciador — recomendado: `yarn`):

```bash
yarn install
# commit do lockfile gerado
git add yarn.lock package.json
git commit -m "chore: lockfile"
git push
```

- Variáveis de ambiente necessárias no provedor de deploy (Vercel, Netlify, etc.):
  - `VITE_SENTRY_DSN` — DSN do seu projeto no Sentry (obrigatório para ativar captura).
  - `VITE_COMMIT_SHA` — SHA do commit/build (opcional, recomendado para correlação de releases).
  - `SENTRY_TRACES_SAMPLE_RATE` — (opcional) taxa de amostragem para tracing.

- Build e verificação local antes do deploy:

```bash
yarn build
```

- Estratégias disponíveis no repositório:
  - Telemetria/Sentry removidos do projeto para evitar problemas de build.

- CI/Deploy notes:
  - Sempre comite o lockfile (`yarn.lock` ou `package-lock.json`) no repositório para garantir reproduzibilidade no CI.
  - No GitHub Actions / Vercel, configure as variáveis de ambiente acima. Opcionalmente exporte `VITE_COMMIT_SHA=$(git rev-parse --short HEAD)` durante o pipeline.

Se quiser, eu atualizo o `README` com um exemplo de GitHub Action que injeta `VITE_COMMIT_SHA` e executa o build — quer que eu adicione esse exemplo?
