import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/platform-browser';
import * as i1 from 'novo-elements/services';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';

// NG2
class NovoTipWellElement {
    constructor(labels, sanitizer) {
        this.labels = labels;
        this.sanitizer = sanitizer;
        this.button = true;
        this.sanitize = true;
        this.confirmed = new EventEmitter();
        this.isActive = true;
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            let isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', '1');
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                }
                catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                }
            }
            return isEnabled;
        })();
    }
    // Trusts the HTML in order to show CSS styles
    get tipWithStyles() {
        if (!this._tipWithStyles || this._lastTipStyled !== this.tip) {
            this._tipWithStyles = this.sanitizer.bypassSecurityTrustHtml(this.tip);
            this._lastTipStyled = this.tip;
        }
        return this._tipWithStyles;
    }
    ngOnInit() {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            const storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }
    hideTip() {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellElement, deps: [{ token: i1.NovoLabelService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTipWellElement, isStandalone: false, selector: "novo-tip-well", inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", icon: "icon", sanitize: "sanitize" }, outputs: { confirmed: "confirmed" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0, template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p *ngIf="(sanitize && !tip.length) || (!sanitize && !tipWithStyles)" [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, isInline: true, styles: [":host.active{display:inline-block;margin-bottom:1rem}:host>div{display:inline-block;border-radius:.25rem;background-color:var(--background-main, #f7f7f7);color:var(--text-main, #3d464d);padding:1.25rem;text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-top:.3rem;margin-right:1rem;color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:1.3rem}:host>div>div>p.text-size-xs{font-size:1rem}:host>div>div>p.text-size-sm{font-size:1.2rem}:host>div>div>p.text-size-md{font-size:1.3rem}:host>div>div>p.text-size-lg{font-size:1.6rem}:host>div>div>p.text-size-xl{font-size:2rem}:host>div>div>p.text-size-2xl{font-size:2.6rem}:host>div>div>p.text-size-3xl{font-size:3.2rem}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-black{color:#000}:host>div>div>p.text-color-white{color:#fff}:host>div>div>p.text-color-gray{color:#9e9e9e}:host>div>div>p.text-color-grey{color:#9e9e9e}:host>div>div>p.text-color-offWhite{color:#f7f7f7}:host>div>div>p.text-color-bright{color:#f7f7f7}:host>div>div>p.text-color-light{color:#dbdbdb}:host>div>div>p.text-color-neutral{color:#4f5361}:host>div>div>p.text-color-dark{color:#3d464d}:host>div>div>p.text-color-orange{color:#ff6900}:host>div>div>p.text-color-navigation{color:#202945}:host>div>div>p.text-color-skyBlue{color:#009bdf}:host>div>div>p.text-color-steel{color:#5b6770}:host>div>div>p.text-color-metal{color:#637893}:host>div>div>p.text-color-sand{color:#f4f4f4}:host>div>div>p.text-color-silver{color:#e2e2e2}:host>div>div>p.text-color-stone{color:#bebebe}:host>div>div>p.text-color-ash{color:#a0a0a0}:host>div>div>p.text-color-slate{color:#707070}:host>div>div>p.text-color-onyx{color:#526980}:host>div>div>p.text-color-charcoal{color:#282828}:host>div>div>p.text-color-moonlight{color:#1a242f}:host>div>div>p.text-color-midnight{color:#202945}:host>div>div>p.text-color-darkness{color:#161f27}:host>div>div>p.text-color-navy{color:#0d2d42}:host>div>div>p.text-color-aqua{color:#3bafda}:host>div>div>p.text-color-ocean{color:#4a89dc}:host>div>div>p.text-color-mint{color:#37bc9b}:host>div>div>p.text-color-grass{color:#8cc152}:host>div>div>p.text-color-sunflower{color:#f6b042}:host>div>div>p.text-color-bittersweet{color:#eb6845}:host>div>div>p.text-color-grapefruit{color:#da4453}:host>div>div>p.text-color-carnation{color:#d770ad}:host>div>div>p.text-color-lavender{color:#967adc}:host>div>div>p.text-color-mountain{color:#9678b6}:host>div>div>p.text-color-info{color:#4a89dc}:host>div>div>p.text-color-positive{color:#4a89dc}:host>div>div>p.text-color-success{color:#8cc152}:host>div>div>p.text-color-negative{color:#da4453}:host>div>div>p.text-color-danger{color:#da4453}:host>div>div>p.text-color-error{color:#da4453}:host>div>div>p.text-color-warning{color:#f6b042}:host>div>div>p.text-color-empty{color:#cccdcc}:host>div>div>p.text-color-disabled{color:#bebebe}:host>div>div>p.text-color-background{color:#f7f7f7}:host>div>div>p.text-color-backgroundDark{color:#e2e2e2}:host>div>div>p.text-color-presentation{color:#5b6770}:host>div>div>p.text-color-bullhorn{color:#ff6900}:host>div>div>p.text-color-pulse{color:#3bafda}:host>div>div>p.text-color-company{color:#39d}:host>div>div>p.text-color-candidate{color:#4b7}:host>div>div>p.text-color-lead{color:#a69}:host>div>div>p.text-color-contact{color:#fa4}:host>div>div>p.text-color-clientcontact{color:#fa4}:host>div>div>p.text-color-opportunity{color:#625}:host>div>div>p.text-color-job{color:#b56}:host>div>div>p.text-color-joborder{color:#b56}:host>div>div>p.text-color-submission{color:#a9adbb}:host>div>div>p.text-color-sendout{color:#747884}:host>div>div>p.text-color-placement{color:#0b344f}:host>div>div>p.text-color-note{color:#747884}:host>div>div>p.text-color-contract{color:#454ea0}:host>div>div>p.text-color-task{color:#4f5361}:host>div>div>p.text-color-jobCode{color:#696d79}:host>div>div>p.text-color-earnCode{color:#696d79}:host>div>div>p.text-color-invoiceStatement{color:#696d79}:host>div>div>p.text-color-billableCharge{color:#696d79}:host>div>div>p.text-color-payableCharge{color:#696d79}:host>div>div>p.text-color-user{color:#696d79}:host>div>div>p.text-color-corporateUser{color:#696d79}:host>div>div>p.text-color-distributionList{color:#696d79}:host>div>div>p.text-color-credential{color:#696d79}:host>div>div>p.text-color-person{color:#696d79}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:100}:host>div>div>p.text-weight-thin{font-weight:200}:host>div>div>p.text-weight-light{font-weight:300}:host>div>div>p.text-weight-normal{font-weight:400}:host>div>div>p.text-weight-medium{font-weight:500}:host>div>div>p.text-weight-semibold{font-weight:600}:host>div>div>p.text-weight-bold{font-weight:700}:host>div>div>p.text-weight-extrabold{font-weight:800}:host>div>div>p.text-weight-heavy{font-weight:900}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tip-well', template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p *ngIf="(sanitize && !tip.length) || (!sanitize && !tipWithStyles)" [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, host: {
                        '[class.active]': 'isActive',
                    }, standalone: false, styles: [":host.active{display:inline-block;margin-bottom:1rem}:host>div{display:inline-block;border-radius:.25rem;background-color:var(--background-main, #f7f7f7);color:var(--text-main, #3d464d);padding:1.25rem;text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-top:.3rem;margin-right:1rem;color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:1.3rem}:host>div>div>p.text-size-xs{font-size:1rem}:host>div>div>p.text-size-sm{font-size:1.2rem}:host>div>div>p.text-size-md{font-size:1.3rem}:host>div>div>p.text-size-lg{font-size:1.6rem}:host>div>div>p.text-size-xl{font-size:2rem}:host>div>div>p.text-size-2xl{font-size:2.6rem}:host>div>div>p.text-size-3xl{font-size:3.2rem}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-black{color:#000}:host>div>div>p.text-color-white{color:#fff}:host>div>div>p.text-color-gray{color:#9e9e9e}:host>div>div>p.text-color-grey{color:#9e9e9e}:host>div>div>p.text-color-offWhite{color:#f7f7f7}:host>div>div>p.text-color-bright{color:#f7f7f7}:host>div>div>p.text-color-light{color:#dbdbdb}:host>div>div>p.text-color-neutral{color:#4f5361}:host>div>div>p.text-color-dark{color:#3d464d}:host>div>div>p.text-color-orange{color:#ff6900}:host>div>div>p.text-color-navigation{color:#202945}:host>div>div>p.text-color-skyBlue{color:#009bdf}:host>div>div>p.text-color-steel{color:#5b6770}:host>div>div>p.text-color-metal{color:#637893}:host>div>div>p.text-color-sand{color:#f4f4f4}:host>div>div>p.text-color-silver{color:#e2e2e2}:host>div>div>p.text-color-stone{color:#bebebe}:host>div>div>p.text-color-ash{color:#a0a0a0}:host>div>div>p.text-color-slate{color:#707070}:host>div>div>p.text-color-onyx{color:#526980}:host>div>div>p.text-color-charcoal{color:#282828}:host>div>div>p.text-color-moonlight{color:#1a242f}:host>div>div>p.text-color-midnight{color:#202945}:host>div>div>p.text-color-darkness{color:#161f27}:host>div>div>p.text-color-navy{color:#0d2d42}:host>div>div>p.text-color-aqua{color:#3bafda}:host>div>div>p.text-color-ocean{color:#4a89dc}:host>div>div>p.text-color-mint{color:#37bc9b}:host>div>div>p.text-color-grass{color:#8cc152}:host>div>div>p.text-color-sunflower{color:#f6b042}:host>div>div>p.text-color-bittersweet{color:#eb6845}:host>div>div>p.text-color-grapefruit{color:#da4453}:host>div>div>p.text-color-carnation{color:#d770ad}:host>div>div>p.text-color-lavender{color:#967adc}:host>div>div>p.text-color-mountain{color:#9678b6}:host>div>div>p.text-color-info{color:#4a89dc}:host>div>div>p.text-color-positive{color:#4a89dc}:host>div>div>p.text-color-success{color:#8cc152}:host>div>div>p.text-color-negative{color:#da4453}:host>div>div>p.text-color-danger{color:#da4453}:host>div>div>p.text-color-error{color:#da4453}:host>div>div>p.text-color-warning{color:#f6b042}:host>div>div>p.text-color-empty{color:#cccdcc}:host>div>div>p.text-color-disabled{color:#bebebe}:host>div>div>p.text-color-background{color:#f7f7f7}:host>div>div>p.text-color-backgroundDark{color:#e2e2e2}:host>div>div>p.text-color-presentation{color:#5b6770}:host>div>div>p.text-color-bullhorn{color:#ff6900}:host>div>div>p.text-color-pulse{color:#3bafda}:host>div>div>p.text-color-company{color:#39d}:host>div>div>p.text-color-candidate{color:#4b7}:host>div>div>p.text-color-lead{color:#a69}:host>div>div>p.text-color-contact{color:#fa4}:host>div>div>p.text-color-clientcontact{color:#fa4}:host>div>div>p.text-color-opportunity{color:#625}:host>div>div>p.text-color-job{color:#b56}:host>div>div>p.text-color-joborder{color:#b56}:host>div>div>p.text-color-submission{color:#a9adbb}:host>div>div>p.text-color-sendout{color:#747884}:host>div>div>p.text-color-placement{color:#0b344f}:host>div>div>p.text-color-note{color:#747884}:host>div>div>p.text-color-contract{color:#454ea0}:host>div>div>p.text-color-task{color:#4f5361}:host>div>div>p.text-color-jobCode{color:#696d79}:host>div>div>p.text-color-earnCode{color:#696d79}:host>div>div>p.text-color-invoiceStatement{color:#696d79}:host>div>div>p.text-color-billableCharge{color:#696d79}:host>div>div>p.text-color-payableCharge{color:#696d79}:host>div>div>p.text-color-user{color:#696d79}:host>div>div>p.text-color-corporateUser{color:#696d79}:host>div>div>p.text-color-distributionList{color:#696d79}:host>div>div>p.text-color-credential{color:#696d79}:host>div>div>p.text-color-person{color:#696d79}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:100}:host>div>div>p.text-weight-thin{font-weight:200}:host>div>div>p.text-weight-light{font-weight:300}:host>div>div>p.text-weight-normal{font-weight:400}:host>div>div>p.text-weight-medium{font-weight:500}:host>div>div>p.text-weight-semibold{font-weight:600}:host>div>div>p.text-weight-bold{font-weight:700}:host>div>div>p.text-weight-extrabold{font-weight:800}:host>div>div>p.text-weight-heavy{font-weight:900}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i2.DomSanitizer }], propDecorators: { name: [{
                type: Input
            }], tip: [{
                type: Input
            }], buttonText: [{
                type: Input
            }], button: [{
                type: Input
            }], icon: [{
                type: Input
            }], sanitize: [{
                type: Input
            }], confirmed: [{
                type: Output
            }] } });

// NG2
class NovoTipWellModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellModule, declarations: [NovoTipWellElement], imports: [CommonModule, NovoButtonModule], exports: [NovoTipWellElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellModule, imports: [CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTipWellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoTipWellElement],
                    exports: [NovoTipWellElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTipWellElement, NovoTipWellModule };
//# sourceMappingURL=novo-elements-elements-tip-well.mjs.map
