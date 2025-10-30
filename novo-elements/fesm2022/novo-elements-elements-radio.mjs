import * as i0 from '@angular/core';
import { InjectionToken, forwardRef, EventEmitter, Input, Output, Inject, Optional, Component, HostBinding, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';

const NOVO_RADIO_GROUP = new InjectionToken('RadioGroupComponent');

// NG2
// make radio-buttons ids unique
let nextId$1 = 0;
// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true,
};
class NovoRadioElement {
    get checked() {
        return this._checked;
    }
    set checked(value) {
        value = !!value;
        if (this._checked !== value) {
            this._checked = value;
            if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.value = this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.radioGroup) {
                this._checked = this.radioGroup.value === this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    constructor(radioGroup, ref) {
        this.radioGroup = radioGroup;
        this.ref = ref;
        this._uniqueId = `novo-radio-${++nextId$1}`;
        this._value = false;
        this._checked = false;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.vertical = false;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.radioGroup = radioGroup;
    }
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.vertical = this.radioGroup.appearance === 'vertical';
            this.name = this.radioGroup.name;
            this.disabled = this.disabled || this.radioGroup.disabled;
        }
    }
    _onInputChange(event) {
        event.stopPropagation();
        this.change.emit(event);
        this.checked = true;
        if (this.radioGroup) {
            this.radioGroup.value = this.value;
        }
    }
    writeValue(value) {
        this.value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioElement, deps: [{ token: NOVO_RADIO_GROUP, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoRadioElement, isStandalone: false, selector: "novo-radio", inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", disabled: "disabled", checked: "checked", value: "value" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.vertical": "vertical" } }, providers: [RADIO_VALUE_ACCESSOR], ngImport: i0, template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, isInline: true, styles: [":host-context(novo-radio-group){margin:0}:host-context(novo-radio-group) novo-button{pointer-events:none;border-radius:0!important}:host-context(novo-radio-group) novo-button.unchecked{opacity:.6}:host-context(novo-radio-group) novo-button[theme=icon]{margin-right:0;border:1px solid #4a89dc}:host-context(novo-radio-group):first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host-context(novo-radio-group):first-child novo-button[theme=icon]{border-right-width:0px!important}:host-context(novo-radio-group):last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host-context(novo-radio-group):last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(novo-radio-group.novo-radio-group-appearance-horizontal) :host:not(:last-child) .novo-radio-button-label{margin-right:1rem}:host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:#4a89dc}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:1.3rem}:host>label .novo-radio-button-label.text-size-xs{font-size:1rem}:host>label .novo-radio-button-label.text-size-sm{font-size:1.2rem}:host>label .novo-radio-button-label.text-size-md{font-size:1.3rem}:host>label .novo-radio-button-label.text-size-lg{font-size:1.6rem}:host>label .novo-radio-button-label.text-size-xl{font-size:2rem}:host>label .novo-radio-button-label.text-size-2xl{font-size:2.6rem}:host>label .novo-radio-button-label.text-size-3xl{font-size:3.2rem}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-black{color:#000}:host>label .novo-radio-button-label.text-color-white{color:#fff}:host>label .novo-radio-button-label.text-color-gray{color:#9e9e9e}:host>label .novo-radio-button-label.text-color-grey{color:#9e9e9e}:host>label .novo-radio-button-label.text-color-offWhite{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-bright{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-light{color:#dbdbdb}:host>label .novo-radio-button-label.text-color-neutral{color:#4f5361}:host>label .novo-radio-button-label.text-color-dark{color:#3d464d}:host>label .novo-radio-button-label.text-color-orange{color:#ff6900}:host>label .novo-radio-button-label.text-color-navigation{color:#202945}:host>label .novo-radio-button-label.text-color-skyBlue{color:#009bdf}:host>label .novo-radio-button-label.text-color-steel{color:#5b6770}:host>label .novo-radio-button-label.text-color-metal{color:#637893}:host>label .novo-radio-button-label.text-color-sand{color:#f4f4f4}:host>label .novo-radio-button-label.text-color-silver{color:#e2e2e2}:host>label .novo-radio-button-label.text-color-stone{color:#bebebe}:host>label .novo-radio-button-label.text-color-ash{color:#a0a0a0}:host>label .novo-radio-button-label.text-color-slate{color:#707070}:host>label .novo-radio-button-label.text-color-onyx{color:#526980}:host>label .novo-radio-button-label.text-color-charcoal{color:#282828}:host>label .novo-radio-button-label.text-color-moonlight{color:#1a242f}:host>label .novo-radio-button-label.text-color-midnight{color:#202945}:host>label .novo-radio-button-label.text-color-darkness{color:#161f27}:host>label .novo-radio-button-label.text-color-navy{color:#0d2d42}:host>label .novo-radio-button-label.text-color-aqua{color:#3bafda}:host>label .novo-radio-button-label.text-color-ocean{color:#4a89dc}:host>label .novo-radio-button-label.text-color-mint{color:#37bc9b}:host>label .novo-radio-button-label.text-color-grass{color:#8cc152}:host>label .novo-radio-button-label.text-color-sunflower{color:#f6b042}:host>label .novo-radio-button-label.text-color-bittersweet{color:#eb6845}:host>label .novo-radio-button-label.text-color-grapefruit{color:#da4453}:host>label .novo-radio-button-label.text-color-carnation{color:#d770ad}:host>label .novo-radio-button-label.text-color-lavender{color:#967adc}:host>label .novo-radio-button-label.text-color-mountain{color:#9678b6}:host>label .novo-radio-button-label.text-color-info{color:#4a89dc}:host>label .novo-radio-button-label.text-color-positive{color:#4a89dc}:host>label .novo-radio-button-label.text-color-success{color:#8cc152}:host>label .novo-radio-button-label.text-color-negative{color:#da4453}:host>label .novo-radio-button-label.text-color-danger{color:#da4453}:host>label .novo-radio-button-label.text-color-error{color:#da4453}:host>label .novo-radio-button-label.text-color-warning{color:#f6b042}:host>label .novo-radio-button-label.text-color-empty{color:#cccdcc}:host>label .novo-radio-button-label.text-color-disabled{color:#bebebe}:host>label .novo-radio-button-label.text-color-background{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-backgroundDark{color:#e2e2e2}:host>label .novo-radio-button-label.text-color-presentation{color:#5b6770}:host>label .novo-radio-button-label.text-color-bullhorn{color:#ff6900}:host>label .novo-radio-button-label.text-color-pulse{color:#3bafda}:host>label .novo-radio-button-label.text-color-company{color:#39d}:host>label .novo-radio-button-label.text-color-candidate{color:#4b7}:host>label .novo-radio-button-label.text-color-lead{color:#a69}:host>label .novo-radio-button-label.text-color-contact{color:#fa4}:host>label .novo-radio-button-label.text-color-clientcontact{color:#fa4}:host>label .novo-radio-button-label.text-color-opportunity{color:#625}:host>label .novo-radio-button-label.text-color-job{color:#b56}:host>label .novo-radio-button-label.text-color-joborder{color:#b56}:host>label .novo-radio-button-label.text-color-submission{color:#a9adbb}:host>label .novo-radio-button-label.text-color-sendout{color:#747884}:host>label .novo-radio-button-label.text-color-placement{color:#0b344f}:host>label .novo-radio-button-label.text-color-note{color:#747884}:host>label .novo-radio-button-label.text-color-contract{color:#454ea0}:host>label .novo-radio-button-label.text-color-task{color:#4f5361}:host>label .novo-radio-button-label.text-color-jobCode{color:#696d79}:host>label .novo-radio-button-label.text-color-earnCode{color:#696d79}:host>label .novo-radio-button-label.text-color-invoiceStatement{color:#696d79}:host>label .novo-radio-button-label.text-color-billableCharge{color:#696d79}:host>label .novo-radio-button-label.text-color-payableCharge{color:#696d79}:host>label .novo-radio-button-label.text-color-user{color:#696d79}:host>label .novo-radio-button-label.text-color-corporateUser{color:#696d79}:host>label .novo-radio-button-label.text-color-distributionList{color:#696d79}:host>label .novo-radio-button-label.text-color-credential{color:#696d79}:host>label .novo-radio-button-label.text-color-person{color:#696d79}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:100}:host>label .novo-radio-button-label.text-weight-thin{font-weight:200}:host>label .novo-radio-button-label.text-weight-light{font-weight:300}:host>label .novo-radio-button-label.text-weight-normal{font-weight:400}:host>label .novo-radio-button-label.text-weight-medium{font-weight:500}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:600}:host>label .novo-radio-button-label.text-weight-bold{font-weight:700}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:800}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:900}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label ::ng-deep i{margin-right:5px;transition:all .2s ease-in-out}:host>label ::ng-deep i.bhi-checkbox-empty,:host>label ::ng-deep i.bhi-radio-empty{color:#d2d2d2}:host>label ::ng-deep i.bhi-checkbox-filled,:host>label ::ng-deep i.bhi-radio-filled{color:#4a89dc}:host>label.disabled{pointer-events:auto;cursor:not-allowed;opacity:.4}:host>label.disabled button[theme].has-icon{opacity:.4}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:#4a89dc;background:#fff;opacity:1}:host novo-button[theme].has-icon.checked{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=black]{color:#fff;background:#000}:host novo-button[theme].has-icon.checked[color=white]{color:#fff;background:#fff}:host novo-button[theme].has-icon.checked[color=gray]{color:#fff;background:#9e9e9e}:host novo-button[theme].has-icon.checked[color=grey]{color:#fff;background:#9e9e9e}:host novo-button[theme].has-icon.checked[color=offWhite]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=bright]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=light]{color:#fff;background:#dbdbdb}:host novo-button[theme].has-icon.checked[color=neutral]{color:#fff;background:#4f5361}:host novo-button[theme].has-icon.checked[color=dark]{color:#fff;background:#3d464d}:host novo-button[theme].has-icon.checked[color=orange]{color:#fff;background:#ff6900}:host novo-button[theme].has-icon.checked[color=navigation]{color:#fff;background:#202945}:host novo-button[theme].has-icon.checked[color=skyBlue]{color:#fff;background:#009bdf}:host novo-button[theme].has-icon.checked[color=steel]{color:#fff;background:#5b6770}:host novo-button[theme].has-icon.checked[color=metal]{color:#fff;background:#637893}:host novo-button[theme].has-icon.checked[color=sand]{color:#fff;background:#f4f4f4}:host novo-button[theme].has-icon.checked[color=silver]{color:#fff;background:#e2e2e2}:host novo-button[theme].has-icon.checked[color=stone]{color:#fff;background:#bebebe}:host novo-button[theme].has-icon.checked[color=ash]{color:#fff;background:#a0a0a0}:host novo-button[theme].has-icon.checked[color=slate]{color:#fff;background:#707070}:host novo-button[theme].has-icon.checked[color=onyx]{color:#fff;background:#526980}:host novo-button[theme].has-icon.checked[color=charcoal]{color:#fff;background:#282828}:host novo-button[theme].has-icon.checked[color=moonlight]{color:#fff;background:#1a242f}:host novo-button[theme].has-icon.checked[color=midnight]{color:#fff;background:#202945}:host novo-button[theme].has-icon.checked[color=darkness]{color:#fff;background:#161f27}:host novo-button[theme].has-icon.checked[color=navy]{color:#fff;background:#0d2d42}:host novo-button[theme].has-icon.checked[color=aqua]{color:#fff;background:#3bafda}:host novo-button[theme].has-icon.checked[color=ocean]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=mint]{color:#fff;background:#37bc9b}:host novo-button[theme].has-icon.checked[color=grass]{color:#fff;background:#8cc152}:host novo-button[theme].has-icon.checked[color=sunflower]{color:#fff;background:#f6b042}:host novo-button[theme].has-icon.checked[color=bittersweet]{color:#fff;background:#eb6845}:host novo-button[theme].has-icon.checked[color=grapefruit]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=carnation]{color:#fff;background:#d770ad}:host novo-button[theme].has-icon.checked[color=lavender]{color:#fff;background:#967adc}:host novo-button[theme].has-icon.checked[color=mountain]{color:#fff;background:#9678b6}:host novo-button[theme].has-icon.checked[color=info]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=positive]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=success]{color:#fff;background:#8cc152}:host novo-button[theme].has-icon.checked[color=negative]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=danger]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=error]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=warning]{color:#fff;background:#f6b042}:host novo-button[theme].has-icon.checked[color=empty]{color:#fff;background:#cccdcc}:host novo-button[theme].has-icon.checked[color=disabled]{color:#fff;background:#bebebe}:host novo-button[theme].has-icon.checked[color=background]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=backgroundDark]{color:#fff;background:#e2e2e2}:host novo-button[theme].has-icon.checked[color=presentation]{color:#fff;background:#5b6770}:host novo-button[theme].has-icon.checked[color=bullhorn]{color:#fff;background:#ff6900}:host novo-button[theme].has-icon.checked[color=pulse]{color:#fff;background:#3bafda}:host novo-button[theme].has-icon.checked[color=company]{color:#fff;background:#39d}:host novo-button[theme].has-icon.checked[color=candidate]{color:#fff;background:#4b7}:host novo-button[theme].has-icon.checked[color=lead]{color:#fff;background:#a69}:host novo-button[theme].has-icon.checked[color=contact]{color:#fff;background:#fa4}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:#fff;background:#fa4}:host novo-button[theme].has-icon.checked[color=opportunity]{color:#fff;background:#625}:host novo-button[theme].has-icon.checked[color=job]{color:#fff;background:#b56}:host novo-button[theme].has-icon.checked[color=joborder]{color:#fff;background:#b56}:host novo-button[theme].has-icon.checked[color=submission]{color:#fff;background:#a9adbb}:host novo-button[theme].has-icon.checked[color=sendout]{color:#fff;background:#747884}:host novo-button[theme].has-icon.checked[color=placement]{color:#fff;background:#0b344f}:host novo-button[theme].has-icon.checked[color=note]{color:#fff;background:#747884}:host novo-button[theme].has-icon.checked[color=contract]{color:#fff;background:#454ea0}:host novo-button[theme].has-icon.checked[color=task]{color:#fff;background:#4f5361}:host novo-button[theme].has-icon.checked[color=jobCode]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=earnCode]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=invoiceStatement]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=billableCharge]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=payableCharge]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=user]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=corporateUser]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=distributionList]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=credential]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=person]{color:#fff;background:#696d79}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-radio', providers: [RADIO_VALUE_ACCESSOR], template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, host: {
                        '[class.vertical]': 'vertical',
                    }, standalone: false, styles: [":host-context(novo-radio-group){margin:0}:host-context(novo-radio-group) novo-button{pointer-events:none;border-radius:0!important}:host-context(novo-radio-group) novo-button.unchecked{opacity:.6}:host-context(novo-radio-group) novo-button[theme=icon]{margin-right:0;border:1px solid #4a89dc}:host-context(novo-radio-group):first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host-context(novo-radio-group):first-child novo-button[theme=icon]{border-right-width:0px!important}:host-context(novo-radio-group):last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host-context(novo-radio-group):last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(novo-radio-group.novo-radio-group-appearance-horizontal) :host:not(:last-child) .novo-radio-button-label{margin-right:1rem}:host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:#4a89dc}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:1.3rem}:host>label .novo-radio-button-label.text-size-xs{font-size:1rem}:host>label .novo-radio-button-label.text-size-sm{font-size:1.2rem}:host>label .novo-radio-button-label.text-size-md{font-size:1.3rem}:host>label .novo-radio-button-label.text-size-lg{font-size:1.6rem}:host>label .novo-radio-button-label.text-size-xl{font-size:2rem}:host>label .novo-radio-button-label.text-size-2xl{font-size:2.6rem}:host>label .novo-radio-button-label.text-size-3xl{font-size:3.2rem}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-black{color:#000}:host>label .novo-radio-button-label.text-color-white{color:#fff}:host>label .novo-radio-button-label.text-color-gray{color:#9e9e9e}:host>label .novo-radio-button-label.text-color-grey{color:#9e9e9e}:host>label .novo-radio-button-label.text-color-offWhite{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-bright{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-light{color:#dbdbdb}:host>label .novo-radio-button-label.text-color-neutral{color:#4f5361}:host>label .novo-radio-button-label.text-color-dark{color:#3d464d}:host>label .novo-radio-button-label.text-color-orange{color:#ff6900}:host>label .novo-radio-button-label.text-color-navigation{color:#202945}:host>label .novo-radio-button-label.text-color-skyBlue{color:#009bdf}:host>label .novo-radio-button-label.text-color-steel{color:#5b6770}:host>label .novo-radio-button-label.text-color-metal{color:#637893}:host>label .novo-radio-button-label.text-color-sand{color:#f4f4f4}:host>label .novo-radio-button-label.text-color-silver{color:#e2e2e2}:host>label .novo-radio-button-label.text-color-stone{color:#bebebe}:host>label .novo-radio-button-label.text-color-ash{color:#a0a0a0}:host>label .novo-radio-button-label.text-color-slate{color:#707070}:host>label .novo-radio-button-label.text-color-onyx{color:#526980}:host>label .novo-radio-button-label.text-color-charcoal{color:#282828}:host>label .novo-radio-button-label.text-color-moonlight{color:#1a242f}:host>label .novo-radio-button-label.text-color-midnight{color:#202945}:host>label .novo-radio-button-label.text-color-darkness{color:#161f27}:host>label .novo-radio-button-label.text-color-navy{color:#0d2d42}:host>label .novo-radio-button-label.text-color-aqua{color:#3bafda}:host>label .novo-radio-button-label.text-color-ocean{color:#4a89dc}:host>label .novo-radio-button-label.text-color-mint{color:#37bc9b}:host>label .novo-radio-button-label.text-color-grass{color:#8cc152}:host>label .novo-radio-button-label.text-color-sunflower{color:#f6b042}:host>label .novo-radio-button-label.text-color-bittersweet{color:#eb6845}:host>label .novo-radio-button-label.text-color-grapefruit{color:#da4453}:host>label .novo-radio-button-label.text-color-carnation{color:#d770ad}:host>label .novo-radio-button-label.text-color-lavender{color:#967adc}:host>label .novo-radio-button-label.text-color-mountain{color:#9678b6}:host>label .novo-radio-button-label.text-color-info{color:#4a89dc}:host>label .novo-radio-button-label.text-color-positive{color:#4a89dc}:host>label .novo-radio-button-label.text-color-success{color:#8cc152}:host>label .novo-radio-button-label.text-color-negative{color:#da4453}:host>label .novo-radio-button-label.text-color-danger{color:#da4453}:host>label .novo-radio-button-label.text-color-error{color:#da4453}:host>label .novo-radio-button-label.text-color-warning{color:#f6b042}:host>label .novo-radio-button-label.text-color-empty{color:#cccdcc}:host>label .novo-radio-button-label.text-color-disabled{color:#bebebe}:host>label .novo-radio-button-label.text-color-background{color:#f7f7f7}:host>label .novo-radio-button-label.text-color-backgroundDark{color:#e2e2e2}:host>label .novo-radio-button-label.text-color-presentation{color:#5b6770}:host>label .novo-radio-button-label.text-color-bullhorn{color:#ff6900}:host>label .novo-radio-button-label.text-color-pulse{color:#3bafda}:host>label .novo-radio-button-label.text-color-company{color:#39d}:host>label .novo-radio-button-label.text-color-candidate{color:#4b7}:host>label .novo-radio-button-label.text-color-lead{color:#a69}:host>label .novo-radio-button-label.text-color-contact{color:#fa4}:host>label .novo-radio-button-label.text-color-clientcontact{color:#fa4}:host>label .novo-radio-button-label.text-color-opportunity{color:#625}:host>label .novo-radio-button-label.text-color-job{color:#b56}:host>label .novo-radio-button-label.text-color-joborder{color:#b56}:host>label .novo-radio-button-label.text-color-submission{color:#a9adbb}:host>label .novo-radio-button-label.text-color-sendout{color:#747884}:host>label .novo-radio-button-label.text-color-placement{color:#0b344f}:host>label .novo-radio-button-label.text-color-note{color:#747884}:host>label .novo-radio-button-label.text-color-contract{color:#454ea0}:host>label .novo-radio-button-label.text-color-task{color:#4f5361}:host>label .novo-radio-button-label.text-color-jobCode{color:#696d79}:host>label .novo-radio-button-label.text-color-earnCode{color:#696d79}:host>label .novo-radio-button-label.text-color-invoiceStatement{color:#696d79}:host>label .novo-radio-button-label.text-color-billableCharge{color:#696d79}:host>label .novo-radio-button-label.text-color-payableCharge{color:#696d79}:host>label .novo-radio-button-label.text-color-user{color:#696d79}:host>label .novo-radio-button-label.text-color-corporateUser{color:#696d79}:host>label .novo-radio-button-label.text-color-distributionList{color:#696d79}:host>label .novo-radio-button-label.text-color-credential{color:#696d79}:host>label .novo-radio-button-label.text-color-person{color:#696d79}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:100}:host>label .novo-radio-button-label.text-weight-thin{font-weight:200}:host>label .novo-radio-button-label.text-weight-light{font-weight:300}:host>label .novo-radio-button-label.text-weight-normal{font-weight:400}:host>label .novo-radio-button-label.text-weight-medium{font-weight:500}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:600}:host>label .novo-radio-button-label.text-weight-bold{font-weight:700}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:800}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:900}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label ::ng-deep i{margin-right:5px;transition:all .2s ease-in-out}:host>label ::ng-deep i.bhi-checkbox-empty,:host>label ::ng-deep i.bhi-radio-empty{color:#d2d2d2}:host>label ::ng-deep i.bhi-checkbox-filled,:host>label ::ng-deep i.bhi-radio-filled{color:#4a89dc}:host>label.disabled{pointer-events:auto;cursor:not-allowed;opacity:.4}:host>label.disabled button[theme].has-icon{opacity:.4}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:#4a89dc;background:#fff;opacity:1}:host novo-button[theme].has-icon.checked{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=black]{color:#fff;background:#000}:host novo-button[theme].has-icon.checked[color=white]{color:#fff;background:#fff}:host novo-button[theme].has-icon.checked[color=gray]{color:#fff;background:#9e9e9e}:host novo-button[theme].has-icon.checked[color=grey]{color:#fff;background:#9e9e9e}:host novo-button[theme].has-icon.checked[color=offWhite]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=bright]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=light]{color:#fff;background:#dbdbdb}:host novo-button[theme].has-icon.checked[color=neutral]{color:#fff;background:#4f5361}:host novo-button[theme].has-icon.checked[color=dark]{color:#fff;background:#3d464d}:host novo-button[theme].has-icon.checked[color=orange]{color:#fff;background:#ff6900}:host novo-button[theme].has-icon.checked[color=navigation]{color:#fff;background:#202945}:host novo-button[theme].has-icon.checked[color=skyBlue]{color:#fff;background:#009bdf}:host novo-button[theme].has-icon.checked[color=steel]{color:#fff;background:#5b6770}:host novo-button[theme].has-icon.checked[color=metal]{color:#fff;background:#637893}:host novo-button[theme].has-icon.checked[color=sand]{color:#fff;background:#f4f4f4}:host novo-button[theme].has-icon.checked[color=silver]{color:#fff;background:#e2e2e2}:host novo-button[theme].has-icon.checked[color=stone]{color:#fff;background:#bebebe}:host novo-button[theme].has-icon.checked[color=ash]{color:#fff;background:#a0a0a0}:host novo-button[theme].has-icon.checked[color=slate]{color:#fff;background:#707070}:host novo-button[theme].has-icon.checked[color=onyx]{color:#fff;background:#526980}:host novo-button[theme].has-icon.checked[color=charcoal]{color:#fff;background:#282828}:host novo-button[theme].has-icon.checked[color=moonlight]{color:#fff;background:#1a242f}:host novo-button[theme].has-icon.checked[color=midnight]{color:#fff;background:#202945}:host novo-button[theme].has-icon.checked[color=darkness]{color:#fff;background:#161f27}:host novo-button[theme].has-icon.checked[color=navy]{color:#fff;background:#0d2d42}:host novo-button[theme].has-icon.checked[color=aqua]{color:#fff;background:#3bafda}:host novo-button[theme].has-icon.checked[color=ocean]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=mint]{color:#fff;background:#37bc9b}:host novo-button[theme].has-icon.checked[color=grass]{color:#fff;background:#8cc152}:host novo-button[theme].has-icon.checked[color=sunflower]{color:#fff;background:#f6b042}:host novo-button[theme].has-icon.checked[color=bittersweet]{color:#fff;background:#eb6845}:host novo-button[theme].has-icon.checked[color=grapefruit]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=carnation]{color:#fff;background:#d770ad}:host novo-button[theme].has-icon.checked[color=lavender]{color:#fff;background:#967adc}:host novo-button[theme].has-icon.checked[color=mountain]{color:#fff;background:#9678b6}:host novo-button[theme].has-icon.checked[color=info]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=positive]{color:#fff;background:#4a89dc}:host novo-button[theme].has-icon.checked[color=success]{color:#fff;background:#8cc152}:host novo-button[theme].has-icon.checked[color=negative]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=danger]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=error]{color:#fff;background:#da4453}:host novo-button[theme].has-icon.checked[color=warning]{color:#fff;background:#f6b042}:host novo-button[theme].has-icon.checked[color=empty]{color:#fff;background:#cccdcc}:host novo-button[theme].has-icon.checked[color=disabled]{color:#fff;background:#bebebe}:host novo-button[theme].has-icon.checked[color=background]{color:#fff;background:#f7f7f7}:host novo-button[theme].has-icon.checked[color=backgroundDark]{color:#fff;background:#e2e2e2}:host novo-button[theme].has-icon.checked[color=presentation]{color:#fff;background:#5b6770}:host novo-button[theme].has-icon.checked[color=bullhorn]{color:#fff;background:#ff6900}:host novo-button[theme].has-icon.checked[color=pulse]{color:#fff;background:#3bafda}:host novo-button[theme].has-icon.checked[color=company]{color:#fff;background:#39d}:host novo-button[theme].has-icon.checked[color=candidate]{color:#fff;background:#4b7}:host novo-button[theme].has-icon.checked[color=lead]{color:#fff;background:#a69}:host novo-button[theme].has-icon.checked[color=contact]{color:#fff;background:#fa4}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:#fff;background:#fa4}:host novo-button[theme].has-icon.checked[color=opportunity]{color:#fff;background:#625}:host novo-button[theme].has-icon.checked[color=job]{color:#fff;background:#b56}:host novo-button[theme].has-icon.checked[color=joborder]{color:#fff;background:#b56}:host novo-button[theme].has-icon.checked[color=submission]{color:#fff;background:#a9adbb}:host novo-button[theme].has-icon.checked[color=sendout]{color:#fff;background:#747884}:host novo-button[theme].has-icon.checked[color=placement]{color:#fff;background:#0b344f}:host novo-button[theme].has-icon.checked[color=note]{color:#fff;background:#747884}:host novo-button[theme].has-icon.checked[color=contract]{color:#fff;background:#454ea0}:host novo-button[theme].has-icon.checked[color=task]{color:#fff;background:#4f5361}:host novo-button[theme].has-icon.checked[color=jobCode]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=earnCode]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=invoiceStatement]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=billableCharge]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=payableCharge]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=user]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=corporateUser]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=distributionList]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=credential]{color:#fff;background:#696d79}:host novo-button[theme].has-icon.checked[color=person]{color:#fff;background:#696d79}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_RADIO_GROUP]
                }, {
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], vertical: [{
                type: Input
            }], label: [{
                type: Input
            }], button: [{
                type: Input
            }], theme: [{
                type: Input
            }], size: [{
                type: Input
            }], icon: [{
                type: Input
            }], color: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIOGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioGroup),
    multi: true,
};
// Boilerplate for applying mixins
class NovoRadioGroupBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoRadioGroupMixins = mixinErrorState(NovoRadioGroupBase);
class NovoRadioGroup extends NovoRadioGroupMixins {
    constructor() {
        super(...arguments);
        this._uniqueId = `novo-radio-group-${++nextId}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.controlType = 'radio-group';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this._name = this._uniqueId;
        this._value = false;
        this._required = false;
        this._disabled = false;
        this._appearance = 'horizontal';
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateRadioButtonAppearance();
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            this._updateSelectedRadioFromValue();
            this.onChangeCallback(this._value);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (this._name !== value) {
            this._updateRadioButtonNames();
        }
    }
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._updateRadioButtonDisabled();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /** Implemented as part of NovoFieldControl. */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
    }
    get selected() {
        return this._selected;
    }
    ngAfterContentInit() {
        this._updateRadioButtonAppearance();
        this._updateRadioButtonNames();
        this._updateSelectedRadioFromValue();
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _updateRadioButtonAppearance() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.vertical = this.appearance === 'vertical';
            });
        }
    }
    _updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.name = this.name;
            });
        }
    }
    _updateRadioButtonDisabled() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.disabled = this.disabled;
            });
        }
    }
    _updateSelectedRadioFromValue() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
    /** Whether any radio buttons has focus. */
    get focused() {
        // todo: implement this.
        return false;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return this.value === null;
    }
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event) {
        this.focus();
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioGroup, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoRadioGroup, isStandalone: false, selector: "novo-radio-group", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", appearance: "appearance", value: "value", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { change: "change", blur: "blur" }, host: { properties: { "class.novo-radio-group-appearance-horizontal": "appearance==\"horizontal\"", "class.novo-radio-group-appearance-vertical": "appearance==\"vertical\"", "class.disabled": "this.disabled" }, classAttribute: "novo-radio-group" }, providers: [
            RADIOGROUP_VALUE_ACCESSOR,
            { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
            { provide: NovoFieldControl, useExisting: NovoRadioGroup },
        ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(() => NovoRadioElement), descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex}:host.novo-radio-group-appearance-horizontal novo-radio:not(:last-child) .novo-radio-button-label{margin-right:1rem}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}:host>novo-radio{margin:0}:host>novo-radio novo-button{pointer-events:none;border-radius:0!important}:host>novo-radio novo-button.unchecked{opacity:.6}:host>novo-radio novo-button[theme=icon]{margin-right:0;border:1px solid #4a89dc}:host>novo-radio:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host>novo-radio:first-child novo-button[theme=icon]{border-right-width:0px!important}:host>novo-radio:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host>novo-radio:last-child novo-button[theme=icon]{border-left-width:0px!important}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioGroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-radio-group', providers: [
                        RADIOGROUP_VALUE_ACCESSOR,
                        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
                        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
                    ], template: '<ng-content></ng-content>', host: {
                        class: 'novo-radio-group',
                        '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
                        '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
                    }, standalone: false, styles: [":host{display:flex}:host.novo-radio-group-appearance-horizontal novo-radio:not(:last-child) .novo-radio-button-label{margin-right:1rem}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}:host>novo-radio{margin:0}:host>novo-radio novo-button{pointer-events:none;border-radius:0!important}:host>novo-radio novo-button.unchecked{opacity:.6}:host>novo-radio novo-button[theme=icon]{margin-right:0;border:1px solid #4a89dc}:host>novo-radio:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host>novo-radio:first-child novo-button[theme=icon]{border-right-width:0px!important}:host>novo-radio:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host>novo-radio:last-child novo-button[theme=icon]{border-left-width:0px!important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], _radios: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoRadioElement), { descendants: true }]
            }], appearance: [{
                type: Input
            }], value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });

// NG2
class NovoRadioModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioModule, declarations: [NovoRadioElement, NovoRadioGroup], imports: [CommonModule, NovoButtonModule], exports: [NovoRadioElement, NovoRadioGroup] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioModule, imports: [CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoRadioElement, NovoRadioGroup],
                    exports: [NovoRadioElement, NovoRadioGroup],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NOVO_RADIO_GROUP, NovoRadioElement, NovoRadioGroup, NovoRadioModule };
//# sourceMappingURL=novo-elements-elements-radio.mjs.map
