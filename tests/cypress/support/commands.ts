import { Order } from "../types/order";
import { Product } from "../types/product";
import { APIPayload, ErrorOptions, ErrorResponse } from "../types/types";

Cypress.Commands.add('api_makeRequest', (payload) => {
    return cy.request({
        ...payload,
        failOnStatusCode: payload.failOnStatusCode ?? true,
    });
});

Cypress.Commands.add('api_login', (user) => {
    const currentUser = Cypress.env('users')[user];
    if (!currentUser) {
        throw new Error(
            `User type "${currentUser}" not found in cypress.env.json.`
        );
    }

    const loginPayload: APIPayload = {
        method: 'POST',
        url: 'users/login',
        body: {
            email: currentUser.email,
            password: currentUser.password
        }
    };

    return cy.request(loginPayload).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
        cy.wrap(response.body.token).as('authToken');
    });
});

Cypress.Commands.add(
    'assertFailResponse',
    { prevSubject: true },
    (subject, options: ErrorOptions) => {

        const response = subject as Cypress.Response<ErrorResponse>;

        expect(response.status).to.eq(options.status);
        expect(response.body.message).to.contain(options.message);

        cy.wrap(response);
    }
);

Cypress.Commands.add('query', (query, values, options = {}) => {
    return cy.task('db:query', { query, values }, options);
});

Cypress.Commands.add('resetDB', (options = { log: false }) => {
    const log = Cypress.log({
        name: 'resetDB',
        displayName: 'Database',
        message: 'Cleared orders and products tables',
        autoEnd: false,
    });

    cy.query('SET FOREIGN_KEY_CHECKS = 0;', undefined, options);
    cy.query('TRUNCATE TABLE orders;', undefined, options);
    cy.query('TRUNCATE TABLE products;', undefined, options);

    cy.query('SET FOREIGN_KEY_CHECKS = 1;', undefined, options).then(() => {
        log.end();
    });
});

Cypress.Commands.add('seedOrderDB', (id) => {
    const log = Cypress.log({
        name: 'seedOrderDB',
        displayName: 'Database',
        message: 'Adding an order to the "orders" table',
        autoEnd: false,
    });

    const query = 'INSERT INTO orders (quantity, productId) VALUES (2, ?);'
    return cy.query(query, [id], { log: false }).then((result): Order => {
        log.end();
        return {
            orderId: result.insertId,
            productId: id,
            quantity: 2
        };
    });
});

Cypress.Commands.add('seedProductDB', (product) => {
    const log = Cypress.log({
        name: 'seedProductDB',
        displayName: 'Database',
        message: 'Adding a product to the "products" table',
        autoEnd: false,
    });

    const query = `INSERT INTO products (title, price) VALUES (?, ?)`
    return cy.query(query, [product.title, product.price], { log: false }).then((result): Product => {
        log.end();
        return {
            productId: result.insertId,
            title: product.title,
            price: product.price
        };
    });
});