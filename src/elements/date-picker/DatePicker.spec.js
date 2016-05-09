// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../testing/TestContext';
import { DatePicker } from './DatePicker';

@Component({
    selector: 'test-cmp',
    directives: [DatePicker, COMMON_DIRECTIVES],
    template: '<novo-date-picker [(ngModel)]="date"></novo-date-picker>'
})
class TestCmp {
    constructor() {
        this.date = new Date();
    }
}

describe('Element: DatePicker', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(DatePicker));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and element defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
