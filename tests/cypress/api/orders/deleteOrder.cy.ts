import { APIPayload, DeleteSuccessResponse, ErrorResponse } from "tests/cypress/types/types";

describe('API - Orders', () => {
    const payload: APIPayload = {
        method: 'DELETE',
        url: 'pedidos/1',
        failOnStatusCode: false
    };

    it('should return error 401 without auth', () => {
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

            cy.api_login('apiUser').then((token) => {
                payloadWithAuth = {
                    ...payload,
                    headers: { 'Authorization': `Bearer ${token}` }
                };
            });
        });

        it('should return error 404 with non-existent ID', () => {
            const invalidPayload: APIPayload = {
                ...payloadWithAuth,
                url: 'pedidos/99999'
            };

            cy.api_makeRequest<ErrorResponse>(invalidPayload)
                .assertFailResponse({
                    status: 404,
                    message: 'Order not found for the provided ID'
                });
        });

        const invalidQuantity: any[] = [0, -1, 'abc', null, undefined];
        invalidQuantity.forEach((invalidValue: any) => {
            it('should return error 400 with invalid ID value', () => {
                const invalidPayload: APIPayload = {
                    ...payloadWithAuth,
                    url: `pedidos/${invalidValue}`
                };

                cy.api_makeRequest<ErrorResponse>(invalidPayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid order ID format'
                    });
            });
        });

        it('should return status 202 and delete a order', () => {
            const product = { title: 'Livro', price: 9.90 }

            cy.seedProductDB(product).then((result) => {
                const idProduct: number = result.productId;
                cy.seedOrderDB(idProduct);

                payloadWithAuth = {
                    url: `pedidos/${idProduct}`
                }
            });

            cy.api_makeRequest<DeleteSuccessResponse>(payloadWithAuth).then((response) => {
                expect(response.status).to.equal(202);
                expect(response.body.message).to.equal('Order successfully deleted');
            });
        });
    })
});