"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/cdk/table");
var Button_module_1 = require("../button/Button.module");
var Dropdown_module_1 = require("../dropdown/Dropdown.module");
var FormExtras_module_1 = require("../form/extras/FormExtras.module");
var Loading_module_1 = require("../loading/Loading.module");
var Tiles_module_1 = require("../tiles/Tiles.module");
var SearchBox_module_1 = require("../search/SearchBox.module");
var DatePicker_module_1 = require("../date-picker/DatePicker.module");
var table_2 = require("./table");
var cell_1 = require("./cell");
var row_1 = require("./row");
var cell_header_1 = require("./cell-header");
var sort_1 = require("./sort");
var pagination_1 = require("./pagination");
var state_1 = require("./state");
__export(require("./cell"));
__export(require("./table"));
__export(require("./row"));
__export(require("./cell-header"));
__export(require("./sort"));
__export(require("./table-source"));
__export(require("./activity-table-renderers"));
__export(require("./state"));
var NovoSimpleTableModule = (function () {
    function NovoSimpleTableModule() {
    }
    return NovoSimpleTableModule;
}());
NovoSimpleTableModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    DatePicker_module_1.NovoDatePickerModule, table_1.CdkTableModule, common_1.CommonModule, forms_1.FormsModule, Button_module_1.NovoButtonModule,
                    Dropdown_module_1.NovoDropdownModule, FormExtras_module_1.NovoFormExtrasModule, Loading_module_1.NovoLoadingModule, Tiles_module_1.NovoTilesModule, SearchBox_module_1.NovoSearchBoxModule
                ],
                exports: [
                    table_2.NovoTable, cell_1.NovoSimpleCellDef, cell_1.NovoSimpleHeaderCellDef, cell_1.NovoSimpleColumnDef, table_2.NovoActivityTableEmptyMessage, table_2.NovoActivityTableNoResultsMessage,
                    row_1.NovoSimpleHeaderRowDef, row_1.NovoSimpleRowDef, cell_header_1.NovoSimpleCellHeader, sort_1.NovoSortFilter, cell_1.NovoSimpleActionCell, cell_1.NovoSimpleEmptyHeaderCell,
                    cell_1.NovoSimpleHeaderCell, cell_1.NovoSimpleCell, row_1.NovoSimpleHeaderRow, row_1.NovoSimpleRow, cell_header_1.NovoSimpleFilterFocus, pagination_1.NovoSimpleTablePagination, table_2.NovoActivityTableCustomHeader,
                    cell_1.NovoSimpleCheckboxCell, cell_1.NovoSimpleCheckboxHeaderCell, sort_1.NovoSelection, table_2.NovoActivityTable, table_2.NovoActivityTableActions, table_2.NovoActivityTableCustomFilter
                ],
                declarations: [
                    table_2.NovoTable, cell_1.NovoSimpleCellDef, cell_1.NovoSimpleHeaderCellDef, cell_1.NovoSimpleColumnDef, table_2.NovoActivityTableEmptyMessage, table_2.NovoActivityTableNoResultsMessage,
                    row_1.NovoSimpleHeaderRowDef, row_1.NovoSimpleRowDef, cell_header_1.NovoSimpleCellHeader, sort_1.NovoSortFilter, cell_1.NovoSimpleActionCell, cell_1.NovoSimpleEmptyHeaderCell,
                    cell_1.NovoSimpleHeaderCell, cell_1.NovoSimpleCell, row_1.NovoSimpleHeaderRow, row_1.NovoSimpleRow, cell_header_1.NovoSimpleFilterFocus, pagination_1.NovoSimpleTablePagination, table_2.NovoActivityTableCustomHeader,
                    cell_1.NovoSimpleCheckboxCell, cell_1.NovoSimpleCheckboxHeaderCell, sort_1.NovoSelection, table_2.NovoActivityTable, table_2.NovoActivityTableActions, table_2.NovoActivityTableCustomFilter
                ],
                providers: [
                    state_1.NovoActivityTableState
                ]
            },] },
];
/** @nocollapse */
NovoSimpleTableModule.ctorParameters = function () { return []; };
exports.NovoSimpleTableModule = NovoSimpleTableModule;
//# sourceMappingURL=index.js.map