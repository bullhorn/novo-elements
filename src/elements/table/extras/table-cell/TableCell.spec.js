import { Component } from '@angular/core';

import { TableCell } from './TableCell';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [TableCell],
    template: '<novo-table-cell [column]="column" [row]="row"></novo-table-cell>'
})
class TestCmp {
    constructor() {
        this.column = { name: 'test', type: 'text' };
        this.row = { test: 'Test' };
    }
}

describe('Element: TableCell', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, TableCell);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
