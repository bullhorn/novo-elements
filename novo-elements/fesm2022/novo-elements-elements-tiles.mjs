import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Output, Input, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Helpers } from 'novo-elements/utils';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';

// NG2
// Value accessor for the component (supports ngModel)
const TILES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTilesElement),
    multi: true,
};
class NovoTilesElement {
    constructor(element, ref) {
        this.element = element;
        this.ref = ref;
        this.name = new Date().getTime().toString();
        this.disabled = false;
        this.onChange = new EventEmitter();
        this.onSelectedOptionClick = new EventEmitter();
        this.onDisabledOptionClick = new EventEmitter();
        this._options = [];
        this.activeTile = null;
        this.focused = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    setFocus(focus) {
        this.focused = focus;
    }
    ngAfterContentInit() {
        this.name = this.name || '';
        this.setupOptions();
    }
    ngOnChanges(change) {
        if (change.options && change.options.currentValue && !change.options.firstChange) {
            this.name = this.name || '';
            this._options = [];
            this.setupOptions();
        }
    }
    setupOptions() {
        if (this.options && this.options.length && (this.options[0].value === undefined || this.options[0].value === null)) {
            this._options = this.options.map((x) => {
                const item = { value: x, label: x, checked: this.model === x };
                if (item.checked) {
                    this.setTile(item);
                }
                return item;
            });
        }
        else {
            this._options = this.options.map((x) => {
                x.checked = this.model === x.value || (this.model && this.model.id === x.value);
                if (x.checked) {
                    this.setTile(x);
                }
                return x;
            });
        }
        this.ref.markForCheck();
    }
    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (!item.disabled) {
            if (item.checked) {
                this.onSelectedOptionClick.emit(item);
                return;
            }
            for (const option of this._options) {
                option.checked = false;
            }
            item.checked = !item.checked;
            this.onChange.emit(item.value);
            this.onModelChange(item.value);
            this.setTile(item);
            this.model = item.value;
        }
        else {
            this.onDisabledOptionClick.emit(item);
        }
        this.ref.markForCheck();
    }
    setTile(item) {
        if (item) {
            this.activeTile = item.value;
            this.ref.markForCheck();
        }
    }
    writeValue(model) {
        this.model = model;
        if (!Helpers.isBlank(model)) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTilesElement, isStandalone: false, selector: "novo-tiles", inputs: { name: "name", options: "options", required: "required", disabled: ["controlDisabled", "disabled"] }, outputs: { onChange: "onChange", onSelectedOptionClick: "onSelectedOptionClick", onDisabledOptionClick: "onDisabledOptionClick" }, providers: [TILES_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
    <div class="tile-container" [class.active]="focused" [class.disabled]="disabled">
      <button class="tile" type="button"
        *ngFor="let option of _options; let i = index"
        [ngClass]="{ defaultColor: !option.color, active: option.checked, disabled: option.disabled }"
        [theme]="option.checked ? 'primary' : 'dialogue'"
        [color]="option.checked ? option.color || 'darken($ocean, 20%)' : 'dark'"
        [icon]="option.icon"
        [side]="option.iconSide || 'left'"
        (click)="select($event, option)"
        [attr.data-automation-id]="option.label || option">
        <input
          class="tiles-input"
          [name]="name"
          type="radio"
          [value]="option.checked || option.value || option"
          [attr.id]="name + i"
          (change)="select($event, option)"
          (focus)="setFocus(true)"
          (blur)="setFocus(false)"
          [disabled]="disabled"
        />
        <label [attr.for]="name + i" [attr.data-automation-id]="option.label || option">
          {{ option.label || option }}
        </label>
      </button>
    </div>
  `, isInline: true, styles: [":host{display:inline-block}:host input{appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{background:#fff;display:flex;border:solid thin #707070;border-radius:3px}:host>.tile-container .tile{margin:2px;gap:.5rem}:host>.tile-container .tile:not(:last-child){margin-right:3px}:host>.tile-container .tile.defaultColor.active{background:#1f57a1}:host>.tile-container .tile.disabled{cursor:not-allowed;opacity:.4}:host>.tile-container .tile ::ng-deep span{text-transform:none}:host>.tile-container .tile ::ng-deep span label{cursor:inherit}:host>.tile-container.disabled{border-color:#d1d1d1;opacity:.4;pointer-events:auto;cursor:not-allowed}:host>.tile-container.disabled .tile{pointer-events:none;opacity:1}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tiles', providers: [TILES_VALUE_ACCESSOR], template: `
    <div class="tile-container" [class.active]="focused" [class.disabled]="disabled">
      <button class="tile" type="button"
        *ngFor="let option of _options; let i = index"
        [ngClass]="{ defaultColor: !option.color, active: option.checked, disabled: option.disabled }"
        [theme]="option.checked ? 'primary' : 'dialogue'"
        [color]="option.checked ? option.color || 'darken($ocean, 20%)' : 'dark'"
        [icon]="option.icon"
        [side]="option.iconSide || 'left'"
        (click)="select($event, option)"
        [attr.data-automation-id]="option.label || option">
        <input
          class="tiles-input"
          [name]="name"
          type="radio"
          [value]="option.checked || option.value || option"
          [attr.id]="name + i"
          (change)="select($event, option)"
          (focus)="setFocus(true)"
          (blur)="setFocus(false)"
          [disabled]="disabled"
        />
        <label [attr.for]="name + i" [attr.data-automation-id]="option.label || option">
          {{ option.label || option }}
        </label>
      </button>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [":host{display:inline-block}:host input{appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{background:#fff;display:flex;border:solid thin #707070;border-radius:3px}:host>.tile-container .tile{margin:2px;gap:.5rem}:host>.tile-container .tile:not(:last-child){margin-right:3px}:host>.tile-container .tile.defaultColor.active{background:#1f57a1}:host>.tile-container .tile.disabled{cursor:not-allowed;opacity:.4}:host>.tile-container .tile ::ng-deep span{text-transform:none}:host>.tile-container .tile ::ng-deep span label{cursor:inherit}:host>.tile-container.disabled{border-color:#d1d1d1;opacity:.4;pointer-events:auto;cursor:not-allowed}:host>.tile-container.disabled .tile{pointer-events:none;opacity:1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { name: [{
                type: Input
            }], options: [{
                type: Input
            }], required: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: ['controlDisabled']
            }], onChange: [{
                type: Output
            }], onSelectedOptionClick: [{
                type: Output
            }], onDisabledOptionClick: [{
                type: Output
            }] } });

// NG2
class NovoTilesModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesModule, declarations: [NovoTilesElement], imports: [CommonModule, NovoButtonModule, ReactiveFormsModule], exports: [NovoTilesElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesModule, imports: [CommonModule, NovoButtonModule, ReactiveFormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTilesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, ReactiveFormsModule],
                    declarations: [NovoTilesElement],
                    exports: [NovoTilesElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTilesElement, NovoTilesModule };
//# sourceMappingURL=novo-elements-elements-tiles.mjs.map
