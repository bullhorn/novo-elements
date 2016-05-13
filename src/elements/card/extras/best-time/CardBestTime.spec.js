import { Component } from '@angular/core';

import { CardBestTime } from './CardBestTime';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [CardBestTime],
    template: '<novo-card-best-time [label]="bestLabel" [day]="bestDay" [time]="bestTime"></novo-card-best-time>'
})
class TestCmp {
    constructor() {
        this.bestLabel = 'BEST TIME TO CONTACT';
        this.bestTime = '1-PM';
        this.bestDay = 'Friday';
    }
}

describe('Element: CardBestTime', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, CardBestTime);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
