import { navigateTo } from '../support/po';

const COLORS: string[] = [
  'positive',
  'success',
  'negative',
  'warning',
  'black',
  'grey',
  'dark',
  'light',
  'pulse',
  'neutral',
];

const THEMES: string[] = [
  'primary',
  'secondary',
  'dialogue',
  'standard',
  'icon',
];

context('Demo: Buttons', () => {
  beforeEach(navigateTo('/#/components/buttons'));

  context('themes', () => {
    THEMES.forEach((theme: string) => {
      it(theme, () => {
        let selector: string = `demo-buttons-${theme} > button`;
        let i: number = 0;
        COLORS.forEach((color: string) => {
          cy
            .get(selector)
            .eq(i)
            .should('have.class', theme);
          cy
            .get(selector)
            .eq(i)
            .should('have.class', COLORS[i]);
          i++;
        });
        COLORS.forEach((color: string) => {
          cy
            .get(selector)
            .eq(i)
            .should('have.class', theme);
          cy
            .get(selector)
            .eq(i)
            .should('have.attr', 'disabled');
          i++;
        });
      });
    });
  });

  context('other', () => {
    it('loading', () => {
      cy
        .get('demo-buttons-loading > button')
        .eq(0)
        .should('have.class', 'primary')
        .click()
        .should('have.class', 'loading')
        .wait(3001)
        .and('not.have.class', 'loading');
    });
  });
});
