context('Demo: Tabs', () => {
  beforeEach(() => {
    let baseURL = Cypress.env('host') || 'http://localhost:4200';
    cy.visit(baseURL + '/#/components/tabs')
  });

  context('standard', () => {
    it('switches tabs', () => {
      let element = 'novo-tab';
      cy.get(`demo-tabs-standard ${element}`)
        .eq(1)
        .should('not.have.class', 'active')
        .click()
        .should('have.class', 'active');
      cy.get(`demo-tabs-standard > novo-nav-outlet > novo-nav-content`)
        .eq(1)
        .should('have.class', 'active');
    });
  });
  context('vertical', () => {
    it('displays tabs vertically', () => {
      cy.get('demo-tabs-vertical novo-nav')
        .eq(0)
        .should('have.css', 'flex-direction')
        .and('to.equal', 'column');
    });
  });
});
