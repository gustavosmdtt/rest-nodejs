import { APIPayload } from "tests/cypress/types/types";
import { UserPayload, UserResponse } from "tests/cypress/types/users";
import { faker } from '@faker-js/faker';

describe('User - Register API', () => {
    const registryOptions: APIPayload<UserPayload> = {
        method: 'POST',
        url: 'usuarios/cadastro',
        failOnStatusCode: false,
        body: {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 8 })
        }
    }

    before(() => {
        cy.api_makeRequest(registryOptions);
    })

    it('should not register with existing email', () => {
        cy.api_makeRequest<UserResponse>(registryOptions).then((res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Email already exists');
        });
    });

    it('should not register with invalid password', () => {
        const newOptions = {
            ...registryOptions,
            body: {
                email: faker.internet.email(),
                password: '1234567'
            }
        }

        cy.api_makeRequest<UserResponse>(newOptions).then((res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Password must be at least 8 characters long');
        });
    });

    it('should create a new user', () => {
        const newOptions = {
            ...registryOptions,
            body: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 })
            }
        }

        cy.api_makeRequest<UserResponse>(newOptions).then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('User successfully created');
            expect(res.body.userCreated?.email).to.equal(newOptions.body.email);
            expect(res.body.userCreated?.userId).to.be.a('number');
        });
    });
});