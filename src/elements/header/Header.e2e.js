describe('Component: Header', () => {
    beforeEach(() => {
        browser.get('/#/header');
    });

    it('should have <header>', () => {
        let subject = element(by.css('demo-app header')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have a <util-action> that is a clickable button', () => {
        let subject = element(by.css('demo-app header util-action'));
        // test action
        subject.click();
        browser.sleep(300);
        // look for novo-toast
        let toast = element(by.css('novo-toast')).isPresent();
        expect(toast).toBeTruthy();
    });
});
