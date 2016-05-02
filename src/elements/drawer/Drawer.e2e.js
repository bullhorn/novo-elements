describe('Element: drawer', () => {
    beforeEach(() => {
        browser.get('/#/drawer');
    });

    it('should have [drawer]', () => {
        let subject = element(by.css('demo-app [drawer]')).isPresent();
        expect(subject).toBeTruthy();
    });
});
