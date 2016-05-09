describe('Element: Button', () => {
    beforeEach(() => {
        browser.get('/button');
    });

    it('should have <button>', () => {
        let subject = element(by.css('demo-app button')).isPresent();
        //let result = true;
        expect(subject).toBeTruthy();
    });
});
