// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../../../testing/TestContext';
import { Pagination } from './Pagination';

@Component({
    selector: 'test-cmp',
    directives: [Pagination],
    template: `
    <novo-pagination [page]="current"
                [totalItems]="data.length"
                [itemsPerPage]="itemsPerPage"
                (pageChanged)="onPageChange($event)">
    </novo-pagination>`
})
class TestCmp {
    constructor() {
        this.current = 1;
        this.data = ['Test'];
        this.itemsPerPage = 5;
    }

    onPageChange(event) {
        this.event = event;
    }
}

describe('Element: Pagination', () => {
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
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Pagination));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpInstance).toBeDefined();
        expect(cmpElement).toBeDefined();
    });

    it('should have default values', () => {
        expect(cmpInstance.pageOptions).toEqual(['10', '50', '500']);
    });

    describe('Method: onPageSizeChanged(event)', () => {
        it('should reset the page and emit an event', () => {
            spyOn(cmpInstance.onPageChange, 'emit');

            cmpInstance.onPageSizeChanged({ selected: 10 });

            expect(cmpInstance.page).toBe(1);
            expect(cmpInstance.itemsPerPage).toBe(10);
            expect(cmpInstance.onPageChange.emit).toHaveBeenCalledWith({ page: 1, itemsPerPage: 10 });
        });
    });

    describe('Method: selectPage(event)', () => {
        it('should prevent default and send a new event', () => {
            const mockEvent = {
                preventDefault: () => {
                }
            };

            spyOn(cmpInstance.onPageChange, 'emit');

            cmpInstance.selectPage(5, mockEvent);

            expect(cmpInstance.page).toBe(5);
            expect(cmpInstance.onPageChange.emit).toHaveBeenCalledWith({ page: 5, itemsPerPage: 5 });
        });

        it('should ignore the event if not passed in', () => {
            spyOn(cmpInstance.onPageChange, 'emit');

            cmpInstance.selectPage(5);

            expect(cmpInstance.page).toBe(5);
            expect(cmpInstance.onPageChange.emit).toHaveBeenCalledWith({ page: 5, itemsPerPage: 5 });
        });
    });

    describe('Method: calculateTotalPages()', () => {
        it('should calculate correctly', () => {
            let totalPages = cmpInstance.calculateTotalPages();
            expect(totalPages).toBe(1);

            cmpInstance.itemsPerPage = 0;
            totalPages = cmpInstance.calculateTotalPages();
            expect(totalPages).toBe(1);
        });
    });
});
