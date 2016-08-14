import { CardElement } from './Card';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: Card', () => {
    let component;

    beforeEach(() => {
        addProviders([
            CardElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([CardElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
            expect(component.ngOnInit).toBeDefined();
            expect(component.onClose).toBeDefined();
            expect(component.onRefresh).toBeDefined();
            expect(component.padding).toBeTruthy();
        });
    });

    describe('Function: ngOnChanges()', () => {
        it('should be defined', () => {
            expect(component.ngOnChanges).toBeDefined();
        });

        it('should set defaults', () => {
            component.ngOnChanges();
            expect(component.config).toBeDefined();
            expect(component.cardAutomationId).toBe('no-title-card');
            expect(component.iconClass).toBeFalsy();
            expect(component.messageIconClass).toBeFalsy();
        });

        it('should setup with value set on component', () => {
            component.title = 'test';
            component.icon = 'test';
            component.messageIcon = 'test';
            component.ngOnChanges();
            expect(component.cardAutomationId).toBe('test-card');
            expect(component.iconClass).toBe('bhi-test');
            expect(component.messageIconClass).toBe('bhi-test');
        });

        it('should setup with value set in config', () => {
            component.config = {
                title: 'test',
                icon: 'test',
                messageIcon: 'test'
            };
            component.ngOnChanges();
            expect(component.cardAutomationId).toBe('test-card');
            expect(component.iconClass).toBe('bhi-test');
            expect(component.messageIconClass).toBe('bhi-test');
        });
    });

    describe('Function: toggleClose()', () => {
        it('should emit close event', () => {
            spyOn(component.onClose, 'next');
            component.toggleClose();
            expect(component.onClose.next).toHaveBeenCalledWith();
        });

        it('should call close function if defined in config', () => {
            component.config.onClose = () => {};
            spyOn(component.onClose, 'next');
            spyOn(component.config, 'onClose');
            component.toggleClose();
            expect(component.onClose.next).not.toHaveBeenCalled();
            expect(component.config.onClose).toHaveBeenCalled();
        });
    });

    describe('Function: toggleRefresh()', () => {
        it('should emit close event', () => {
            spyOn(component.onRefresh, 'next');
            component.toggleRefresh();
            expect(component.onRefresh.next).toHaveBeenCalledWith();
        });

        it('should call refresh function if defined in config', () => {
            component.config.onRefresh = () => {};
            spyOn(component.onRefresh, 'next');
            spyOn(component.config, 'onRefresh');
            component.toggleRefresh();
            expect(component.onRefresh.next).not.toHaveBeenCalled();
            expect(component.config.onRefresh).toHaveBeenCalled();
        });
    });
});
