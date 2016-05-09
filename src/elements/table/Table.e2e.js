describe('Component: NovoTable', () => {
    beforeEach(() => {
        browser.get('/table');
    });

    it('should have <novo-table>', () => {
        let subject = element(by.css('demo-app novo-table')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should have <novo-pagination>', () => {
        let subject = element(by.css('demo-app novo-pagination')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should be draggable', () => {
        let subject = element(by.css('demo-app novo-table th[draggable="true"]')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should be filterable', () => {
        let subject = element(by.css('demo-app novo-table novo-dropdown')).isPresent();
        expect(subject).toBeTruthy();
    });

    it('should open filter when clicked', () => {
        let hasClass = (element, cls) => {
            return element.getAttribute('class').then((classes) => {
                return classes.split(' ').indexOf(cls) !== -1;
            });
        };

        let subject = element(by.css('demo-app novo-table novo-dropdown'));
        subject.click();
        browser.sleep(300);
        expect(hasClass(subject, 'active')).toBeTruthy();
    });
});
