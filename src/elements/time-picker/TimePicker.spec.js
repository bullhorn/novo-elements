// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { TimePicker } from './TimePicker';

@Component({
    selector: 'test-cmp',
    directives: [TimePicker, COMMON_DIRECTIVES],
    template: '<novo-time-picker [(ngModel)]="date"></novo-time-picker>'
})
class TestCmp {
    constructor() {
        this.date = new Date();
    }
}

describe('Element: TimePicker', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(TimePicker));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and element defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
