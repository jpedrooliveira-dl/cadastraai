# 🚀 Sistema Full-Stack de Cadastro e Controle de Acesso

Um sistema web completo, moderno e seguro desenvolvido como parte dos estudos em **Sistemas de Informação**. O projeto implementa um ecossistema Full-Stack com foco em autenticação, controle de acesso baseado em funções (RBAC), integridade de dados e automação de ambiente de desenvolvimento utilizando **WSL2** e **XAMPP/LAMPP**.

## 📷Screenshot

![Texto Alternativo](https://i.ibb.co/fgCs47x/Screenshot-2026-05-16-152640.png)
---

## 🎨 Design & Identidade Visual
O projeto conta com uma interface de usuário altamente refinada, seguindo uma estética **Minimalista Dark Mode**, com destaques em **Ciano Neon** e elementos de feedback visual dinâmicos (badges brilhantes para níveis de acesso e transições suaves).

---

## ⚙️ Funcionalidades Principais

### 🔒 1. Segurança & Controle de Acesso (RBAC)
* **Sessões Seguras:** Utilização inteligente de `localStorage` para persistência temporária de credenciais ativas.
* **Cláusulas de Guarda (Gatekeepers):** Bloqueio de rotas direto no Frontend. Se um usuário comum tentar acessar a URL administrativa (`usuarios.html`), o sistema valida o crachá (`usuarioTipo`) e o redireciona imediatamente para a página correta.
* **Logout Seguro:** Limpeza completa do cache de sessão (`localStorage.clear()`) para impedir o acesso indevido por histórico de navegação.

### 👥 2. Cadastro Inteligente & Sanitização (CRUD)
* **Máscara de Entrada Dinâmica:** Formatação em tempo real do campo de telefone `(XX) XXXXX-XXXX` melhorando a Experiência do Usuário (UX).
* **Higienização com Regex (Expressões Regulares):** O JavaScript limpa os dados brutos enviando apenas números para o MySQL, garantindo a integridade do banco de dados.
* **Validação Rígida:** Barreira de segurança que impede o envio de dados caso o número não possua exatamente os 11 dígitos obrigatórios (DDD + 9 dígitos).

### 📊 3. Painel Administrativo (Dashboard de Elite)
* **Renderização Dinâmica:** Construção da tabela de usuários em tempo real utilizando a Fetch API para consumir rotas do Node.js.
* **Badges de Status:** Destaque visual customizado via CSS para diferenciar `ADMIN` de `COMUM`.
* **Ações Gerenciais:** Botão de **Exclusão** acoplado diretamente a cada registro com janela de confirmação de segurança, disparando uma requisição com o método HTTP `DELETE` no backend.

### 🤖 4. Automação de Infraestrutura (DevOps)
* **Script Bash Customizado:** Inicialização automatizada de todo o ambiente de desenvolvimento através de um único comando no terminal WSL2:
    * Inicialização assíncrona do serviço LAMPP (Apache + MySQL).
    * Tratamento de *Race Conditions* com pausas estratégicas para estabilização do banco de dados.
    * Limpeza preventiva de portas e remoção de processos zumbis (`fuser -k 3000/tcp`).
    * Abertura automatizada do VS Code e do navegador Brave direto na URL local.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3 Customizado (Efeitos Glow/Neon), JavaScript Nativo (ES6+, Async/Await, Fetch API).
* **Backend:** Node.js, Express.js (Gerenciamento de rotas HTTP RESTful).
* **Banco de Dados:** MySQL (Gerenciado via XAMPP / phpMyAdmin).
* **Ambiente de Desenvolvimento:** WSL2 (Ubuntu Linux), Bash Scripting, VS Code, Git & GitHub.

---

## 📂 Estrutura do Projeto

```text
cadastro_usuario/
├── public/
│   ├── assets/
│   │   ├── img/          # Logotipos e mídias visuais
│   │   └── pages/        # Telas secundárias (perfil.html, usuarios.html, etc.)
│   ├── css/
│   │   └── style.css     # Estilização completa (Neon Dark Mode)
│   └── js/
│       ├── perfil.js     # Regras de exibição do usuário logado
│       └── usuarios.js   # Painel administrativo, Trava de Segurança e Delete
├── server.js             # API Backend Node.js + Conexão MySQL (Connection Pool)
├── index.html            # Tela de Cadastro de Usuários
├── script.sh             # Script de automação Bash para WSL2
└── README.md             # Documentação oficial do projeto