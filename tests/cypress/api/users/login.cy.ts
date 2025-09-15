import { faker } from "@faker-js/faker";
import { APIPayload, ErrorResponse } from "tests/cypress/types/types";
import { UserPayload, UserSuccessResponse } from "tests/cypress/types/users";

describe('User - Login API', () => {
    const fakerEmail = faker.internet.email();
    const fakerPass = faker.internet.password({ length: 8 });

    const options: APIPayload<UserPayload> = {
        method: 'POST',
        url: 'usuarios/login',
        failOnStatusCode: false,
        body: {
            email: fakerEmail,
            password: fakerPass
        }
    };

    before(() => {
        const newUser: APIPayload<UserPayload> = {
            ...options,
            url: 'usuarios/cadastro',
        }

        cy.api_makeRequest<UserSuccessResponse>(newUser);
    });

    it('should not login with invalid credentials', () => {
        const invalidOptions: APIPayload<UserPayload> = {
            ...options,
            body: {
                email: fakerEmail,
                password: 'wrongpassword'
            }
        };
        
        cy.api_makeRequest<ErrorResponse>(invalidOptions).then((res) => {
            expect(res.body.message).to.equal('Invalid credentials');
            expect(res.status).to.equal(401);
        });
    });

    it('should login an existing user', () => {        
        cy.api_makeRequest<UserSuccessResponse>(options).then((res) => {
            expect(res.body.message).to.equal('Authentication successful');
            expect(res.body.token).to.be.a('string');
            expect(res.status).to.equal(200);
        });
    });
});