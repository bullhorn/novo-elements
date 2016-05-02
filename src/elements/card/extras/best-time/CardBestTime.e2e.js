describe('Element: CardBestTime', () => {
    beforeEach(() => {
        browser.get('/#/cards');
    });

    it('should have <novo-card-best-time>', () => {
        let subject = element(by.css('demo-app novo-card-best-time')).isPresent();
        expect(subject).toBeTruthy();
    });
});
