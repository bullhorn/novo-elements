import { navigateTo } from '../support/po';

context('Demo: Menu', () => {
  beforeEach(navigateTo('/#/components/menus'));

  context('standard', () => {
    it('opens on click', () => {
      cy.get(`.novo-menu-list-conatiner`).should('not.exist');

      cy
        .get(`demo-menu-standard novo-menu`)
        .eq(0)
        .click();

      cy.get(`.novo-menu-list-conatiner`).should('exist');
    });
  });
});
