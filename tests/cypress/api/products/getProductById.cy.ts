import { getProductByIdSuccessResponse } from "tests/cypress/types/product";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Get product by ID', () => {

    const payload: APIPayload = {
        method: 'GET',
        url: 'produtos/1',
        failOnStatusCode: false
    };

    it('should return erro 401 without authentication', () => {
        cy.api_makeRequest<ErrorResponse>(payload)
            .assertFailResponse({
                status: 401,
                message: 'Access token required'
            });
    });

    context('Authorized user', () => {
        let payloadWithAuth: any;

        beforeEach(() => {
            cy.resetDB();

            cy.api_login('apiUser');
            cy.get('@authToken').then((token) => {
                payloadWithAuth = {
                    ...payload,
                    headers: { 'Authorization': `Bearer ${token}` }
                };
            });
        });

        it('should return error 404 when have no products registred', () => {
            cy.api_makeRequest<ErrorResponse>(payloadWithAuth)
                .assertFailResponse({
                    status: 404,
                    message: 'Product not found for the provided ID'
                });
        });

        it('should return error 404 when non-existent product ID', () => {
            const nonExistentProduct: APIPayload = {
                ...payloadWithAuth,
                url: 'produtos/9999',
            };

            cy.api_makeRequest<ErrorResponse>(nonExistentProduct)
                .assertFailResponse({
                    status: 404,
                    message: 'Product not found for the provided ID'
                });
        });

        it('should return the product with status code 200', () => {
            const product = { title: 'Bola de Vôlei', price: 59.90 };

            cy.seedProductDB(product).then((result) => {
                const id = result.productId;
                payloadWithAuth.url = `produtos/${id}`

                cy.api_makeRequest<getProductByIdSuccessResponse>(payloadWithAuth).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.product).to.deep.include({
                        productId: id,
                        title: product.title,
                        price: product.price.toFixed(2)
                    });
                });
            });
        });
    });
});
