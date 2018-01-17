import { navigateTo } from '../support/po';

context('Demo: Tiles', () => {
  beforeEach(navigateTo('/#/components/tiles'));

  context('basic', () => {
    it('moves active tile', () => {
      cy
        .get('demo-tiles-basic > novo-tiles > div.tile-container > div.tile')
        .eq(0)
        .should('not.have.class', 'active')
        .click()
        .should('have.class', 'active');
      cy
        .get('demo-tiles-basic > novo-tiles > div.tile-container > div.tile')
        .eq(1)
        .should('not.have.class', 'active')
        .click()
        .should('have.class', 'active');
    });
  });
  context('starting', () => {
    it('sets active tile', () => {
      cy
        .get('demo-tiles-starting > novo-tiles > div.tile-container > div.tile')
        .eq(0)
        .should('have.class', 'active');
    });
  });
});
