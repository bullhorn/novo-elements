// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { TableFilter } from './TableFilter';

@Component({
    selector: 'test-cmp',
    directives: [TableFilter],
    template: '<div [novoTableFilter]="config" (onFilterChange)="onFilterChange($event)"></div>'
})
class TestCmp {
    constructor() {
        this.config = {};
    }

    onFilterChange(event) {
        this.event = event;
    }
}

describe('Element: TableFilter', () => {
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
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(TableFilter));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpElement).toBeDefined();
        expect(cmpInstance).toBeDefined();
    });

    describe('Method: onChangeFilter(event)', () => {
        it('change the filter and emit an event', done => {
            spyOn(cmpInstance.onFilterChange, 'emit');

            cmpInstance.onChangeFilter({ target: { value: 10 } });

            setTimeout(() => {
                expect(cmpInstance.config.filter).toEqual(10);
                expect(cmpInstance.onFilterChange.emit).toHaveBeenCalledWith({ filtering: { filter: 10 } });
                done();
            }, 350);
        });
    });

    describe('Method: onClick(event)', () => {
        it('should stop the event if passed in', () => {
            const mockEvent = {
                preventDefault: () => {
                },
                stopPropagation: () => {
                }
            };

            spyOn(mockEvent, 'preventDefault');
            spyOn(mockEvent, 'stopPropagation');

            cmpInstance.onClick(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });

        it('should ignore the event if not passed', () => {
            cmpInstance.onClick();
        });
    });
});
