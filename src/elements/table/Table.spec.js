// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it, xit } from '@angular/core/testing';

import { createTestContext } from './../../testing/TestContext';
import { NovoTable } from './Table';

@Component({
    selector: 'test-cmp',
    directives: [NovoTable],
    template: '<novo-table [rows]="rows" [columns]="columns" [config]="config" (onTableChange)="onTableChange($event)"></novo-table>'
})
class TestCmp {
    constructor() {
        this.rows = [{ test: 'Hi' }, { test: 'Hey' }];
        this.columns = [{ name: 1 }, { name: 2 }];
        this.config = {};
    }

    onTableChange(event) {
        this.event = event;
    }
}

describe('Element: NovoTable', () => {
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
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(NovoTable));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpInstance).toBeDefined();
        expect(cmpElement).toBeDefined();
    });

    describe('Method: getPageStart()', () => {
        it('should return 0 if paging is not enabled', () => {
            const pageStart = cmpInstance.getPageStart();
            expect(pageStart).toBe(0);
        });

        it('should return correctly if paging is enabled', () => {
            cmpInstance.config.paging = {
                current: 1,
                itemsPerPage: 10
            };

            let pageStart = cmpInstance.getPageStart();
            expect(pageStart).toBe(0);

            cmpInstance.config.paging = {
                current: 5,
                itemsPerPage: 10
            };

            pageStart = cmpInstance.getPageStart();
            expect(pageStart).toBe(40);
        });
    });

    describe('Method: getPageEnd()', () => {
        it('should return 0 if paging is not enabled', () => {
            const pageEnd = cmpInstance.getPageEnd();
            expect(pageEnd).toBe(2);
        });

        it('should return correctly if paging is enabled', () => {
            cmpInstance.config.paging = {
                current: 1,
                itemsPerPage: 10
            };

            let pageEnd = cmpInstance.getPageEnd();
            expect(pageEnd).toBe(10);

            cmpInstance.config.paging = {
                current: 5,
                itemsPerPage: 10
            };

            pageEnd = cmpInstance.getPageEnd();
            expect(pageEnd).toBe(50);
        });
    });

    describe('Method: rowClickHandler(row)', () => {
        it('should only emit the event if rowSelect is true', () => {
            spyOn(cmpInstance.onRowClick, 'emit');

            cmpInstance.rowClickHandler();
            expect(cmpInstance.onRowClick.emit).not.toHaveBeenCalled();

            cmpInstance.config.rowSelect = true;
            cmpInstance.rowClickHandler({ id: 10 });
            expect(cmpInstance.activeId).toBe(10);
            expect(cmpInstance.onRowClick.emit).toHaveBeenCalledWith({ id: 10 });
        });
    });

    describe('Method: findColumnIndex(value)', () => {
        it('should find a column index by name', () => {
            const index = cmpInstance.findColumnIndex(2);
            expect(index).toBe(1);
        });
    });

    describe('Method: onFilterClick(column, filter)', () => {
        it('should set the filter', () => {
            spyOn(cmpInstance, 'onFilterChange');
            const column = {};

            cmpInstance.onFilterClick(column, 'Test');

            expect(column.filter).toEqual(['Test']);
            expect(cmpInstance.onFilterChange).toHaveBeenCalled();
        });

        xit('should remove the filter if its already in the array', () => {
            const column = { filter: ['Test'] };
            cmpInstance.onFilterClick(column, 'Test');
            expect(column.filter).toEqual(null);
        });

        xit('should add the filter if its already in the array', () => {
            const column = { filter: ['Test'] };
            cmpInstance.onFilterClick(column, 'Test 2');
            expect(column.filter).toEqual(['Test', 'Test 2']);
        });
    });

    describe('Method: onFilterClear(column)', () => {
        it('should clear the filter', () => {
            spyOn(cmpInstance, 'onFilterChange');
            const column = { filter: 'Test' };
            cmpInstance.onFilterClear(column);
            expect(column.filter).toBe(null);
            expect(cmpInstance.onFilterChange).toHaveBeenCalled();
        });
    });

    describe('Method: onOrderChange(event)', () => {
        it('should change the order of the columns', () => {
            spyOn(cmpInstance, 'onSortChange');

            cmpInstance.onOrderChange({ first: { name: 2 }, second: { name: 1 } });

            expect(cmpInstance.columns).toEqual([{ name: 2 }, { name: 1 }]);
            expect(cmpInstance.onSortChange).toHaveBeenCalled();
        });
    });

    describe('Method: fireTableChangeEvent()', () => {
        it('should fire the correct table change event', () => {
            spyOn(cmpInstance.onTableChange, 'emit');

            cmpInstance.fireTableChangeEvent();
            expect(cmpInstance.onTableChange.emit).toHaveBeenCalledWith({
                filter: false,
                sort: false,
                rows: cmpInstance.rows
            });
        });

        it('should fire with filters/sorting', () => {
            spyOn(cmpInstance.onTableChange, 'emit');

            cmpInstance.columns[1].filter = 'Test';
            cmpInstance.currentSortColumn = { name: 1 };
            cmpInstance.fireTableChangeEvent();
            expect(cmpInstance.onTableChange.emit).toHaveBeenCalledWith({
                filter: [{ name: 2, filter: 'Test' }],
                sort: { name: 1 },
                rows: cmpInstance.rows
            });
        });
    });

    describe('Method: onFilterChange()', () => {
        it('should not do anything if filtering is not enabled', () => {
            spyOn(cmpInstance, 'onSortChange');
            cmpInstance.onFilterChange();
            expect(cmpInstance.onSortChange).not.toHaveBeenCalled();
        });

        it('call down into sort change', () => {
            spyOn(cmpInstance, 'onSortChange');

            cmpInstance.config.filtering = true;
            cmpInstance.onFilterChange();

            expect(cmpInstance.onSortChange).toHaveBeenCalled();
        });

        it('reset the current page if paging is enabled', () => {
            spyOn(cmpInstance, 'onSortChange');

            cmpInstance.config.filtering = true;
            cmpInstance.config.paging = { current: 5 };
            cmpInstance.onFilterChange();

            expect(cmpInstance.onSortChange).toHaveBeenCalled();
            expect(cmpInstance.config.paging.current).toBe(1);
        });
    });

    describe('Method: onSortChange()', () => {
        it('call down into  fireTableChange', () => {
            spyOn(cmpInstance, 'fireTableChangeEvent');
            cmpInstance.onSortChange();
            expect(cmpInstance.fireTableChangeEvent).toHaveBeenCalled();
        });

        it('reset the current page if paging is enabled', () => {
            spyOn(cmpInstance, 'fireTableChangeEvent');

            cmpInstance.config.paging = { current: 5 };
            cmpInstance.onSortChange();

            expect(cmpInstance.fireTableChangeEvent).toHaveBeenCalled();
            expect(cmpInstance.config.paging.current).toBe(1);
        });
    });
});
