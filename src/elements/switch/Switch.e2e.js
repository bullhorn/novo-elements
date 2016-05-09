describe('Component: Switch', () => {
    beforeEach(() => {
        browser.get('/switch');
    });

    it('should have <novo-switch>', () => {
        let subject = element(by.css('demo-app novo-switch')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should fire switch event', () => {
        let subject = element(by.css('novo-switch[data-automation-id="switchTest"]'));
        // test switch
        subject.click();
        browser.sleep(300);
        expect(subject.getAttribute('aria-checked')).toMatch('false');
        // test switch back
        subject.click();
        browser.sleep(300);
        expect(subject.getAttribute('aria-checked')).toMatch('true');
    });
});
