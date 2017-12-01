"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// APP
var Select_module_1 = require("../../select/Select.module");
var Dropdown_module_1 = require("../../dropdown/Dropdown.module");
var Button_module_1 = require("../../button/Button.module");
var Pagination_1 = require("./pagination/Pagination");
var RowDetails_1 = require("./row-details/RowDetails");
var TableCell_1 = require("./table-cell/TableCell");
var TableFilter_1 = require("./table-filter/TableFilter");
var ThOrderable_1 = require("./th-orderable/ThOrderable");
var ThSortable_1 = require("./th-sortable/ThSortable");
var DateCell_1 = require("./date-cell/DateCell");
var PercentageCell_1 = require("./percentage-cell/PercentageCell");
var DropdownCell_1 = require("./dropdown-cell/DropdownCell");
var KeepFilterFocus_1 = require("./keep-filter-focus/KeepFilterFocus");
var TableActions_1 = require("./table-actions/TableActions");
var TableFooter_1 = require("./table-footer/TableFooter");
var TableHeader_1 = require("./table-header/TableHeader");
var NovoTableExtrasModule = (function () {
    function NovoTableExtrasModule() {
    }
    return NovoTableExtrasModule;
}());
NovoTableExtrasModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    Select_module_1.NovoSelectModule,
                    Dropdown_module_1.NovoDropdownModule,
                    Button_module_1.NovoButtonModule
                ],
                declarations: [
                    TableHeader_1.NovoTableHeaderElement,
                    TableFooter_1.NovoTableFooterElement,
                    TableActions_1.NovoTableActionsElement,
                    KeepFilterFocus_1.NovoTableKeepFilterFocus,
                    Pagination_1.Pagination,
                    RowDetails_1.RowDetails,
                    TableCell_1.TableCell,
                    TableFilter_1.TableFilter,
                    ThOrderable_1.ThOrderable,
                    ThSortable_1.ThSortable,
                    DateCell_1.DateCell,
                    PercentageCell_1.PercentageCell,
                    DropdownCell_1.NovoDropdownCell
                ],
                exports: [
                    TableHeader_1.NovoTableHeaderElement,
                    TableFooter_1.NovoTableFooterElement,
                    TableActions_1.NovoTableActionsElement,
                    KeepFilterFocus_1.NovoTableKeepFilterFocus,
                    Pagination_1.Pagination,
                    RowDetails_1.RowDetails,
                    TableCell_1.TableCell,
                    TableFilter_1.TableFilter,
                    ThOrderable_1.ThOrderable,
                    ThSortable_1.ThSortable,
                    DateCell_1.DateCell,
                    PercentageCell_1.PercentageCell,
                    DropdownCell_1.NovoDropdownCell
                ],
                entryComponents: [
                    DateCell_1.DateCell,
                    PercentageCell_1.PercentageCell,
                    DropdownCell_1.NovoDropdownCell
                ]
            },] },
];
/** @nocollapse */
NovoTableExtrasModule.ctorParameters = function () { return []; };
exports.NovoTableExtrasModule = NovoTableExtrasModule;
//# sourceMappingURL=TableExtras.module.js.map