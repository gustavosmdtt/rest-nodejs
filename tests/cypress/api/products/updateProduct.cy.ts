import { updateProductSuccessResponse } from './../../types/product.d';
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Update products', () => {
    const payload: APIPayload = {
        method: 'PUT',
        url: 'products/1',
        body: {
            title: 'Caneca',
            price: 15.99
        },
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

        const invalidPrice: any[] = [0, -1, 'abc', null, undefined];
        invalidPrice.forEach((invalidPrice) => {
            it('should return error 400 with invalid price', () => {
                const invalidPricePayload = {
                    ...payloadWithAuth,
                    body: {
                        title: 'Caneca',
                        price: invalidPrice
                    }
                };

                cy.api_makeRequest<ErrorResponse>(invalidPricePayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid price. Please provide a numeric value greater than zero.'
                    });
            });
        });

        const invalidTitle: any[] = [0, null, undefined, ""];
        invalidTitle.forEach((invalidTitle) => {
            it('should return error 400 with invalid title', () => {
                const invalidPricePayload = {
                    ...payloadWithAuth,
                    body: {
                        title: invalidTitle,
                        price: 9.90
                    }
                };

                cy.api_makeRequest<ErrorResponse>(invalidPricePayload)
                    .assertFailResponse({
                        status: 400,
                        message: 'Invalid title. Please provide a non-empty title.'
                    });
            });
        });

        it('should updated product with status code 201', () => {
            const product = { title: 'Bola de Vôlei', price: 59.90 }

            cy.seedProductDB(product).then((result) => {
                const productUpdatedPayload = {
                    ...payloadWithAuth,
                    url: `products/${result.productId}`,
                    body: {
                        title: product.title,
                        price: product.price
                    }
                };

                cy.api_makeRequest<updateProductSuccessResponse>(productUpdatedPayload).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Product successfully updated');
                    expect(response.body.product).to.deep.include({
                        productId: result.productId,
                        title: product.title,
                        price: product.price
                    });
                });
            });
        });
    });
});