/// <reference types="Cypress" />

context('Demo: Date Picker', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/form-controls/date-picker')
    });

    context('Week Start', () => {
        let demo = `week-start-example`;
        it('should move start day of week to front of calendar', () => {
            let days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            days.forEach((day, index)=>{
                cy.get(`${demo} button`)
                    .eq(index)
                    .click()
                    .should('have.attr', 'theme', 'primary');
                cy.get(`${demo} table > thead >tr > th`)
                    .eq(0)
                    .should('have.attr', 'data-automation-id', day);
            });
        });
    });
});
