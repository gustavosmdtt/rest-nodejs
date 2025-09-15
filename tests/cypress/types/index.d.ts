/// <reference types="cypress" />

import { UserSuccessResponse } from 'tests/cypress/types/users';
import { APIPayload, ErrorResponse, ErrorOptions } from "./types"
import { Product, ProductDB } from './product';
import { Order } from './order';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {

			/**
			 * Make a API request using the provided payload.
			 * @param payload The payload for the API request
			 * @returns T - The type of the response body
			 */

			api_makeRequest<ResponseBody = any>(
				payload: APIPayload<any>
			): Cypress.Chainable<Cypress.Response<ResponseBody>>

			/**
			 * Realiza login como um tipo de usuário específico definido no cypress.env.json
			 * @param userType O identificador do usuário (ex: 'admin', 'viewer'). Padrão: 'admin'.
			 * @example cy.login('admin')
			 */
			api_login(user: string): Cypress.Chainable<Cypress.Response<UserSuccessResponse>>

			/**
			 * Valida a resposta de erro de uma requisição API.
			 * @param options - As opções de validação, incluindo status e mensagem esperada.
			 * @returns A resposta da requisição com as validações aplicadas.
			 */
			assertFailResponse(
				options: ErrorOptions
			): Cypress.Chainable<Cypress.Response<ErrorResponse>>

			/**
			 * Executa uma query SQL diretamente no banco de dados de teste.
			 * @param query A string da query SQL a ser executada.
			 * @param values Um array opcional de valores para queries parametrizadas (evita SQL Injection).
			 * @example
			 * cy.query('TRUNCATE TABLE usuarios')
			 * cy.query('SELECT * FROM usuarios WHERE id = ?')
			*/
			query(query: string, values?: any[], options?: any): Cypress.Chainable<any>;

			/**
			 * Reseta o banco de dados, removendo todos os dados das tabelas 'orders' e 'products', nesta ordem.
			 * @example cy.resetDB()
			 */
			resetDB(): Cypress.Chainable<void>;

			/**
			 * Insere um pedido ao banco de dados.
			 * @param productId O ID do produto associado ao pedido
			 * @returns Os dados do pedido inserido
			 * @example
			 * cy.seedProductDB('Livro', 9.90).then((result) => {
			 * 		const idProduct: number = result.productId;
			 * 		cy.seedOrderDB(idProduct);			 
			 * });
			 */
			seedOrderDB(idProduct: number): Cypress.Chainable<Order>;

			/**
			 * Insere um produto ao banco de dados
			 * @param product O objeto do produto a ser inserido, contendo `title` e `price`.
			 * @returns Os dados do produto inserido
			 * @example
			 * cy.seedProductDB({ title: 'Livro', price: 9.90 });
			 */
			seedProductDB(product: ProductDB): Cypress.Chainable<Product>;
		}
	}
}

export { };