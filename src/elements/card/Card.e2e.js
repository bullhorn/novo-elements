describe('Element: Card', () => {
    beforeEach(() => {
        browser.get('/#/cards');
    });

    it('should have <novo-card>', () => {
        let subject = element(by.css('demo-app novo-card')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
