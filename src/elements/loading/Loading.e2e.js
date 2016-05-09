describe('Element: Loading', () => {
    beforeEach(() => {
        browser.get('/loading');
    });

    it('should have <novo-loading>', () => {
        let subject = element(by.css('demo-app novo-loading')).isPresent();
        expect(subject).toBeTruthy();
    });
});
