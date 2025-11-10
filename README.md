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

O projeto utiliza **GitHub Actions** para executar automaticamente os testes de API com Cypress em cada Pull Request para a branch `master`, garantindo a qualidade do código antes da integração.

**Recursos do Workflow:**
- Cache de dependências NPM e binário do Cypress
- Retry automático de testes (2 tentativas)
- Upload de screenshots e vídeos em caso de falhas
- Controle de concorrência (workflows antigos são cancelados)
- Path filtering (executa apenas quando arquivos relevantes são modificados)

**Secrets necessários:** `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `JWT_KEY`, `CYPRESS_ENV_JSON`

---

> Criado com ♥️ por Gustavo Schmidt.
