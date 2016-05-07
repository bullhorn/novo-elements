// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { Drawer } from './Drawer';

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
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Drawer));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and element defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
