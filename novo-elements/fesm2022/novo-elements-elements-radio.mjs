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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioElement, deps: [{ token: NOVO_RADIO_GROUP, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoRadioElement, isStandalone: false, selector: "novo-radio", inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", disabled: "disabled", checked: "checked", value: "value" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.vertical": "vertical" } }, providers: [RADIO_VALUE_ACCESSOR], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host-context(novo-radio-group){margin:0}:host-context(novo-radio-group) novo-button{pointer-events:none;border-radius:0!important}:host-context(novo-radio-group) novo-button.unchecked{opacity:.6}:host-context(novo-radio-group) novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-positive)}:host-context(novo-radio-group):first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host-context(novo-radio-group):first-child novo-button[theme=icon]{border-right-width:0px!important}:host-context(novo-radio-group):last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host-context(novo-radio-group):last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(novo-radio-group.novo-radio-group-appearance-horizontal) :host:not(:last-child) .novo-radio-button-label{margin-right:var(--spacing-md)}:host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:var(--color-positive)}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:var(--font-size-body)}:host>label .novo-radio-button-label.text-size-xs{font-size:var(--font-size-xs)}:host>label .novo-radio-button-label.text-size-sm{font-size:var(--font-size-sm)}:host>label .novo-radio-button-label.text-size-md{font-size:var(--font-size-md)}:host>label .novo-radio-button-label.text-size-lg{font-size:var(--font-size-lg)}:host>label .novo-radio-button-label.text-size-xl{font-size:var(--font-size-xl)}:host>label .novo-radio-button-label.text-size-2xl{font-size:var(--font-size-2xl)}:host>label .novo-radio-button-label.text-size-3xl{font-size:var(--font-size-3xl)}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-black{color:var(--color-black)}:host>label .novo-radio-button-label.text-color-white{color:var(--color-white)}:host>label .novo-radio-button-label.text-color-gray{color:var(--color-gray)}:host>label .novo-radio-button-label.text-color-grey{color:var(--color-grey)}:host>label .novo-radio-button-label.text-color-offWhite{color:var(--color-off-white)}:host>label .novo-radio-button-label.text-color-bright{color:var(--color-bright)}:host>label .novo-radio-button-label.text-color-light{color:var(--color-light)}:host>label .novo-radio-button-label.text-color-neutral{color:var(--color-neutral)}:host>label .novo-radio-button-label.text-color-dark{color:var(--color-dark)}:host>label .novo-radio-button-label.text-color-orange{color:var(--color-orange)}:host>label .novo-radio-button-label.text-color-navigation{color:var(--color-navigation)}:host>label .novo-radio-button-label.text-color-skyBlue{color:var(--color-sky-blue)}:host>label .novo-radio-button-label.text-color-steel{color:var(--color-steel)}:host>label .novo-radio-button-label.text-color-metal{color:var(--color-metal)}:host>label .novo-radio-button-label.text-color-sand{color:var(--color-sand)}:host>label .novo-radio-button-label.text-color-silver{color:var(--color-silver)}:host>label .novo-radio-button-label.text-color-stone{color:var(--color-stone)}:host>label .novo-radio-button-label.text-color-ash{color:var(--color-ash)}:host>label .novo-radio-button-label.text-color-anonymous{color:var(--color-anonymous)}:host>label .novo-radio-button-label.text-color-slate{color:var(--color-slate)}:host>label .novo-radio-button-label.text-color-onyx{color:var(--color-onyx)}:host>label .novo-radio-button-label.text-color-charcoal{color:var(--color-charcoal)}:host>label .novo-radio-button-label.text-color-moonlight{color:var(--color-moonlight)}:host>label .novo-radio-button-label.text-color-midnight{color:var(--color-midnight)}:host>label .novo-radio-button-label.text-color-darkness{color:var(--color-darkness)}:host>label .novo-radio-button-label.text-color-navy{color:var(--color-navy)}:host>label .novo-radio-button-label.text-color-aqua{color:var(--color-aqua)}:host>label .novo-radio-button-label.text-color-ocean{color:var(--color-ocean)}:host>label .novo-radio-button-label.text-color-mint{color:var(--color-mint)}:host>label .novo-radio-button-label.text-color-grass{color:var(--color-grass)}:host>label .novo-radio-button-label.text-color-sunflower{color:var(--color-sunflower)}:host>label .novo-radio-button-label.text-color-bittersweet{color:var(--color-bittersweet)}:host>label .novo-radio-button-label.text-color-grapefruit{color:var(--color-grapefruit)}:host>label .novo-radio-button-label.text-color-carnation{color:var(--color-carnation)}:host>label .novo-radio-button-label.text-color-lavender{color:var(--color-lavender)}:host>label .novo-radio-button-label.text-color-mountain{color:var(--color-mountain)}:host>label .novo-radio-button-label.text-color-info{color:var(--color-info)}:host>label .novo-radio-button-label.text-color-positive{color:var(--color-positive)}:host>label .novo-radio-button-label.text-color-success{color:var(--color-success)}:host>label .novo-radio-button-label.text-color-negative{color:var(--color-negative)}:host>label .novo-radio-button-label.text-color-danger{color:var(--color-danger)}:host>label .novo-radio-button-label.text-color-error{color:var(--color-error)}:host>label .novo-radio-button-label.text-color-warning{color:var(--color-warning)}:host>label .novo-radio-button-label.text-color-empty{color:var(--color-empty)}:host>label .novo-radio-button-label.text-color-disabled{color:var(--color-disabled)}:host>label .novo-radio-button-label.text-color-background{color:var(--color-background)}:host>label .novo-radio-button-label.text-color-backgroundDark{color:var(--color-background-dark)}:host>label .novo-radio-button-label.text-color-border{color:var(--color-border)}:host>label .novo-radio-button-label.text-color-border2{color:var(--color-border2)}:host>label .novo-radio-button-label.text-color-text{color:var(--color-text)}:host>label .novo-radio-button-label.text-color-presentation{color:var(--color-presentation)}:host>label .novo-radio-button-label.text-color-bullhorn{color:var(--color-bullhorn)}:host>label .novo-radio-button-label.text-color-pulse{color:var(--color-pulse)}:host>label .novo-radio-button-label.text-color-fastFind{color:var(--color-fast-find)}:host>label .novo-radio-button-label.text-color-toast{color:var(--color-toast)}:host>label .novo-radio-button-label.text-color-company{color:var(--color-company)}:host>label .novo-radio-button-label.text-color-candidate{color:var(--color-candidate)}:host>label .novo-radio-button-label.text-color-lead{color:var(--color-lead)}:host>label .novo-radio-button-label.text-color-contact{color:var(--color-contact)}:host>label .novo-radio-button-label.text-color-clientcontact{color:var(--color-clientcontact)}:host>label .novo-radio-button-label.text-color-opportunity{color:var(--color-opportunity)}:host>label .novo-radio-button-label.text-color-job{color:var(--color-job)}:host>label .novo-radio-button-label.text-color-joborder{color:var(--color-joborder)}:host>label .novo-radio-button-label.text-color-submission{color:var(--color-submission)}:host>label .novo-radio-button-label.text-color-sendout{color:var(--color-sendout)}:host>label .novo-radio-button-label.text-color-placement{color:var(--color-placement)}:host>label .novo-radio-button-label.text-color-note{color:var(--color-note)}:host>label .novo-radio-button-label.text-color-contract{color:var(--color-contract)}:host>label .novo-radio-button-label.text-color-task{color:var(--color-task)}:host>label .novo-radio-button-label.text-color-jobCode{color:var(--color-job-code)}:host>label .novo-radio-button-label.text-color-earnCode{color:var(--color-earn-code)}:host>label .novo-radio-button-label.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>label .novo-radio-button-label.text-color-billableCharge{color:var(--color-billable-charge)}:host>label .novo-radio-button-label.text-color-payableCharge{color:var(--color-payable-charge)}:host>label .novo-radio-button-label.text-color-user{color:var(--color-user)}:host>label .novo-radio-button-label.text-color-corporateUser{color:var(--color-corporate-user)}:host>label .novo-radio-button-label.text-color-distributionList{color:var(--color-distribution-list)}:host>label .novo-radio-button-label.text-color-credential{color:var(--color-credential)}:host>label .novo-radio-button-label.text-color-person{color:var(--color-person)}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>label .novo-radio-button-label.text-weight-thin{font-weight:var(--font-weight-thin)}:host>label .novo-radio-button-label.text-weight-light{font-weight:var(--font-weight-light)}:host>label .novo-radio-button-label.text-weight-normal{font-weight:var(--font-weight-normal)}:host>label .novo-radio-button-label.text-weight-medium{font-weight:var(--font-weight-medium)}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>label .novo-radio-button-label.text-weight-bold{font-weight:var(--font-weight-bold)}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label ::ng-deep i{margin-right:5px;transition:all .2s ease-in-out}:host>label ::ng-deep i.bhi-checkbox-empty,:host>label ::ng-deep i.bhi-radio-empty{color:#d2d2d2}:host>label ::ng-deep i.bhi-checkbox-filled,:host>label ::ng-deep i.bhi-radio-filled{color:var(--color-positive)}:host>label.disabled{pointer-events:auto;cursor:not-allowed;opacity:.4}:host>label.disabled button[theme].has-icon{opacity:.4}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:var(--color-positive);background:#fff;opacity:1}:host novo-button[theme].has-icon.checked{color:#fff;background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=border-default]{color:#fff}:host novo-button[theme].has-icon.checked[color=black]{color:#fff;background:var(--color-black)}:host novo-button[theme].has-icon.checked[color=white]{color:#fff;background:var(--color-white)}:host novo-button[theme].has-icon.checked[color=gray]{color:#fff;background:var(--color-gray)}:host novo-button[theme].has-icon.checked[color=grey]{color:#fff;background:var(--color-grey)}:host novo-button[theme].has-icon.checked[color=offWhite]{color:#fff;background:var(--color-off-white)}:host novo-button[theme].has-icon.checked[color=bright]{color:#fff;background:var(--color-bright)}:host novo-button[theme].has-icon.checked[color=light]{color:#fff;background:var(--color-light)}:host novo-button[theme].has-icon.checked[color=neutral]{color:#fff;background:var(--color-neutral)}:host novo-button[theme].has-icon.checked[color=dark]{color:#fff;background:var(--color-dark)}:host novo-button[theme].has-icon.checked[color=orange]{color:#fff;background:var(--color-orange)}:host novo-button[theme].has-icon.checked[color=navigation]{color:#fff;background:var(--color-navigation)}:host novo-button[theme].has-icon.checked[color=skyBlue]{color:#fff;background:var(--color-sky-blue)}:host novo-button[theme].has-icon.checked[color=steel]{color:#fff;background:var(--color-steel)}:host novo-button[theme].has-icon.checked[color=metal]{color:#fff;background:var(--color-metal)}:host novo-button[theme].has-icon.checked[color=sand]{color:#fff;background:var(--color-sand)}:host novo-button[theme].has-icon.checked[color=silver]{color:#fff;background:var(--color-silver)}:host novo-button[theme].has-icon.checked[color=stone]{color:#fff;background:var(--color-stone)}:host novo-button[theme].has-icon.checked[color=ash]{color:#fff;background:var(--color-ash)}:host novo-button[theme].has-icon.checked[color=anonymous]{color:#fff;background:var(--color-anonymous)}:host novo-button[theme].has-icon.checked[color=slate]{color:#fff;background:var(--color-slate)}:host novo-button[theme].has-icon.checked[color=onyx]{color:#fff;background:var(--color-onyx)}:host novo-button[theme].has-icon.checked[color=charcoal]{color:#fff;background:var(--color-charcoal)}:host novo-button[theme].has-icon.checked[color=moonlight]{color:#fff;background:var(--color-moonlight)}:host novo-button[theme].has-icon.checked[color=midnight]{color:#fff;background:var(--color-midnight)}:host novo-button[theme].has-icon.checked[color=darkness]{color:#fff;background:var(--color-darkness)}:host novo-button[theme].has-icon.checked[color=navy]{color:#fff;background:var(--color-navy)}:host novo-button[theme].has-icon.checked[color=aqua]{color:#fff;background:var(--color-aqua)}:host novo-button[theme].has-icon.checked[color=ocean]{color:#fff;background:var(--color-ocean)}:host novo-button[theme].has-icon.checked[color=mint]{color:#fff;background:var(--color-mint)}:host novo-button[theme].has-icon.checked[color=grass]{color:#fff;background:var(--color-grass)}:host novo-button[theme].has-icon.checked[color=sunflower]{color:#fff;background:var(--color-sunflower)}:host novo-button[theme].has-icon.checked[color=bittersweet]{color:#fff;background:var(--color-bittersweet)}:host novo-button[theme].has-icon.checked[color=grapefruit]{color:#fff;background:var(--color-grapefruit)}:host novo-button[theme].has-icon.checked[color=carnation]{color:#fff;background:var(--color-carnation)}:host novo-button[theme].has-icon.checked[color=lavender]{color:#fff;background:var(--color-lavender)}:host novo-button[theme].has-icon.checked[color=mountain]{color:#fff;background:var(--color-mountain)}:host novo-button[theme].has-icon.checked[color=info]{color:#fff;background:var(--color-info)}:host novo-button[theme].has-icon.checked[color=positive]{color:#fff;background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=success]{color:#fff;background:var(--color-success)}:host novo-button[theme].has-icon.checked[color=negative]{color:#fff;background:var(--color-negative)}:host novo-button[theme].has-icon.checked[color=danger]{color:#fff;background:var(--color-danger)}:host novo-button[theme].has-icon.checked[color=error]{color:#fff;background:var(--color-error)}:host novo-button[theme].has-icon.checked[color=warning]{color:#fff;background:var(--color-warning)}:host novo-button[theme].has-icon.checked[color=empty]{color:#fff;background:var(--color-empty)}:host novo-button[theme].has-icon.checked[color=disabled]{color:#fff;background:var(--color-disabled)}:host novo-button[theme].has-icon.checked[color=background]{color:#fff;background:var(--color-background)}:host novo-button[theme].has-icon.checked[color=backgroundDark]{color:#fff;background:var(--color-background-dark)}:host novo-button[theme].has-icon.checked[color=border]{color:#fff;background:var(--color-border)}:host novo-button[theme].has-icon.checked[color=border2]{color:#fff;background:var(--color-border2)}:host novo-button[theme].has-icon.checked[color=text]{color:#fff;background:var(--color-text)}:host novo-button[theme].has-icon.checked[color=presentation]{color:#fff;background:var(--color-presentation)}:host novo-button[theme].has-icon.checked[color=bullhorn]{color:#fff;background:var(--color-bullhorn)}:host novo-button[theme].has-icon.checked[color=pulse]{color:#fff;background:var(--color-pulse)}:host novo-button[theme].has-icon.checked[color=fastFind]{color:#fff;background:var(--color-fast-find)}:host novo-button[theme].has-icon.checked[color=toast]{color:#fff;background:var(--color-toast)}:host novo-button[theme].has-icon.checked[color=company]{color:#fff;background:var(--color-company)}:host novo-button[theme].has-icon.checked[color=candidate]{color:#fff;background:var(--color-candidate)}:host novo-button[theme].has-icon.checked[color=lead]{color:#fff;background:var(--color-lead)}:host novo-button[theme].has-icon.checked[color=contact]{color:#fff;background:var(--color-contact)}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:#fff;background:var(--color-clientcontact)}:host novo-button[theme].has-icon.checked[color=opportunity]{color:#fff;background:var(--color-opportunity)}:host novo-button[theme].has-icon.checked[color=job]{color:#fff;background:var(--color-job)}:host novo-button[theme].has-icon.checked[color=joborder]{color:#fff;background:var(--color-joborder)}:host novo-button[theme].has-icon.checked[color=submission]{color:#fff;background:var(--color-submission)}:host novo-button[theme].has-icon.checked[color=sendout]{color:#fff;background:var(--color-sendout)}:host novo-button[theme].has-icon.checked[color=placement]{color:#fff;background:var(--color-placement)}:host novo-button[theme].has-icon.checked[color=note]{color:#fff;background:var(--color-note)}:host novo-button[theme].has-icon.checked[color=contract]{color:#fff;background:var(--color-contract)}:host novo-button[theme].has-icon.checked[color=task]{color:#fff;background:var(--color-task)}:host novo-button[theme].has-icon.checked[color=jobCode]{color:#fff;background:var(--color-job-code)}:host novo-button[theme].has-icon.checked[color=earnCode]{color:#fff;background:var(--color-earn-code)}:host novo-button[theme].has-icon.checked[color=invoiceStatement]{color:#fff;background:var(--color-invoice-statement)}:host novo-button[theme].has-icon.checked[color=billableCharge]{color:#fff;background:var(--color-billable-charge)}:host novo-button[theme].has-icon.checked[color=payableCharge]{color:#fff;background:var(--color-payable-charge)}:host novo-button[theme].has-icon.checked[color=user]{color:#fff;background:var(--color-user)}:host novo-button[theme].has-icon.checked[color=corporateUser]{color:#fff;background:var(--color-corporate-user)}:host novo-button[theme].has-icon.checked[color=distributionList]{color:#fff;background:var(--color-distribution-list)}:host novo-button[theme].has-icon.checked[color=credential]{color:#fff;background:var(--color-credential)}:host novo-button[theme].has-icon.checked[color=person]{color:#fff;background:var(--color-person)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioElement, decorators: [{
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
                    }, standalone: false, styles: [":host-context(novo-radio-group){margin:0}:host-context(novo-radio-group) novo-button{pointer-events:none;border-radius:0!important}:host-context(novo-radio-group) novo-button.unchecked{opacity:.6}:host-context(novo-radio-group) novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-positive)}:host-context(novo-radio-group):first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host-context(novo-radio-group):first-child novo-button[theme=icon]{border-right-width:0px!important}:host-context(novo-radio-group):last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host-context(novo-radio-group):last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(novo-radio-group.novo-radio-group-appearance-horizontal) :host:not(:last-child) .novo-radio-button-label{margin-right:var(--spacing-md)}:host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:var(--color-positive)}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:var(--font-size-body)}:host>label .novo-radio-button-label.text-size-xs{font-size:var(--font-size-xs)}:host>label .novo-radio-button-label.text-size-sm{font-size:var(--font-size-sm)}:host>label .novo-radio-button-label.text-size-md{font-size:var(--font-size-md)}:host>label .novo-radio-button-label.text-size-lg{font-size:var(--font-size-lg)}:host>label .novo-radio-button-label.text-size-xl{font-size:var(--font-size-xl)}:host>label .novo-radio-button-label.text-size-2xl{font-size:var(--font-size-2xl)}:host>label .novo-radio-button-label.text-size-3xl{font-size:var(--font-size-3xl)}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-black{color:var(--color-black)}:host>label .novo-radio-button-label.text-color-white{color:var(--color-white)}:host>label .novo-radio-button-label.text-color-gray{color:var(--color-gray)}:host>label .novo-radio-button-label.text-color-grey{color:var(--color-grey)}:host>label .novo-radio-button-label.text-color-offWhite{color:var(--color-off-white)}:host>label .novo-radio-button-label.text-color-bright{color:var(--color-bright)}:host>label .novo-radio-button-label.text-color-light{color:var(--color-light)}:host>label .novo-radio-button-label.text-color-neutral{color:var(--color-neutral)}:host>label .novo-radio-button-label.text-color-dark{color:var(--color-dark)}:host>label .novo-radio-button-label.text-color-orange{color:var(--color-orange)}:host>label .novo-radio-button-label.text-color-navigation{color:var(--color-navigation)}:host>label .novo-radio-button-label.text-color-skyBlue{color:var(--color-sky-blue)}:host>label .novo-radio-button-label.text-color-steel{color:var(--color-steel)}:host>label .novo-radio-button-label.text-color-metal{color:var(--color-metal)}:host>label .novo-radio-button-label.text-color-sand{color:var(--color-sand)}:host>label .novo-radio-button-label.text-color-silver{color:var(--color-silver)}:host>label .novo-radio-button-label.text-color-stone{color:var(--color-stone)}:host>label .novo-radio-button-label.text-color-ash{color:var(--color-ash)}:host>label .novo-radio-button-label.text-color-anonymous{color:var(--color-anonymous)}:host>label .novo-radio-button-label.text-color-slate{color:var(--color-slate)}:host>label .novo-radio-button-label.text-color-onyx{color:var(--color-onyx)}:host>label .novo-radio-button-label.text-color-charcoal{color:var(--color-charcoal)}:host>label .novo-radio-button-label.text-color-moonlight{color:var(--color-moonlight)}:host>label .novo-radio-button-label.text-color-midnight{color:var(--color-midnight)}:host>label .novo-radio-button-label.text-color-darkness{color:var(--color-darkness)}:host>label .novo-radio-button-label.text-color-navy{color:var(--color-navy)}:host>label .novo-radio-button-label.text-color-aqua{color:var(--color-aqua)}:host>label .novo-radio-button-label.text-color-ocean{color:var(--color-ocean)}:host>label .novo-radio-button-label.text-color-mint{color:var(--color-mint)}:host>label .novo-radio-button-label.text-color-grass{color:var(--color-grass)}:host>label .novo-radio-button-label.text-color-sunflower{color:var(--color-sunflower)}:host>label .novo-radio-button-label.text-color-bittersweet{color:var(--color-bittersweet)}:host>label .novo-radio-button-label.text-color-grapefruit{color:var(--color-grapefruit)}:host>label .novo-radio-button-label.text-color-carnation{color:var(--color-carnation)}:host>label .novo-radio-button-label.text-color-lavender{color:var(--color-lavender)}:host>label .novo-radio-button-label.text-color-mountain{color:var(--color-mountain)}:host>label .novo-radio-button-label.text-color-info{color:var(--color-info)}:host>label .novo-radio-button-label.text-color-positive{color:var(--color-positive)}:host>label .novo-radio-button-label.text-color-success{color:var(--color-success)}:host>label .novo-radio-button-label.text-color-negative{color:var(--color-negative)}:host>label .novo-radio-button-label.text-color-danger{color:var(--color-danger)}:host>label .novo-radio-button-label.text-color-error{color:var(--color-error)}:host>label .novo-radio-button-label.text-color-warning{color:var(--color-warning)}:host>label .novo-radio-button-label.text-color-empty{color:var(--color-empty)}:host>label .novo-radio-button-label.text-color-disabled{color:var(--color-disabled)}:host>label .novo-radio-button-label.text-color-background{color:var(--color-background)}:host>label .novo-radio-button-label.text-color-backgroundDark{color:var(--color-background-dark)}:host>label .novo-radio-button-label.text-color-border{color:var(--color-border)}:host>label .novo-radio-button-label.text-color-border2{color:var(--color-border2)}:host>label .novo-radio-button-label.text-color-text{color:var(--color-text)}:host>label .novo-radio-button-label.text-color-presentation{color:var(--color-presentation)}:host>label .novo-radio-button-label.text-color-bullhorn{color:var(--color-bullhorn)}:host>label .novo-radio-button-label.text-color-pulse{color:var(--color-pulse)}:host>label .novo-radio-button-label.text-color-fastFind{color:var(--color-fast-find)}:host>label .novo-radio-button-label.text-color-toast{color:var(--color-toast)}:host>label .novo-radio-button-label.text-color-company{color:var(--color-company)}:host>label .novo-radio-button-label.text-color-candidate{color:var(--color-candidate)}:host>label .novo-radio-button-label.text-color-lead{color:var(--color-lead)}:host>label .novo-radio-button-label.text-color-contact{color:var(--color-contact)}:host>label .novo-radio-button-label.text-color-clientcontact{color:var(--color-clientcontact)}:host>label .novo-radio-button-label.text-color-opportunity{color:var(--color-opportunity)}:host>label .novo-radio-button-label.text-color-job{color:var(--color-job)}:host>label .novo-radio-button-label.text-color-joborder{color:var(--color-joborder)}:host>label .novo-radio-button-label.text-color-submission{color:var(--color-submission)}:host>label .novo-radio-button-label.text-color-sendout{color:var(--color-sendout)}:host>label .novo-radio-button-label.text-color-placement{color:var(--color-placement)}:host>label .novo-radio-button-label.text-color-note{color:var(--color-note)}:host>label .novo-radio-button-label.text-color-contract{color:var(--color-contract)}:host>label .novo-radio-button-label.text-color-task{color:var(--color-task)}:host>label .novo-radio-button-label.text-color-jobCode{color:var(--color-job-code)}:host>label .novo-radio-button-label.text-color-earnCode{color:var(--color-earn-code)}:host>label .novo-radio-button-label.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>label .novo-radio-button-label.text-color-billableCharge{color:var(--color-billable-charge)}:host>label .novo-radio-button-label.text-color-payableCharge{color:var(--color-payable-charge)}:host>label .novo-radio-button-label.text-color-user{color:var(--color-user)}:host>label .novo-radio-button-label.text-color-corporateUser{color:var(--color-corporate-user)}:host>label .novo-radio-button-label.text-color-distributionList{color:var(--color-distribution-list)}:host>label .novo-radio-button-label.text-color-credential{color:var(--color-credential)}:host>label .novo-radio-button-label.text-color-person{color:var(--color-person)}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>label .novo-radio-button-label.text-weight-thin{font-weight:var(--font-weight-thin)}:host>label .novo-radio-button-label.text-weight-light{font-weight:var(--font-weight-light)}:host>label .novo-radio-button-label.text-weight-normal{font-weight:var(--font-weight-normal)}:host>label .novo-radio-button-label.text-weight-medium{font-weight:var(--font-weight-medium)}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>label .novo-radio-button-label.text-weight-bold{font-weight:var(--font-weight-bold)}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label ::ng-deep i{margin-right:5px;transition:all .2s ease-in-out}:host>label ::ng-deep i.bhi-checkbox-empty,:host>label ::ng-deep i.bhi-radio-empty{color:#d2d2d2}:host>label ::ng-deep i.bhi-checkbox-filled,:host>label ::ng-deep i.bhi-radio-filled{color:var(--color-positive)}:host>label.disabled{pointer-events:auto;cursor:not-allowed;opacity:.4}:host>label.disabled button[theme].has-icon{opacity:.4}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:var(--color-positive);background:#fff;opacity:1}:host novo-button[theme].has-icon.checked{color:#fff;background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=border-default]{color:#fff}:host novo-button[theme].has-icon.checked[color=black]{color:#fff;background:var(--color-black)}:host novo-button[theme].has-icon.checked[color=white]{color:#fff;background:var(--color-white)}:host novo-button[theme].has-icon.checked[color=gray]{color:#fff;background:var(--color-gray)}:host novo-button[theme].has-icon.checked[color=grey]{color:#fff;background:var(--color-grey)}:host novo-button[theme].has-icon.checked[color=offWhite]{color:#fff;background:var(--color-off-white)}:host novo-button[theme].has-icon.checked[color=bright]{color:#fff;background:var(--color-bright)}:host novo-button[theme].has-icon.checked[color=light]{color:#fff;background:var(--color-light)}:host novo-button[theme].has-icon.checked[color=neutral]{color:#fff;background:var(--color-neutral)}:host novo-button[theme].has-icon.checked[color=dark]{color:#fff;background:var(--color-dark)}:host novo-button[theme].has-icon.checked[color=orange]{color:#fff;background:var(--color-orange)}:host novo-button[theme].has-icon.checked[color=navigation]{color:#fff;background:var(--color-navigation)}:host novo-button[theme].has-icon.checked[color=skyBlue]{color:#fff;background:var(--color-sky-blue)}:host novo-button[theme].has-icon.checked[color=steel]{color:#fff;background:var(--color-steel)}:host novo-button[theme].has-icon.checked[color=metal]{color:#fff;background:var(--color-metal)}:host novo-button[theme].has-icon.checked[color=sand]{color:#fff;background:var(--color-sand)}:host novo-button[theme].has-icon.checked[color=silver]{color:#fff;background:var(--color-silver)}:host novo-button[theme].has-icon.checked[color=stone]{color:#fff;background:var(--color-stone)}:host novo-button[theme].has-icon.checked[color=ash]{color:#fff;background:var(--color-ash)}:host novo-button[theme].has-icon.checked[color=anonymous]{color:#fff;background:var(--color-anonymous)}:host novo-button[theme].has-icon.checked[color=slate]{color:#fff;background:var(--color-slate)}:host novo-button[theme].has-icon.checked[color=onyx]{color:#fff;background:var(--color-onyx)}:host novo-button[theme].has-icon.checked[color=charcoal]{color:#fff;background:var(--color-charcoal)}:host novo-button[theme].has-icon.checked[color=moonlight]{color:#fff;background:var(--color-moonlight)}:host novo-button[theme].has-icon.checked[color=midnight]{color:#fff;background:var(--color-midnight)}:host novo-button[theme].has-icon.checked[color=darkness]{color:#fff;background:var(--color-darkness)}:host novo-button[theme].has-icon.checked[color=navy]{color:#fff;background:var(--color-navy)}:host novo-button[theme].has-icon.checked[color=aqua]{color:#fff;background:var(--color-aqua)}:host novo-button[theme].has-icon.checked[color=ocean]{color:#fff;background:var(--color-ocean)}:host novo-button[theme].has-icon.checked[color=mint]{color:#fff;background:var(--color-mint)}:host novo-button[theme].has-icon.checked[color=grass]{color:#fff;background:var(--color-grass)}:host novo-button[theme].has-icon.checked[color=sunflower]{color:#fff;background:var(--color-sunflower)}:host novo-button[theme].has-icon.checked[color=bittersweet]{color:#fff;background:var(--color-bittersweet)}:host novo-button[theme].has-icon.checked[color=grapefruit]{color:#fff;background:var(--color-grapefruit)}:host novo-button[theme].has-icon.checked[color=carnation]{color:#fff;background:var(--color-carnation)}:host novo-button[theme].has-icon.checked[color=lavender]{color:#fff;background:var(--color-lavender)}:host novo-button[theme].has-icon.checked[color=mountain]{color:#fff;background:var(--color-mountain)}:host novo-button[theme].has-icon.checked[color=info]{color:#fff;background:var(--color-info)}:host novo-button[theme].has-icon.checked[color=positive]{color:#fff;background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=success]{color:#fff;background:var(--color-success)}:host novo-button[theme].has-icon.checked[color=negative]{color:#fff;background:var(--color-negative)}:host novo-button[theme].has-icon.checked[color=danger]{color:#fff;background:var(--color-danger)}:host novo-button[theme].has-icon.checked[color=error]{color:#fff;background:var(--color-error)}:host novo-button[theme].has-icon.checked[color=warning]{color:#fff;background:var(--color-warning)}:host novo-button[theme].has-icon.checked[color=empty]{color:#fff;background:var(--color-empty)}:host novo-button[theme].has-icon.checked[color=disabled]{color:#fff;background:var(--color-disabled)}:host novo-button[theme].has-icon.checked[color=background]{color:#fff;background:var(--color-background)}:host novo-button[theme].has-icon.checked[color=backgroundDark]{color:#fff;background:var(--color-background-dark)}:host novo-button[theme].has-icon.checked[color=border]{color:#fff;background:var(--color-border)}:host novo-button[theme].has-icon.checked[color=border2]{color:#fff;background:var(--color-border2)}:host novo-button[theme].has-icon.checked[color=text]{color:#fff;background:var(--color-text)}:host novo-button[theme].has-icon.checked[color=presentation]{color:#fff;background:var(--color-presentation)}:host novo-button[theme].has-icon.checked[color=bullhorn]{color:#fff;background:var(--color-bullhorn)}:host novo-button[theme].has-icon.checked[color=pulse]{color:#fff;background:var(--color-pulse)}:host novo-button[theme].has-icon.checked[color=fastFind]{color:#fff;background:var(--color-fast-find)}:host novo-button[theme].has-icon.checked[color=toast]{color:#fff;background:var(--color-toast)}:host novo-button[theme].has-icon.checked[color=company]{color:#fff;background:var(--color-company)}:host novo-button[theme].has-icon.checked[color=candidate]{color:#fff;background:var(--color-candidate)}:host novo-button[theme].has-icon.checked[color=lead]{color:#fff;background:var(--color-lead)}:host novo-button[theme].has-icon.checked[color=contact]{color:#fff;background:var(--color-contact)}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:#fff;background:var(--color-clientcontact)}:host novo-button[theme].has-icon.checked[color=opportunity]{color:#fff;background:var(--color-opportunity)}:host novo-button[theme].has-icon.checked[color=job]{color:#fff;background:var(--color-job)}:host novo-button[theme].has-icon.checked[color=joborder]{color:#fff;background:var(--color-joborder)}:host novo-button[theme].has-icon.checked[color=submission]{color:#fff;background:var(--color-submission)}:host novo-button[theme].has-icon.checked[color=sendout]{color:#fff;background:var(--color-sendout)}:host novo-button[theme].has-icon.checked[color=placement]{color:#fff;background:var(--color-placement)}:host novo-button[theme].has-icon.checked[color=note]{color:#fff;background:var(--color-note)}:host novo-button[theme].has-icon.checked[color=contract]{color:#fff;background:var(--color-contract)}:host novo-button[theme].has-icon.checked[color=task]{color:#fff;background:var(--color-task)}:host novo-button[theme].has-icon.checked[color=jobCode]{color:#fff;background:var(--color-job-code)}:host novo-button[theme].has-icon.checked[color=earnCode]{color:#fff;background:var(--color-earn-code)}:host novo-button[theme].has-icon.checked[color=invoiceStatement]{color:#fff;background:var(--color-invoice-statement)}:host novo-button[theme].has-icon.checked[color=billableCharge]{color:#fff;background:var(--color-billable-charge)}:host novo-button[theme].has-icon.checked[color=payableCharge]{color:#fff;background:var(--color-payable-charge)}:host novo-button[theme].has-icon.checked[color=user]{color:#fff;background:var(--color-user)}:host novo-button[theme].has-icon.checked[color=corporateUser]{color:#fff;background:var(--color-corporate-user)}:host novo-button[theme].has-icon.checked[color=distributionList]{color:#fff;background:var(--color-distribution-list)}:host novo-button[theme].has-icon.checked[color=credential]{color:#fff;background:var(--color-credential)}:host novo-button[theme].has-icon.checked[color=person]{color:#fff;background:var(--color-person)}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioGroup, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoRadioGroup, isStandalone: false, selector: "novo-radio-group", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", appearance: "appearance", value: "value", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { change: "change", blur: "blur" }, host: { properties: { "class.novo-radio-group-appearance-horizontal": "appearance==\"horizontal\"", "class.novo-radio-group-appearance-vertical": "appearance==\"vertical\"", "class.disabled": "this.disabled" }, classAttribute: "novo-radio-group" }, providers: [
            RADIOGROUP_VALUE_ACCESSOR,
            { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
            { provide: NovoFieldControl, useExisting: NovoRadioGroup },
        ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(() => NovoRadioElement), descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex}:host.novo-radio-group-appearance-horizontal novo-radio:not(:last-child) .novo-radio-button-label{margin-right:var(--spacing-md)}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}:host>novo-radio{margin:0}:host>novo-radio novo-button{pointer-events:none;border-radius:0!important}:host>novo-radio novo-button.unchecked{opacity:.6}:host>novo-radio novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-positive)}:host>novo-radio:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host>novo-radio:first-child novo-button[theme=icon]{border-right-width:0px!important}:host>novo-radio:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host>novo-radio:last-child novo-button[theme=icon]{border-left-width:0px!important}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioGroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-radio-group', providers: [
                        RADIOGROUP_VALUE_ACCESSOR,
                        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
                        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
                    ], template: '<ng-content></ng-content>', host: {
                        class: 'novo-radio-group',
                        '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
                        '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
                    }, standalone: false, styles: [":host{display:flex}:host.novo-radio-group-appearance-horizontal novo-radio:not(:last-child) .novo-radio-button-label{margin-right:var(--spacing-md)}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}:host>novo-radio{margin:0}:host>novo-radio novo-button{pointer-events:none;border-radius:0!important}:host>novo-radio novo-button.unchecked{opacity:.6}:host>novo-radio novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-positive)}:host>novo-radio:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host>novo-radio:first-child novo-button[theme=icon]{border-right-width:0px!important}:host>novo-radio:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host>novo-radio:last-child novo-button[theme=icon]{border-left-width:0px!important}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioModule, declarations: [NovoRadioElement, NovoRadioGroup], imports: [CommonModule, NovoButtonModule], exports: [NovoRadioElement, NovoRadioGroup] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioModule, imports: [CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRadioModule, decorators: [{
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
