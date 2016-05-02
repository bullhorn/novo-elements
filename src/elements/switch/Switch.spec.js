import { Component } from 'angular2/core';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../testing/TestContext';
import { NOVO_SWITCH_ELEMENTS } from './Switch';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_SWITCH_ELEMENTS],
    template: 'TODO'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoSwitch', () => {
    let ctx;
    let instance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                instance = ctx.fixture.componentInstance;
                // const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(BhTooltip));
                // cmpElement = cmpDebugElement.nativeElement;
                // cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
    });
});
