# Plano de Aulas

O projeto **Plano de Aulas** é uma aplicação web full-stack projetada para ajudar educadores a criar, gerenciar e visualizar planos de aula de forma eficiente. A aplicação conta com um sistema de autenticação de usuários, permitindo que cada educador tenha acesso seguro aos seus próprios planos de aula.

A arquitetura é baseada em um monorepo, contendo o frontend em React e o backend construído com Supabase.

## URL da aplicacao

[Link](https://vite-brown-seven.vercel.app/)

- Para acessar, basta utilizar um e-mail válido — a autenticação é gerenciada automaticamente via Supabase que irá enviar um e-mail de confirmação.
- Email e senha para testes:
  - email: <thought.cabinet@proton.me>
  - senha: 9h2gT?XY67k\

---

## Índice

- [Instruções de Instalação](#instruções-de-instalação)
- [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Decisões Técnicas](#decisões-técnicas)
- [Desafios Encontrados e Soluções](#desafios-encontrados-e-soluções)

---

## Instruções de Instalação

Para configurar o ambiente de desenvolvimento local, siga os passos abaixo.

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/DanielZanad/plano_aulas.git
   cd plano_aulas
   ```

2. **Instale as dependências do Frontend:**

   ```bash
   cd web
   npm install
   ```

3. **Instale as dependências do Backend (Supabase):**
   A CLI do Supabase utiliza Deno e Docker, certifique-se de tê-los instalados.

   ```bash
   cd supabase
   npm install # Instala o cliente Supabase para o projeto
   ```

## Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para se conectar com o Supabase.

1. Navegue até a pasta `web`.
2. Crie uma cópia do arquivo `.env-example` e renomeie para `.env`:

   ```bash
   cp .env-example .env
   ```

3. Abra o arquivo `.env` e preencha com as credenciais do seu projeto Supabase. Você pode encontrá-las no painel do seu projeto em **Project Settings > API**.

   ```dotenv
   # URL do seu projeto Supabase
   VITE_SUPABASE_URL="SUA_SUPABASE_URL"

   # Chave anônima (pública) do seu projeto Supabase
   VITE_SUPABASE_KEY="SUA_SUPABASE_ANON_KEY"

    # URL das Edge Functions
   VITE_SUPABASE_FUNCTIONS_URL="SUA_SUPABASE_FUNCTIONS_URL"
   ```

## Como Executar o Projeto

Para executar o projeto, você precisa iniciar o backend (Supabase) e o frontend (React) separadamente.

### Backend (Supabase)

1. **Instale a CLI do Supabase (se ainda não tiver):**

   ```bash
   npm install -g supabase
   ```

2. **Faça o login na sua conta Supabase:**

   ```bash
   supabase login
   ```

3. **Inicie os serviços do Supabase localmente:**
   Navegue até a pasta `supabase` e execute:

   ```bash
   supabase start
   ```

   Este comando iniciará um container Docker com a imagem do Supabase. Ao final, ele exibirá as credenciais locais (API URL e anon key) que você pode usar no seu arquivo `.env` do frontend.

4. **Aplique as migrações do banco de dados:**
   Para criar as tabelas e políticas de segurança, execute:

   ```bash
   supabase db reset
   ```

### Frontend (React)

1. Navegue até a pasta `web`.
2. Verifique se o arquivo `.env` está configurado corretamente com as credenciais do Supabase (local ou em produção).
3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## Decisões Técnicas

- **Monorepo:** A estrutura de monorepo foi escolhida para facilitar o gerenciamento e a co-localização do código do frontend e do backend, mantendo-os em um único repositório.
- **Frontend:**
  - **React com Vite:** Para um desenvolvimento rápido e uma experiência de build otimizada.
  - **TypeScript:** Garante a segurança de tipos e melhora a manutenibilidade do código.
  - **Shadcn/UI:** Biblioteca de componentes que oferece blocos de construção acessíveis e estilizáveis, baseados em Radix UI e Tailwind CSS, permitindo a criação de uma UI consistente e moderna.
- **Backend:**
  - **Supabase:** Utilizado como uma solução de backend-as-a-service completa, provendo:
    - **Autenticação:** Gerenciamento de usuários (cadastro e login).
    - **Banco de Dados Postgres:** Armazenamento de dados relacionais para usuários e planos de aula.
    - **Edge Functions:** Funções serverless em Deno/TypeScript para executar a lógica de negócio, como a criação e listagem de planos de aula.
- **Inteligência Artificial:**
  - **Google Gemini** (gemini-2.0-flash-exp): O modelo foi escolhido por seu equilíbrio entre performance e custo. Sendo um modelo "flash", ele oferece respostas extremamente rápidas, ideal para funcionalidades interativas como a geração e sugestão de conteúdo para os planos de aula diretamente na interface do usuário, sem causar longas esperas.

## Desafios Encontrados e Soluções

1. Integração entre React e Supabase
   - Implementação de hooks customizados (useListLessons, useAuth) para isolar a lógica de dados
2. Manutenção da experiência do usuário entre login/logout
   - Gerenciamento de estado global e persistência de sessão Supabase


