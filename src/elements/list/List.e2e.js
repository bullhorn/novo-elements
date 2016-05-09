describe('Element: List', () => {
    beforeEach(() => {
        browser.get('/list');
    });

    it('should have <novo-list>', () => {
        let subject = element(by.css('demo-app novo-list')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <novo-list-item>', () => {
        let subject = element(by.css('demo-app novo-list-item')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <item-avatar>', () => {
        let subject = element(by.css('demo-app item-avatar')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <item-title>', () => {
        let subject = element(by.css('demo-app item-title')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <item-content>', () => {
        let subject = element(by.css('demo-app item-content')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <item-end>', () => {
        let subject = element(by.css('demo-app item-end')).isPresent();
        expect(subject).toBeTruthy();
    });
});
