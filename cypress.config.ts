require('dotenv').config();
import { defineConfig } from 'cypress';
const pool = require('./src/mysql');

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/',
        supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}',
        specPattern: [
            'tests/cypress/api/**/*.cy.{js,jsx,ts,tsx}',
            'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
        ],
        fixturesFolder: 'tests/cypress/fixtures',
        screenshotsFolder: 'tests/cypress/screenshots',
        video: false,
        watchForFileChanges: false,
        setupNodeEvents(on, config) {
            on('task', {
                'db:query': async ({ query, values }) => {
                    try {
                        const [results] = await pool.execute(query, values);
                        return results;
                    } catch (error) {
                        throw new Error(`Errr on task 'query': ${error}`);
                    }
                }
            });
        }
    }
});
