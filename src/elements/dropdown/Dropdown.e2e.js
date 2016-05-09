describe('Element: Dropdown', () => {
    beforeEach(() => {
        browser.get('/dropdown');
    });

    it('should have <novo-select>', () => {
        let subject = element(by.css('demo-app novo-dropdown')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
