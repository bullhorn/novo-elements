describe('Element: Picker', () => {
    beforeEach(() => {
        browser.get('/#/picker');
    });

    it('should have <input picker>', () => {
        let subject = element(by.css('demo-app input[picker]')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
