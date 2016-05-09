import { Component } from '@angular/core';

import { NOVO_TAB_ELEMENTS, NovoNavOutlet } from './Tabs';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

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


describe('Element: Tabs', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoNavOutlet);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
