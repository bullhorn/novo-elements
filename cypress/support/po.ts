const DEV_URL: string = 'http://localhost:4200';

export const navigateTo: Function = (url: string) => {
  let baseURL: string = Cypress.env('host') || DEV_URL;
  cy.visit(baseURL + url);
};
