
context('Demo: Lists', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/lists')
    });

    context('standard', () => {
        it('focus on click', () => {
            let element = 'novo-list-item';
            cy.get(`demo-list-standard ${element}`)
                .eq(0)
                .should('not.have.class', 'focused')
                .click()
                .should('have.class', 'focused')
        });
    });

});