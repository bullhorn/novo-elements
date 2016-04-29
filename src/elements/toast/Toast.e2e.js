describe('Component: NovoToast', () => {
    beforeEach(() => {
        browser.get('/#/toast');
    });

    it('should fire <novo-toast>', () => {
        // toast launcher button
        let trigger = element(by.css('demo-app [data-automation-id="toast-trigger"]'));

        // click button
        trigger.click().then(() => {
            let subject = element(by.css('novo-toast')).isPresent();
            expect(subject).toBeTruthy();
        });
    });
});
