import { getAllProductSuccessResponse } from "tests/cypress/types/product";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Get all products', () => {

    const payload: APIPayload = {
        method: 'GET',
        url: 'products',
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
                    message: 'No products have been registered yet'
                });
        });

        it('should return all created products with status 200', () => {
            const product1 = { title: 'Bola', price: 59.90 };
            const product2 = { title: 'Caneca', price: 12.99 };

            cy.seedProductDB(product1).then(dbProduct1 => {
                cy.seedProductDB(product2).then(dbProduct2 => {
                    cy.api_makeRequest<getAllProductSuccessResponse>(payloadWithAuth).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.quantity).to.eq(2);
                        expect(response.body.products).to.have.length(2);
                        
                        const products = response.body.products;
                        expect(products[0]).to.deep.include({
                            productId: dbProduct1.productId,
                            title: product1.title,
                            price: product1.price.toFixed(2)
                        });

                        expect(products[1]).to.deep.include({
                            productId: dbProduct2.productId,
                            title: product2.title,
                            price: product2.price.toFixed(2)
                        });
                    });
                });
            });
        });
    });
});
