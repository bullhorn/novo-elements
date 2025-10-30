import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Output, ViewChild, Input, Attribute, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Helpers, BooleanInput } from 'novo-elements/utils';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckboxElement),
    multi: true,
};
/** Change event object emitted by NovoCheckbox. */
class NovoCheckboxChange {
}
const LAYOUT_DEFAULTS = { iconStyle: 'box' };
let nextId = 0;
class NovoCheckboxElement {
    /** Whether the checkbox is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** Whether the checkbox is checked. */
    get checked() {
        return this._checked;
    }
    set checked(value) {
        if (value !== this.checked) {
            this._checked = value;
            this._cdr.markForCheck();
        }
    }
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(value) {
        const changed = value !== this._indeterminate;
        this._indeterminate = coerceBooleanProperty(value);
        if (changed) {
            this.indeterminateChange.emit(this._indeterminate);
        }
        this._syncIndeterminate(this._indeterminate);
    }
    constructor(_cdr, _focusMonitor, tabIndex) {
        this._cdr = _cdr;
        this._focusMonitor = _focusMonitor;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        this._uniqueId = `novo-checkbox-${++nextId}`;
        this.boxIcon = true;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.disabled = false;
        this._checked = false;
        this._indeterminate = false;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        // this.color = this.defaultColor = this._options.color || defaults.color;
        this.tabIndex = parseInt(tabIndex, 10) || 0;
    }
    ngOnInit() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.boxIcon = this.layoutOptions.iconStyle === 'box';
    }
    select(event) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onSelect.emit({ originalEvent: event, value: this.checked });
        }
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked = !!value;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    _getAriaChecked() {
        if (this.checked) {
            return 'true';
        }
        return this.indeterminate ? 'mixed' : 'false';
    }
    _emitChangeEvent() {
        const event = new NovoCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.onModelChange(this.checked);
        this.change.emit(event);
        // Assigning the value again here is redundant, but we have to do it in case it was
        // changed inside the `change` listener which will cause the input to be out of sync.
        if (this._inputElement) {
            this._inputElement.nativeElement.checked = this.checked;
        }
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        if (!this.disabled) {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate) {
                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                });
            }
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    }
    /** Focuses the checkbox. */
    focus(origin, options) {
        if (origin) {
            this._focusMonitor.focusVia(this._inputElement, origin, options);
        }
        else {
            this._inputElement.nativeElement.focus(options);
        }
    }
    _onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    _syncIndeterminate(value) {
        const nativeCheckbox = this._inputElement;
        if (nativeCheckbox) {
            nativeCheckbox.nativeElement.indeterminate = value;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxElement, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCheckboxElement, isStandalone: false, selector: "novo-checkbox", inputs: { ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedby: ["aria-describedby", "ariaDescribedby"], id: "id", name: "name", label: "label", disabled: "disabled", layoutOptions: "layoutOptions", color: "color", value: "value", tabIndex: "tabIndex", required: "required", checked: "checked", indeterminate: "indeterminate" }, outputs: { change: "change", indeterminateChange: "indeterminateChange", onSelect: "onSelect" }, host: { properties: { "class.has-label": "label" }, classAttribute: "novo-checkbox" }, providers: [CHECKBOX_VALUE_ACCESSOR], viewQueries: [{ propertyName: "_inputElement", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
    <div class="novo-checkbox-group" [class.checked]="checked" [class.disabled]="disabled">
      <input
        #input
        type="checkbox"
        [required]="_required"
        [checked]="checked"
        [id]="id"
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-checked]="_getAriaChecked()"
        [attr.aria-describedby]="ariaDescribedby"
        (change)="_onInteractionEvent($event)"
        (click)="_onInputClick($event)"
      />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!checked && !indeterminate && !boxIcon"
          [class.bhi-check]="checked && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label" class="novo-checkbox-text"><ng-content></ng-content></span>
      </label>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoCheckboxElement.prototype, "checked", null);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoCheckboxElement.prototype, "indeterminate", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-checkbox', providers: [CHECKBOX_VALUE_ACCESSOR], template: `
    <div class="novo-checkbox-group" [class.checked]="checked" [class.disabled]="disabled">
      <input
        #input
        type="checkbox"
        [required]="_required"
        [checked]="checked"
        [id]="id"
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-checked]="_getAriaChecked()"
        [attr.aria-describedby]="ariaDescribedby"
        (change)="_onInteractionEvent($event)"
        (click)="_onInputClick($event)"
      />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!checked && !indeterminate && !boxIcon"
          [class.bhi-check]="checked && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label" class="novo-checkbox-text"><ng-content></ng-content></span>
      </label>
    </div>
  `, host: {
                        class: 'novo-checkbox',
                        '[class.has-label]': 'label',
                    }, standalone: false, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }], propDecorators: { ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], ariaDescribedby: [{
                type: Input,
                args: ['aria-describedby']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], layoutOptions: [{
                type: Input
            }], color: [{
                type: Input
            }], value: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], required: [{
                type: Input
            }], checked: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], _inputElement: [{
                type: ViewChild,
                args: ['input']
            }], change: [{
                type: Output
            }], indeterminateChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

// NG2
// Value accessor for the component (supports ngModel)
const CHECKLIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckListElement),
    multi: true,
};
class NovoCheckListElement {
    constructor() {
        this.onSelect = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.setModel();
        this.setupOptions();
    }
    select(event, item) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            item.checked = !item.checked;
            this.model = this._options.filter((checkBox) => checkBox.checked).map((x) => x.value);
            this.onModelChange(this.model.length > 0 ? this.model : '');
            this.onSelect.emit({ selected: this.model });
        }
    }
    setupOptions() {
        this.options = this.options || [];
        this._options = [];
        if (this.options.length && !this.options[0].value) {
            this.options.forEach((option) => {
                const formattedOption = {
                    value: option,
                    label: option,
                    checked: this.model && this.model.length && this.model.indexOf(option.value) !== -1,
                };
                this._options.push(formattedOption);
            });
        }
        else {
            this.options.forEach((option) => {
                const formattedOption = option;
                formattedOption.checked = this.model && this.model.length && this.model.indexOf(option.value) !== -1;
                this._options.push(formattedOption);
            });
        }
    }
    setModel() {
        const checkedOptions = this.options.filter((checkBox) => checkBox.checked).map((x) => x.value);
        this.writeValue(checkedOptions);
    }
    writeValue(model) {
        this.model = model || [];
        if (model) {
            this.setupOptions();
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckListElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCheckListElement, isStandalone: false, selector: "novo-check-list", inputs: { name: "name", options: "options", disabled: "disabled" }, outputs: { onSelect: "onSelect" }, providers: [CHECKLIST_VALUE_ACCESSOR], ngImport: i0, template: `
    <div
      class="novo-checkbox-group"
      *ngFor="let option of _options; let i = index"
      [ngClass]="{ checked: option.checked }"
      [class.disabled]="disabled"
      [attr.data-automation-id]="option.label"
    >
      <input
        [name]="name"
        type="checkbox"
        [ngModel]="option.checked"
        [attr.id]="name + i"
        [value]="option.checked"
        (change)="select($event, option)"
        [disabled]="disabled"
      />
      <label [attr.for]="name + i" (click)="select($event, option)">
        <i [ngClass]="{ 'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
        <span>{{ option.label }}</span>
      </label>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-flow:row wrap;gap:1rem}:host.hasLabel [class*=-group]{margin-right:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:var(--text-main)}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckListElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-check-list', providers: [CHECKLIST_VALUE_ACCESSOR], template: `
    <div
      class="novo-checkbox-group"
      *ngFor="let option of _options; let i = index"
      [ngClass]="{ checked: option.checked }"
      [class.disabled]="disabled"
      [attr.data-automation-id]="option.label"
    >
      <input
        [name]="name"
        type="checkbox"
        [ngModel]="option.checked"
        [attr.id]="name + i"
        [value]="option.checked"
        (change)="select($event, option)"
        [disabled]="disabled"
      />
      <label [attr.for]="name + i" (click)="select($event, option)">
        <i [ngClass]="{ 'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
        <span>{{ option.label }}</span>
      </label>
    </div>
  `, standalone: false, styles: [":host{display:flex;flex-flow:row wrap;gap:1rem}:host.hasLabel [class*=-group]{margin-right:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:var(--text-main)}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"] }]
        }], propDecorators: { name: [{
                type: Input
            }], options: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class NovoCheckboxModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxModule, declarations: [NovoCheckboxElement, NovoCheckListElement], imports: [CommonModule, A11yModule, FormsModule], exports: [NovoCheckboxElement, NovoCheckListElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxModule, imports: [CommonModule, A11yModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, A11yModule, FormsModule],
                    declarations: [NovoCheckboxElement, NovoCheckListElement],
                    exports: [NovoCheckboxElement, NovoCheckListElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoCheckListElement, NovoCheckboxChange, NovoCheckboxElement, NovoCheckboxModule };
//# sourceMappingURL=novo-elements-elements-checkbox.mjs.map
