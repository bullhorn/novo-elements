import { navigateTo } from '../support/po';

context('Demo: Headers', () => {
  beforeEach(navigateTo('/#/components/headers'));

  context('standard', () => {
    it('should have a header, icon, and theme', () => {
      let selector: string = `demo-header-standard > header`;
      cy.get(selector).should('have.attr', 'theme', 'candidate');
      cy.get(`${selector} .header-titles > small`).should('not.exist');
    });
  });

  context('subtitle', () => {
    it('should have a header, subtitle, icon, and theme', () => {
      let selector: string = `demo-header-subtitle > header`;
      cy.get(selector).should('have.attr', 'theme', 'grapefruit');
      cy.get(`${selector} .header-titles > small`).should('exist');
    });
  });
});
