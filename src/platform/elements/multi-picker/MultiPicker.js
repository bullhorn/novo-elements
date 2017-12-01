"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
// Vendor
var ReplaySubject_1 = require("rxjs/ReplaySubject");
// Value accessor for the component (supports ngModel)
var CHIPS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoMultiPickerElement; }),
    multi: true
};
var NovoMultiPickerElement = (function () {
    function NovoMultiPickerElement(element, labels) {
        this.element = element;
        this.labels = labels;
        this.placeholder = '';
        this.changed = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.items = [];
        this._items = new ReplaySubject_1.ReplaySubject(1);
        this.selected = null;
        this.config = {};
        // private data model
        this._value = {};
        this.notShown = {};
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
        this.chipsCount = 4;
    }
    Object.defineProperty(NovoMultiPickerElement.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (selectedItems) {
            var _this = this;
            if (selectedItems) {
                this.types.forEach(function (x) { return _this._value[x.value] = selectedItems[x.value]; });
            }
            else {
                this._value = {};
                this.types.forEach(function (x) { return _this._value[x.value] = []; });
            }
            this.changed.emit(selectedItems);
            this.onModelChange(selectedItems);
        },
        enumerable: true,
        configurable: true
    });
    NovoMultiPickerElement.prototype.ngOnInit = function () {
        this.selectAllOption = this.source.selectAllOption || false;
        this.chipsCount = this.source.chipsCount || 4;
        this.strictRelationship = this.source.strictRelationship || false;
        this.setupOptions();
    };
    NovoMultiPickerElement.prototype.clearValue = function () {
        var _this = this;
        this.types.forEach(function (type) { return _this.modifyAllOfType(type.value, 'unselect'); });
        this.items = [];
        this._items.next(this.items);
        this.value = this.setInitialValue(null);
        this.onModelChange(this.value);
    };
    NovoMultiPickerElement.prototype.removeFromDisplay = function (event, item) {
        this.remove(true, item);
        this.modifyAffectedParentsOrChildren(false, item);
    };
    NovoMultiPickerElement.prototype.setupOptions = function () {
        var _this = this;
        this.options = this.source.options || [];
        this._options = [];
        if (this.options) {
            this.options.forEach(function (option) {
                var formattedOption = _this.setupOptionsByType(option);
                _this._options.push(formattedOption);
            });
        }
        this.source.options = this._options;
    };
    NovoMultiPickerElement.prototype.setupOptionsByType = function (section) {
        var _this = this;
        var formattedSection = {
            type: section.type,
            label: section.label || section.type
        };
        formattedSection.data = section.data.map(function (item) {
            return _this.formatOption(section, item);
        });
        if (this.selectAllOption) {
            var selectAll = this.createSelectAllOption(section);
            formattedSection.data.splice(0, 0, selectAll);
        }
        formattedSection.originalData = formattedSection.data.slice();
        return formattedSection;
    };
    NovoMultiPickerElement.prototype.formatOption = function (section, item) {
        var obj = {
            value: section.field ? item[section.field] : (item.value || item),
            label: section.format ? Helpers_1.Helpers.interpolate(section.format, item) : item.label || String(item.value || item),
            type: section.type,
            checked: undefined,
            isParentOf: section.isParentOf,
            isChildOf: section.isChildOf
        };
        if (obj.isChildOf) {
            obj[section.isChildOf] = item[section.isChildOf];
        }
        return obj;
    };
    NovoMultiPickerElement.prototype.createSelectAllOption = function (section) {
        var selectAll = {
            value: 'ALL',
            label: "All " + section.type,
            type: section.type,
            checked: (this.model && this.model.length && (this.model.indexOf('ALL') !== -1)),
            isParentOf: section.isParentOf,
            isChildOf: section.isChildOf
        };
        if (section.isChildOf) {
            var allParents = section.data.reduce(function (accum, next) {
                return accum.concat(next[section.isChildOf]);
            }, []);
            selectAll[section.isChildOf] = allParents;
        }
        return selectAll;
    };
    NovoMultiPickerElement.prototype.deselectAll = function () {
        this.selected = null;
    };
    NovoMultiPickerElement.prototype.select = function (event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
    };
    NovoMultiPickerElement.prototype.onFocus = function (e) {
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(e);
    };
    NovoMultiPickerElement.prototype.clickOption = function (event) {
        if (event && !(event instanceof Event)) {
            if (event.checked === false) {
                this.remove(null, event);
            }
            else {
                this.add(event);
            }
            this.modifyAffectedParentsOrChildren(event.checked, event);
            // Set focus on the picker
            var input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
    };
    NovoMultiPickerElement.prototype.add = function (event) {
        if (event.value === 'ALL') {
            this.modifyAllOfType(event.type, 'select');
        }
        else {
            this.updateDisplayItems(event, 'add');
            this.value[event.type].push(event.value);
            this.updateAllItemState(event.type);
            this.triggerValueUpdate();
        }
        this.updateParentOrChildren(event, 'select');
        this.select(null, event);
    };
    NovoMultiPickerElement.prototype.updateAllItemState = function (type) {
        var allOfType = this.getAllOfType(type);
        var allOfTypeSelected = this.allItemsSelected(allOfType, type);
        if (allOfTypeSelected) {
            this.selectAll(allOfType, type);
        }
        return { allOfType: allOfType, allOfTypeSelected: allOfTypeSelected };
    };
    NovoMultiPickerElement.prototype.setIndeterminateState = function (allOfType, status) {
        if (!this.selectAllOption) {
            return;
        }
        var allItem = allOfType[0];
        allItem.indeterminate = status;
    };
    NovoMultiPickerElement.prototype.updateDisplayItems = function (item, action) {
        var adding = action === 'add';
        if (adding) {
            this.items.push(item);
        }
        else {
            if (this.items.indexOf(item) > -1) {
                this.items.splice(this.items.indexOf(item), 1);
            }
        }
        this.updateDisplayText(this.items);
        this._items.next(this.items);
    };
    NovoMultiPickerElement.prototype.updateDisplayText = function (items) {
        var _this = this;
        this.notShown = [];
        var notShown = items.slice(this.chipsCount);
        if (notShown.length > 0) {
            this.types.forEach(function (type) {
                var count;
                var selectedOfType = notShown.filter(function (x) { return x.type === type.value; });
                if (selectedOfType.length === 1 && selectedOfType[0].value === 'ALL') {
                    count = _this.getAllOfType(type.value).length - 1;
                }
                else {
                    count = selectedOfType.length;
                }
                var displayType = count === 1 ? type.singular : type.plural || type.value;
                if (count > 0) {
                    _this.notShown.push({ type: displayType, count: count });
                }
            });
        }
    };
    NovoMultiPickerElement.prototype.remove = function (event, item) {
        var triggeredByEvent;
        if (event) {
            triggeredByEvent = true;
        }
        var itemToRemove = item;
        if (itemToRemove.value === 'ALL') {
            triggeredByEvent = false;
            this.modifyAllOfType(itemToRemove.type, 'unselect');
        }
        else if (this.allOfTypeSelected(itemToRemove.type)) {
            this.handleRemoveItemIfAllSelected(itemToRemove);
        }
        this.removeItem(item, triggeredByEvent);
    };
    NovoMultiPickerElement.prototype.removeItem = function (item, triggeredByEvent) {
        item.checked = false;
        this.deselectAll();
        this.removeValue(item);
        if (item.value !== 'ALL') {
            this.updateParentOrChildren(item, 'unselect');
        }
        if (triggeredByEvent) {
            this.modifyAffectedParentsOrChildren(false, item);
        }
    };
    NovoMultiPickerElement.prototype.removeValue = function (item) {
        var updatedValues = this.value[item.type].filter(function (x) { return x !== item.value; });
        this.value[item.type] = updatedValues;
        this.triggerValueUpdate();
        this.updateDisplayItems(item, 'remove');
    };
    NovoMultiPickerElement.prototype.onKeyDown = function (event) {
        if (event.keyCode === KeyCodes_1.KeyCodes.BACKSPACE) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(null, this.selected);
                }
                else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    };
    NovoMultiPickerElement.prototype.allOfTypeSelected = function (type) {
        return this.items.filter(function (x) { return x.type === type && x.value === 'ALL'; }).length > 0;
    };
    NovoMultiPickerElement.prototype.modifyAllOfType = function (type, action) {
        var selecting = action === 'select';
        var allOfType = this.getAllOfType(type);
        allOfType.forEach(function (item) {
            item.checked = selecting;
            item.indeterminate = false;
        });
        if (selecting) {
            this.selectAll(allOfType, type);
        }
        else {
            this.items = this.items.filter(function (x) { return x.type !== type; }).slice();
            this._items.next(this.items);
            this.value[type] = [];
        }
        if (this.selectAllOption) {
            this.updateAllParentsOrChildren(allOfType[0], action);
        }
        this.triggerValueUpdate();
    };
    NovoMultiPickerElement.prototype.triggerValueUpdate = function () {
        var _this = this;
        var updatedObject = {};
        this.types.forEach(function (x) { return updatedObject[x.value] = _this.value[x.value]; });
        this.value = updatedObject;
    };
    NovoMultiPickerElement.prototype.selectAll = function (allOfType, type) {
        if (!this.selectAllOption) {
            return;
        }
        allOfType[0].checked = true;
        var values = allOfType.map(function (i) {
            return i.value;
        });
        //remove 'ALL' value
        values.splice(0, 1);
        this.value[type] = values;
        var updatedItems = this.items.filter(function (x) { return x.type !== type; });
        this.items = updatedItems;
        this.updateDisplayItems(allOfType[0], 'add');
    };
    NovoMultiPickerElement.prototype.handleRemoveItemIfAllSelected = function (item) {
        if (!this.selectAllOption) {
            return;
        }
        var type = item.type;
        var allOfType = this.getAllOfType(type);
        var allItem = allOfType[0];
        this.removeItem(allItem);
        allItem.indeterminate = true;
        var selectedItems = allOfType.filter(function (i) { return i.checked === true; });
        this.items = this.items.concat(selectedItems);
        var values = selectedItems.map(function (i) {
            return i.value;
        });
        this.value[type] = values.slice();
    };
    NovoMultiPickerElement.prototype.handleOutsideClick = function (event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.blur.emit(event);
            this.deselectAll();
        }
    };
    NovoMultiPickerElement.prototype.getAllOfType = function (type) {
        return this._options.filter(function (x) { return x.type === type; })[0].originalData;
    };
    NovoMultiPickerElement.prototype.updateParentOrChildren = function (item, action) {
        if (this.strictRelationship && item.isParentOf) {
            this.updateChildrenValue(item, action);
        }
        else if (item.isChildOf && this.selectAllOption) {
            this.updateParentValue(item, action);
        }
    };
    NovoMultiPickerElement.prototype.modifyAffectedParentsOrChildren = function (selecting, itemChanged) {
        var _this = this;
        if (!itemChanged.isChildOf && !itemChanged.isParentOf) {
            return;
        }
        var parent = this.types.filter(function (x) { return !!x.isParentOf; })[0];
        var parentType = parent.value;
        var allParentType = this.getAllOfType(parentType);
        var childType = allParentType[0].isParentOf;
        var allChildren = this.getAllOfType(childType);
        var allCheckedChildren = allChildren.filter(function (x) { return !!x.checked; });
        allParentType.forEach(function (obj) {
            if (obj.value === 'ALL') {
                return;
            }
            var selectedChildrenOfParent = allCheckedChildren.filter(function (x) {
                return x[parentType].filter(function (y) { return y === obj.value; }).length > 0;
            });
            if (selecting) {
                if (obj.checked) {
                    return;
                }
                obj.indeterminate = selectedChildrenOfParent.length > 0;
            }
            else {
                var allChildrenOfParent = allChildren.filter(function (x) {
                    return x.value !== 'ALL' && x[parentType].filter(function (y) { return y === obj.value; }).length > 0;
                });
                if (selectedChildrenOfParent.length > 0) {
                    if (obj.checked) {
                        if (_this.strictRelationship && (allChildrenOfParent.length !== selectedChildrenOfParent.length)) {
                            obj.indeterminate = true;
                            obj.checked = false;
                            _this.removeValue(obj);
                            _this.addIndividualChildren(selectedChildrenOfParent);
                        }
                    }
                    else {
                        obj.indeterminate = true;
                    }
                    if (_this.strictRelationship && itemChanged.type !== parentType) {
                        if (obj.checked) {
                            obj.checked = false;
                            _this.removeValue(obj);
                            _this.addIndividualChildren(selectedChildrenOfParent);
                        }
                    }
                }
                else {
                    obj.indeterminate = false;
                    if (allChildrenOfParent.length === 0) {
                        //if it has no children and is checked, it should stay checked
                        return;
                    }
                    else if (_this.strictRelationship && itemChanged.type !== parentType) {
                        _this.remove(null, obj);
                    }
                }
            }
        });
        if (this.selectAllOption) {
            this.updateIndeterminateStates(allParentType, allChildren, allCheckedChildren);
        }
    };
    NovoMultiPickerElement.prototype.updateAllParentsOrChildren = function (allItem, action) {
        if (allItem.isParentOf) {
            this.updateAllChildrenValue(allItem, action);
        }
        else if (allItem.isChildOf) {
            this.updateAllParentValue(allItem, action);
        }
    };
    NovoMultiPickerElement.prototype.updateAllChildrenValue = function (item, action) {
        var _this = this;
        var selecting = action === 'select';
        var childType = item.isParentOf;
        var potentialChildren = this.getAllOfType(childType);
        if (this.selectAllOption && this.allOfTypeSelected(childType) && !selecting) {
            this.remove(null, potentialChildren[0]);
            return;
        }
        potentialChildren.forEach(function (x) {
            if (x.value === 'ALL' && !x.checked) {
                if (selecting) {
                    x.checked = true;
                }
                x.indeterminate = selecting;
            }
            else {
                if (x.checked && !selecting) {
                    _this.remove(null, x);
                }
                x.checked = selecting;
            }
        });
    };
    NovoMultiPickerElement.prototype.updateAllParentValue = function (item, action) {
        var selecting = action === 'select';
        var parentType = item.isChildOf;
        var potentialParents = this.getAllOfType(parentType);
        potentialParents.forEach(function (x) {
            if (!x.checked) {
                x.indeterminate = selecting;
            }
        });
    };
    NovoMultiPickerElement.prototype.updateIndeterminateStates = function (allParentType, allChildren, allCheckedChildren) {
        var allCheckedOrIndeterminateParents = allParentType.filter(function (x) { return (!!x.checked || !!x.indeterminate) && x.value !== 'ALL'; });
        var isParentIndeterminate = !!allParentType[0].checked ? false : allCheckedOrIndeterminateParents.length > 0;
        var isChildIndeterminate = !!allChildren[0].checked ? false : allCheckedChildren.length > 0;
        this.setIndeterminateState(allParentType, isParentIndeterminate);
        this.setIndeterminateState(allChildren, isChildIndeterminate);
    };
    NovoMultiPickerElement.prototype.updateChildrenValue = function (parent, action) {
        var _this = this;
        var selecting = action === 'select';
        var childType = parent.isParentOf;
        var potentialChildren = this.getAllOfType(childType);
        potentialChildren.forEach(function (x) {
            if (x.value === 'ALL') {
                return;
            }
            if (x[parent.type].filter(function (y) { return y === parent.value; }).length > 0) {
                if (x.checked && !selecting) {
                    x.checked = false;
                    if (_this.allOfTypeSelected(childType)) {
                        _this.handleRemoveItemIfAllSelected(x);
                    }
                    else {
                        _this.removeValue(x);
                    }
                }
                x.checked = selecting;
            }
        });
    };
    NovoMultiPickerElement.prototype.updateParentValue = function (child, action) {
        var allParentType = this.getAllOfType(child.isChildOf);
        if (allParentType[0].checked && action !== 'select') {
            this.handleRemoveItemIfAllSelected(allParentType[0]);
        }
    };
    NovoMultiPickerElement.prototype.addIndividualChildren = function (children) {
        var _this = this;
        var parentAlreadySelected = false;
        children.forEach(function (x) {
            if (x.isChildOf) {
                x[x.isChildOf].forEach(function (parent) {
                    if (_this.value[x.isChildOf].filter(function (p) { return p === parent; }).length > 0) {
                        parentAlreadySelected = true;
                    }
                });
            }
            if (_this.value[x.type].filter(function (item) { return item === x.value; }).length === 0 && !parentAlreadySelected) {
                _this.add(x);
            }
        });
    };
    NovoMultiPickerElement.prototype.setInitialValue = function (model) {
        var _this = this;
        this.items = [];
        this.value = model || {};
        if (!this.types) {
            return;
        }
        this.types.forEach(function (typeObj) {
            var type = typeObj.value;
            if (_this.value[type]) {
                var indeterminateIsSet_1 = false;
                var options = _this.updateAllItemState(type);
                var optionsByType_1 = options.allOfType;
                var allSelected_1 = options.allOfTypeSelected;
                _this.value[type].forEach(function (item) {
                    if (!allSelected_1 && !indeterminateIsSet_1) {
                        indeterminateIsSet_1 = true;
                        _this.setIndeterminateState(optionsByType_1, true);
                    }
                    var value = optionsByType_1.filter(function (x) { return x.value === item; })[0];
                    value.checked = true;
                    if (!allSelected_1) {
                        _this.updateDisplayItems(value, 'add');
                    }
                    if (_this.strictRelationship && value.isParentOf) {
                        _this.updateChildrenValue(value, 'select');
                    }
                });
                if (typeObj.isChildOf) {
                    _this.modifyAffectedParentsOrChildren(true, { value: type, isChildOf: true });
                }
            }
            else {
                _this.value[type] = [];
            }
        });
    };
    NovoMultiPickerElement.prototype.allItemsSelected = function (optionsByType, type) {
        return this.value[type].length === optionsByType.length - 1;
    };
    // Set touched on blur
    NovoMultiPickerElement.prototype.onTouched = function (e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    };
    NovoMultiPickerElement.prototype.writeValue = function (model) {
        this.model = model;
        this.setInitialValue(model);
    };
    NovoMultiPickerElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoMultiPickerElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoMultiPickerElement;
}());
NovoMultiPickerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'multi-picker',
                providers: [CHIPS_VALUE_ACCESSOR],
                template: "\n        <chip\n            *ngFor=\"let item of _items | async | slice:0:chipsCount\"\n            [type]=\"type\"\n            [class.selected]=\"item == selected\"\n            (remove)=\"removeFromDisplay($event, item)\"\n            (select)=\"select($event, item)\">\n            {{ item.label }}\n        </chip>\n        <div *ngIf=\"items.length > chipsCount\">\n            <ul class=\"summary\">\n                <li *ngFor=\"let type of notShown\">+ {{type.count}} {{ labels.more }} {{type.type}}</li>\n            </ul>\n        </div>\n        <div class=\"chip-input-container\">\n            <novo-picker\n                clearValueOnSelect=\"true\"\n                [config]=\"source\"\n                [placeholder]=\"placeholder\"\n                (select)=\"clickOption($event)\"\n                (keydown)=\"onKeyDown($event)\"\n                (focus)=\"onFocus($event)\"\n                (blur)=\"onTouched($event)\"\n                [overrideElement]=\"element\">\n            </novo-picker>\n        </div>\n        <i class=\"bhi-search\" [class.has-value]=\"items.length\"></i>\n        <label class=\"clear-all\" *ngIf=\"items.length\" (click)=\"clearValue()\">{{ labels.clearAll }} <i class=\"bhi-times\"></i></label>\n   ",
                host: {
                    '[class.with-value]': 'items.length > 0'
                }
            },] },
];
/** @nocollapse */
NovoMultiPickerElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoMultiPickerElement.propDecorators = {
    'source': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'types': [{ type: core_1.Input },],
    'changed': [{ type: core_1.Output },],
    'focus': [{ type: core_1.Output },],
    'blur': [{ type: core_1.Output },],
    'value': [{ type: core_1.Input },],
};
exports.NovoMultiPickerElement = NovoMultiPickerElement;
//# sourceMappingURL=MultiPicker.js.map