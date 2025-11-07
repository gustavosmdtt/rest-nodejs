<h1 align="center">Projeto Portifólio | Testes Avançados de API</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-brightgreen?logo=node.js" alt="NodeJS version">
  <img src="https://img.shields.io/badge/Docker-Enabled-blue?logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/API%20Tests-Cypress-informational?logo=cypress" alt="Cypress API Tests">
  <img src="https://img.shields.io/badge/BDD%20Tests-Cucumber-28a745?logo=cucumber" alt="Cucumber BDD Tests">
  <img src="https://img.shields.io/badge/License-ISC-lightgrey" alt="License">
</p>

<p align="center">
  <a href="https://github.com/gustavosmdt/rest-nodejs/actions/workflows/cypress-api-tests.yml">
    <img src="https://github.com/gustavosmdt/rest-nodejs/actions/workflows/cypress-api-tests.yml/badge.svg" alt="Cypress API Tests">
  </a>
</p>

Uma API de estudos construída com NodeJS e Express, focada em boas práticas de desenvolvimento, mas com enfasê nos testes de API automatizados com Cypress e PactumJS.


## Visão Geral

Este é um projeto de portfólio que implementa uma API REST para um e-commerce simples. Inclui autenticação de usuário via JWT, operações CRUD para produtos e pedidos, e duas suítes de testes distintas para garantir a qualidade.

## Stacks

-   **Backend:** NodeJS, Express
-   **Banco de Dados:** MySQL
-   **Testes de API:** Cypress + Typescript | PactumJS + Cucumber
-   **Containerização:** Docker, Docker Compose

## Executando o Projeto

1.  **Clone o projeto:**
    ```bash
    git clone git@github.com:gustavosmdtt/rest-nodejs.git
    ```
2.  **Crie os arquivos de ambiente:**
    Use os arquivos de exemplo para criar as variáveis de ambiente necessárias.
    ```bash
    cp docker.example.env docker.env && cp .example.env .env
    ```
3. **Instale as dependências**
    ```bash
    npm install
    ```
4.  **Faça o build das imagens da docker:**
    ```bash
    docker-compose up --build
    ```
    A API estará rodando em `http://localhost:3000`.

## Swagger

A documentação interativa da API, gerada com Swagger. Após subir a Docker, você pode ser acessada em: <br>
`http://localhost:3000/api-docs` <br>
> A URL de acesso pode variar dependendo da configuração no arquivo `src/app.js`.

## Testando

O projeto possui duas formas de testes. Certifique-se de que a aplicação esteja em execução antes de rodá-los.

#### Testes de API (Cypress)

Para rodar os testes de API que validam cada endpoint individualmente.

```bash
npm run cy-api
```

#### Testes BDD (PactumJS + Cucumber)

Para rodar os testes de comportamento (BDD) que seguem o fluxo descrito nos arquivos `.feature`.

```bash
npm test
```

## CI/CD

O projeto utiliza GitHub Actions para executar testes automatizados de API com Cypress em cada Pull Request. O workflow valida todas as funcionalidades da API antes de integrar o código à branch principal.

### Configuração de Secrets no GitHub

Para que o workflow funcione corretamente, os seguintes secrets devem ser configurados no repositório (Settings > Secrets and variables > Actions):

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `MYSQL_ROOT_PASSWORD` | Senha do usuário root do MySQL | `root123` |
| `MYSQL_DATABASE` | Nome do banco de dados | `store` |
| `JWT_KEY` | Chave secreta para geração de tokens JWT | `sua-chave-secreta-jwt` |
| `CYPRESS_ENV_JSON` | Variáveis de ambiente do Cypress em formato JSON | `{"apiUrl":"http://localhost:3000"}` |

### Recursos do Workflow

- **Cache inteligente:** Cache de dependências NPM e binário do Cypress para execução mais rápida
- **Retry automático:** Testes com falhas são executados novamente automaticamente (2 tentativas)
- **Artifacts de falha:** Screenshots e vídeos são salvos automaticamente quando os testes falham
- **Controle de concorrência:** Workflows antigos são cancelados quando novos commits são enviados
- **Validação de secrets:** Verifica se todos os secrets necessários estão configurados antes de executar
- **Path filtering:** Workflow executa apenas quando arquivos relevantes são modificados
- **Timeout de segurança:** Workflow é cancelado automaticamente após 30 minutos

---

> Criado com ♥️ por Gustavo Schmidt.
