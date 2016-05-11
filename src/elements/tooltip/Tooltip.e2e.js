describe('Element: Tooltip', () => {
    beforeEach(() => {
        browser.get('/#/tooltip');
    });

    it('should have [tooltip]', () => {
        let subject = element(by.css('demo-app [tooltip]')).isPresent();
        expect(subject).toBeTruthy();
    });
});
