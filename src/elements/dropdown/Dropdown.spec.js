import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from './../../testing/TestContext';
import { Dropdown } from './Dropdown';

@Component({
    selector: 'test-cmp',
    directives: [Dropdown],
    template: `
        <novo-dropdown>
            <button type="button" theme="header" icon="collapse">Actions</button>
            <list>
                <item>Action 1</item>
                <item>Action 2</item>
                <item>Action 3</item>
            </list>
        </novo-dropdown>
    `
})
class TestCmp {
}

describe('Element: Dropdown', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Dropdown));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(element).toBeDefined();
        expect(instance).toBeDefined();
        expect(instance.active).toBe(false);
    });
});
