// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from './../../testing/TestContext';
import { Select } from './Select';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'test-cmp',
    directives: [Select],
    template: '<novo-select [options]="options" [placeholder]="placeholder" [(ngModel)]="value" disabled></novo-select>'
})
class TestCmp {
    constructor() {
        this.placeholder = 'Testing';
        this.options = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        this.value = 'Alaska';
    }
}

describe('Element: Select', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Select));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
        expect(instance.selectedIndex).toBe(1);
    });

    xdescribe('Function: select(option, i)', () => {
        it('should select option', () => {
            instance.select('California', 4);
            expect(instance.selectedIndex).toBe(4);
        });
    });

    xdescribe('Function: clear()', () => {
        it('should clear value', () => {
            instance.clear();
            expect(instance.selectedIndex).toBe(-1);
        });
    });

    xdescribe('Function: onKeyDown(value)', () => {
        it('should select next value on Down key', () => {
            let evt = {
                keyCode: KeyCodes.DOWN,
                preventDefault: () => true
            };
            instance.select('California', 4);
            expect(instance.selectedIndex).toBe(4);
            // force open select list
            instance.active = true;
            instance.onKeyDown(evt);
            expect(instance.selectedIndex).toBe(5);
            instance.onKeyDown(evt);
            expect(instance.selectedIndex).toBe(6);
        });
        it('should select previous value on Up key', () => {
            let evt = {
                keyCode: KeyCodes.UP,
                preventDefault: () => true
            };
            instance.select('California', 4);
            expect(instance.selectedIndex).toBe(4);
            // force open select list
            instance.active = true;
            instance.onKeyDown(evt);
            expect(instance.selectedIndex).toBe(3);
            instance.onKeyDown(evt);
            expect(instance.selectedIndex).toBe(2);
        });
    });
});
