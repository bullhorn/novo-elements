import { Component } from '@angular/core';

import { ThOrderable } from './ThOrderable';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [ThOrderable],
    template: '<div [novoThOrderable]="config" (onOrderChange)="onOrderChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
    }

    onOrderChange(event) {
        this.event = event;
    }
}

describe('Element: ThOrderable', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { element, testComponentInstance, testComponentElement } = grabComponent(fixture, ThOrderable);
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
