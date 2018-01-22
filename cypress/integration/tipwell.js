context('Demo: Tipwell', () => {
    beforeEach(() => {
      let baseURL = Cypress.env('host') || 'http://localhost:4200';
      cy.visit(baseURL + '/#/components/tipwell')
    });
  
    context('basic', () => {
      it('displays tipwell correctly', () => {
        cy.get('demo-tipwell-basic > novo-tip-well')
          .eq(0)
          .should('have.class', 'active');
        cy.get('demo-tipwell-basic > novo-tip-well > div > button.dialogue')
          .eq(0)
          .click();
        cy.get('demo-tipwell-basic > novo-tip-well')
          .eq(0)
          .should('not.have.class', 'active');
        cy.get('div.demo-sample > button.success')
          .eq(0)
          .click();
        cy.get('demo-tipwell-basic > novo-tip-well')
          .eq(0)
          .should('have.class', 'active');
      });
    });
    context('buttonless', () => {
        it('displays tipwell correctly', () => {
          cy.get('demo-tipwell-buttonless > novo-tip-well')
            .eq(0)
            .should('have.class', 'active');
          cy.get('demo-tipwell-buttonless > novo-tip-well > div > button.dialogue').should('not.exist');
        });
      });
      context('icon', () => {
        it('displays tipwell correctly', () => {
          cy.get('demo-tipwell-icon > novo-tip-well')
            .eq(0)
            .should('have.class', 'active');
          cy.get('demo-tipwell-icon > novo-tip-well > div > button.dialogue').should('not.exist');
        });
      });
  });
  