// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from './../../../../testing/TestContext';
import { CardDonutChart } from './CardDonutChart';

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
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(CardDonutChart));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
