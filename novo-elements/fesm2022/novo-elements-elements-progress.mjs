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
            return '100%';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressBarElement, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_PROGRESS_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoProgressBarElement, isStandalone: false, selector: "novo-progress-bar", inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", flash: "flash", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class": "this.appearance", "class.striped": "this.striped", "class.animated": "this.animated", "class.flash": "this.flash", "style.width": "this.width", "class.disabled": "this.disabled" } }, providers: [PROGRESS_BAR_VALUE_ACCESSOR], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:flex;height:100%}:host.linear{background-color:var(--color-positive)}:host.linear[color=border-default]{background:#dbdbdb}:host.linear[color=black]{color:var(--color-contrast-black);background:#000}:host.linear[color=white]{color:var(--color-contrast-white);background:#fff}:host.linear[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host.linear[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host.linear[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host.linear[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host.linear[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host.linear[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host.linear[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host.linear[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host.linear[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host.linear[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host.linear[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host.linear[color=metal]{color:var(--color-contrast-metal);background:#637893}:host.linear[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host.linear[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host.linear[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host.linear[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host.linear[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host.linear[color=slate]{color:var(--color-contrast-slate);background:#707070}:host.linear[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host.linear[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host.linear[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host.linear[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host.linear[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host.linear[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host.linear[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host.linear[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host.linear[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host.linear[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host.linear[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host.linear[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host.linear[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host.linear[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host.linear[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host.linear[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host.linear[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host.linear[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host.linear[color=success]{color:var(--color-contrast-success);background:#8cc152}:host.linear[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host.linear[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host.linear[color=error]{color:var(--color-contrast-error);background:#da4453}:host.linear[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host.linear[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host.linear[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host.linear[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host.linear[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host.linear[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host.linear[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host.linear[color=text]{color:var(--color-contrast-text);background:#282828}:host.linear[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host.linear[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host.linear[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host.linear[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host.linear[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host.linear[color=company]{color:var(--color-contrast-company);background:#39d}:host.linear[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host.linear[color=lead]{color:var(--color-contrast-lead);background:#a69}:host.linear[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host.linear[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host.linear[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host.linear[color=job]{color:var(--color-contrast-job);background:#b56}:host.linear[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host.linear[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host.linear[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host.linear[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host.linear[color=note]{color:var(--color-contrast-note);background:#747884}:host.linear[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host.linear[color=task]{color:var(--color-contrast-task);background:#4f5361}:host.linear[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host.linear[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host.linear[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host.linear[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host.linear[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host.linear[color=user]{color:var(--color-contrast-user);background:#696d79}:host.linear[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host.linear[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host.linear[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host.linear[color=person]{color:var(--color-contrast-person);background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48% 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:var(--color-black)}:host.radial[color=white] svg circle{stroke:var(--color-white)}:host.radial[color=gray] svg circle{stroke:var(--color-gray)}:host.radial[color=grey] svg circle{stroke:var(--color-grey)}:host.radial[color=offWhite] svg circle{stroke:var(--color-off-white)}:host.radial[color=bright] svg circle{stroke:var(--color-bright)}:host.radial[color=light] svg circle{stroke:var(--color-light)}:host.radial[color=neutral] svg circle{stroke:var(--color-neutral)}:host.radial[color=dark] svg circle{stroke:var(--color-dark)}:host.radial[color=orange] svg circle{stroke:var(--color-orange)}:host.radial[color=navigation] svg circle{stroke:var(--color-navigation)}:host.radial[color=skyBlue] svg circle{stroke:var(--color-sky-blue)}:host.radial[color=steel] svg circle{stroke:var(--color-steel)}:host.radial[color=metal] svg circle{stroke:var(--color-metal)}:host.radial[color=sand] svg circle{stroke:var(--color-sand)}:host.radial[color=silver] svg circle{stroke:var(--color-silver)}:host.radial[color=stone] svg circle{stroke:var(--color-stone)}:host.radial[color=ash] svg circle{stroke:var(--color-ash)}:host.radial[color=anonymous] svg circle{stroke:var(--color-anonymous)}:host.radial[color=slate] svg circle{stroke:var(--color-slate)}:host.radial[color=onyx] svg circle{stroke:var(--color-onyx)}:host.radial[color=charcoal] svg circle{stroke:var(--color-charcoal)}:host.radial[color=moonlight] svg circle{stroke:var(--color-moonlight)}:host.radial[color=midnight] svg circle{stroke:var(--color-midnight)}:host.radial[color=darkness] svg circle{stroke:var(--color-darkness)}:host.radial[color=navy] svg circle{stroke:var(--color-navy)}:host.radial[color=aqua] svg circle{stroke:var(--color-aqua)}:host.radial[color=ocean] svg circle{stroke:var(--color-ocean)}:host.radial[color=mint] svg circle{stroke:var(--color-mint)}:host.radial[color=grass] svg circle{stroke:var(--color-grass)}:host.radial[color=sunflower] svg circle{stroke:var(--color-sunflower)}:host.radial[color=bittersweet] svg circle{stroke:var(--color-bittersweet)}:host.radial[color=grapefruit] svg circle{stroke:var(--color-grapefruit)}:host.radial[color=carnation] svg circle{stroke:var(--color-carnation)}:host.radial[color=lavender] svg circle{stroke:var(--color-lavender)}:host.radial[color=mountain] svg circle{stroke:var(--color-mountain)}:host.radial[color=info] svg circle{stroke:var(--color-info)}:host.radial[color=positive] svg circle{stroke:var(--color-positive)}:host.radial[color=success] svg circle{stroke:var(--color-success)}:host.radial[color=negative] svg circle{stroke:var(--color-negative)}:host.radial[color=danger] svg circle{stroke:var(--color-danger)}:host.radial[color=error] svg circle{stroke:var(--color-error)}:host.radial[color=warning] svg circle{stroke:var(--color-warning)}:host.radial[color=empty] svg circle{stroke:var(--color-empty)}:host.radial[color=disabled] svg circle{stroke:var(--color-disabled)}:host.radial[color=background] svg circle{stroke:var(--color-background)}:host.radial[color=backgroundDark] svg circle{stroke:var(--color-background-dark)}:host.radial[color=border] svg circle{stroke:var(--color-border)}:host.radial[color=border2] svg circle{stroke:var(--color-border2)}:host.radial[color=text] svg circle{stroke:var(--color-text)}:host.radial[color=presentation] svg circle{stroke:var(--color-presentation)}:host.radial[color=bullhorn] svg circle{stroke:var(--color-bullhorn)}:host.radial[color=pulse] svg circle{stroke:var(--color-pulse)}:host.radial[color=fastFind] svg circle{stroke:var(--color-fast-find)}:host.radial[color=toast] svg circle{stroke:var(--color-toast)}:host.radial[color=company] svg circle{stroke:var(--color-company)}:host.radial[color=candidate] svg circle{stroke:var(--color-candidate)}:host.radial[color=lead] svg circle{stroke:var(--color-lead)}:host.radial[color=contact] svg circle{stroke:var(--color-contact)}:host.radial[color=clientcontact] svg circle{stroke:var(--color-clientcontact)}:host.radial[color=opportunity] svg circle{stroke:var(--color-opportunity)}:host.radial[color=job] svg circle{stroke:var(--color-job)}:host.radial[color=joborder] svg circle{stroke:var(--color-joborder)}:host.radial[color=submission] svg circle{stroke:var(--color-submission)}:host.radial[color=sendout] svg circle{stroke:var(--color-sendout)}:host.radial[color=placement] svg circle{stroke:var(--color-placement)}:host.radial[color=note] svg circle{stroke:var(--color-note)}:host.radial[color=contract] svg circle{stroke:var(--color-contract)}:host.radial[color=task] svg circle{stroke:var(--color-task)}:host.radial[color=jobCode] svg circle{stroke:var(--color-job-code)}:host.radial[color=earnCode] svg circle{stroke:var(--color-earn-code)}:host.radial[color=invoiceStatement] svg circle{stroke:var(--color-invoice-statement)}:host.radial[color=billableCharge] svg circle{stroke:var(--color-billable-charge)}:host.radial[color=payableCharge] svg circle{stroke:var(--color-payable-charge)}:host.radial[color=user] svg circle{stroke:var(--color-user)}:host.radial[color=corporateUser] svg circle{stroke:var(--color-corporate-user)}:host.radial[color=distributionList] svg circle{stroke:var(--color-distribution-list)}:host.radial[color=credential] svg circle{stroke:var(--color-credential)}:host.radial[color=person] svg circle{stroke:var(--color-person)}:host.radial svg circle{stroke:var(--color-positive);transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@-webkit-keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}:host-context([data-theme=bh2026]).linear:first-child{border-radius:999px 0 0 999px}:host-context([data-theme=bh2026]).linear:last-child{border-radius:0 999px 999px 0}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressBarElement, decorators: [{
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
  `, standalone: false, styles: [":host{display:flex;height:100%}:host.linear{background-color:var(--color-positive)}:host.linear[color=border-default]{background:#dbdbdb}:host.linear[color=black]{color:var(--color-contrast-black);background:#000}:host.linear[color=white]{color:var(--color-contrast-white);background:#fff}:host.linear[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host.linear[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host.linear[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host.linear[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host.linear[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host.linear[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host.linear[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host.linear[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host.linear[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host.linear[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host.linear[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host.linear[color=metal]{color:var(--color-contrast-metal);background:#637893}:host.linear[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host.linear[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host.linear[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host.linear[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host.linear[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host.linear[color=slate]{color:var(--color-contrast-slate);background:#707070}:host.linear[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host.linear[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host.linear[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host.linear[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host.linear[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host.linear[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host.linear[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host.linear[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host.linear[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host.linear[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host.linear[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host.linear[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host.linear[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host.linear[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host.linear[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host.linear[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host.linear[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host.linear[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host.linear[color=success]{color:var(--color-contrast-success);background:#8cc152}:host.linear[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host.linear[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host.linear[color=error]{color:var(--color-contrast-error);background:#da4453}:host.linear[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host.linear[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host.linear[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host.linear[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host.linear[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host.linear[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host.linear[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host.linear[color=text]{color:var(--color-contrast-text);background:#282828}:host.linear[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host.linear[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host.linear[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host.linear[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host.linear[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host.linear[color=company]{color:var(--color-contrast-company);background:#39d}:host.linear[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host.linear[color=lead]{color:var(--color-contrast-lead);background:#a69}:host.linear[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host.linear[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host.linear[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host.linear[color=job]{color:var(--color-contrast-job);background:#b56}:host.linear[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host.linear[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host.linear[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host.linear[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host.linear[color=note]{color:var(--color-contrast-note);background:#747884}:host.linear[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host.linear[color=task]{color:var(--color-contrast-task);background:#4f5361}:host.linear[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host.linear[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host.linear[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host.linear[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host.linear[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host.linear[color=user]{color:var(--color-contrast-user);background:#696d79}:host.linear[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host.linear[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host.linear[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host.linear[color=person]{color:var(--color-contrast-person);background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48% 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:var(--color-black)}:host.radial[color=white] svg circle{stroke:var(--color-white)}:host.radial[color=gray] svg circle{stroke:var(--color-gray)}:host.radial[color=grey] svg circle{stroke:var(--color-grey)}:host.radial[color=offWhite] svg circle{stroke:var(--color-off-white)}:host.radial[color=bright] svg circle{stroke:var(--color-bright)}:host.radial[color=light] svg circle{stroke:var(--color-light)}:host.radial[color=neutral] svg circle{stroke:var(--color-neutral)}:host.radial[color=dark] svg circle{stroke:var(--color-dark)}:host.radial[color=orange] svg circle{stroke:var(--color-orange)}:host.radial[color=navigation] svg circle{stroke:var(--color-navigation)}:host.radial[color=skyBlue] svg circle{stroke:var(--color-sky-blue)}:host.radial[color=steel] svg circle{stroke:var(--color-steel)}:host.radial[color=metal] svg circle{stroke:var(--color-metal)}:host.radial[color=sand] svg circle{stroke:var(--color-sand)}:host.radial[color=silver] svg circle{stroke:var(--color-silver)}:host.radial[color=stone] svg circle{stroke:var(--color-stone)}:host.radial[color=ash] svg circle{stroke:var(--color-ash)}:host.radial[color=anonymous] svg circle{stroke:var(--color-anonymous)}:host.radial[color=slate] svg circle{stroke:var(--color-slate)}:host.radial[color=onyx] svg circle{stroke:var(--color-onyx)}:host.radial[color=charcoal] svg circle{stroke:var(--color-charcoal)}:host.radial[color=moonlight] svg circle{stroke:var(--color-moonlight)}:host.radial[color=midnight] svg circle{stroke:var(--color-midnight)}:host.radial[color=darkness] svg circle{stroke:var(--color-darkness)}:host.radial[color=navy] svg circle{stroke:var(--color-navy)}:host.radial[color=aqua] svg circle{stroke:var(--color-aqua)}:host.radial[color=ocean] svg circle{stroke:var(--color-ocean)}:host.radial[color=mint] svg circle{stroke:var(--color-mint)}:host.radial[color=grass] svg circle{stroke:var(--color-grass)}:host.radial[color=sunflower] svg circle{stroke:var(--color-sunflower)}:host.radial[color=bittersweet] svg circle{stroke:var(--color-bittersweet)}:host.radial[color=grapefruit] svg circle{stroke:var(--color-grapefruit)}:host.radial[color=carnation] svg circle{stroke:var(--color-carnation)}:host.radial[color=lavender] svg circle{stroke:var(--color-lavender)}:host.radial[color=mountain] svg circle{stroke:var(--color-mountain)}:host.radial[color=info] svg circle{stroke:var(--color-info)}:host.radial[color=positive] svg circle{stroke:var(--color-positive)}:host.radial[color=success] svg circle{stroke:var(--color-success)}:host.radial[color=negative] svg circle{stroke:var(--color-negative)}:host.radial[color=danger] svg circle{stroke:var(--color-danger)}:host.radial[color=error] svg circle{stroke:var(--color-error)}:host.radial[color=warning] svg circle{stroke:var(--color-warning)}:host.radial[color=empty] svg circle{stroke:var(--color-empty)}:host.radial[color=disabled] svg circle{stroke:var(--color-disabled)}:host.radial[color=background] svg circle{stroke:var(--color-background)}:host.radial[color=backgroundDark] svg circle{stroke:var(--color-background-dark)}:host.radial[color=border] svg circle{stroke:var(--color-border)}:host.radial[color=border2] svg circle{stroke:var(--color-border2)}:host.radial[color=text] svg circle{stroke:var(--color-text)}:host.radial[color=presentation] svg circle{stroke:var(--color-presentation)}:host.radial[color=bullhorn] svg circle{stroke:var(--color-bullhorn)}:host.radial[color=pulse] svg circle{stroke:var(--color-pulse)}:host.radial[color=fastFind] svg circle{stroke:var(--color-fast-find)}:host.radial[color=toast] svg circle{stroke:var(--color-toast)}:host.radial[color=company] svg circle{stroke:var(--color-company)}:host.radial[color=candidate] svg circle{stroke:var(--color-candidate)}:host.radial[color=lead] svg circle{stroke:var(--color-lead)}:host.radial[color=contact] svg circle{stroke:var(--color-contact)}:host.radial[color=clientcontact] svg circle{stroke:var(--color-clientcontact)}:host.radial[color=opportunity] svg circle{stroke:var(--color-opportunity)}:host.radial[color=job] svg circle{stroke:var(--color-job)}:host.radial[color=joborder] svg circle{stroke:var(--color-joborder)}:host.radial[color=submission] svg circle{stroke:var(--color-submission)}:host.radial[color=sendout] svg circle{stroke:var(--color-sendout)}:host.radial[color=placement] svg circle{stroke:var(--color-placement)}:host.radial[color=note] svg circle{stroke:var(--color-note)}:host.radial[color=contract] svg circle{stroke:var(--color-contract)}:host.radial[color=task] svg circle{stroke:var(--color-task)}:host.radial[color=jobCode] svg circle{stroke:var(--color-job-code)}:host.radial[color=earnCode] svg circle{stroke:var(--color-earn-code)}:host.radial[color=invoiceStatement] svg circle{stroke:var(--color-invoice-statement)}:host.radial[color=billableCharge] svg circle{stroke:var(--color-billable-charge)}:host.radial[color=payableCharge] svg circle{stroke:var(--color-payable-charge)}:host.radial[color=user] svg circle{stroke:var(--color-user)}:host.radial[color=corporateUser] svg circle{stroke:var(--color-corporate-user)}:host.radial[color=distributionList] svg circle{stroke:var(--color-distribution-list)}:host.radial[color=credential] svg circle{stroke:var(--color-credential)}:host.radial[color=person] svg circle{stroke:var(--color-person)}:host.radial svg circle{stroke:var(--color-positive);transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@-webkit-keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}:host-context([data-theme=bh2026]).linear:first-child{border-radius:999px 0 0 999px}:host-context([data-theme=bh2026]).linear:last-child{border-radius:0 999px 999px 0}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoProgressElement, isStandalone: false, selector: "novo-progress", inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, host: { properties: { "class.fit-container": "this.fitContainer", "class.striped": "this.striped", "class": "this.appearance", "class.disabled": "this.disabled" } }, providers: [
            {
                provide: NOVO_PROGRESS_CONTAINER,
                useExisting: NovoProgressElement,
            },
        ], queries: [{ propertyName: "_bars", predicate: i0.forwardRef(() => NovoProgressBarElement), descendants: true }], ngImport: i0, template: ' <ng-content></ng-content> ', isInline: true, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--background-main);border:1px solid var(--color-empty);overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress', template: ' <ng-content></ng-content> ', providers: [
                        {
                            provide: NOVO_PROGRESS_CONTAINER,
                            useExisting: NovoProgressElement,
                        },
                    ], standalone: false, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--background-main);border:1px solid var(--color-empty);overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressModule, declarations: [NovoProgressBarElement, NovoProgressElement], imports: [CommonModule], exports: [NovoProgressBarElement, NovoProgressElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoProgressModule, decorators: [{
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
