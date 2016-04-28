describe('Component: NovoToast', () => {
    beforeEach(() => {
        browser.get('/#/toast');
    });

    it('should have <novo-toast>', () => {
        let subject = element(by.css('demo-app novo-toast')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
