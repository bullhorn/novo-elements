
context('Demo: Menu', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/menus')
    });

    context('standard', () => {
        it('opens on click', () => {
            cy.get(`.novo-menu-list-conatiner`).should('not.exist');

            cy.get(`demo-menu-standard novo-menu`).eq(0).click();

            cy.get(`.novo-menu-list-conatiner`).should('exist');
        });
    });

});