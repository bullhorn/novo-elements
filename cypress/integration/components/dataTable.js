const exampleContainerSelector = `data-table-rows-example`;

context('Demo: Data Table', () => {
  beforeEach(() => {
    let baseURL = Cypress.env('host') || 'http://localhost:4200';
    cy.visit(baseURL + '/#/components/data-table')
  });

  context('external table controls', () => {
      it('should update pagination style to basic', () => {
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination`)
          .eq(0)
          .should('have.class', 'standard');
        cy.get(`${exampleContainerSelector} novo-tiles [data-automation-id="Basic"]`)
          .eq(0)
          .should('not.have.class', 'active')
          .click()
          .should('have.class', 'active');
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination`)
          .should('have.class', 'basic');
      });
      it('should show global search', () => {
        cy.get(`${exampleContainerSelector} novo-data-table novo-search`).should('not.exist');
        cy.get(`${exampleContainerSelector} novo-tiles [data-automation-id="Show"]`)
          .eq(0)
          .should('not.have.class', 'active')
          .click()
          .should('have.class', 'active');
        cy.get(`${exampleContainerSelector} novo-data-table novo-search`).should('exist');
      });
      it('should be able to configure columns', () => {
        //TODO

      });
      it('should show and hide all row details', () => {
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-expand-header-cell > i`)
          .should('not.have.class', 'expanded');
        cy.get(`${exampleContainerSelector} button`)
          .eq(1).click();
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-expand-header-cell > i`)
          .should('have.class', 'expanded');
        cy.get(`${exampleContainerSelector} button`)
          .eq(2).click();
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-expand-header-cell > i`)
          .should('not.have.class', 'expanded');
      });
  });
});
