
context('Demo: Search', () => {
    before(() => {
        let baseURL = Cypress.env('host') || 'http://localhost:4200';
        cy.visit(baseURL + '/#/components/searches')
    });

    context('standard', () => {
        it('should open on click', () => {
            cy.get(`demo-search-standard novo-search`).eq(0).should('not.have.class', 'active');

            cy.get(`demo-search-standard novo-search button`).eq(0).click();

            cy.get(`demo-search-standard novo-search`).eq(0).should('have.class', 'active');

            cy.get(`body`).click();

            cy.get(`demo-search-standard novo-search`).eq(0).should('not.have.class', 'active');
        });
    });

    context('autocomplete', () => {
        it('should open on click', () => {
            cy.get(`demo-search-autocomplete novo-search`).eq(0).should('not.have.class', 'active');

            cy.get(`demo-search-autocomplete novo-switch .novo-switch-thumb`).click();

            cy.get(`demo-search-autocomplete novo-search`).eq(0).should('have.class', 'active');
        });
    });


    context('google', () => {
        it('should open on click', () => {
            cy.get(`demo-search-google novo-search`).eq(0).click();

            cy.get(`demo-search-google novo-search`).eq(0).should('have.class', 'active');

            cy.get(`demo-search-google novo-search input`).eq(0).type('Boston');

            cy.get('google-places-list').should('exist');

            cy.get('google-places-list novo-list-item').eq(0).click();

            cy.get(`demo-search-google novo-search input`).eq(0).should('have.value', 'Boston, MA, USA');
        });
    });

});