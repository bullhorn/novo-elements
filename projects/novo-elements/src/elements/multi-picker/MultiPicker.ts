// NG2
import { Component, OnInit, EventEmitter, forwardRef, ElementRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
// Vendor
import { ReplaySubject } from 'rxjs';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoMultiPickerElement),
  multi: true,
};

@Component({
  selector: 'multi-picker',
  providers: [CHIPS_VALUE_ACCESSOR],
  template: `
        <chip
            *ngFor="let item of _items | async | slice:0:chipsCount"
            [type]="item.type"
            [class.selected]="item == selected"
            (remove)="removeFromDisplay($event, item)"
            (select)="select($event, item)">
            {{ item.label }}
        </chip>
        <div *ngIf="items.length > chipsCount">
            <ul class="summary">
                <li *ngFor="let type of notShown">+ {{type.count}} {{ labels.more }} {{type.type}}</li>
            </ul>
        </div>
        <div class="chip-input-container">
            <novo-picker
                clearValueOnSelect="true"
                [config]="source"
                [placeholder]="placeholder"
                (select)="clickOption($event)"
                (keydown)="onKeyDown($event)"
                (focus)="onFocus($event)"
                (blur)="onTouched($event)"
                [overrideElement]="element">
            </novo-picker>
        </div>
        <i class="bhi-search" [class.has-value]="items.length"></i>
        <label class="clear-all" *ngIf="items.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
   `,
  host: {
    '[class.with-value]': 'items.length > 0',
  },
})
export class NovoMultiPickerElement implements OnInit {
  @Input()
  source: any;
  @Input()
  placeholder: any = '';
  @Input()
  types: any;
  @Output()
  changed: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();

  get value() {
    return this._value;
  }

  @Input()
  set value(selectedItems) {
    if (selectedItems) {
      this.types.forEach((x) => (this._value[x.value] = selectedItems[x.value]));
    } else {
      this._value = {};
      this.types.forEach((x) => (this._value[x.value] = []));
    }
    this.changed.emit(selectedItems);
    this.onModelChange(selectedItems);
  }

  items: any = [];
  _items = new ReplaySubject(1);
  options: any;
  _options: any;
  selected: any = null;
  config: any = {};
  chipsCount: number;
  selectAllOption: boolean;
  strictRelationship: boolean;
  // private data model
  _value: any = {};
  notShown: any = {};
  // Placeholders for the callbacks
  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(public element: ElementRef, public labels: NovoLabelService) {
    this.chipsCount = 4;
  }

  ngOnInit() {
    this.selectAllOption = this.source.selectAllOption || false;
    this.chipsCount = this.source.chipsCount || 4;
    this.strictRelationship = this.source.strictRelationship || false;
    this.setupOptions();
  }

  clearValue() {
    this.types.forEach((type) => this.modifyAllOfType(type.value, 'unselect'));
    this.items = [];
    this._items.next(this.items);
    this.value = this.setInitialValue(null);
    this.onModelChange(this.value);
  }

  removeFromDisplay(event, item) {
    this.remove(true, item);
    this.modifyAffectedParentsOrChildren(false, item);
  }

  setupOptions() {
    this.options = this.source.options || [];
    this._options = [];
    if (this.options) {
      this.options.forEach((option) => {
        let formattedOption = this.setupOptionsByType(option);
        this._options.push(formattedOption);
      });
    }
    this.source.options = this._options;
  }

  setupOptionsByType(section) {
    let formattedSection: any = {
      type: section.type,
      label: section.label || section.type,
    };
    formattedSection.data = section.data.map((item) => {
      return this.formatOption(section, item);
    });
    if (this.selectAllOption) {
      let selectAll = this.createSelectAllOption(section);
      formattedSection.data.splice(0, 0, selectAll);
    }
    formattedSection.originalData = formattedSection.data.slice();
    return formattedSection;
  }

  formatOption(section, item) {
    let obj = {
      value: section.field ? item[section.field] : item.value || item,
      label: section.format ? Helpers.interpolate(section.format, item) : item.label || String(item.value || item),
      type: section.type,
      checked: undefined,
      isParentOf: section.isParentOf,
      isChildOf: section.isChildOf,
    };
    if (obj.isChildOf) {
      obj[section.isChildOf] = item[section.isChildOf];
    }
    return obj;
  }

  createSelectAllOption(section) {
    let selectAll = {
      value: 'ALL',
      label: `All ${section.type}`,
      type: section.type,
      checked: this.model && this.model.length && this.model.indexOf('ALL') !== -1,
      isParentOf: section.isParentOf,
      isChildOf: section.isChildOf,
    };
    if (section.isChildOf) {
      let allParents = section.data.reduce((accum, next) => {
        return accum.concat(next[section.isChildOf]);
      }, []);
      selectAll[section.isChildOf] = allParents;
    }
    return selectAll;
  }

  deselectAll() {
    this.selected = null;
  }

  select(event, item) {
    this.blur.emit(event);
    this.deselectAll();
    this.selected = item;
  }

  onFocus(e) {
    this.element.nativeElement.classList.add('selected');
    this.focus.emit(e);
  }

  clickOption(event) {
    if (event && !(event instanceof Event)) {
      if (event.checked === false) {
        this.remove(null, event);
      } else {
        this.add(event);
      }
      this.modifyAffectedParentsOrChildren(event.checked, event);
      // Set focus on the picker
      let input = this.element.nativeElement.querySelector('novo-picker > input');
      if (input) {
        input.focus();
      }
    }
  }

  add(event) {
    if (event.value === 'ALL') {
      this.modifyAllOfType(event.type, 'select');
    } else {
      this.updateDisplayItems(event, 'add');
      this.value[event.type].push(event.value);
      this.updateAllItemState(event.type);
      this.triggerValueUpdate();
    }
    this.updateParentOrChildren(event, 'select');
    this.select(null, event);
  }

  updateAllItemState(type) {
    let allOfType = this.getAllOfType(type);
    let allOfTypeSelected = this.allItemsSelected(allOfType, type);
    if (allOfTypeSelected) {
      this.selectAll(allOfType, type);
    }
    return { allOfType, allOfTypeSelected };
  }

  setIndeterminateState(allOfType, status) {
    if (!this.selectAllOption) {
      return;
    }
    let allItem = allOfType[0];
    allItem.indeterminate = status;
  }

  updateDisplayItems(item, action) {
    let adding = action === 'add';
    if (adding) {
      this.items.push(item);
    } else {
      if (this.items.indexOf(item) > -1) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    }
    this.updateDisplayText(this.items);
    this._items.next(this.items);
  }

  updateDisplayText(items) {
    this.notShown = [];
    let notShown = items.slice(this.chipsCount);
    if (notShown.length > 0) {
      this.types.forEach((type) => {
        let count;
        let selectedOfType = notShown.filter((x) => x.type === type.value);
        if (selectedOfType.length === 1 && selectedOfType[0].value === 'ALL') {
          count = this.getAllOfType(type.value).length - 1;
        } else {
          count = selectedOfType.length;
        }
        let displayType = count === 1 ? type.singular : type.plural || type.value;
        if (count > 0) {
          this.notShown.push({ type: displayType, count: count });
        }
      });
    }
  }

  remove(event, item) {
    let triggeredByEvent;
    if (event) {
      triggeredByEvent = true;
    }
    let itemToRemove = item;
    if (itemToRemove.value === 'ALL') {
      triggeredByEvent = false;
      this.modifyAllOfType(itemToRemove.type, 'unselect');
    } else if (this.allOfTypeSelected(itemToRemove.type)) {
      this.handleRemoveItemIfAllSelected(itemToRemove);
    }
    this.removeItem(item, triggeredByEvent);
  }

  removeItem(item, triggeredByEvent?: any) {
    item.checked = false;
    this.deselectAll();
    this.removeValue(item);
    if (item.value !== 'ALL') {
      this.updateParentOrChildren(item, 'unselect');
    }
    if (triggeredByEvent) {
      this.modifyAffectedParentsOrChildren(false, item);
    }
  }

  removeValue(item) {
    let updatedValues = this.value[item.type].filter((x) => x !== item.value);
    this.value[item.type] = updatedValues;
    this.triggerValueUpdate();
    this.updateDisplayItems(item, 'remove');
  }

  onKeyDown(event) {
    if (event.keyCode === KeyCodes.BACKSPACE) {
      if (event.target && event.target.value.length === 0 && this.items.length) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        if (this.selected) {
          this.remove(null, this.selected);
        } else {
          this.select(event, this.items[this.items.length - 1]);
        }
      }
    }
  }

  allOfTypeSelected(type) {
    return this.items.filter((x) => x.type === type && x.value === 'ALL').length > 0;
  }

  modifyAllOfType(type, action) {
    let selecting = action === 'select';
    let allOfType = this.getAllOfType(type);
    allOfType.forEach((item) => {
      item.checked = selecting;
      item.indeterminate = false;
    });
    if (selecting) {
      this.selectAll(allOfType, type);
    } else {
      this.items = [...this.items.filter((x) => x.type !== type)];
      this._items.next(this.items);
      this.value[type] = [];
    }
    if (this.selectAllOption) {
      this.updateAllParentsOrChildren(allOfType[0], action);
    }
    this.triggerValueUpdate();
  }

  triggerValueUpdate() {
    let updatedObject = {};
    this.types.forEach((x) => (updatedObject[x.value] = this.value[x.value]));
    this.value = updatedObject;
  }

  selectAll(allOfType, type) {
    if (!this.selectAllOption) {
      return;
    }
    allOfType[0].checked = true;
    let values = allOfType.map((i) => {
      return i.value;
    });
    // remove 'ALL' value
    values.splice(0, 1);
    this.value[type] = values;
    let updatedItems = this.items.filter((x) => x.type !== type);
    this.items = updatedItems;
    this.updateDisplayItems(allOfType[0], 'add');
  }

  handleRemoveItemIfAllSelected(item) {
    if (!this.selectAllOption) {
      return;
    }
    let type = item.type;
    let allOfType = this.getAllOfType(type);
    let allItem = allOfType[0];
    this.removeItem(allItem);
    allItem.indeterminate = true;
    let selectedItems = allOfType.filter((i) => i.checked === true);
    this.items = [...this.items, ...selectedItems];
    let values = selectedItems.map((i) => {
      return i.value;
    });
    this.value[type] = [...values];
  }

  handleOutsideClick(event) {
    // If the elements doesn't contain the target element, it is an outside click
    if (!this.element.nativeElement.contains(event.target)) {
      this.blur.emit(event);
      this.deselectAll();
    }
  }

  getAllOfType(type) {
    return this._options.filter((x) => x.type === type)[0].originalData;
  }

  updateParentOrChildren(item, action) {
    if (this.strictRelationship && item.isParentOf) {
      this.updateChildrenValue(item, action);
    } else if (item.isChildOf && this.selectAllOption) {
      this.updateParentValue(item, action);
    }
  }

  modifyAffectedParentsOrChildren(selecting, itemChanged) {
    if (!itemChanged.isChildOf && !itemChanged.isParentOf) {
      return;
    }
    let parent = this.types.filter((x) => !!x.isParentOf)[0];
    let parentType = parent.value;
    let allParentType = this.getAllOfType(parentType);
    let childType = allParentType[0].isParentOf;
    let allChildren = this.getAllOfType(childType);
    let allCheckedChildren = allChildren.filter((x) => !!x.checked);

    allParentType.forEach((obj) => {
      if (obj.value === 'ALL') {
        return;
      }
      let selectedChildrenOfParent = allCheckedChildren.filter((x) => {
        return x[parentType].filter((y) => y === obj.value).length > 0;
      });

      if (selecting) {
        if (obj.checked) {
          return;
        }
        obj.indeterminate = selectedChildrenOfParent.length > 0;
      } else {
        let allChildrenOfParent = allChildren.filter((x) => {
          return x.value !== 'ALL' && x[parentType].filter((y) => y === obj.value).length > 0;
        });
        if (selectedChildrenOfParent.length > 0) {
          if (obj.checked) {
            if (this.strictRelationship && allChildrenOfParent.length !== selectedChildrenOfParent.length) {
              obj.indeterminate = true;
              obj.checked = false;
              this.removeValue(obj);
              this.addIndividualChildren(selectedChildrenOfParent);
            }
          } else {
            obj.indeterminate = true;
          }
          if (this.strictRelationship && itemChanged.type !== parentType) {
            if (obj.checked) {
              obj.checked = false;
              this.removeValue(obj);
              this.addIndividualChildren(selectedChildrenOfParent);
            }
          }
        } else {
          obj.indeterminate = false;
          if (allChildrenOfParent.length === 0) {
            // if it has no children and is checked, it should stay checked
            return;
          } else if (this.strictRelationship && itemChanged.type !== parentType) {
            this.remove(null, obj);
          }
        }
      }
    });
    if (this.selectAllOption) {
      this.updateIndeterminateStates(allParentType, allChildren, allCheckedChildren);
    }
  }

  updateAllParentsOrChildren(allItem, action) {
    if (allItem.isParentOf) {
      this.updateAllChildrenValue(allItem, action);
    } else if (allItem.isChildOf) {
      this.updateAllParentValue(allItem, action);
    }
  }

  updateAllChildrenValue(item, action) {
    let selecting = action === 'select';
    let childType = item.isParentOf;
    let potentialChildren = this.getAllOfType(childType);
    if (this.selectAllOption && this.allOfTypeSelected(childType) && !selecting) {
      this.remove(null, potentialChildren[0]);
      return;
    }
    potentialChildren.forEach((x) => {
      if (x.value === 'ALL' && !x.checked) {
        if (selecting) {
          x.checked = true;
        }
        x.indeterminate = selecting;
      } else {
        if (x.checked && !selecting) {
          this.remove(null, x);
        }
        x.checked = selecting;
      }
    });
  }

  updateAllParentValue(item, action) {
    let selecting = action === 'select';
    let parentType = item.isChildOf;
    let potentialParents = this.getAllOfType(parentType);
    potentialParents.forEach((x) => {
      if (!x.checked) {
        x.indeterminate = selecting;
      }
    });
  }

  updateIndeterminateStates(allParentType, allChildren, allCheckedChildren) {
    let allCheckedOrIndeterminateParents = allParentType.filter((x) => (!!x.checked || !!x.indeterminate) && x.value !== 'ALL');
    let isParentIndeterminate = !!allParentType[0].checked ? false : allCheckedOrIndeterminateParents.length > 0;
    let isChildIndeterminate = !!allChildren[0].checked ? false : allCheckedChildren.length > 0;
    this.setIndeterminateState(allParentType, isParentIndeterminate);
    this.setIndeterminateState(allChildren, isChildIndeterminate);
  }

  updateChildrenValue(parent, action) {
    let selecting = action === 'select';
    let childType = parent.isParentOf;
    let potentialChildren = this.getAllOfType(childType);
    potentialChildren.forEach((x) => {
      if (x.value === 'ALL') {
        return;
      }
      if (x[parent.type].filter((y) => y === parent.value).length > 0) {
        if (x.checked && !selecting) {
          x.checked = false;
          if (this.allOfTypeSelected(childType)) {
            this.handleRemoveItemIfAllSelected(x);
          } else {
            this.removeValue(x);
          }
        }
        x.checked = selecting;
      }
    });
  }

  updateParentValue(child, action) {
    let allParentType = this.getAllOfType(child.isChildOf);
    if (allParentType[0].checked && action !== 'select') {
      this.handleRemoveItemIfAllSelected(allParentType[0]);
    }
  }

  addIndividualChildren(children) {
    let parentAlreadySelected = false;
    children.forEach((x) => {
      if (x.isChildOf) {
        // only add children if their parents are not already selected
        x[x.isChildOf].forEach((parent) => {
          if (this.value[x.isChildOf].filter((p) => p === parent).length > 0) {
            parentAlreadySelected = true;
          }
        });
      }
      if (this.value[x.type].filter((item) => item === x.value).length === 0 && !parentAlreadySelected) {
        this.add(x);
      }
    });
  }

  setInitialValue(model) {
    this.items = [];
    this.value = model || {};
    if (!this.types) {
      return;
    }
    this.types.forEach((typeObj) => {
      let type = typeObj.value;
      if (this.value[type]) {
        let indeterminateIsSet = false;
        let options = this.updateAllItemState(type);
        let optionsByType = options.allOfType;
        let allSelected = options.allOfTypeSelected;
        this.value[type].forEach((item) => {
          if (!allSelected && !indeterminateIsSet) {
            indeterminateIsSet = true;
            this.setIndeterminateState(optionsByType, true);
          }
          let value = optionsByType.filter((x) => x.value === item)[0];
          value.checked = true;
          if (!allSelected) {
            this.updateDisplayItems(value, 'add');
          }
          if (this.strictRelationship && value.isParentOf) {
            this.updateChildrenValue(value, 'select');
          }
        });
        if (typeObj.isChildOf) {
          this.modifyAffectedParentsOrChildren(true, { value: type, isChildOf: true });
        }
      } else {
        this.value[type] = [];
      }
    });
  }

  allItemsSelected(optionsByType, type) {
    return this.value[type].length === optionsByType.length - 1;
  }

  // Set touched on blur
  onTouched(e) {
    this.element.nativeElement.classList.remove('selected');
    this.onModelTouched();
    this.blur.emit(e);
  }

  writeValue(model: any): void {
    this.model = model;
    this.setInitialValue(model);
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
