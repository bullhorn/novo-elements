describe('Element: CardBestTime', () => {
    beforeEach(() => {
        browser.get('/#/cards');
    });

    it('should have <novo-card-chart-donut>', () => {
        let subject = element(by.css('demo-app novo-card-chart-donut')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
