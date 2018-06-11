// NG2
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, FormGroupDirective, NgControl, FormControlName, FormBuilder } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { OverlayModule } from '@angular/cdk/overlay';
// App
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoTableElement } from './Table';
import { Pagination } from './extras/pagination/Pagination';
import { RowDetails } from './extras/row-details/RowDetails';
import { TableCell } from './extras/table-cell/TableCell';
import { TableFilter } from './extras/table-filter/TableFilter';
import { ThOrderable } from './extras/th-orderable/ThOrderable';
import { ThSortable } from './extras/th-sortable/ThSortable';
import { NovoTableKeepFilterFocus } from './extras/keep-filter-focus/KeepFilterFocus';
import { NovoTableActionsElement } from './extras/table-actions/TableActions';
import { NovoTableFooterElement } from './extras/table-footer/TableFooter';
import { NovoTableHeaderElement } from './extras/table-header/TableHeader';

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
import { NovoDropdownElement } from '../dropdown/Dropdown';
import { TooltipDirective } from '../tooltip/Tooltip';
import { NovoSelectElement } from '../select/Select';

import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { OptionsService } from '../../services/options/OptionsService';

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
                NovoTableKeepFilterFocus,
                NovoTableActionsElement,
                NovoTableFooterElement,
                NovoTableHeaderElement,
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
                NovoLoadingElement,
                NovoItemElement,
                NovoChipsElement,
                NovoDropdownElement,
                TooltipDirective,
                NovoSelectElement,
                // NG2
                FormGroupDirective,
                FormControlName,
            ],
            imports: [
                FormsModule,
                //Vendor
                TextMaskModule,
                OverlayModule,
                NovoOverlayModule
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService },
                { provide: FormUtils, useClass: FormUtils },
                OptionsService,
                NgControl,
                FormBuilder,
                DateFormatService
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
        component._rows = [];
        component.mode = 'TEST';
        // NG2
        expect(component.onRowClick).toBeDefined();
        expect(component.onRowSelect).toBeDefined();
        expect(component.onTableChange).toBeDefined();
        // Vars
        expect(component.activeId).toBeDefined();
        expect(component.master).toBeDefined();
        expect(component.indeterminate).toBeDefined();
        expect(component.lastPage).toBeDefined();
        expect(component.rows).toBeDefined();
        // Setters
        component.rows = [];
        component.dataProvider = [];
        // Getters
        expect(component.dataProvider).toBeDefined();
        expect(component.editing).toBeDefined();
        expect(component.formValue).toBeDefined();
    });


    describe('Method: onDropdownToggled()', () => {
        it('should be defined.', () => {
            expect(component.onDropdownToggled).toBeDefined();
            component.onDropdownToggled();
        });
    });

    describe('Method: onPageChange()', () => {
        it('should be defined.', () => {
            expect(component.onPageChange).toBeDefined();
            component.onPageChange();
        });
    });

    describe('Method: getOptionDataAutomationId()', () => {
        it('should be defined.', () => {
            expect(component.getOptionDataAutomationId).toBeDefined();
            component.getOptionDataAutomationId({ value: 2 });
        });
    });

    describe('Method: setupColumnDefaults()', () => {
        it('should be defined.', () => {
            expect(component.setupColumnDefaults).toBeDefined();
            component.columns = [
                { type: 'misc' }
            ];
            component.setupColumnDefaults();
        });
    });

    describe('Method: ngDoCheck()', () => {
        it('should be defined.', () => {
            expect(component.ngDoCheck).toBeDefined();
            component.ngDoCheck();
        });
    });

    describe('Method: getPageStart()', () => {
        it('should be defined.', () => {
            expect(component.getPageStart).toBeDefined();
            component.getPageStart();
        });
    });

    describe('Method: getPageEnd()', () => {
        it('should be defined.', () => {
            expect(component.getPageEnd).toBeDefined();
        });
    });

    describe('Method: onFilterClick(column, filter)', () => {
        beforeEach(() => {
            component._dataProvider = {
                edit: () => { }
            };
            component.columns = [
                {
                    filtering: true,
                    name: 'date',
                    type: 'date'
                },
                {
                    filtering: true,
                    name: 'type',
                    options: ['Lead', 'Contact']
                }
            ];
            component.originalRows = [
                {
                    id: 1,
                    date: new Date(),
                    type: 'Lead'
                },
                {
                    id: 2,
                    date: new Date(),
                    type: 'Contact'
                }
            ];
            component.config = {
                filtering: true
            };
        });

        it('should allow multiple date selections if multiple=true/false', () => {
            expect(component.onFilterClick).toBeDefined();
            component.columns[0].multiple = true;
            component.setupColumnDefaults();
            // Select 4 rows
            component.onFilterClick(component.columns[0], component.columns[0].options[0]);
            component.onFilterClick(component.columns[0], component.columns[0].options[1]);
            component.onFilterClick(component.columns[0], component.columns[0].options[2]);
            component.onFilterClick(component.columns[0], component.columns[0].options[3]);
            expect(component.columns[0].filter.length).toBe(4);
            // deselect 4 rows
            component.onFilterClick(component.columns[0], component.columns[0].options[0]);
            component.onFilterClick(component.columns[0], component.columns[0].options[1]);
            component.onFilterClick(component.columns[0], component.columns[0].options[2]);
            component.onFilterClick(component.columns[0], component.columns[0].options[3]);
            expect(component.columns[0].filter).toBe(null);
            // set multiple to false and try and click 2 rows
            component.columns[0].multiple = false;
            component.onFilterClick(component.columns[0], component.columns[0].options[1]);
            component.onFilterClick(component.columns[0], component.columns[0].options[2]);
            expect(component.columns[0].filter.length).toBeUndefined();
            expect(component.columns[0].filter).toBeTruthy();
        });

        it('should allow multiple text selections if multiple=true/false', () => {
            expect(component.onFilterClick).toBeDefined();
            component.columns[1].multiple = true;
            component.setupColumnDefaults();
            // Select 2 rows
            component.onFilterClick(component.columns[1], component.columns[1].options[0]);
            component.onFilterClick(component.columns[1], component.columns[1].options[1]);
            expect(component.columns[1].filter.length).toBe(2);
            // deselect 2 rows
            component.onFilterClick(component.columns[1], component.columns[1].options[0]);
            component.onFilterClick(component.columns[1], component.columns[1].options[1]);
            expect(component.columns[1].filter).toBe(null);

            // set multiple to false and try and click 2 rows
            component.columns[1].multiple = false;
            component.onFilterClick(component.columns[1], component.columns[1].options[0]);
            component.onFilterClick(component.columns[1], component.columns[1].options[1]);
            expect(component.columns[1].filter.length).toBe(7);
            expect(component.columns[1].filter).toBeTruthy();
        });

        it('should add range to options (11 total) if range is set', () => {
            expect(component.onFilterClick).toBeDefined();
            component.columns[0].range = true;
            component.setupColumnDefaults();
            expect(component.columns[0].options.length).toBe(11);
        });

        it('should add calenderShow if range is set', () => {
            expect(component.onFilterClick).toBeDefined();
            component.columns[0].range = true;
            component.setupColumnDefaults();
            component.onFilterClick(component.columns[0], component.columns[0].options[component.columns[0].options.length - 1]);
            expect(component.columns[0].calenderShow).toBeTruthy();
        });
    });

    describe('Method: onFilterClear(column)', () => {
        it('should be defined.', () => {
            expect(component.onFilterClear).toBeDefined();
            component.onFilterClear({ filer: true, freetextFilter: true });
        });
    });

    describe('Method: clearAllSortAndFilters()', () => {
        it('should be defined.', () => {
            expect(component.clearAllSortAndFilters).toBeDefined();
            component.clearAllSortAndFilters();
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

    xdescribe('Method: isFilterActive(columnFilters, filter)', () => {
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

    describe('Method: selectPage()', () => {
        it('should be defined.', () => {
            expect(component.selectPage).toBeDefined();
        });
    });

    describe('Method: selectAll()', () => {
        it('should be defined.', () => {
            expect(component.selectAll).toBeDefined();
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

    describe('Method: onCalenderSelect(column, event)', () => {
        it('should be defined.', () => {
            expect(component.onCalenderSelect).toBeDefined();
            component.onCalenderSelect(null, { startDate: new Date(), endDate: new Date() });
        });
    });

    describe('Method: onFilterKeywords()', () => {
        it('should be defined.', () => {
            expect(component.onFilterKeywords).toBeDefined();
            // component.onFilterKeywords();
        });
    });

    describe('Method: setTableEdit()', () => {
        beforeEach(() => {
            component._dataProvider = {
                edit: () => { }
            };
            component.columns = [
                {
                    name: 'name'
                },
                {
                    name: 'id'
                }
            ];
            component._rows = [
                {
                    id: 1,
                    name: 'Jane'
                },
                {
                    id: 2,
                    name: 'John'
                }
            ];
        });

        it('should be defined.', () => {
            expect(component.setTableEdit).toBeDefined();
        });

        it('should set the table to edit mode', () => {
            component.setTableEdit();
            expect(component.mode).toBe(2);
        });

        it('should set columns with viewOnly to editing false', () => {
            component.columns[0].viewOnly = true;
            component.setTableEdit();
            expect(component._rows).toEqual([
                {
                    id: 1,
                    name: 'Jane',
                    _editing: {
                        id: true,
                        name: false
                    }
                },
                {
                    id: 2,
                    name: 'John',
                    _editing: {
                        id: true,
                        name: false
                    }
                }
            ]);
        });
    });

    describe('Method: leaveEditMode()', () => {
        beforeEach(() => {
            component._dataProvider = {
                undo: () => { },
                commit: () => { }
            };
            component.columns = [
                {
                    name: 'name'
                },
                {
                    name: 'id'
                }
            ];
            component._rows = [
                {
                    id: 1,
                    name: 'Jane'
                },
                {
                    id: 2,
                    name: 'John'
                }
            ];
        });

        it('should be defined.', () => {
            expect(component.leaveEditMode).toBeDefined();
        });

        it('should set the table to view mode', () => {
            component.leaveEditMode();
            expect(component.mode).toBe(1);
        });

        it('should set the table colums editing to false', () => {
            component.leaveEditMode();
            expect(component._rows).toEqual([
                {
                    id: 1,
                    name: 'Jane',
                    _editing: {
                        id: false,
                        name: false
                    }
                },
                {
                    id: 2,
                    name: 'John',
                    _editing: {
                        id: false,
                        name: false
                    }
                }
            ]);
        });
    });

    describe('Method: addEditableRow()', () => {
        it('should be defined.', () => {
            expect(component.addEditableRow).toBeDefined();
            // component.addEditableRow();
        });
    });

    describe('Method: validateAndGetUpdatedData()', () => {
        it('should be defined.', () => {
            expect(component.validateAndGetUpdatedData).toBeDefined();
            component.validateAndGetUpdatedData();
        });
    });

    describe('Method: cancelEditing()', () => {
        beforeEach(() => {
            component._dataProvider = {
                undo: () => { },
                commit: () => { }
            };
        });
        it('should be defined.', () => {
            expect(component.cancelEditing).toBeDefined();
        });

        it('should set the table to view mode', () => {
            component.leaveEditMode();
            expect(component.mode).toBe(1);
        });
    });

    describe('Method: displayToastMessage()', () => {
        it('should be defined.', () => {
            expect(component.displayToastMessage).toBeDefined();
            component.displayToastMessage();
        });
    });

    describe('Method: hideToastMessage()', () => {
        it('should be defined.', () => {
            expect(component.hideToastMessage).toBeDefined();
            component.hideToastMessage();
        });
    });

    describe('Method: toggleLoading()', () => {
        it('should be defined.', () => {
            expect(component.toggleLoading).toBeDefined();
        });

        it('should set loading to true', () => {
            component.toggleLoading(true);
            expect(component.loading).toBe(true);
        });

        it('should set loading to false', () => {
            component.toggleLoading(false);
            expect(component.loading).toBe(false);
        });
    });

    describe('Method: isColumnHidden()', () => {
        it('should be defined.', () => {
            expect(component.isColumnHidden).toBeDefined();
        });

        it('should return true if column has hideColumnOnEdit and in editing mode', () => {
            let column = { name: 'name', hideColumnOnEdit: true };
            component.mode = 2;
            expect(component.isColumnHidden(column)).toBe(true);
        });

        it('should return false if column does not have hideColumnOnEdit and in editing mode', () => {
            let column = { name: 'name' };
            component.mode = 2;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column does not have hideColumnOnEdit and not in editing mode', () => {
            let column = { name: 'name' };
            component.mode = 1;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column has hideColumnOnEdit and not in editing mode', () => {
            let column = { name: 'name', hideColumnOnEdit: true };
            component.mode = 1;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column has hideColumnOnView and in editing mode', () => {
            let column = { name: 'name', hideColumnOnView: true };
            component.mode = 2;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column does not have hideColumnOnView and in editing mode', () => {
            let column = { name: 'name' };
            component.mode = 2;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column does not have hideColumnOnView and not in editing mode', () => {
            let column = { name: 'name' };
            component.mode = 1;
            expect(component.isColumnHidden(column)).toBe(false);
        });

        it('should return false if column has hideColumnOnView and not in editing mode', () => {
            let column = { name: 'name', hideColumnOnView: true };
            component.mode = 1;
            expect(component.isColumnHidden(column)).toBe(true);
        });
    });
});
