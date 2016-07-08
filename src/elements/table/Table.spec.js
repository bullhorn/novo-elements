import { Component } from '@angular/core';

import { NovoTable } from './Table';
import { testComponent, grabComponent } from './../../testing/TestHelpers';
import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../../novo-elements';

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

fdescribe('Element: Table', () => {
    let comp;
    beforeEachProviders(() => [
        NOVO_ELEMENTS_LABELS_PROVIDERS,
        NovoTable
    ]);

    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoTable);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(element.outerHTML).toContain('novo-table');
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));

    beforeEach(inject([NovoTable], _comp => {
        comp = _comp;
    }));

    it('should initialize with all of its defaults.', () => {
        expect(comp).toBeDefined();
        // NG2
        expect(comp.onRowClick).toBeDefined();
        expect(comp.onRowSelect).toBeDefined();
        expect(comp.onTableChange).toBeDefined();
        // App
        expect(comp.labels).toBeDefined();
        // Vars
        expect(comp.originalRows).toBeDefined();
        expect(comp.activeId).toBeDefined();
        expect(comp.master).toBeDefined();
        expect(comp.indeterminate).toBeDefined();
        expect(comp.lastPage).toBeDefined();
    });

    describe('Function: ngOnChanges()', () => {
        it('should set originalRows.', () => {
            expect(comp.ngOnChanges).toBeDefined();
            comp.rows = [];
            comp.ngOnChanges();
            expect(comp.originalRows.length).toBe(0);
        });
    });

    describe('Function: ngDoCheck()', () => {
        it('should .', () => {
            expect(comp.ngDoCheck).toBeDefined();
        });
    });

    describe('Function: getPageStart()', () => {
        it('should .', () => {
            expect(comp.getPageStart).toBeDefined();
        });
    });

    describe('Function: getPageEnd()', () => {
        it('should .', () => {
            expect(comp.getPageEnd).toBeDefined();
        });
    });

    describe('Function: focusInput()', () => {
        it('should .', () => {
            expect(comp.focusInput).toBeDefined();
        });
    });

    describe('Function: onFilterClick()', () => {
        it('should .', () => {
            expect(comp.onFilterClick).toBeDefined();
        });
    });

    describe('Function: onFilterClear()', () => {
        it('should .', () => {
            expect(comp.onFilterClear).toBeDefined();
        });
    });

    describe('Function: onFilterChange()', () => {
        it('should .', () => {
            expect(comp.onFilterChange).toBeDefined();
        });
    });

    describe('Function: onSortChange(newSortColumn)', () => {
        it('should .', () => {
            expect(comp.onSortChange).toBeDefined();
        });
    });

    describe('Function: fireTableChangeEvent()', () => {
        it('should .', () => {
            expect(comp.fireTableChangeEvent).toBeDefined();
        });
    });

    describe('Function: findColumnIndex(value)', () => {
        it('should .', () => {
            expect(comp.findColumnIndex).toBeDefined();
        });
    });

    describe('Function: onOrderChange(event)', () => {
        it('should .', () => {
            expect(comp.onOrderChange).toBeDefined();
        });
    });

    describe('Function: selectAll()', () => {
        it('should .', () => {
            expect(comp.selectAll).toBeDefined();
        });
    });

    describe('Function: rowSelectHandler()', () => {
        it('should .', () => {
            expect(comp.rowSelectHandler).toBeDefined();
        });
    });

    describe('Function: emitSelected()', () => {
        it('should .', () => {
            expect(comp.emitSelected).toBeDefined();
        });
    });

    describe('Function: rowClickHandler()', () => {
        it('should .', () => {
            expect(comp.rowClickHandler).toBeDefined();
        });
    });

    describe('Function: getDateIntervals(options)', () => {
        it('should .', () => {
            expect(comp.rowClickHandler).toBeDefined();
        });
    });
});
