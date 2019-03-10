context('Demo: slides', () => {
    beforeEach(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/slides')
    });

    context('basic slides', () => {
        context('buttons', () => {
            it('goes to next then previous slide', () => {
                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-0');

                cy.get('demo-slides-basic > novo-slides div.controls > button')
                    .eq(0)
                    .click();

                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-1');

                cy.get('demo-slides-basic > novo-slides div.controls > button')
                    .eq(0)
                    .click();

                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-0');
            });
        });
        context('indicators', () => {
            it('goes to next then previous slide', () => {
                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-0');

                cy.get('demo-slides-basic > novo-slides div.controls > div.indicators > div.inactive')
                    .eq(0)
                    .click();

                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-1');

                    cy.get('demo-slides-basic > novo-slides div.controls > div.indicators > div.inactive')
                    .eq(0)
                    .click();

                cy.get('demo-slides-basic > novo-slides')
                    .should('have.class', 'slide-0');
            });
        });
    });
    context('timed slides', () => {
        it('automatically goes to next slide', () => {
            cy.get('demo-slides-timer > novo-slides')
                .should('have.class', 'slide-0')
                .wait(3000)
                .should('have.class', 'slide-1');
        });
    });
});
