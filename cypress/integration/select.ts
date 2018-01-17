import { navigateTo } from '../support/po';

context('Demo: Select', () => {
  beforeEach(navigateTo('/#/components/select'));

  context('standard', () => {
    it('shoudl open on click', () => {
      cy.get(`.novo-select-list`).should('not.exist');
      cy
        .get(`demo-select-standard novo-select`)
        .eq(0)
        .click();
      cy.get(`.novo-select-list`).should('exist');
    });

    it('should set value on select', () => {
      cy
        .get(`.novo-select-list novo-option`)
        .eq(1)
        .click();
      cy.get(`.novo-select-list`).should('not.exist');
    });
  });
});
