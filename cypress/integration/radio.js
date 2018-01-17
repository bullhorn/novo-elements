context('Demo: Radio', () => {
  beforeEach(() => {
    let baseURL = Cypress.env('host') || 'http://localhost:4200';
    cy.visit(baseURL + '/#/components/radio');
  });

  const BUTTON_THEMES = ['button', 'icon'];

  const THEMES = ['basic', 'vertical'];

  context('moves active tile', () => {
    THEMES.forEach(theme => {
      it(theme, () => {
        cy
          .get(`demo-radio-${theme} > novo-radio > label > div > i`)
          .eq(0)
          .should('not.have.class', 'bhi-radio-filled')
          .click()
          .should('have.class', 'bhi-radio-filled');
      });
    });

    context('moves active tile', () => {
      BUTTON_THEMES.forEach(theme => {
        it(theme, () => {
          cy
            .get(
              `demo-radio-${theme} > novo-radio-group > novo-radio > label > button`,
            )
            .eq(0)
            .should('have.class', 'unchecked')
            .click()
            .should('have.class', 'checked');
        });
      });
    });
  });
});
