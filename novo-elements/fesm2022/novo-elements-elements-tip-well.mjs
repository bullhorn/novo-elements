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
        this.variant = 'default';
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
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Apply variant defaults
        if (this.variant === 'icon') {
            this.buttonTheme = this.buttonTheme || 'icon';
            this.buttonSize = this.buttonSize || 'small';
            this.buttonText = this.buttonText || '';
        }
        else {
            this.buttonTheme = this.buttonTheme || 'dialogue';
            this.buttonSize = this.buttonSize || 'small';
            this.buttonText = this.buttonText || this.labels.okGotIt;
        }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellElement, deps: [{ token: i1.NovoLabelService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoTipWellElement, isStandalone: false, selector: "novo-tip-well", inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", buttonIcon: "buttonIcon", icon: "icon", sanitize: "sanitize", variant: "variant", buttonTheme: "buttonTheme", buttonSize: "buttonSize" }, outputs: { confirmed: "confirmed" }, host: { properties: { "class.active": "isActive", "attr.data-variant": "variant" } }, ngImport: i0, template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p *ngIf="(sanitize && !tip.length) || (!sanitize && !tipWithStyles)" [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button [theme]="buttonTheme" [size]="buttonSize" [icon]="buttonIcon" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, isInline: true, styles: [":host.active{display:inline-block;margin-bottom:var(--spacing-md)}:host>div{display:inline-block;border-radius:var(--border-radius-sm);background-color:var(--background-main, #f7f7f7);color:var(--text-main, #3d464d);padding:var(--spacing-lg);text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-right:var(--spacing-md);color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:var(--font-size-body)}:host>div>div>p.text-size-xs{font-size:var(--font-size-xs)}:host>div>div>p.text-size-sm{font-size:var(--font-size-sm)}:host>div>div>p.text-size-md{font-size:var(--font-size-md)}:host>div>div>p.text-size-lg{font-size:var(--font-size-lg)}:host>div>div>p.text-size-xl{font-size:var(--font-size-xl)}:host>div>div>p.text-size-2xl{font-size:var(--font-size-2xl)}:host>div>div>p.text-size-3xl{font-size:var(--font-size-3xl)}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-black{color:var(--color-black)}:host>div>div>p.text-color-white{color:var(--color-white)}:host>div>div>p.text-color-gray{color:var(--color-gray)}:host>div>div>p.text-color-grey{color:var(--color-grey)}:host>div>div>p.text-color-offWhite{color:var(--color-off-white)}:host>div>div>p.text-color-bright{color:var(--color-bright)}:host>div>div>p.text-color-light{color:var(--color-light)}:host>div>div>p.text-color-neutral{color:var(--color-neutral)}:host>div>div>p.text-color-dark{color:var(--color-dark)}:host>div>div>p.text-color-orange{color:var(--color-orange)}:host>div>div>p.text-color-navigation{color:var(--color-navigation)}:host>div>div>p.text-color-skyBlue{color:var(--color-sky-blue)}:host>div>div>p.text-color-steel{color:var(--color-steel)}:host>div>div>p.text-color-metal{color:var(--color-metal)}:host>div>div>p.text-color-sand{color:var(--color-sand)}:host>div>div>p.text-color-silver{color:var(--color-silver)}:host>div>div>p.text-color-stone{color:var(--color-stone)}:host>div>div>p.text-color-ash{color:var(--color-ash)}:host>div>div>p.text-color-anonymous{color:var(--color-anonymous)}:host>div>div>p.text-color-slate{color:var(--color-slate)}:host>div>div>p.text-color-onyx{color:var(--color-onyx)}:host>div>div>p.text-color-charcoal{color:var(--color-charcoal)}:host>div>div>p.text-color-moonlight{color:var(--color-moonlight)}:host>div>div>p.text-color-midnight{color:var(--color-midnight)}:host>div>div>p.text-color-darkness{color:var(--color-darkness)}:host>div>div>p.text-color-navy{color:var(--color-navy)}:host>div>div>p.text-color-aqua{color:var(--color-aqua)}:host>div>div>p.text-color-ocean{color:var(--color-ocean)}:host>div>div>p.text-color-mint{color:var(--color-mint)}:host>div>div>p.text-color-grass{color:var(--color-grass)}:host>div>div>p.text-color-sunflower{color:var(--color-sunflower)}:host>div>div>p.text-color-bittersweet{color:var(--color-bittersweet)}:host>div>div>p.text-color-grapefruit{color:var(--color-grapefruit)}:host>div>div>p.text-color-carnation{color:var(--color-carnation)}:host>div>div>p.text-color-lavender{color:var(--color-lavender)}:host>div>div>p.text-color-mountain{color:var(--color-mountain)}:host>div>div>p.text-color-info{color:var(--color-info)}:host>div>div>p.text-color-positive{color:var(--color-positive)}:host>div>div>p.text-color-success{color:var(--color-success)}:host>div>div>p.text-color-negative{color:var(--color-negative)}:host>div>div>p.text-color-danger{color:var(--color-danger)}:host>div>div>p.text-color-error{color:var(--color-error)}:host>div>div>p.text-color-warning{color:var(--color-warning)}:host>div>div>p.text-color-empty{color:var(--color-empty)}:host>div>div>p.text-color-disabled{color:var(--color-disabled)}:host>div>div>p.text-color-background{color:var(--color-background)}:host>div>div>p.text-color-backgroundDark{color:var(--color-background-dark)}:host>div>div>p.text-color-border{color:var(--color-border)}:host>div>div>p.text-color-border2{color:var(--color-border2)}:host>div>div>p.text-color-text{color:var(--color-text)}:host>div>div>p.text-color-presentation{color:var(--color-presentation)}:host>div>div>p.text-color-bullhorn{color:var(--color-bullhorn)}:host>div>div>p.text-color-pulse{color:var(--color-pulse)}:host>div>div>p.text-color-fastFind{color:var(--color-fast-find)}:host>div>div>p.text-color-toast{color:var(--color-toast)}:host>div>div>p.text-color-company{color:var(--color-company)}:host>div>div>p.text-color-candidate{color:var(--color-candidate)}:host>div>div>p.text-color-lead{color:var(--color-lead)}:host>div>div>p.text-color-contact{color:var(--color-contact)}:host>div>div>p.text-color-clientcontact{color:var(--color-clientcontact)}:host>div>div>p.text-color-opportunity{color:var(--color-opportunity)}:host>div>div>p.text-color-job{color:var(--color-job)}:host>div>div>p.text-color-joborder{color:var(--color-joborder)}:host>div>div>p.text-color-submission{color:var(--color-submission)}:host>div>div>p.text-color-sendout{color:var(--color-sendout)}:host>div>div>p.text-color-placement{color:var(--color-placement)}:host>div>div>p.text-color-note{color:var(--color-note)}:host>div>div>p.text-color-contract{color:var(--color-contract)}:host>div>div>p.text-color-task{color:var(--color-task)}:host>div>div>p.text-color-jobCode{color:var(--color-job-code)}:host>div>div>p.text-color-earnCode{color:var(--color-earn-code)}:host>div>div>p.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>div>div>p.text-color-billableCharge{color:var(--color-billable-charge)}:host>div>div>p.text-color-payableCharge{color:var(--color-payable-charge)}:host>div>div>p.text-color-user{color:var(--color-user)}:host>div>div>p.text-color-corporateUser{color:var(--color-corporate-user)}:host>div>div>p.text-color-distributionList{color:var(--color-distribution-list)}:host>div>div>p.text-color-credential{color:var(--color-credential)}:host>div>div>p.text-color-person{color:var(--color-person)}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>div>div>p.text-weight-thin{font-weight:var(--font-weight-thin)}:host>div>div>p.text-weight-light{font-weight:var(--font-weight-light)}:host>div>div>p.text-weight-normal{font-weight:var(--font-weight-normal)}:host>div>div>p.text-weight-medium{font-weight:var(--font-weight-medium)}:host>div>div>p.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>div>div>p.text-weight-bold{font-weight:var(--font-weight-bold)}:host>div>div>p.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>div>div>p.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}:host[data-variant=icon]{margin:0 auto 0 var(--spacing-lg);pointer-events:auto;cursor:default}:host[data-variant=icon]>div{display:inline-flex;align-items:center;padding:var(--spacing-sm) var(--spacing-md);border-radius:var(--border-radius-md);border:.0625rem solid var(--tip-well-icon-border-color, #0066cc);background-color:var(--tip-well-icon-background-color, #f0f4ff);text-align:center}:host[data-variant=icon]>div i{color:#282828!important;margin-right:0}:host[data-variant=icon]>div p{display:none}:host[data-variant=icon]>div button{margin-left:var(--spacing-md);color:#282828}:host-context([data-theme=bh2026])>div{border-radius:4px;border:1px solid var(--color-border-default);color:var(--color-text-body);overflow:clip}:host-context([data-theme=bh2026])>div>div>p{line-height:var(--typography-body-default-line-height, 20px)}:host-context([data-theme=bh2026])>div>button{font-size:var(--typography-button-sm-font-size, 12px)}:host-context([data-theme=bh2026])[data-variant=subtle]>div{background-color:var(--background-muted)}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellElement, decorators: [{
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
      <button [theme]="buttonTheme" [size]="buttonSize" [icon]="buttonIcon" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, host: {
                        '[class.active]': 'isActive',
                        '[attr.data-variant]': 'variant',
                    }, standalone: false, styles: [":host.active{display:inline-block;margin-bottom:var(--spacing-md)}:host>div{display:inline-block;border-radius:var(--border-radius-sm);background-color:var(--background-main, #f7f7f7);color:var(--text-main, #3d464d);padding:var(--spacing-lg);text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-right:var(--spacing-md);color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:var(--font-size-body)}:host>div>div>p.text-size-xs{font-size:var(--font-size-xs)}:host>div>div>p.text-size-sm{font-size:var(--font-size-sm)}:host>div>div>p.text-size-md{font-size:var(--font-size-md)}:host>div>div>p.text-size-lg{font-size:var(--font-size-lg)}:host>div>div>p.text-size-xl{font-size:var(--font-size-xl)}:host>div>div>p.text-size-2xl{font-size:var(--font-size-2xl)}:host>div>div>p.text-size-3xl{font-size:var(--font-size-3xl)}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-black{color:var(--color-black)}:host>div>div>p.text-color-white{color:var(--color-white)}:host>div>div>p.text-color-gray{color:var(--color-gray)}:host>div>div>p.text-color-grey{color:var(--color-grey)}:host>div>div>p.text-color-offWhite{color:var(--color-off-white)}:host>div>div>p.text-color-bright{color:var(--color-bright)}:host>div>div>p.text-color-light{color:var(--color-light)}:host>div>div>p.text-color-neutral{color:var(--color-neutral)}:host>div>div>p.text-color-dark{color:var(--color-dark)}:host>div>div>p.text-color-orange{color:var(--color-orange)}:host>div>div>p.text-color-navigation{color:var(--color-navigation)}:host>div>div>p.text-color-skyBlue{color:var(--color-sky-blue)}:host>div>div>p.text-color-steel{color:var(--color-steel)}:host>div>div>p.text-color-metal{color:var(--color-metal)}:host>div>div>p.text-color-sand{color:var(--color-sand)}:host>div>div>p.text-color-silver{color:var(--color-silver)}:host>div>div>p.text-color-stone{color:var(--color-stone)}:host>div>div>p.text-color-ash{color:var(--color-ash)}:host>div>div>p.text-color-anonymous{color:var(--color-anonymous)}:host>div>div>p.text-color-slate{color:var(--color-slate)}:host>div>div>p.text-color-onyx{color:var(--color-onyx)}:host>div>div>p.text-color-charcoal{color:var(--color-charcoal)}:host>div>div>p.text-color-moonlight{color:var(--color-moonlight)}:host>div>div>p.text-color-midnight{color:var(--color-midnight)}:host>div>div>p.text-color-darkness{color:var(--color-darkness)}:host>div>div>p.text-color-navy{color:var(--color-navy)}:host>div>div>p.text-color-aqua{color:var(--color-aqua)}:host>div>div>p.text-color-ocean{color:var(--color-ocean)}:host>div>div>p.text-color-mint{color:var(--color-mint)}:host>div>div>p.text-color-grass{color:var(--color-grass)}:host>div>div>p.text-color-sunflower{color:var(--color-sunflower)}:host>div>div>p.text-color-bittersweet{color:var(--color-bittersweet)}:host>div>div>p.text-color-grapefruit{color:var(--color-grapefruit)}:host>div>div>p.text-color-carnation{color:var(--color-carnation)}:host>div>div>p.text-color-lavender{color:var(--color-lavender)}:host>div>div>p.text-color-mountain{color:var(--color-mountain)}:host>div>div>p.text-color-info{color:var(--color-info)}:host>div>div>p.text-color-positive{color:var(--color-positive)}:host>div>div>p.text-color-success{color:var(--color-success)}:host>div>div>p.text-color-negative{color:var(--color-negative)}:host>div>div>p.text-color-danger{color:var(--color-danger)}:host>div>div>p.text-color-error{color:var(--color-error)}:host>div>div>p.text-color-warning{color:var(--color-warning)}:host>div>div>p.text-color-empty{color:var(--color-empty)}:host>div>div>p.text-color-disabled{color:var(--color-disabled)}:host>div>div>p.text-color-background{color:var(--color-background)}:host>div>div>p.text-color-backgroundDark{color:var(--color-background-dark)}:host>div>div>p.text-color-border{color:var(--color-border)}:host>div>div>p.text-color-border2{color:var(--color-border2)}:host>div>div>p.text-color-text{color:var(--color-text)}:host>div>div>p.text-color-presentation{color:var(--color-presentation)}:host>div>div>p.text-color-bullhorn{color:var(--color-bullhorn)}:host>div>div>p.text-color-pulse{color:var(--color-pulse)}:host>div>div>p.text-color-fastFind{color:var(--color-fast-find)}:host>div>div>p.text-color-toast{color:var(--color-toast)}:host>div>div>p.text-color-company{color:var(--color-company)}:host>div>div>p.text-color-candidate{color:var(--color-candidate)}:host>div>div>p.text-color-lead{color:var(--color-lead)}:host>div>div>p.text-color-contact{color:var(--color-contact)}:host>div>div>p.text-color-clientcontact{color:var(--color-clientcontact)}:host>div>div>p.text-color-opportunity{color:var(--color-opportunity)}:host>div>div>p.text-color-job{color:var(--color-job)}:host>div>div>p.text-color-joborder{color:var(--color-joborder)}:host>div>div>p.text-color-submission{color:var(--color-submission)}:host>div>div>p.text-color-sendout{color:var(--color-sendout)}:host>div>div>p.text-color-placement{color:var(--color-placement)}:host>div>div>p.text-color-note{color:var(--color-note)}:host>div>div>p.text-color-contract{color:var(--color-contract)}:host>div>div>p.text-color-task{color:var(--color-task)}:host>div>div>p.text-color-jobCode{color:var(--color-job-code)}:host>div>div>p.text-color-earnCode{color:var(--color-earn-code)}:host>div>div>p.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>div>div>p.text-color-billableCharge{color:var(--color-billable-charge)}:host>div>div>p.text-color-payableCharge{color:var(--color-payable-charge)}:host>div>div>p.text-color-user{color:var(--color-user)}:host>div>div>p.text-color-corporateUser{color:var(--color-corporate-user)}:host>div>div>p.text-color-distributionList{color:var(--color-distribution-list)}:host>div>div>p.text-color-credential{color:var(--color-credential)}:host>div>div>p.text-color-person{color:var(--color-person)}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>div>div>p.text-weight-thin{font-weight:var(--font-weight-thin)}:host>div>div>p.text-weight-light{font-weight:var(--font-weight-light)}:host>div>div>p.text-weight-normal{font-weight:var(--font-weight-normal)}:host>div>div>p.text-weight-medium{font-weight:var(--font-weight-medium)}:host>div>div>p.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>div>div>p.text-weight-bold{font-weight:var(--font-weight-bold)}:host>div>div>p.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>div>div>p.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}:host[data-variant=icon]{margin:0 auto 0 var(--spacing-lg);pointer-events:auto;cursor:default}:host[data-variant=icon]>div{display:inline-flex;align-items:center;padding:var(--spacing-sm) var(--spacing-md);border-radius:var(--border-radius-md);border:.0625rem solid var(--tip-well-icon-border-color, #0066cc);background-color:var(--tip-well-icon-background-color, #f0f4ff);text-align:center}:host[data-variant=icon]>div i{color:#282828!important;margin-right:0}:host[data-variant=icon]>div p{display:none}:host[data-variant=icon]>div button{margin-left:var(--spacing-md);color:#282828}:host-context([data-theme=bh2026])>div{border-radius:4px;border:1px solid var(--color-border-default);color:var(--color-text-body);overflow:clip}:host-context([data-theme=bh2026])>div>div>p{line-height:var(--typography-body-default-line-height, 20px)}:host-context([data-theme=bh2026])>div>button{font-size:var(--typography-button-sm-font-size, 12px)}:host-context([data-theme=bh2026])[data-variant=subtle]>div{background-color:var(--background-muted)}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i2.DomSanitizer }], propDecorators: { name: [{
                type: Input
            }], tip: [{
                type: Input
            }], buttonText: [{
                type: Input
            }], button: [{
                type: Input
            }], buttonIcon: [{
                type: Input
            }], icon: [{
                type: Input
            }], sanitize: [{
                type: Input
            }], variant: [{
                type: Input
            }], buttonTheme: [{
                type: Input
            }], buttonSize: [{
                type: Input
            }], confirmed: [{
                type: Output
            }] } });

// NG2
class NovoTipWellModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellModule, declarations: [NovoTipWellElement], imports: [CommonModule, NovoButtonModule], exports: [NovoTipWellElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellModule, imports: [CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTipWellModule, decorators: [{
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
