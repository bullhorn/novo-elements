import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, ChangeDetectionStrategy, Component, forwardRef, HostBinding, ViewChild, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i1$1 from 'novo-elements/services';
import { Color, Helpers } from 'novo-elements/utils';
import * as i5 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'novo-elements/elements/field';
import { NovoFieldModule } from 'novo-elements/elements/field';
import * as i6 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { debounceTime } from 'rxjs/operators';
import { NovoPipesModule } from 'novo-elements/pipes';

class NovoColorSwatchComponent {
    constructor() {
        this.style = {};
        this.focusStyle = {};
        this.onClick = new EventEmitter();
        this.onHover = new EventEmitter();
        this.divStyles = {};
        this.focusStyles = {};
        this.inFocus = false;
    }
    ngOnInit() {
        this.divStyles = {
            background: this.color,
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            position: 'relative',
            outline: 'none',
            ...this.style,
        };
    }
    currentStyles() {
        this.focusStyles = {
            ...this.divStyles,
            ...this.focusStyle,
        };
        return this.focus || this.inFocus ? this.focusStyles : this.divStyles;
    }
    handleFocusOut() {
        this.inFocus = false;
    }
    handleFocus() {
        this.inFocus = true;
    }
    handleHover(hex, $event) {
        this.onHover.emit({ hex, $event });
    }
    handleClick(hex, $event) {
        this.onClick.emit({ hex, $event });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorSwatchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoColorSwatchComponent, isStandalone: false, selector: "novo-color-swatch", inputs: { color: "color", style: "style", focusStyle: "focusStyle", focus: "focus" }, outputs: { onClick: "onClick", onHover: "onHover" }, ngImport: i0, template: `
    <div
      class="swatch"
      [ngStyle]="currentStyles()"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (blur)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [".swatch{border-radius:.4rem}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorSwatchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-color-swatch', template: `
    <div
      class="swatch"
      [ngStyle]="currentStyles()"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (blur)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [".swatch{border-radius:.4rem}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], style: [{
                type: Input
            }], focusStyle: [{
                type: Input
            }], focus: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onHover: [{
                type: Output
            }] } });

class NovoColorPickerComponent {
    constructor() {
        /** Pixel value for picker width */
        this.width = 276;
        /** Color squares to display */
        this.colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
        this.color = {
            h: 250,
            s: 0.5,
            l: 0.2,
            a: 1,
        };
        this.onChange = new EventEmitter();
        this.onChangeComplete = new EventEmitter();
        this.onSwatchHover = new EventEmitter();
        this.swatchStyle = {
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            fontSize: '0',
        };
        this.input = {
            borderRadius: '4px',
            borderBottomLeftRadius: '0',
            borderTopLeftRadius: '0',
            border: '1px solid #e6ecf0',
            boxSizing: 'border-box',
            display: 'inline',
            fontSize: '14px',
            height: '30px',
            padding: '0',
            paddingLeft: '6px',
            width: '100%',
            color: '#657786',
        };
    }
    focus(color) {
        return { boxShadow: `0 0 4px ${color}` };
    }
    handleBlockChange({ hex, $event }) {
        if (Color.isValidHex(hex)) {
            this.handleChange({ hex, source: 'hex' }, $event);
        }
    }
    handleValueChange({ data, $event }) {
        this.handleBlockChange({ hex: data, $event });
    }
    ngOnInit() {
        this.changes = this.onChange.pipe(debounceTime(100)).subscribe((x) => this.onChangeComplete.emit(x));
        this.setState(new Color(this.color));
    }
    ngOnChanges() {
        this.setState(new Color(this.color));
    }
    ngOnDestroy() {
        this.changes.unsubscribe();
    }
    setState(data) {
        this.currentColor = data;
        this.hsl = data.hsl;
        this.hsv = data.hsv;
        this.rgb = data.rgb;
        this.hex = data.hex;
        this.afterValidChange();
    }
    handleChange(data, $event) {
        const color = new Color(data.hex);
        if (color.isValid) {
            this.setState(color);
            this.onChange.emit({ color, $event });
            this.afterValidChange();
        }
    }
    /** hook for components after a complete change */
    afterValidChange() { }
    handleSwatchHover($event) {
        const color = new Color($event.hex);
        if (color.isValid) {
            this.setState(color);
            this.onSwatchHover.emit({ color, $event });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoColorPickerComponent, isStandalone: false, selector: "novo-color-picker", inputs: { width: "width", colors: "colors", color: "color" }, outputs: { onChange: "onChange", onChangeComplete: "onChangeComplete", onSwatchHover: "onSwatchHover" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="novo-color-preview" [style.backgroundColor]="currentColor.hex">
      <div class="novo-color-preview-text">{{ hex }}</div>
    </div>
    <div class="novo-color-swatches">
      <novo-color-swatch
        *ngFor="let color of colors"
        [color]="color"
        (onClick)="handleBlockChange($event)"
        (onHover)="handleSwatchHover($event)"
      ></novo-color-swatch>
    </div>
    <div class="novo-color-input">
      <input [value]="hex.replace('#', '')" (onChange)="handleValueChange($event)" />
    </div>
  `, isInline: true, styles: [":host{display:grid;grid-template-rows:6rem 1fr min-content;background-color:var(--background-bright, #ffffff);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: NovoColorSwatchComponent, selector: "novo-color-swatch", inputs: ["color", "style", "focusStyle", "focus"], outputs: ["onClick", "onHover"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-color-picker', template: `
    <div class="novo-color-preview" [style.backgroundColor]="currentColor.hex">
      <div class="novo-color-preview-text">{{ hex }}</div>
    </div>
    <div class="novo-color-swatches">
      <novo-color-swatch
        *ngFor="let color of colors"
        [color]="color"
        (onClick)="handleBlockChange($event)"
        (onHover)="handleSwatchHover($event)"
      ></novo-color-swatch>
    </div>
    <div class="novo-color-input">
      <input [value]="hex.replace('#', '')" (onChange)="handleValueChange($event)" />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, preserveWhitespaces: false, standalone: false, styles: [":host{display:grid;grid-template-rows:6rem 1fr min-content;background-color:var(--background-bright, #ffffff);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"] }]
        }], propDecorators: { width: [{
                type: Input
            }], colors: [{
                type: Input
            }], color: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onChangeComplete: [{
                type: Output
            }], onSwatchHover: [{
                type: Output
            }] } });

// NG
// Value accessor for the component (supports ngModel)
const COLOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoColorInputElement),
    multi: true,
};
class NovoColorInputElement {
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            this._setFormValue(value);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    constructor(element, labels, cdr) {
        this.element = element;
        this.labels = labels;
        this.cdr = cdr;
        this.placeholder = '#ffffff';
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = '';
        this.lastValidValue = '';
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
    }
    ngOnInit() { }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay && this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Key.Escape */ || event.key === "Enter" /* Key.Enter */ || event.key === "Tab" /* Key.Tab */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _setFormValue(value) {
        if (this.value) {
            // hmm...
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event) {
            this.value = event.color.hex;
            this.change.emit(this.value);
            this.closePanel();
        }
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.value = '';
        this.change.emit(this.value);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorInputElement, deps: [{ token: i0.ElementRef }, { token: i1$1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoColorInputElement, isStandalone: false, selector: "novo-color-input", inputs: { name: "name", placeholder: "placeholder", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [COLOR_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], ngImport: i0, template: `
    <novo-field>
      <input
        novoInput
        type="text"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [style.color]="value"
        (focus)="_handleFocus($event)"
        (keydown)="_handleKeydown($event)"
        (input)="_handleInput($event)"
        (blur)="_handleBlur($event)"
        [(ngModel)]="value"
        #input
      />
      <novo-icon *ngIf="!hasValue" (click)="openPanel()">complex</novo-icon>
      <novo-icon *ngIf="hasValue" smaller (click)="clearValue()">x</novo-icon>
    </novo-field>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-color-picker [(color)]="value" (onChange)="setValueAndClose($event)"></novo-color-picker>
    </novo-overlay-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i4.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "component", type: i5.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }, { kind: "component", type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: NovoColorPickerComponent, selector: "novo-color-picker", inputs: ["width", "colors", "color"], outputs: ["onChange", "onChangeComplete", "onSwatchHover"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-color-input',
                    providers: [COLOR_VALUE_ACCESSOR],
                    template: `
    <novo-field>
      <input
        novoInput
        type="text"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [style.color]="value"
        (focus)="_handleFocus($event)"
        (keydown)="_handleKeydown($event)"
        (input)="_handleInput($event)"
        (blur)="_handleBlur($event)"
        [(ngModel)]="value"
        #input
      />
      <novo-icon *ngIf="!hasValue" (click)="openPanel()">complex</novo-icon>
      <novo-icon *ngIf="hasValue" smaller (click)="clearValue()">x</novo-icon>
    </novo-field>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-color-picker [(color)]="value" (onChange)="setValueAndClose($event)"></novo-color-picker>
    </novo-overlay-template>
  `,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { name: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });

// NG2
class NovoColorPickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerModule, declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent], imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule], exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerModule, imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoColorPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
                    declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                    exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoColorInputElement, NovoColorPickerComponent, NovoColorPickerModule, NovoColorSwatchComponent };
//# sourceMappingURL=novo-elements-elements-color-picker.mjs.map
