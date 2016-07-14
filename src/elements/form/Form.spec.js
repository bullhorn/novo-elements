import { Component } from '@angular/core';

import { Form } from './Form';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Form],
    template: '<novo-form></novo-form>'
})
class TestCmp {
}

describe('Element: Form', () => {
    let comp;
    beforeEachProviders(() => [
        Form
    ]);

    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, Form);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));

    beforeEach(inject([Form], _comp => {
        comp = _comp;
    }));

    describe('Function: hideCompletedFields', () => {
        it('should not hide required fields with no data', () => {
            comp.fields = [{
                data: {
                    name: 'stuff',
                    required: true
                },
                hidden: false
            }];
            comp.data = {};
            comp.hideCompletedFields();
            expect(comp.fields[0].hidden).toBeFalsy();
        });
        it('should hide required fields with data', () => {
            comp.fields = [{
                data: {
                    name: 'stuff',
                    required: true
                },
                hidden: false
            }];
            comp.data = {
                stuff: 'stuff'
            };
            comp.hideCompletedFields();
            expect(comp.fields[0].hidden).toBeTruthy();
        });
    });
});
