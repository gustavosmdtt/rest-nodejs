/// <reference types="cypress" />

import { APIResponse, APIPayload } from "./types"

declare global {
	namespace Cypress {
		interface Chainable<Subject> {

			/**
			 * Make a API request using the provided payload.
			 * 
			 * @param payload The payload for the API request
			 * @returns T - The type of the response body
			 */

			api_makeRequest<T = any>(payload: APIPayload): Cypress.Chainable<Cypress.Response<APIResponse<T>>>
		}
	}
}

export {};