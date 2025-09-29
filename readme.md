# Projeto Back

Este repositório contém a API backend desenvolvida para o gerenciamento de produtos, clientes e pedidos de uma aplicação comercial. O objetivo é fornecer uma estrutura robusta, escalável e segura para a manipulação dos dados essenciais do negócio.

## Funcionalidades

- Cadastro, edição e exclusão de produtos
- Cadastro de clientes
- Gerenciamento de pedidos
- Autenticação e autorização de usuários
- Integração com banco de dados relacional
- Rotas protegidas e públicas
- Validação de dados de entrada
- Logs de atividades e erros

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no backend
- **Express.js**: Framework para criação de APIs REST
- **Sequelize / TypeORM**: ORM para integração com banco de dados (personalize conforme seu projeto)
- **PostgreSQL / MySQL**: Banco de dados relacional (personalize conforme seu projeto)
- **JWT**: Autenticação baseada em token
- **BCrypt**: Criptografia de senhas
- **Dotenv**: Gerenciamento de variáveis de ambiente

## Estrutura do Projeto

```
src/
│
├── controllers/    # Lógica das rotas e regras do negócio
├── models/         # Modelos das entidades do banco de dados
├── routes/         # Definição das rotas da API
├── middlewares/    # Middlewares para autenticação, validação, etc.
├── config/         # Configurações da aplicação
├── database/       # Scripts de migração e conexão
└── app.js          # Arquivo principal da aplicação
```

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/leandrami/projeto.back.git
   cd projeto.back
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, como:
     ```
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASS=sua_senha
     DB_NAME=nome_do_banco
     JWT_SECRET=segredo_jwt
     ```

4. **Execute as migrações (se aplicável):**
   ```bash
   npx sequelize db:migrate
   # ou conforme seu ORM
   ```

5. **Inicie a aplicação:**
   ```bash
   npm start
   ```

## Exemplos de Uso

- **Cadastrar produto:**
  ```
  POST /produtos
  {
    "nome": "Produto Exemplo",
    "preco": 99.99,
    "quantidade": 10
  }
  ```

- **Listar clientes:**
  ```
  GET /clientes
  ```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'Minha feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

---

**Dúvidas ou sugestões:** Abra uma issue ou entre em contato!
