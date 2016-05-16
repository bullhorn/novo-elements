describe('Element: NovoModal', () => {
    beforeEach(() => {
        browser.get('/#/modal');
    });

    xit('should fire <novo-modal>', () => {
        // toast launcher button
        let trigger = element(by.css('demo-app [data-automation-id="modal-trigger"]'));

        // click button
        trigger.click().then(() => {
            let subject = element(by.css('novo-modal')).isPresent();
            expect(subject).toBeTruthy();
        });
    });
});
