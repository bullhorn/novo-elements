import { navigateTo } from '../support/po';

context('Demo: Lists', () => {
  beforeEach(navigateTo('/#/components/lists'));

  context('standard', () => {
    it('focus on click', () => {
      let element: string = 'novo-list-item';
      cy
        .get(`demo-list-standard ${element}`)
        .eq(0)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');

      cy
        .get(`demo-list-standard ${element}`)
        .eq(1)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');
    });
  });

  context('advanced', () => {
    it('focus on click', () => {
      let element: string = 'novo-list-item';
      cy
        .get(`demo-list-advanced ${element}`)
        .eq(0)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');

      cy
        .get(`demo-list-advanced ${element}`)
        .eq(1)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');

      cy
        .get(`demo-list-advanced ${element}`)
        .eq(1)
        .get('novo-icon i')
        .should('have.class', 'bhi-file');
    });
  });

  context('entity', () => {
    it('should work the same for entities', () => {
      let element: string = 'novo-list-item';
      cy
        .get(`demo-list-entity ${element}`)
        .eq(0)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');

      cy
        .get(`demo-list-entity ${element}`)
        .eq(1)
        .should('not.have.class', 'focused')
        .click()
        .should('have.class', 'focused');

      cy
        .get(`demo-list-entity ${element}`)
        .eq(1)
        .get('novo-icon i')
        .should('have.class', 'bhi-person');
    });
  });
});
