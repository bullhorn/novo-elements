// NG2
import { Component } from '@angular/core';
// App
import { TipWell } from './TipWell';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [
        TipWell
    ],
    template: '<novo-tip-well></novo-tip-well>'
})
class TestCmp {
}

describe('Component: TipWell', () => {
    let comp;

    beforeEachProviders(() => [
        TipWell
    ]);

    describe('Element: TipWell', () => {
        it('should initialize correctly', testComponent(TestCmp, (fixture) => {
            const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, TipWell);
            expect(instance).toBeTruthy();
            expect(element).toBeTruthy();
            expect(element.innerHTML).toContain('template bindings');
            expect(testComponentInstance).toBeTruthy();
            expect(testComponentElement).toBeTruthy();
        }));
    });

    beforeEach(inject([TipWell], _comp => {
        comp = _comp;
        localStorage.clear();
    }));

    it('should initialize with defaults.', () => {
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
});
