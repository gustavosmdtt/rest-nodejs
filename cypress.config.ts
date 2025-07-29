import { defineConfig } from 'cypress';

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
    setupNodeEvents(on, config) {},
  }, 
});
