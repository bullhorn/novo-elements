const COLORS = [
  'positive',
  'success',
  'negative',
  'warning',
  'black',
  'grey',
  'dark',
  'light',
  'pulse',
  'neutral'
];

const THEMES = [
  'primary',
  'secondary',
  'dialogue',
  'standard',
  'icon'
];

context('Demo: Buttons', () => {
  beforeEach(() => {
    let baseURL = Cypress.env('host') || 'http://localhost:4200';
    cy.visit(baseURL + '/#/components/buttons')
  });

  context('themes', () => {
    THEMES.forEach(theme => {
      it(theme, () => {
        let selector = `demo-buttons-${theme} > button`;
        let i = 0;
        COLORS.forEach(color => {
          cy.get(selector).eq(i).should('have.class', theme);
          cy.get(selector).eq(i).should('have.class', COLORS[i]);
          i++;
        });
        COLORS.forEach(color => {
          cy.get(selector).eq(i).should('have.class', theme);
          cy.get(selector).eq(i).should('have.attr', 'disabled');
          i++;
        });
      });
    });
  });

  context('other', () => {
    it('loading', () => {
      cy.get('demo-buttons-loading > button')
        .eq(0)
        .should('have.class', 'primary')
        .click()
        .should('have.class', 'loading')
        .wait(3001)
        .and('not.have.class', 'loading');
    });
  });
});
