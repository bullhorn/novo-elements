import { Component } from '@angular/core';

import { CardDonutChart } from './CardDonutChart';
import { testComponent, grabComponent } from './../../../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [CardDonutChart],
    template: '<novo-card-chart-donut [value]="donutValue" [label]="donutLabel" [color]="donutColor"></novo-card-chart-donut>'
})
class TestCmp {
    constructor() {
        this.donutValue = 0.5;
        this.donutColor = '#662255';
        this.donutLabel = 'Probability of Win %';
    }
}

describe('Element: CardDonutChart', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, CardDonutChart);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
