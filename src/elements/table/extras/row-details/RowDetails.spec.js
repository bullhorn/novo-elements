import { Component } from '@angular/core';

import { RowDetails } from './RowDetails';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [RowDetails],
    template: '<novo-row-details [data]="data" [renderer]="renderer"></novo-row-details>'
})
class TestCmp {
    constructor() {
        this.data = {};
        this.renderer = () => {
            return 'Test';
        };
    }
}

describe('Element: RowDetails', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, RowDetails);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
