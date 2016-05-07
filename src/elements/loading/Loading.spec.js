// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { Loading } from './Loading';

@Component({
    selector: 'test-cmp',
    directives: [Loading],
    template: '<novo-loading theme="line"></novo-loading>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: Loading', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Loading));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and element defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });

    it('should default the stage to an empty string', () => {
        expect(instance.stage).toEqual('');
    });
});
