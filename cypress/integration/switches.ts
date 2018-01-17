import { navigateTo } from '../support/po';

context('Demo: Switches', () => {
  beforeEach(navigateTo('/#/components/switches'));

  context('standard', () => {
    it('toggles on click', () => {
      let element: string = 'novo-switch';
      cy
        .get(`demo-switch-standard ${element}`)
        .eq(0)
        .should('have.attr', 'aria-checked', 'true')
        .click()
        .should('have.attr', 'aria-checked', 'false');
    });

    it('toggles on click', () => {
      let element: string = 'novo-switch';
      cy
        .get(`demo-switch-standard ${element}`)
        .eq(1)
        .click()
        .should('have.attr', 'aria-checked', 'true');
    });
  });
});
