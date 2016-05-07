import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { NOVO_TAB_ELEMENTS, NovoNav, NovoNavOutlet } from './Tabs';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_TAB_ELEMENTS],
    template: `
    <header>
        <novo-nav theme="white" [outlet]="whitenav">
            <novo-tab>
                <span><i class="bhi-person"></i>Tab 1</span>
            </novo-tab>
            <novo-tab>
                <span><i class="bhi-person"></i>Tab 2</span>
            </novo-tab>
        </novo-nav>
    </header>
    <novo-nav-outlet #whitenav>
        <novo-nav-content>
            <h1>Tab 1 Content</h1>
        </novo-nav-content>
        <novo-nav-content>
            <h1>Tab 2 Content</h1>
        </novo-nav-content>
    </novo-nav-outlet>
`
})
class TestCmp {
    constructor() {
    }
}


describe('Element: NovoTabs', () => {
    let ctx;
    let novoNavOutletDebugElement;
    let novoNavDebugElement;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                novoNavDebugElement = ctx.fixture.debugElement.query(By.directive(NovoNav));
                novoNavOutletDebugElement = ctx.fixture.debugElement.query(By.directive(NovoNavOutlet));
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(novoNavDebugElement).toBeDefined();
        expect(novoNavOutletDebugElement).toBeDefined();
    });
});
