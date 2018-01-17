import { navigateTo } from '../support/po';

context('Demo: Radio', () => {
  beforeEach(navigateTo('/#/components/radio'));

  const BUTTON_THEMES: string[] = ['button', 'icon'];

  const THEMES: string[] = ['basic', 'vertical'];

  context('moves active tile', () => {
    THEMES.forEach((theme: string) => {
      it(theme, () => {
        cy
          .get(`demo-radio-${theme} > novo-radio > label > div > i`)
          .eq(0)
          .should('not.have.class', 'bhi-radio-filled')
          .click()
          .should('have.class', 'bhi-radio-filled');
      });
    });

    context('moves active tile', () => {
      BUTTON_THEMES.forEach((theme: string) => {
        it(theme, () => {
          cy
            .get(
              `demo-radio-${theme} > novo-radio-group > novo-radio > label > button`,
            )
            .eq(0)
            .should('have.class', 'unchecked')
            .click()
            .should('have.class', 'checked');
        });
      });
    });
  });
});
