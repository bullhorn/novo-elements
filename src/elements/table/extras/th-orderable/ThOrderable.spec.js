// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { ThOrderable } from './ThOrderable';

@Component({
    selector: 'test-cmp',
    directives: [ThOrderable],
    template: '<div [novoThOrderable]="config" (onOrderChange)="onOrderChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
    }

    onOrderChange(event) {
        this.event = event;
    }
}

describe('Element: ThOrderable', () => {
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
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(ThOrderable));
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
