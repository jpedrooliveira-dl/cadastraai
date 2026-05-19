# 🚀 Sistema Full-Stack de Cadastro e Controle de Acesso

Um sistema web completo, moderno e seguro desenvolvido como parte dos estudos em **Sistemas de Informação**. O projeto implementa um ecossistema Full-Stack com foco em autenticação, controle de acesso baseado em funções (RBAC), integridade de dados e containerização com **Docker**.

## 📷 Screenshot

![Screenshot do sistema](https://i.ibb.co/fgCs47x/Screenshot-2026-05-16-152640.png)

---

## 🎨 Design & Identidade Visual

Interface refinada seguindo uma estética **Minimalista Dark Mode**, com destaques em **Ciano Neon** e elementos de feedback visual dinâmicos (badges brilhantes para níveis de acesso e transições suaves).

---

## ⚙️ Funcionalidades Principais

### 🔒 1. Segurança & Controle de Acesso (RBAC)

- **Sessões Seguras:** Utilização de `localStorage` para persistência temporária de credenciais ativas.
- **Cláusulas de Guarda (Gatekeepers):** Bloqueio de rotas no Frontend. Se um usuário comum tentar acessar a URL administrativa (`usuarios.html`), o sistema valida o perfil (`usuarioTipo`) e redireciona imediatamente.
- **Logout Seguro:** Limpeza completa do cache de sessão (`localStorage.clear()`) para impedir acesso indevido por histórico de navegação.

### 👥 2. Cadastro Inteligente & Sanitização (CRUD)

- **Máscara de Entrada Dinâmica:** Formatação em tempo real do campo de telefone `(XX) XXXXX-XXXX`.
- **Higienização com Regex:** O JavaScript limpa os dados brutos enviando apenas números para o MySQL, garantindo integridade no banco.
- **Validação Rígida:** Impede envio de dados com número de telefone fora dos 11 dígitos obrigatórios (DDD + 9 dígitos).

### 📊 3. Painel Administrativo

- **Renderização Dinâmica:** Tabela de usuários construída em tempo real via Fetch API consumindo rotas do Node.js.
- **Badges de Status:** Destaque visual para diferenciar `ADMIN` de `COMUM`.
- **Exclusão de Usuários:** Botão de delete com confirmação de segurança, disparando requisição HTTP `DELETE` no backend.

### 🐳 4. Infraestrutura com Docker

- **Containerização completa:** Aplicação Node.js e banco de dados MySQL rodando em containers isolados.
- **Docker Compose:** Orquestração dos serviços com um único comando.
- **Healthcheck:** O container da aplicação aguarda o banco estar saudável antes de iniciar, eliminando erros de conexão na inicialização.
- **Volumes persistentes:** Dados do MySQL sobrevivem a reinicializações dos containers.
- **Pool de conexões:** Conexão com o banco resiliente a quedas e reconexões automáticas.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Efeitos Glow/Neon), JavaScript Nativo (ES6+, Async/Await, Fetch API)
- **Backend:** Node.js, Express.js (API REST)
- **Banco de Dados:** MySQL 8
- **Infraestrutura:** Docker, Docker Compose
- **Ambiente:** Ubuntu Server, WSL2, Git & GitHub

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### 1. Clone o repositório

```bash
git clone https://github.com/jpedrooliveira-dl/cadastraai.git
cd cadastraai
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
PORT=3000
DB_HOST=mysql
DB_USER=cadastraai
DB_PASS=sua_senha
DB_NAME=cadastraai
```

> ⚠️ `DB_HOST=mysql` é o nome do container — não use `localhost`!

### 3. Suba os containers

```bash
docker compose up --build -d
```

### 4. Acesse o sistema

```
http://localhost:3000
```

---

## 📂 Estrutura do Projeto

```
cadastraai/
├── public/
│   ├── assets/
│   │   ├── img/               # Logotipos e mídias visuais
│   │   └── pages/             # Telas secundárias (perfil.html, usuarios.html)
│   ├── css/
│   │   └── style.css          # Estilização completa (Neon Dark Mode)
│   └── js/
│       ├── login.js           # Autenticação
│       ├── perfil.js          # Exibição do usuário logado
│       ├── script.js          # Cadastro de usuários
│       └── usuarios.js        # Painel administrativo e delete
├── index.html                 # Tela principal
├── server.js                  # API Backend Node.js + Pool MySQL
├── Dockerfile                 # Imagem Docker da aplicação
├── docker-compose.yml         # Orquestração dos containers
├── .env.example               # Modelo de variáveis de ambiente
└── README.md
```

---

## 🗄️ Estrutura do Banco de Dados

```sql
CREATE TABLE usuarios (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nome             VARCHAR(100) NOT NULL,
  email            VARCHAR(100) NOT NULL UNIQUE,
  telefone         VARCHAR(20)  NOT NULL UNIQUE,
  senha            VARCHAR(255) NOT NULL,
  data_de_cadastro TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  tipo             VARCHAR(20)  DEFAULT 'comum'
);
```

---

## 📡 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/cadastrar` | Cadastra novo usuário |
| `POST` | `/login` | Autentica usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `DELETE` | `/usuarios/:id` | Remove um usuário |