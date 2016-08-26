import { NovoButtonElement } from './Button';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: NovoButtonElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoButtonElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoButtonElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnChanges()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Function: ngOnChanges()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
            expect(component.ngOnChanges).toBeDefined();
        });

        it('should setup the iconClass if icon is passed', () => {
            component.icon = 'test';
            component.ngOnChanges();
            expect(component.iconClass).toBe('bhi-test');
        });

        it('should NOT set the iconClass if icon is NOT present', () => {
            component.ngOnChanges();
            expect(component.iconClass).toBe('');
        });

        it('should set flex based on theme', () => {
            component.theme = 'primary';
            component.ngOnChanges();
            expect(component.flex).toBe('flex-wrapper');
            component.theme = null;
            component.ngOnChanges();
            expect(component.flex).toBe('');
        });

        it('should force icon to right if theme is primary', () => {
            component.theme = 'primary';
            component.side = 'left';
            component.ngOnChanges();
            expect(component.leftSide).toBeFalsy();
            expect(component.rightSide).toBeTruthy();
        });

        it('should set icon to left as long as theme is NOT primary', () => {
            component.theme = 'secondary';
            component.side = 'left';
            component.ngOnChanges();
            expect(component.leftSide).toBeTruthy();
            expect(component.rightSide).toBeFalsy();
        });
    });
});
