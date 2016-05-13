import { Component } from '@angular/core';

import { TableFilter } from './TableFilter';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [TableFilter],
    template: '<div [novoTableFilter]="config" (onFilterChange)="onFilterChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
    }

    onFilterChange(event) {
        this.event = event;
    }
}

describe('Element: TableFilter', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { element, testComponentInstance, testComponentElement } = grabComponent(fixture, TableFilter);
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
