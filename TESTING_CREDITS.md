# Guia de Teste do Contador de Créditos 🚀

Para testar as diferentes cores e estados do contador sem precisar de dados reais da API, utilize o arquivo `.env` na raiz do projeto.

## Variáveis de Teste

Adicione ou altere estas linhas no seu arquivo `.env`:

```env
# Define o plano (free, pro, elite)
VITE_TEST_PLAN=pro

# Define o SALDO (quanto você ainda tem para gastar)
VITE_TEST_CREDITS=100

# Define o LIMITE TOTAL (para cálculo da porcentagem)
VITE_TEST_LIMIT=1000
```

---

## Cenários para Testar as Cores

A cor muda baseada na **Porcentagem de Uso** (`(Total - Saldo) / Total`).

### 🟢 Verde (Uso abaixo de 50%)

**Configuração recomendada:**

- `VITE_TEST_CREDITS=800`
- `VITE_TEST_LIMIT=1000`
  _(Isso representa 20% de uso. A barra deve ficar verde e o círculo vazio no início.)_

### 🟡 Amarelo (Uso entre 50% e 74%)

**Configuração recomendada:**

- `VITE_TEST_CREDITS=400`
- `VITE_TEST_LIMIT=1000`
  _(Isso representa 60% de uso. A barra e o círculo ficam amarelos.)_

### 🟠 Laranja (Uso entre 75% e 89%)

**Configuração recomendada:**

- `VITE_TEST_CREDITS=200`
- `VITE_TEST_LIMIT=1000`
  _(Isso representa 80% de uso. Alerta de atenção.)_

### 🔴 Vermelho (Uso acima de 90%)

**Configuração recomendada:**

- `VITE_TEST_CREDITS=50`
- `VITE_TEST_LIMIT=1000`
  _(Isso representa 95% de uso. Alerta crítico.)_

### 🔴 Vermelho Crítico (Saldo Zero)

**Configuração recomendada:**

- `VITE_TEST_CREDITS=0`
- `VITE_TEST_LIMIT=1000`
  _(Uso em 100%. O mostrador ficará com o número 0 centralizado e todo vermelho.)_

---

> [!TIP]
> **Dica:** Sempre que alterar o arquivo `.env`, o Vite reiniciará o servidor automaticamente para aplicar os novos valores no navegador.
