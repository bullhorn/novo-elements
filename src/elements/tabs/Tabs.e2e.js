describe('Element: Tabs', () => {
    beforeEach(() => {
        browser.get('/tabs');
    });

    it('should have <novo-nav>', () => {
        let subject = element(by.css('demo-app novo-nav')).isPresent();
        expect(subject).toBeTruthy();
    });
});
