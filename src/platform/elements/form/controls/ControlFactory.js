"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var ControlFactory = (function () {
    function ControlFactory() {
    }
    ControlFactory.create = function (type, config) {
        switch (type) {
            case 'AddressControl':
                return new index_1.AddressControl(config);
            case 'CheckboxControl':
                return new index_1.CheckboxControl(config);
            case 'CheckListControl':
                return new index_1.CheckListControl(config);
            case 'CheckListControl':
                return new index_1.CheckListControl(config);
            case 'DateTimeControl':
                return new index_1.DateTimeControl(config);
            case 'EditorControl':
                return new index_1.EditorControl(config);
            case 'FileControl':
                return new index_1.FileControl(config);
            case 'NativeSelectControl':
                return new index_1.NativeSelectControl(config);
            case 'PickerControl':
                return new index_1.PickerControl(config);
            case 'AppendToBodyPickerControl':
                return new index_1.AppendToBodyPickerControl(config);
            case 'TablePickerControl':
                return new index_1.TablePickerControl(config);
            case 'QuickNoteControl':
                return new index_1.QuickNoteControl(config);
            case 'RadioControl':
                return new index_1.RadioControl(config);
            case 'ReadOnlyControl':
                return new index_1.ReadOnlyControl(config);
            case 'TextAreaControl':
                return new index_1.TextAreaControl(config);
            case 'TextBoxControl':
                return new index_1.TextBoxControl(config);
            case 'SelectControl':
                return new index_1.SelectControl(config);
            case 'TilesControl':
                return new index_1.TilesControl(config);
            case 'TimeControl':
                return new index_1.TimeControl(config);
            default:
                console.warn('[ControlFactory] - unable to find control for type. Make sure to set "editorType" and "editorConfig" on your column', type);
                return null;
        }
    };
    return ControlFactory;
}());
exports.ControlFactory = ControlFactory;
//# sourceMappingURL=ControlFactory.js.map