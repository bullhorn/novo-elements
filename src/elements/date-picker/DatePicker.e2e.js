describe('Element: DatePicker', () => {
    beforeEach(() => {
        browser.get('/#/calendar');
    });

    it('should have <novo-date-picker>', () => {
        let subject = element(by.css('demo-app novo-date-picker')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
