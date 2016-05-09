import { Component } from '@angular/core';

import { Drawer } from './Drawer';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Drawer],
    template: `
        <div drawer [position]="'left'" (onDrawerToggle)="drawerToggled($event)">
            <button theme="secondary" drawerToggle [disabled]="disabled">Show Left</button>
            <div class="drawer-content">
                <h4>I am a left drawer!</h4>
            </div>
        </div>
    `
})
class TestCmp {
    drawerToggled(event) {
        console.log('Drawer Toggled', event); // eslint-disable-line
    }
}

describe('Element: Drawer', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { element, testComponentInstance, testComponentElement } = grabComponent(fixture, Drawer);
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
