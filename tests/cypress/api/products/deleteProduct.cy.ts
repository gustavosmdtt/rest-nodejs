import { APIPayload, DeleteSuccessResponse, ErrorResponse } from "tests/cypress/types/types";

describe('API - Delete products', () => {
    const payload: APIPayload = {
        method: 'DELETE',
        url: 'products/1',
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

        it('should return error 404 when non-existent product ID', () => {
            const nonExistentProduct: APIPayload = {
                ...payloadWithAuth,
                url: 'products/9999'
            };

            cy.api_makeRequest<ErrorResponse>(nonExistentProduct)
                .assertFailResponse({
                    status: 404,
                    message: 'Product not found for the provided ID'
                });
        });

        const invalidIdProduct: any[] = [0, -1, 'abc', null, undefined];
        invalidIdProduct.forEach((invalidValue) => {
            it(`should return error 400 with invalid ID value (${invalidValue})`, () => {
                const invalidPayload: APIPayload = {
                    ...payloadWithAuth,
                    url: `products/${invalidValue}`
                };

                cy.api_makeRequest<ErrorResponse>(invalidPayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid order ID format'
                    });
            });
        });

        it('should delete a product with status code 202', () => {
            cy.seedProductDB({ title: 'Bola de Vôlei', price: 59.90 }).then((product) => {
                payloadWithAuth.url = `products/${product.productId}`;

                cy.api_makeRequest<DeleteSuccessResponse>(payloadWithAuth).then((response) => {
                    expect(response.status).to.eq(202);
                    expect(response.body).to.have.property('message', 'Product successfully deleted');
                });
            });
        });
    });
});