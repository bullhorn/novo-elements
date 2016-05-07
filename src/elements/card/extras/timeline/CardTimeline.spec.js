// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from './../../../../testing/TestContext';
import { CardTimeline } from './CardTimeline';

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
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(CardTimeline));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
