# Guia de Configuração: Login com GitHub 🚀

Este guia explica como configurar corretamente o login social do GitHub no seu projeto, resolvendo os erros de `redirect_uri` e `401 Unauthorized`.

---

## 1. O Fluxo do Login

Para entender por que os erros acontecem, veja como os dados viajam:

1. **Frontend:** Abre a janela do GitHub enviando seu `Client ID`.
2. **GitHub:** O usuário autoriza e o GitHub devolve um `code` para a sua URL de retorno.
3. **Frontend:** Pega esse `code` e envia para a sua **API (Backend)**.
4. **Backend:** Pega o `code` + seu **Client Secret** e pergunta ao GitHub: _"Este código é válido?"_.
5. **GitHub:** Se o Secret bater com o App que gerou o código, ele confirma.
6. **Backend:** Emite o token final para logar você no sistema.

---

## 2. Configuração no GitHub (OAuth App)

No painel de desenvolvedor do GitHub, seu app (**NexusIA**) deve estar assim:

- **Homepage URL:** `http://localhost:8080`
- **Authorization callback URL:** `http://localhost:8080/login`

> [!IMPORTANT]
> Sem o `:8080` no callback, o GitHub bloqueia por segurança e dá o erro: _"The redirect_uri is not associated with this application"_.

---

## 3. Configuração no Frontend (Seu Código)

No seu arquivo `.env`, você deve ter **apenas** o Client ID:

```env
VITE_GITHUB_CLIENT_ID=Ov23linXxWvfCGIQ7TPm
```

> [!WARNING]
> Nunca coloque o **Client Secret** no Frontend. Ele é uma senha e deve ficar escondido no servidor.

---

## 4. O "Pulo do Gato": Configuração no Backend (O Erro 401)

Se você está recebendo erro **401 (Unauthorized)** após a janela do GitHub fechar, o problema está no **Backend**.

### Se o Backend for SEU (Render.com):

Você precisa entrar no painel do **Render** (ou onde sua API estiver hospedada) e atualizar as variáveis de ambiente lá:

1. `GITHUB_CLIENT_ID`: `Ov23linXxWvfCGIQ7TPm`
2. `GITHUB_CLIENT_SECRET`: _(Aquele código de 40 caracteres que você gerou no GitHub)_.

### Se o Backend NÃO for seu:

O servidor que você está usando está configurado para um aplicativo diferente.

- **Solução:** Você deve pedir o **Client ID** correto para o dono da API e usá-lo no seu `.env`. Você não conseguirá usar o seu próprio app (NexusIA) se não puder trocar o Secret no servidor.

---

## checklist de Resolução de Erros

| Erro                            | Causa Provável                       | Solução                                               |
| :------------------------------ | :----------------------------------- | :---------------------------------------------------- |
| **Redirect URI mismatch**       | URL no GitHub está sem `:8080/login` | Ajustar o Callback URL no GitHub.                     |
| **Popup was closed**            | Divergência de URL ou cancelamento   | Mesma solução do Redirect URI.                        |
| **401 Unauthorized**            | Backend não tem o seu Secret         | Atualizar as chaves no painel da Hospedagem (Render). |
| **Origin not allowed (Google)** | Porta 8080 não autorizada            | Adicionar `localhost:8080` no Google Cloud Console.   |
