const COLORS = {
  positive: '#4a89dc',
  success: '#8cc152',
  negative: '#da4453',
  warning: '#f6b042',
  black: '#000000',
  grey: '#999999',
  dark: '#3d464d',
  light: '#d9dadc',
  pulse: '#3bafda',
  neutral: '#4f5361',
  white: '#fff'
};

const THEMES = {
  basic: [
    'primary',
    'secondary',
    'standard',
    'dialogue',
    'icon'
  ]
};

context('Demo: Buttons', () => {
  beforeEach(() => {
    let baseURL = Cypress.env('host') || 'http://localhost:4200';
    cy.visit(baseURL + '/#/components/buttons')
  });

  context('basic buttons', () => {
      it('theme', () => {
        let selector = `button-overview-example > button`;
        let i = 0;
        THEMES.basic.forEach(theme => {
          cy.get(selector).eq(i).should('have.attr','theme',theme);
          i++;
        });
      });
  });
});
