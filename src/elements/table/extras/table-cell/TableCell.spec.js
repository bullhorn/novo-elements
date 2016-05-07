// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { TableCell } from './TableCell';

@Component({
    selector: 'test-cmp',
    directives: [TableCell],
    template: '<novo-table-cell [column]="column" [row]="row"></novo-table-cell>'
})
class TestCmp {
    constructor() {
        this.column = { name: 'test', type: 'text' };
        this.row = { test: 'Test' };
    }
}

describe('Element: TableCell', () => {
    let ctx;
    let instance;
    let cmpElement;
    let cmpInstance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                instance = ctx.fixture.componentInstance;
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(TableCell));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpElement).toBeDefined();
        expect(cmpInstance).toBeDefined();
    });

    describe('Method: onClick(event)', () => {
        it('should stop the event if passed in and call into the column click', () => {
            const mockEvent = {
                preventDefault: () => {
                },
                stopPropagation: () => {
                }
            };
            cmpInstance.column.onClick = () => {
            };

            spyOn(mockEvent, 'preventDefault');
            spyOn(mockEvent, 'stopPropagation');
            spyOn(cmpInstance.column, 'onClick');

            cmpInstance.onClick(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(cmpInstance.column.onClick).toHaveBeenCalled();
        });

        it('should ignore the event if not passed', () => {
            cmpInstance.onClick();
        });

        it('should not call the column click handler if there is not one', () => {
            cmpInstance.onClick();
        });
    });
});
