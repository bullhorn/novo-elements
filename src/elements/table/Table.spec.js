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

describe('Element: Table', () => {
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
        beforeEach(() => {
            comp.columns = [
                {
                    filter: 'a',
                    filtering: true,
                    name: 'name'
                }
            ];
            comp.originalRows = [
                {
                    id: 1,
                    name: 'Jane'
                },
                {
                    id: 2,
                    name: 'John'
                }
            ];
            comp.config = {
                filtering: true
            };
        });

        it('should update the row data to reflect the active filters (string comparison).', () => {
            expect(comp.onFilterChange).toBeDefined();
            comp.onFilterChange();
            expect(comp.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (array comparison).', () => {
            expect(comp.onFilterChange).toBeDefined();
            comp.originalRows[0].name = ['Jane', 'Janet', 'Janice'];
            comp.originalRows[1].name = ['Jon', 'Joe', 'Jose'];
            comp.onFilterChange();
            expect(comp.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom filter).', () => {
            expect(comp.onFilterChange).toBeDefined();
            comp.config.filtering = (filterValue, data) => {
                let matches = [];
                data.forEach(row => {
                    if (row.name === 'John') {
                        matches.push(row);
                    }
                });
                return matches;
            };
            comp.onFilterChange();
            expect(comp.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom config filter).', () => {
            expect(comp.onFilterChange).toBeDefined();
            // This is needed for the filter
            expect(comp.structureDateCells).toBeDefined();
            let mockOption = { label: 'Today', min: -1, max: 1 };
            comp.columns = [{
                options: {
                    type: 'date',
                    data: [mockOption]
                }
            }];
            // Set dates
            comp.originalRows[0].name = new Date();
            comp.originalRows[1].name = new Date(1970, 3, 11, 13, 13);
            // Get's the date difference and appends it to the original rows data (done on init).
            comp.rows = comp.structureDateCells(comp.originalRows, 'name');
            // Set active filter
            comp.columns[0].filter = [mockOption];
            comp.onFilterChange();
            expect(comp.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom match function).', () => {
            expect(comp.onFilterChange).toBeDefined();
            comp.columns[0].match = (item, filter) => {
                return item.match(new RegExp(filter, 'gi'));
            };
            comp.onFilterChange();
            expect(comp.rows.length).toBe(1);
        });
    });

    describe('Function: isFilterActive(columnFilters, filter)', () => {
        it('should return true when the filter is active and false when it is not.', () => {
            expect(comp.isFilterActive).toBeDefined();
            let mockColumnFilters = {
                filter: []
            };
            let mockFilter = {
                label: 'Filter'
            };
            // Using Filter Objects
            expect(comp.isFilterActive(mockColumnFilters, mockFilter)).toBeFalsy();
            mockColumnFilters.filter.push(mockFilter);
            expect(comp.isFilterActive(mockColumnFilters, mockFilter)).toBeTruthy();
            // Using strings
            expect(comp.isFilterActive({ filter: ['Filter'] }, 'Filter')).toBeTruthy();
            expect(comp.isFilterActive({ filter: ['Filter'] }, 'z')).toBeFalsy();
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

    describe('Function: setDateOptions(rowData)', () => {
        it('should return all options when the data dates cover the full range.', () => {
            expect(comp.setDateOptions).toBeDefined();
            let mockRows = [
                {
                    id: 1,
                    name: 'Jane',
                    _dateDifference: -100
                },
                {
                    id: 2,
                    name: 'John',
                    _dateDifference: 100
                }
            ];
            let mockOptions = comp.setDateOptions(mockRows);
            expect(mockOptions.length).toBe(8);
        });
        it('should return a subset of options when the data dates cover a small range.', () => {
            expect(comp.setDateOptions).toBeDefined();
            let mockRows = [
                {
                    id: 1,
                    name: 'Jane',
                    _dateDifference: -33
                },
                {
                    id: 2,
                    name: 'John',
                    _dateDifference: 30
                }
            ];
            let mockOptions = comp.setDateOptions(mockRows);
            expect(mockOptions.length).toBe(4);
        });
    });

    describe('Function: structureDateCells(rowData, key)', () => {
        it('should structure all of the rows to have a \'_dateDifference\' value for filtering.', () => {
            expect(comp.structureDateCells).toBeDefined();
            let mockRows = [
                {
                    id: 1,
                    name: 'Jane',
                    date: new Date()
                },
                {
                    id: 2,
                    name: 'John',
                    date: new Date()
                }
            ];
            comp.structureDateCells(mockRows, 'date');
            expect(mockRows[0]._dateDifference).toBeDefined();
            expect(mockRows[0]._dateDifference).toBe(0);
            expect(mockRows[1]._dateDifference).toBeDefined();
            expect(mockRows[1]._dateDifference).toBe(0);
        });
    });
});
