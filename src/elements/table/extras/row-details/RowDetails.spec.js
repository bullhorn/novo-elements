// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { RowDetails } from './RowDetails';

@Component({
    selector: 'test-cmp',
    directives: [RowDetails],
    template: '<novo-row-details [data]="data" [renderer]="renderer"></novo-row-details>'
})
class TestCmp {
    constructor() {
        this.data = {};
        this.renderer = () => {
            return 'Test';
        };
    }
}

describe('Element: RowDetails', () => {
    let ctx;
    let instance;
    let cmpElement;
    let cmpInstance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                instance = ctx.fixture.componentInstance;
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(RowDetails));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpElement).toBeDefined();
        expect(cmpInstance).toBeDefined();
    });
});
