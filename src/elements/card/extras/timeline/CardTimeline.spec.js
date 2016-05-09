import { Component } from '@angular/core';

import { CardTimeline } from './CardTimeline';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [CardTimeline],
    template: '<novo-card-timeline [start]="start" [end]="end" [created]="created"></novo-card-timeline>'
})
class TestCmp {
    constructor() {
        this.start = 2000;
        this.end = 2005;
        this.created = 1995;
    }
}

describe('Element: CardTimeline', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, CardTimeline);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
