describe('Element: Tooltip', () => {
    beforeEach(() => {
        browser.get('/#/tooltip');
    });

    it('should have [tooltip]', () => {
        let subject = element(by.css('demo-app [tooltip]')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
