import { Component } from '@angular/core';
import { TilesInput } from './TilesInput';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';
import { NovoLabelService } from './../../../../novo-elements';


@Component({
    selector: 'tiles-input',
    directives: [TilesInput],
    template: `
        <tiles-input></tiles-input>
    `
})
class TestCmp {
}

describe('Component: TilesInput', () => {
    let comp;

    beforeEachProviders(() => [
        TilesInput,
        NovoLabelService
    ]);

    describe('Element: TilesInput', () => {
        it('should initialize correctly', testComponent(TestCmp, (fixture) => {
            const { instance, element, testComponentInstance } = grabComponent(fixture, TilesInput);
            expect(instance).toBeTruthy();
            expect(element).toBeTruthy();
            expect(element.innerHTML).toContain('novo-tiles');
            expect(element.outerHTML).toContain('tiles-input');
            expect(testComponentInstance).toBeTruthy();
        }));
    });

    beforeEach(inject([TilesInput], _comp => {
        comp = _comp;
    }));

    it('instantiate with all defaults.', () => {
        expect(comp).toBeDefined();
        expect(comp.labels).toBeDefined();
    });

    describe('Function: onChanged', () => {
        it('should update value', () => {
            expect(comp.onChanged).toBeDefined();
            comp.update = {
                emit: () => {
                }
            };
            comp.control = {
                updateValue: () => {
                }
            };
            spyOn(comp.update, 'emit').and.callThrough();
            spyOn(comp.control, 'updateValue').and.callThrough();
            comp.onChanged(10);
            expect(comp.value).toBe(10);
            expect(comp.update.emit).toHaveBeenCalledWith(10);
            expect(comp.control.updateValue).toHaveBeenCalledWith(10);
        });
    });
});
