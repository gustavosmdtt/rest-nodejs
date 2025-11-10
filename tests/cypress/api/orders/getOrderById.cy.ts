import { getOrderByIdSuccessResponse } from "tests/cypress/types/order";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Orders', () => {
    const payload: APIPayload = {
        method: 'GET',
        url: 'orders/1',
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

            cy.api_login('apiUser');
            cy.get('@authToken').then((token) => {
                payloadWithAuth = {
                    ...payload,
                    headers: { 'Authorization': `Bearer ${token}` }
                };
            });
        });

        it('should return error 404 with non-existent ID', () => {
            const invalidPayload: APIPayload = {
                ...payloadWithAuth,
                url: 'orders/99999'
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
                    url: `orders/${invalidValue}`
                };

                cy.api_makeRequest<ErrorResponse>(invalidPayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid order ID format'
                    });
            });
        });

        it('should get order by ID and return status 200', () => {
            cy.seedProductDB({ title: 'Livro', price: 9.90 }).then((product) => {
                cy.seedOrderDB(product.productId).then((order) => {
                    payloadWithAuth.url = `orders/${product.productId}`

                    cy.api_makeRequest<getOrderByIdSuccessResponse>(payloadWithAuth).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body).to.have.property('order');

                        expect(response.body.order).to.deep.include({
                            orderId: order.orderId,
                            productId: order.productId,
                            quantity: order.quantity
                        });
                    });
                });
            });
        });
    });
});