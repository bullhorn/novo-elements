describe('Element: Select', () => {
    beforeEach(() => {
        browser.get('/select');
    });

    it('should have <novo-select>', () => {
        let subject = element(by.css('demo-app novo-select')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
