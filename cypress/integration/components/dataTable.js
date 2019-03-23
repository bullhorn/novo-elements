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
  context('pagination', () => {
    it('should update data table row count', () => {
      const paginationOptions = [10,50,100,250,500];
      cy.get(`${exampleContainerSelector} novo-tiles [data-automation-id="Basic"]`)
        .eq(0)
        .click()
        .should('have.class', 'active');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination`)
        .should('have.class', 'basic');
      paginationOptions.forEach((option)=> {
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination [data-automation-id="${option}"]`)
          .eq(0)
          .click()
          .should('have.class', 'active');
        cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row`)
          .should('have.length', option);
      })
    });
    it('should switch to the next page properly', () => {
      cy.get(`${exampleContainerSelector} novo-tiles [data-automation-id="Basic"]`)
        .eq(0)
        .click()
        .should('have.class', 'active');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination`)
        .should('have.class', 'basic');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination [data-automation-id="10"]`)
        .eq(0)
        .click()
        .should('have.class', 'active');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination [data-automation-id="novo-data-table-pagination-previous"]`)
        .should('be.disabled');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-name"]`)
      .eq(0)
      .should('contain', `(1) Name 0`);
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-pagination [data-automation-id="novo-data-table-pagination-next"]`)
        .eq(0)
        .click();
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-name"]`)
        .eq(0)
        .should('contain', `(1) Name 10`);
    });
  });
  context('sorting', () => {
    it('should sort number column ascending', () => {
      let column = 'id';
      cy.get(`${exampleContainerSelector} novo-data-table [data-automation-id="novo-column-header-id"] [data-automation-id="novo-data-table-sort"]`)
        .eq(0)
        .click()
        .should('have.attr', 'icon', 'bhi-sort-asc');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .first()
        .should('contain', `0`);
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .last()
        .should('contain', `9`)
    });
    it('should sort number column descending', () => {
      let column = 'id';
      cy.get(`${exampleContainerSelector} novo-data-table [data-automation-id="novo-column-header-id"] [data-automation-id="novo-data-table-sort"]`)
        .eq(0)
        .click()
        .should('have.attr', 'icon', 'bhi-sort-asc')
        .click()
        .should('have.attr', 'icon', 'bhi-sort-desc');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .first()
        .should('contain', `999`);
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .last()
        .should('contain', `990`)
    });
    it('should sort text column ascending', () => {
      let column = 'status';
      cy.get(`${exampleContainerSelector} novo-data-table [data-automation-id="novo-column-header-status"] [data-automation-id="novo-data-table-sort"]`)
        .eq(0)
        .click()
        .should('have.attr', 'icon', 'bhi-sort-asc');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .first()
        .should('contain', `(1) Status 0`);
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .last()
        .should('contain', `(1) Status 106`)
    });
    it('should sort text column descending', () => {
      let column = 'status';
      cy.get(`${exampleContainerSelector} novo-data-table [data-automation-id="novo-column-header-status"] [data-automation-id="novo-data-table-sort"]`)
        .eq(0)
        .click()
        .should('have.attr', 'icon', 'bhi-sort-asc')
        .click()
        .should('have.attr', 'icon', 'bhi-sort-desc');
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .first()
        .should('contain', `(1) Status 999`);
      cy.get(`${exampleContainerSelector} novo-data-table novo-data-table-row [data-automation-id="novo-column-${column}"]`)
        .last()
        .should('contain', `(1) Status 990`)
    });
  });
});
