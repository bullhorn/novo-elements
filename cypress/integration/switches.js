
context('Demo: Switches', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/switches')
    });

    context('standard', () => {
        it('toggles on click', () => {
            let element = 'novo-switch';
            cy.get(`demo-switch-standard ${element}`)
                .eq(0)
                .should('have.attr', 'aria-checked', 'true')
                .click()
                .should('have.attr', 'aria-checked', 'false');
        });

        it('toggles on click', () => {
            let element = 'novo-switch';
            cy.get(`demo-switch-standard ${element}`)
                .eq(1)
                .click()
                .should('have.attr', 'aria-checked', 'true');
        });
    });

});