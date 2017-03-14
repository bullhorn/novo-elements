// NG2
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, FormGroupDirective, NgControl, FormControlName, FormBuilder } from '@angular/forms';
// App
import { NovoTableElement, NovoTableActionsElement, NovoTableHeaderElement, NovoTableFooterElement } from './Table';
import { Pagination } from './extras/pagination/Pagination';
import { RowDetails } from './extras/row-details/RowDetails';
import { TableCell } from './extras/table-cell/TableCell';
import { TableFilter } from './extras/table-filter/TableFilter';
import { ThOrderable } from './extras/th-orderable/ThOrderable';
import { ThSortable } from './extras/th-sortable/ThSortable';

import { NovoFormElement } from '../form/Form';
import { NovoControlElement } from '../form/Control';
import { NovoCheckboxElement } from '../form/extras/checkbox/Checkbox';
import { NovoCheckListElement } from '../form/extras/checkbox/CheckList';
import { NovoAddressElement } from '../form/extras/address/Address';

import { NovoDatePickerElement } from '../date-picker/DatePicker';
import { NovoToastElement } from '../toast/Toast';
import { NovoLoadingElement } from '../loading/Loading';
import { NovoItemElement, NovoListElement } from '../dropdown/Dropdown';
import { NovoChipsElement, NovoChipElement } from '../chips/Chips';
import { NovoDropdownElement, NovoDropdownContainer } from '../dropdown/Dropdown';
import { TooltipDirective } from '../tooltip/Tooltip';
import { NovoSelectElement } from '../select/Select';

import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../form/FormUtils';

// describe('Elements: NovoTableKeepFilterFocus', () => {
//     let fixture;
//     let component;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 NovoTableKeepFilterFocus
//             ]
//         }).compileComponents();
//         fixture = TestBed.createComponent(NovoTableKeepFilterFocus);
//         component = fixture.debugElement.componentInstance;
//     }));
//
//     it('should initialize correctly', () => {
//         expect(component).toBeTruthy();
//     });
// });

describe('Elements: NovoTableActionsElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoTableActionsElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTableActionsElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});

describe('Elements: NovoTableHeaderElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoTableHeaderElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTableHeaderElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});

describe('Elements: NovoTableFooterElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoTableFooterElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTableFooterElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});

describe('Elements: NovoTableElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                // Table:
                NovoTableElement,
                Pagination,
                RowDetails,
                TableCell,
                TableFilter,
                ThOrderable,
                ThSortable,
                // Form:
                NovoFormElement,
                NovoControlElement,
                NovoCheckboxElement,
                NovoCheckListElement,
                NovoAddressElement,
                // Novo Elements
                NovoDatePickerElement,
                NovoToastElement,
                NovoListElement,
                NovoChipElement,
                NovoDropdownContainer,
                NovoLoadingElement,
                NovoItemElement,
                NovoChipsElement,
                NovoDropdownElement,
                TooltipDirective,
                NovoSelectElement,
                // NG2
                FormGroupDirective,
                FormControlName
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService },
                { provide: FormUtils, useClass: FormUtils },
                NgControl,
                FormBuilder
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTableElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize with all of its defaults.', () => {
        expect(component).toBeDefined();
        // NG2
        expect(component.onRowClick).toBeDefined();
        expect(component.onRowSelect).toBeDefined();
        expect(component.onTableChange).toBeDefined();
        // App
        // expect(component.labels).toBeDefined();
        // Vars

        expect(component.activeId).toBeDefined();
        expect(component.master).toBeDefined();
        expect(component.indeterminate).toBeDefined();
        expect(component.lastPage).toBeDefined();
    });

    xdescribe('Method: ngOnChanges()', () => {
        it('should set originalRows.', () => {
            expect(component.ngOnChanges).toBeDefined();
            component.rows = [];
            component.ngOnChanges();
            expect(component.originalRows.length).toBe(0);
        });
    });

    describe('Method: ngDoCheck()', () => {
        it('should be defined.', () => {
            expect(component.ngDoCheck).toBeDefined();
        });
    });

    describe('Method: getPageStart()', () => {
        it('should be defined.', () => {
            expect(component.getPageStart).toBeDefined();
        });
    });

    describe('Method: getPageEnd()', () => {
        it('should be defined.', () => {
            expect(component.getPageEnd).toBeDefined();
        });
    });

    describe('Method: onPageChange()', () => {
        it('should be defined.', () => {
            expect(component.onPageChange).toBeDefined();
        });
    });

    xdescribe('Method: focusInput()', () => {
        it('should be defined.', () => {
            expect(component.focusInput).toBeDefined();
        });
    });

    // describe('Method: onFilterClick()', () => {
    //     beforeEach(() => {
    //         component.columns = [
    //             {
    //                 filtering: true,
    //                 name: 'date',
    //                 type: 'date'
    //             }
    //         ];
    //         component.originalRows = [
    //             {
    //                 id: 1,
    //                 date: new Date().timestamp
    //             },
    //             {
    //                 id: 2,
    //                 date: new Date().timestamp
    //             }
    //         ];
    //         component.config = {
    //             filtering: true
    //         };
    //     });
    //
    //     it('should .', () => {
    //         expect(component.onFilterClick).toBeDefined();
    //     });
    //
    //     it('should allow multiple date selections if multiple=true/false', () => {
    //         component.columns[0].multiple = true;
    //         component.setupColumnDefaults();
    //         // Select 4 rows
    //         component.onFilterClick(component.columns[0], component.columns[0].options[0]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[1]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[2]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[3]);
    //         expect(component.columns[0].filter.length).toBe(4);
    //         // deselect 4 rows
    //         component.onFilterClick(component.columns[0], component.columns[0].options[0]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[1]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[2]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[3]);
    //         expect(component.columns[0].filter).toBe(null);
    //         // set multiple to false and try and click 2 rows
    //         component.columns[0].multiple = false;
    //         component.onFilterClick(component.columns[0], component.columns[0].options[1]);
    //         component.onFilterClick(component.columns[0], component.columns[0].options[2]);
    //         expect(component.columns[0].filter.length).toBe(1);
    //     });
    //
    //     it('should add range to options (11 total) if range is set', () => {
    //         component.columns[0].range = true;
    //         component.setupColumnDefaults();
    //         expect(component.columns[0].options.length).toBe(11);
    //     });
    //
    //     it('should add calenderShow if range is set', () => {
    //         component.columns[0].range = true;
    //         component.setupColumnDefaults();
    //         component.onFilterClick(component.columns[0], component.columns[0].options[component.columns[0].options.length - 1]);
    //         expect(component.columns[0].calenderShow).toBeTruthy();
    //     });
    // });

    describe('Method: onFilterClear()', () => {
        it('should .', () => {
            expect(component.onFilterClear).toBeDefined();
        });
    });

    xdescribe('Method: onFilterChange()', () => {
        beforeEach(() => {
            component.columns = [
                {
                    filter: 'a',
                    filtering: true,
                    name: 'name'
                }
            ];
            component.originalRows = [
                {
                    id: 1,
                    name: 'Jane'
                },
                {
                    id: 2,
                    name: 'John'
                }
            ];
            component.config = {
                filtering: true
            };
        });

        it('should update the row data to reflect the active filters (string comparison).', () => {
            expect(component.onFilterChange).toBeDefined();
            component.onFilterChange();
            expect(component.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (array comparison).', () => {
            expect(component.onFilterChange).toBeDefined();
            component.originalRows[0].name = ['Jane', 'Janet', 'Janice'];
            component.originalRows[1].name = ['Jon', 'Joe', 'Jose'];
            component.onFilterChange();
            expect(component.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom filter).', () => {
            expect(component.onFilterChange).toBeDefined();
            component.config.filtering = (filterValue, data) => {
                let matches = [];
                data.forEach(row => {
                    if (row.name === 'John') {
                        matches.push(row);
                    }
                });
                return matches;
            };
            component.onFilterChange();
            expect(component.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom config filter).', () => {
            expect(component.onFilterChange).toBeDefined();
            let mockOption = { label: 'Today', min: -2, max: 2 };
            component.columns = [{
                name: 'name',
                type: 'date',
                options: [mockOption]
            }];
            // Set dates
            component.originalRows[0].name = new Date();
            component.originalRows[1].name = new Date(1970, 3, 11, 13, 13);
            // Set active filter
            component.columns[0].filter = [mockOption];
            component.onFilterChange();
            expect(component.rows.length).toBe(1);
        });

        it('should update the row data to reflect the active filters (custom match function).', () => {
            expect(component.onFilterChange).toBeDefined();
            component.columns[0].match = (item, filter) => {
                return item.match(new RegExp(filter, 'gi'));
            };
            component.onFilterChange();
            expect(component.rows.length).toBe(1);
        });
    });

    describe('Method: isFilterActive(columnFilters, filter)', () => {
        it('should return true when the filter is active and false when it is not.', () => {
            expect(component.isFilterActive).toBeDefined();
            let mockColumnFilters = {
                filter: []
            };
            let mockFilter = {
                label: 'Filter'
            };
            // Using Filter Objects
            expect(component.isFilterActive(mockColumnFilters, mockFilter)).toBeFalsy();
            mockColumnFilters.filter.push(mockFilter);
            expect(component.isFilterActive(mockColumnFilters, mockFilter)).toBeTruthy();
            // Using strings
            expect(component.isFilterActive({ filter: ['Filter'] }, 'Filter')).toBeTruthy();
            expect(component.isFilterActive({ filter: ['Filter'] }, 'z')).toBeFalsy();
        });
    });

    describe('Method: onSortChange(newSortColumn)', () => {
        it('should be defined.', () => {
            expect(component.onSortChange).toBeDefined();
        });
    });

    describe('Method: fireTableChangeEvent()', () => {
        it('should be defined.', () => {
            expect(component.fireTableChangeEvent).toBeDefined();
        });
    });

    describe('Method: findColumnIndex(value)', () => {
        it('should be defined.', () => {
            expect(component.findColumnIndex).toBeDefined();
        });
    });

    describe('Method: onOrderChange(event)', () => {
        it('should be defined.', () => {
            expect(component.onOrderChange).toBeDefined();
        });
    });

    describe('Method: selectAll()', () => {
        it('should be defined.', () => {
            expect(component.selectAll).toBeDefined();
        });
    });

    describe('Method: selectPage()', () => {
        it('should be defined.', () => {
            expect(component.selectPage).toBeDefined();
        });
    });

    describe('Method: rowSelectHandler()', () => {
        it('should be defined.', () => {
            expect(component.rowSelectHandler).toBeDefined();
        });
    });

    describe('Method: emitSelected()', () => {
        it('should be defined.', () => {
            expect(component.emitSelected).toBeDefined();
        });
    });

    describe('Method: rowClickHandler()', () => {
        it('should be defined.', () => {
            expect(component.rowClickHandler).toBeDefined();
        });
    });

    describe('Method: getDefaultOptions()', () => {
        it('should return a subset of options when the data dates cover a small range.', () => {
            expect(component.getDefaultOptions).toBeDefined();
            let mockOptions = component.getDefaultOptions();
            expect(mockOptions.length).toBe(10);
        });
    });
});
