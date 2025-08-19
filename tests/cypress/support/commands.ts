import { APIPayload } from "../types/types";

Cypress.Commands.add('api_makeRequest', (payload) => {
    return cy.request({
        url: payload.url,
        method: payload.method,
        body: payload.body,
        failOnStatusCode: payload.failOnStatusCode ?? true,
    });
});

Cypress.Commands.add('api_login', (user) => {
    const currentUser = Cypress.env('users')?.[user];
    const sessionID = currentUser.email;

    if (!currentUser) {
        throw new Error(
            `User type "${currentUser}" not found in cypress.env.json.`
        );
    }

    cy.session(sessionID, () => {
        const loginPayload: APIPayload = {
            method: 'POST',
            url: 'usuarios/login',
            body: {
                email: currentUser.email,
                password: currentUser.password
            },
            failOnStatusCode: false
        };

        cy.request(loginPayload).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
            localStorage.setItem('token', response.body.token);
        });
    });
});
