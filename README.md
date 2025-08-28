# 🎉 Bora Aí

<img src="./Introduction.png" alt="Introduction" width="100%"/>

---

## 📖 Sobre o Projeto

O **Bora Aí** é uma aplicação que permite que amigos organizem seus rolês de forma simples e prática.  
Com ele, você pode criar salas de eventos, dividir os custos, confirmar presença e receber notificações para não perder o encontro.

---

## ✨ Funcionalidades

✅ **Autenticação de Usuário**

- Registro com nome, email e senha.
- Login com geração de token JWT.

✅ **Gestão de Salas (Rooms)**

- Criar salas com título, descrição, data, horário e valor total.
- Associar cada sala ao usuário criador (host).
- Listar todas as salas disponíveis.

✅ **Gestão de Participantes (Guests)**

- Entrar em uma sala existente.
- Confirmar presença no rolê.
- Sair de uma sala quando quiser.
- Marcação de quem é o host e quem são os convidados.

✅ **Notificações**

- Envio de lembrete por email próximo ao evento. _(em construção)_

---

## 🛠️ Tecnologias Utilizadas

### **Backend**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/) _(para emails)_

### **Frontend**

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)

### **Infraestrutura**

- [Docker](https://www.docker.com/) _(para o banco de dados e ambiente isolado)_

---

## ⚙️ Como Rodar o Projeto

### 📌 Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) ou PostgreSQL instalado localmente
- [Git](https://git-scm.com/)

### 🔧 Passos

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/bora-ai.git
   cd bora-ai
   ```
2. **Configurar variáveis de ambiente**
   - No diretório backend, crie um .env:
   ```bash
   DATABASE_URL=
   JWT_SECRET=
   URL_REQUEST_FRONTEND=
   URL_REQUEST_VERIFY=
   EMAIL_USER=
   EMAIL_PASS=
   EMAIL_SECRET=
   ```
   - No diretório frontend, crie um .env:
   ```bash
   VITE_API_URL=
   ```
3. **Rodar o Banco de Dados**
   ```bash
   docker compose up -d
   ```
4. **Preparar o Banco**
   ```bash
   npm install && npx prisma generate && npx prisma migrate dev
   ```
5. **Rodar Backend**
   ```bash
   cd backend
   npm run dev
   ```
6. **Rodar Frontend**
   ```bash
   cd frontend
   npm i
   npm run dev
   ```
