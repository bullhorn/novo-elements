describe('Element: TimePicker', () => {
    beforeEach(() => {
        browser.get('/calendar');
    });

    it('should have <novo-time-picker>', () => {
        let subject = element(by.css('demo-app novo-time-picker')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });
});
