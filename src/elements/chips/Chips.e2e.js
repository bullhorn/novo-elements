describe('Element: Chips', () => {
    beforeEach(() => {
        browser.get('/#/chips');
    });

    it('should have <novo-chips>', () => {
        let subject = element(by.css('demo-app novo-chips')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
