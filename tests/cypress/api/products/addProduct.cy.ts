import { addProductSuccessResponse } from "tests/cypress/types/product";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";

describe('API - Adding products', () => {

    const payload: APIPayload = {
        method: 'POST',
        url: 'produtos',
        body: {
            title: 'Caneca',
            price: 12.99
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

        const invalidPrice: any[] = [0, -1, 'abc', null, undefined];
        invalidPrice.forEach((invalidPrice) => {
            it(`should return error 400 with invalid price (${invalidPrice})`, () => {
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

        const invalidTitle: any[] = [0, null, undefined];
        invalidTitle.forEach((invalidTitle) => {
            it(`should return error 400 with invalid title (${invalidTitle})`, () => {
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

        it('should add a new product with status code 201', () => {
            cy.api_makeRequest<addProductSuccessResponse>(payloadWithAuth).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.product).to.deep.include({
                    title: payload.body.title,
                    price: payload.body.price
                });
            });
        });
    });
});
