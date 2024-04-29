# Sistema de Cadastro de Bruxos e Varinhas

Este projeto é um sistema simples de cadastro de usuários utilizando Node.js, Express.js e PostgreSQL.

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

# Uso

1. Execute o servidor:

   ```bash
   npm run dev

   ```

2. Acesse o sistema em `http://localhost:7777/users`.

# Rotas

- GET /bruxos - Lista todos os bruxos cadastrados
- GET /bruxos/:id - Lista um bruxo específico
- POST /bruxos - Cadastra um novo bruxo
- PUT /bruxos/:id - Atualiza um bruxo específico
- DELETE /bruxos/:id - Deleta um bruxo específico
- GET /bruxos/nome/:nome - Lista um bruxo específico pelo nome

- GET /vara - Lista todas as varinhas cadastradas
- GET /vara/:id - Lista uma varinha específica
- POST /vara - Cadastra uma nova varinha
- PUT /vara/:id - Atualiza uma varinha específica
- DELETE /vara/:id - Deleta uma varinha específica
- GET /vara/data/:data_fabric - Lista uma varinha específica pela data de fabricação
