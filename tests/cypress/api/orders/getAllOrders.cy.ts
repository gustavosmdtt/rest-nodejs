import { getAllOrderSuccessResponse } from "tests/cypress/types/order";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Orders', () => {
    const payload: APIPayload = {
        method: 'GET',
        url: 'pedidos',
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

        it('should return error 404 when there are no orders registered', () => {
            cy.api_makeRequest<ErrorResponse>(payloadWithAuth)
                .assertFailResponse({
                    status: 404,
                    message: 'No orders have been registered yet'
                });
        });

        it('should return all orders and status 200', () => {
            const product1 = { title: 'Livro', price: 9.90 }
            const product2 = { title: 'Bola', price: 19.90 }

            cy.seedProductDB(product1).then((p1) => {
                cy.seedOrderDB(p1.productId);

                cy.seedProductDB(product2).then((p2) => {
                    cy.seedOrderDB(p2.productId);

                    cy.api_makeRequest<getAllOrderSuccessResponse>(payloadWithAuth).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.orders).to.have.length(2);

                        const orders: any[] = response.body.orders;
                        orders.forEach((order) => {
                            expect(order).to.have.property('orderId');
                            expect(order).to.have.property('quantity');
                        })

                        expect(response.body.orders[0].product).to.deep.include({
                            productId: p1.productId,
                            title: product1.title,
                            price: product1.price.toFixed(2)
                        });

                        expect(response.body.orders[1].product).to.deep.include({
                            productId: p2.productId,
                            title: product2.title,
                            price: product2.price.toFixed(2)
                        });
                    });
                });
            });
        });
    });
});
