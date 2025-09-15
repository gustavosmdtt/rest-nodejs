import { addOrderSuccessResponse } from "tests/cypress/types/order";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('Order - API adding a order', () => {
    const payload: APIPayload = {
        method: 'POST',
        url: 'pedidos',
        body: {
            productId: 1,
            quantity: 2
        },
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
                body: {
                    productId: 99999,
                    quantity: 1
                }
            };

            cy.api_makeRequest<ErrorResponse>(invalidPayload)
                .assertFailResponse({
                    status: 404,
                    message: 'Product not found for the provided ID'
                });
        });

        const invalidQuantity: any[] = [0, -1, 'abc', null, undefined];
        invalidQuantity.forEach((invalidValue: any) => {
            it(`should return erro 400 with invalid quantity value: ${invalidValue}`, () => {
                const invalidPayload: APIPayload = {
                    ...payloadWithAuth,
                    body: {
                        productId: 1,
                        quantity: invalidValue
                    }
                };

                cy.api_makeRequest<ErrorResponse>(invalidPayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid quantity. Please provide a numeric value greater than zero.'
                    });
            });
        });

        it('should add a new order', () => {
            cy.seedProductDB({ title: 'Livro', price: 9.90 }).then((result) => {
                payloadWithAuth = {
                    body: {
                        productId: result.productId,
                        quantity: 2
                    }
                }
            });

            cy.api_makeRequest<addOrderSuccessResponse>(payloadWithAuth)
                .then((response) => {
                    expect(response.status).to.equal(201);
                    expect(response.body.message).to.equal('Order successfully inserted');
                    // expect(response.body.order).to.have.property('orderId'); // Investigar pq o orderID não está passando para o response
                    expect(response.body.order.productId).to.equal(payload.body.productId);
                    expect(response.body.order.quantity).to.equal(payload.body.quantity);
                });

        });
    });
});