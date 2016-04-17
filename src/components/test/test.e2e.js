describe('Component: Test', () => {
    beforeEach(() => {
        browser.get('/');
    });

    it('should have <test-cmp>', () => {
        let subject = element(by.css('app test-cmp')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });

    it('should have the correct content', () => {
        let subject = element(by.css('app test-cmp')).getText();
        let result = 'TEST -- true -- HI';
        expect(subject).toEqual(result);
    });
});
