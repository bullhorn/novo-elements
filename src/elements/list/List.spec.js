import { Component } from '@angular/core';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { NOVO_LIST_ELEMENTS } from './List';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_LIST_ELEMENTS],
    template: 'TODO'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoList', () => {
    let ctx;
    let instance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                instance = ctx.fixture.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
    });
});
