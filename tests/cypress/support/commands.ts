Cypress.Commands.add('api_makeRequest', (payload) => {
    return cy.request({
        url: payload.url,
        method: payload.method,
        body: payload.body,
        failOnStatusCode: payload.failOnStatusCode ?? true,
    });
});
