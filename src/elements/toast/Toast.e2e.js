describe('Element: NovoToast', () => {
    beforeEach(() => {
        browser.get('/#/toast');
    });

    xit('should fire <novo-toast>', () => {
        // toast launcher button
        let trigger = element(by.css('demo-app [data-automation-id="toast-trigger"]'));

        // click button
        trigger.click().then(() => {
            let subject = element(by.css('novo-toast')).isPresent();
            expect(subject).toBeTruthy();
        });
    });

    it('should have a functioning embedded <novo-toast>', () => {
        // novo-toast is present
        let subject = element(by.css('.toast-demo novo-toast'));
        let elm = subject.isPresent().then(() => {
            // check if novo-toast has appropriate inner content
            let icon = element(by.css('.toast-icon')).isPresent();
            let title = element(by.css('.toast-content h5')).isPresent();
            let message = element(by.css('.toast-content p')).isPresent();
            if (icon && title && message) {
                return true;
            }
            return false;
        });
        expect(elm).toBeTruthy();
    });
});
