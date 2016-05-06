import { Component } from 'angular2/core';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../testing/TestContext';
import { NOVO_HEADER_ELEMENTS } from './Header';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_HEADER_ELEMENTS],
    template: 'TODO'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: Header', () => {
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
