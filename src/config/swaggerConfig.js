const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST com NodeJS',
            version: '1.0.0',
            description: 'Documentação da API',
        },
        servers: [
            {
                url: '<http://localhost:3000>',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
    },
    apis: ['./docs/*.yaml'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;