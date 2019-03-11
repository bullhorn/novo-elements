context('Demo: Tiles', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/form-controls/tiles')
    });

    context('tiles usage example', () => {
        it('moves active tile', () => {
            cy.get('tiles-usage-example > novo-tiles > div.tile-container > div.tile')
                .eq(1)
                .should('not.have.class', 'active')
                .click()
                .should('have.class', 'active');
            cy.get('tiles-usage-example > novo-tiles > div.tile-container > div.tile')
                .eq(0)
                .should('not.have.class', 'active')
                .click()
                .should('have.class', 'active');
        });
        it('not move to disabled', () => {
            cy.get('tiles-usage-example > novo-tiles > div.tile-container > div.tile')
                .eq(2)
                .should('have.class', 'disabled')
                .click()
                .should('not.have.class', 'active');
        });
        it('adds additional tile', () => {
            cy.get('tiles-usage-example > novo-tiles > div.tile-container > div.tile')
                .eq(3)
                .should('not.exist')
            cy.get('tiles-usage-example > button')
                .eq(1)
                .click()
            cy.get('tiles-usage-example > novo-tiles > div.tile-container > div.tile')
                .eq(3)
                .should('exist')
        });
    });
});
