describe('Element: Loading', () => {
    beforeEach(() => {
        browser.get('/#/loading');
    });

    it('should have <novo-loading>', () => {
        let subject = element(by.css('demo-app novo-loading')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
