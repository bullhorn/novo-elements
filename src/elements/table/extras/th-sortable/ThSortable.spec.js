import { Component } from '@angular/core';

import { ThSortable } from './ThSortable';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [ThSortable],
    template: '<div [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
        this.column = { sort: true };
    }

    onSortChange(event) {
        this.event = event;
    }
}

describe('Element: ThSortable', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { element, testComponentInstance, testComponentElement } = grabComponent(fixture, ThSortable);
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
