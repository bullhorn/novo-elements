// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from './../../../../testing/TestContext';
import { CardBestTime } from './CardBestTime';

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
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(CardBestTime));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
