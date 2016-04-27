describe('Component: Tabs', () => {
    beforeEach(() => {
        browser.get('/#/tabs');
    });

    it('should have <novo-nav>', () => {
        let subject = element(by.css('demo-app novo-nav')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
