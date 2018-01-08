
context('Demo: Select', () => {
    before(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/select')
    });

    context('standard', () => {
        it('shoudl open on click', () => {
            cy.get(`.novo-select-list`).should('not.exist');

            cy.get(`demo-select-standard novo-select`).eq(0).click();

            cy.get(`.novo-select-list`).should('exist');
        });

        it('should set value on select', () => {
            cy.get(`.novo-select-list novo-option`).eq(1).click();

            cy.get(`.novo-select-list`).should('not.exist');

        });
    });



});