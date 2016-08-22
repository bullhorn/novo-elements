// App
import { NovoTipWellElement } from './TipWell';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Component: TipWell', () => {
    let comp;

    beforeEach(() => {
        addProviders([
            NovoTipWellElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoTipWellElement], _comp => {
        comp = _comp;
        localStorage.clear();
    }));

    it('should initialize with defaults', () => {
        expect(comp).toBeDefined();
        expect(comp.isActive).toBeTruthy();
        expect(comp.isLocalStorageEnabled).toBeTruthy();
    });

    describe('Method: hideTip()', () => {
        it('should hide the tip and add a value to localStorage', () => {
            expect(comp.hideTip).toBeDefined();
            expect(localStorage.getItem(comp.localStorageKey)).toBe(null);
            comp.hideTip();
            expect(JSON.parse(localStorage.getItem(comp.localStorageKey))).toBeFalsy();
        });
    });

    describe('Method: ngOnInit()', () => {
        it('should initialize tipwell variables to defaults', () => {
            comp.ngOnInit();
            expect(comp.tip).toEqual('');
            expect(comp.buttonText).toEqual('Ok, Got it');
            expect(comp.button).toBeTruthy();
            expect(comp.icon).toBeNull();
        });
    });
});
