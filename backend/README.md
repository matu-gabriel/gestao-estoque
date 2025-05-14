# 📦 EstoquePlus

Sistema de gestão de estoque simples com autenticação JWT, controle de entrada e saída de produtos, usando Node.js, Express e Sequelize.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT (autenticação)
- Yup (validação)
- Docker + Docker Compose

---

## 📂 Estrutura do Projeto
backend/

├── src/

│ ├── app/

│ │ ├── controllers/

│ │ ├── middlewares/

│ │ ├── models/

│ │ └── ...

│ ├── config/

│ ├── database/

│ │ └── migrations/

│ ├── routes/

│ ├── app.js

│ └── server.js

├── .env

├── docker-compose.yml

├── Dockerfile

└── README.md

---

## 💡 Como rodar localmente com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/estoqueplus-backend.git
cd estoqueplus-backend
```
### 2. Inicie os containers
```bash
docker-compose up --build
```
A API estará disponível em: http://localhost:3333

### 3. Executar as migrations
Após o container da API estar rodando, em outro terminal:
```bash
docker ps  # copie o nome do container da API
docker exec -it nome_do_container_da_api npx sequelize db:migrate
```
---
## ⚙️ Variáveis de ambiente
Crie um arquivo .env com:
```
PORT=3333
DB_HOST=db
DB_USER=postgres
DB_PASS=postgres
DB_NAME=estoque
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```
Esses valores já estão configurados no docker-compose.yml.

---
## 💻 Para rodar sem Docker
Requer PostgreSQL instalado localmente e .env configurado.
```bash
# Instale as dependências
yarn install
# ou
npm install

# Rode as migrations
npx sequelize db:migrate

# Inicie o servidor
yarn dev
# ou
npm run dev
```
---
## 🔒 Autenticação
Login retorna um token JWT válido por 5 dias.

Use esse token no header Authorization: Bearer TOKEN_AQUI para acessar as rotas protegidas.

---
## 📬 Rotas principais
Auth 

- POST /sessions: Login (email, senha)

Usuários

- POST /users: Criação de usuário
- PUT /users: Editar usuário

Produtos

- GET /products

- POST /products

Entradas de estoque

- GET /stock-entries

- POST /stock-entries

Saídas de estoque

- GET /stock-outs

- POST /stock-outs

---