// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { ThSortable } from './ThSortable';

@Component({
    selector: 'test-cmp',
    directives: [ThSortable],
    template: '<div [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
        this.column = { sort: true };
    }

    onSortChange(event) {
        this.event = event;
    }
}

describe('Element: ThSortable', () => {
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
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(ThSortable));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpElement).toBeDefined();
        expect(cmpInstance).toBeDefined();
    });

    describe('Method: onToggleSort(event)', () => {
        it('should bubble a sort change event with "asc" the first time and prevent default', () => {
            const mockEvent = {
                preventDefault: () => {
                }
            };

            spyOn(cmpInstance.onSortChange, 'emit');
            spyOn(mockEvent, 'preventDefault');

            cmpInstance.onToggleSort(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(cmpInstance.onSortChange.emit).toHaveBeenCalledWith({ sort: 'asc' });
        });

        it('should send "desc" if the column is already sorted', () => {
            spyOn(cmpInstance.onSortChange, 'emit');

            cmpInstance.column.sort = 'asc';
            cmpInstance.onToggleSort();

            expect(cmpInstance.onSortChange.emit).toHaveBeenCalledWith({ sort: 'desc' });
        });

        it('should not send an event if sorting isn\'t configured', () => {
            spyOn(cmpInstance.onSortChange, 'emit');

            cmpInstance.column.sort = false;
            cmpInstance.onToggleSort();

            expect(cmpInstance.onSortChange.emit).not.toHaveBeenCalled();
        });
    });
});
