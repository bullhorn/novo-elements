import * as i0 from '@angular/core';
import { InjectionToken, forwardRef, EventEmitter, Input, HostBinding, Output, Optional, Inject, Component, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

var ProgressAppearance;
(function (ProgressAppearance) {
    ProgressAppearance["LINEAR"] = "linear";
    ProgressAppearance["RADIAL"] = "radial";
})(ProgressAppearance || (ProgressAppearance = {}));
/**
 * Used to provide a progress container to a progress bar while avoiding circular references.
 * @docs-private
 */
const NOVO_PROGRESS_CONTAINER = new InjectionToken('NOVO_PROGRESS_CONTAINER');

// NG2
// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const PROGRESS_BAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoProgressBarElement),
    multi: true,
};
class NovoProgressBarElement {
    get width() {
        if (this.appearance === ProgressAppearance.RADIAL) {
            return `100%`;
        }
        return `${this._percent * 100}%`;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.progress) {
                this._percent = this.progress.total > 0 ? this._value / this.progress.total : 0;
            }
            else {
                this._percent = value;
            }
            this.dashoffset = this.circumference * (1 - this._percent);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled || (this.progress != null && this.progress.disabled);
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    constructor(ref, progress) {
        this.ref = ref;
        this.progress = progress;
        this._uniqueId = `novo-progress-${++nextId}`;
        this.appearance = ProgressAppearance.LINEAR;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.indeterminate = false;
        // Radial Value
        this.radius = 54;
        this.circumference = 2 * Math.PI * this.radius;
        this.progressAppearance = ProgressAppearance;
        this.striped = false;
        this.animated = false;
        this.flash = false;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._percent = 0;
        this._value = 0;
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        // NovoProgressElement
        this.progress = progress;
    }
    ngOnInit() {
        if (this.indeterminate) {
            this.striped = true;
            this.animated = true;
        }
        if (this.indeterminate || this.flash) {
            this._value = this.progress?.total || 100;
        }
        if (this.flash) {
            this.progress.fitContainer = true;
        }
        if (this.progress) {
            this._percent = this.progress.total > 0 ? this._value / this.progress.total : 0;
            this.appearance = this.progress.appearance;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressBarElement, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_PROGRESS_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoProgressBarElement, isStandalone: false, selector: "novo-progress-bar", inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", flash: "flash", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class": "this.appearance", "class.striped": "this.striped", "class.animated": "this.animated", "class.flash": "this.flash", "style.width": "this.width", "class.disabled": "this.disabled" } }, providers: [PROGRESS_BAR_VALUE_ACCESSOR], ngImport: i0, template: `
    <div *ngIf="appearance === progressAppearance.LINEAR" class="progress-bar"></div>
    <svg *ngIf="appearance === progressAppearance.RADIAL" width="120" height="120">
      <circle
        [style.strokeDasharray]="circumference"
        [style.strokeDashoffset]="dashoffset"
        [attr.r]="radius"
        cx="60"
        cy="60"
        stroke-width="4"
        fill="transparent"
        class="progress__value"
      />
    </svg>
  `, isInline: true, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000}:host.linear[color=white]{color:#3d464d;background:#fff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#39d}:host.linear[color=candidate]{color:#fff;background:#4b7}:host.linear[color=lead]{color:#fff;background:#a69}:host.linear[color=contact]{color:#fff;background:#fa4}:host.linear[color=clientcontact]{color:#fff;background:#fa4}:host.linear[color=opportunity]{color:#fff;background:#625}:host.linear[color=job]{color:#fff;background:#b56}:host.linear[color=joborder]{color:#fff;background:#b56}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=task]{color:#fff;background:#4f5361}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48% 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=task] svg circle{stroke:#4f5361}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@-webkit-keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressBarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress-bar', providers: [PROGRESS_BAR_VALUE_ACCESSOR], template: `
    <div *ngIf="appearance === progressAppearance.LINEAR" class="progress-bar"></div>
    <svg *ngIf="appearance === progressAppearance.RADIAL" width="120" height="120">
      <circle
        [style.strokeDasharray]="circumference"
        [style.strokeDashoffset]="dashoffset"
        [attr.r]="radius"
        cx="60"
        cy="60"
        stroke-width="4"
        fill="transparent"
        class="progress__value"
      />
    </svg>
  `, standalone: false, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000}:host.linear[color=white]{color:#3d464d;background:#fff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#39d}:host.linear[color=candidate]{color:#fff;background:#4b7}:host.linear[color=lead]{color:#fff;background:#a69}:host.linear[color=contact]{color:#fff;background:#fa4}:host.linear[color=clientcontact]{color:#fff;background:#fa4}:host.linear[color=opportunity]{color:#fff;background:#625}:host.linear[color=job]{color:#fff;background:#b56}:host.linear[color=joborder]{color:#fff;background:#b56}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=task]{color:#fff;background:#4f5361}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48% 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=task] svg circle{stroke:#4f5361}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@-webkit-keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_PROGRESS_CONTAINER]
                }] }], propDecorators: { appearance: [{
                type: HostBinding,
                args: ['class']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], label: [{
                type: Input
            }], theme: [{
                type: Input
            }], color: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], striped: [{
                type: HostBinding,
                args: ['class.striped']
            }, {
                type: Input
            }], animated: [{
                type: HostBinding,
                args: ['class.animated']
            }, {
                type: Input
            }], flash: [{
                type: HostBinding,
                args: ['class.flash']
            }, {
                type: Input
            }], width: [{
                type: HostBinding,
                args: ['style.width']
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
class NovoProgressElement {
    constructor() {
        this.total = 100;
        this.radius = 54;
        this.fitContainer = false;
        this.striped = false;
        // Private vars for getters
        this._appearance = ProgressAppearance.LINEAR;
        this._disabled = false;
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateBarAppearance();
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngAfterContentInit() {
        this._updateBarRadius();
    }
    _updateBarAppearance() {
        if (this._bars) {
            this._bars.forEach((bar) => {
                bar.appearance = this.appearance;
            });
        }
    }
    _updateBarRadius() {
        if (this._bars) {
            this._bars.forEach((bar, i) => {
                bar.radius = this.radius - i * 5;
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoProgressElement, isStandalone: false, selector: "novo-progress", inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, host: { properties: { "class.fit-container": "this.fitContainer", "class.striped": "this.striped", "class": "this.appearance", "class.disabled": "this.disabled" } }, providers: [
            {
                provide: NOVO_PROGRESS_CONTAINER,
                useExisting: NovoProgressElement,
            },
        ], queries: [{ propertyName: "_bars", predicate: i0.forwardRef(() => NovoProgressBarElement), descendants: true }], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:#f7f7f7;border:1px solid #cccdcc;overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress', template: ` <ng-content></ng-content> `, providers: [
                        {
                            provide: NOVO_PROGRESS_CONTAINER,
                            useExisting: NovoProgressElement,
                        },
                    ], standalone: false, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:#f7f7f7;border:1px solid #cccdcc;overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], theme: [{
                type: Input
            }], total: [{
                type: Input
            }], radius: [{
                type: Input
            }], fitContainer: [{
                type: HostBinding,
                args: ['class.fit-container']
            }], striped: [{
                type: HostBinding,
                args: ['class.striped']
            }, {
                type: Input
            }], appearance: [{
                type: HostBinding,
                args: ['class']
            }, {
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }], _bars: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoProgressBarElement), { descendants: true }]
            }] } });

// NG2
class NovoProgressModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressModule, declarations: [NovoProgressBarElement, NovoProgressElement], imports: [CommonModule], exports: [NovoProgressBarElement, NovoProgressElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoProgressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoProgressBarElement, NovoProgressElement],
                    exports: [NovoProgressBarElement, NovoProgressElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NOVO_PROGRESS_CONTAINER, NovoProgressBarElement, NovoProgressElement, NovoProgressModule, ProgressAppearance };
//# sourceMappingURL=novo-elements-elements-progress.mjs.map
