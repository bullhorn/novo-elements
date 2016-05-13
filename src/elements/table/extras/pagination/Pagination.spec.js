import { Component } from '@angular/core';

import { Pagination } from './Pagination';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Pagination],
    template: `
    <novo-pagination [page]="current"
                [totalItems]="data.length"
                [itemsPerPage]="itemsPerPage"
                (pageChanged)="onPageChange($event)">
    </novo-pagination>`
})
class TestCmp {
    constructor() {
        this.current = 1;
        this.data = ['Test'];
        this.itemsPerPage = 5;
    }

    onPageChange(event) {
        this.event = event;
    }
}

describe('Element: Pagination', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, Pagination);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
