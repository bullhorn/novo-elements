import * as i0 from '@angular/core';
import { Component, Input, EventEmitter, Output, HostBinding, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i5 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i6 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import * as i7 from 'novo-elements/elements/common';
import { NovoCommonModule } from 'novo-elements/elements/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class CardActionsElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardActionsElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: CardActionsElement, isStandalone: false, selector: "novo-card-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardActionsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-card-actions',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                }]
        }] });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
class CardContentElement {
    constructor() {
        this.condensed = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardContentElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: CardContentElement, isStandalone: false, selector: "novo-card-content, [novo-card-content], [novoCardContent]", inputs: { condensed: "condensed" }, host: { properties: { "class.condensed": "condensed" }, classAttribute: "novo-card-content" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block}:host:not(.condensed){padding:var(--spacing-md)}:root[data-theme=bh2026] :host:not(.condensed){padding-inline:var(--spacing-gutter)}\n"] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-content, [novo-card-content], [novoCardContent]', host: { class: 'novo-card-content', '[class.condensed]': 'condensed' }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{display:block}:host:not(.condensed){padding:var(--spacing-md)}:root[data-theme=bh2026] :host:not(.condensed){padding-inline:var(--spacing-gutter)}\n"] }]
        }], propDecorators: { condensed: [{
                type: Input
            }] } });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
class CardHeaderElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: CardHeaderElement, isStandalone: false, selector: "novo-card-header, [novo-card-header], [novoCardHeader]", host: { classAttribute: "novo-card-header" }, ngImport: i0, template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `, isInline: true, styles: [":host{padding:var(--spacing-md) var(--spacing-md) 0 var(--spacing-md);display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md)}:host[color=border-default]{background:#dbdbdb}:host[color=black]{color:var(--color-contrast-black);background:#000}:host[color=white]{color:var(--color-contrast-white);background:#fff}:host[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host[color=metal]{color:var(--color-contrast-metal);background:#637893}:host[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host[color=slate]{color:var(--color-contrast-slate);background:#707070}:host[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host[color=success]{color:var(--color-contrast-success);background:#8cc152}:host[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host[color=error]{color:var(--color-contrast-error);background:#da4453}:host[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host[color=text]{color:var(--color-contrast-text);background:#282828}:host[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host[color=company]{color:var(--color-contrast-company);background:#39d}:host[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host[color=lead]{color:var(--color-contrast-lead);background:#a69}:host[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host[color=job]{color:var(--color-contrast-job);background:#b56}:host[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host[color=note]{color:var(--color-contrast-note);background:#747884}:host[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host[color=task]{color:var(--color-contrast-task);background:#4f5361}:host[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host[color=user]{color:var(--color-contrast-user);background:#696d79}:host[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host[color=person]{color:var(--color-contrast-person);background:#696d79}:root[data-theme=bh2026] :host{padding:var(--spacing-padding-md) var(--spacing-padding-md) 0 var(--spacing-gutter);gap:0}:root[data-theme=bh2026] :host .card-move-handle{transition:color .3s ease-in-out}:root[data-theme=bh2026] :host:not(:hover) .card-move-handle{color:transparent}:root[data-theme=bh2026] :host .novo-card-header-text{font-size:var(--typography-card-header-font-size, 1.8rem);font-weight:var(--typography-card-header-font-weight, 500)}:root[data-theme=bh2026] :host .novo-card-header-text ::ng-deep novo-title{font:inherit}:host .novo-card-header-text{flex:1 1 0px}:root[data-theme=bh2026] :host .novo-card-header-text{padding-inline-start:var(--spacing-padding-sm)}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardHeaderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-header, [novo-card-header], [novoCardHeader]', host: { class: 'novo-card-header' }, template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `, standalone: false, styles: [":host{padding:var(--spacing-md) var(--spacing-md) 0 var(--spacing-md);display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md)}:host[color=border-default]{background:#dbdbdb}:host[color=black]{color:var(--color-contrast-black);background:#000}:host[color=white]{color:var(--color-contrast-white);background:#fff}:host[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host[color=metal]{color:var(--color-contrast-metal);background:#637893}:host[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host[color=slate]{color:var(--color-contrast-slate);background:#707070}:host[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host[color=success]{color:var(--color-contrast-success);background:#8cc152}:host[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host[color=error]{color:var(--color-contrast-error);background:#da4453}:host[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host[color=text]{color:var(--color-contrast-text);background:#282828}:host[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host[color=company]{color:var(--color-contrast-company);background:#39d}:host[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host[color=lead]{color:var(--color-contrast-lead);background:#a69}:host[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host[color=job]{color:var(--color-contrast-job);background:#b56}:host[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host[color=note]{color:var(--color-contrast-note);background:#747884}:host[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host[color=task]{color:var(--color-contrast-task);background:#4f5361}:host[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host[color=user]{color:var(--color-contrast-user);background:#696d79}:host[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host[color=person]{color:var(--color-contrast-person);background:#696d79}:root[data-theme=bh2026] :host{padding:var(--spacing-padding-md) var(--spacing-padding-md) 0 var(--spacing-gutter);gap:0}:root[data-theme=bh2026] :host .card-move-handle{transition:color .3s ease-in-out}:root[data-theme=bh2026] :host:not(:hover) .card-move-handle{color:transparent}:root[data-theme=bh2026] :host .novo-card-header-text{font-size:var(--typography-card-header-font-size, 1.8rem);font-weight:var(--typography-card-header-font-weight, 500)}:root[data-theme=bh2026] :host .novo-card-header-text ::ng-deep novo-title{font:inherit}:host .novo-card-header-text{flex:1 1 0px}:root[data-theme=bh2026] :host .novo-card-header-text{padding-inline-start:var(--spacing-padding-sm)}\n"] }]
        }] });
class CardFooterElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: CardFooterElement, isStandalone: false, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md);display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md)}:host[color=border-default]{background:#dbdbdb}:host[color=black]{color:var(--color-contrast-black);background:#000}:host[color=white]{color:var(--color-contrast-white);background:#fff}:host[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host[color=metal]{color:var(--color-contrast-metal);background:#637893}:host[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host[color=slate]{color:var(--color-contrast-slate);background:#707070}:host[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host[color=success]{color:var(--color-contrast-success);background:#8cc152}:host[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host[color=error]{color:var(--color-contrast-error);background:#da4453}:host[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host[color=text]{color:var(--color-contrast-text);background:#282828}:host[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host[color=company]{color:var(--color-contrast-company);background:#39d}:host[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host[color=lead]{color:var(--color-contrast-lead);background:#a69}:host[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host[color=job]{color:var(--color-contrast-job);background:#b56}:host[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host[color=note]{color:var(--color-contrast-note);background:#747884}:host[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host[color=task]{color:var(--color-contrast-task);background:#4f5361}:host[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host[color=user]{color:var(--color-contrast-user);background:#696d79}:host[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host[color=person]{color:var(--color-contrast-person);background:#696d79}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]', host: { class: 'novo-card-footer' }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md);display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md)}:host[color=border-default]{background:#dbdbdb}:host[color=black]{color:var(--color-contrast-black);background:#000}:host[color=white]{color:var(--color-contrast-white);background:#fff}:host[color=gray]{color:var(--color-contrast-gray);background:#9e9e9e}:host[color=grey]{color:var(--color-contrast-grey);background:#9e9e9e}:host[color=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}:host[color=bright]{color:var(--color-contrast-bright);background:#f7f7f7}:host[color=light]{color:var(--color-contrast-light);background:#dbdbdb}:host[color=neutral]{color:var(--color-contrast-neutral);background:#4f5361}:host[color=dark]{color:var(--color-contrast-dark);background:#3d464d}:host[color=orange]{color:var(--color-contrast-orange);background:#ff6900}:host[color=navigation]{color:var(--color-contrast-navigation);background:#202945}:host[color=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}:host[color=steel]{color:var(--color-contrast-steel);background:#5b6770}:host[color=metal]{color:var(--color-contrast-metal);background:#637893}:host[color=sand]{color:var(--color-contrast-sand);background:#f4f4f4}:host[color=silver]{color:var(--color-contrast-silver);background:#e2e2e2}:host[color=stone]{color:var(--color-contrast-stone);background:#bebebe}:host[color=ash]{color:var(--color-contrast-ash);background:#a0a0a0}:host[color=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}:host[color=slate]{color:var(--color-contrast-slate);background:#707070}:host[color=onyx]{color:var(--color-contrast-onyx);background:#526980}:host[color=charcoal]{color:var(--color-contrast-charcoal);background:#282828}:host[color=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}:host[color=midnight]{color:var(--color-contrast-midnight);background:#202945}:host[color=darkness]{color:var(--color-contrast-darkness);background:#161f27}:host[color=navy]{color:var(--color-contrast-navy);background:#0d2d42}:host[color=aqua]{color:var(--color-contrast-aqua);background:#3bafda}:host[color=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}:host[color=mint]{color:var(--color-contrast-mint);background:#37bc9b}:host[color=grass]{color:var(--color-contrast-grass);background:#8cc152}:host[color=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}:host[color=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}:host[color=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}:host[color=carnation]{color:var(--color-contrast-carnation);background:#d770ad}:host[color=lavender]{color:var(--color-contrast-lavender);background:#967adc}:host[color=mountain]{color:var(--color-contrast-mountain);background:#9678b6}:host[color=info]{color:var(--color-contrast-info);background:#4a89dc}:host[color=positive]{color:var(--color-contrast-positive);background:#4a89dc}:host[color=success]{color:var(--color-contrast-success);background:#8cc152}:host[color=negative]{color:var(--color-contrast-negative);background:#da4453}:host[color=danger]{color:var(--color-contrast-danger);background:#da4453}:host[color=error]{color:var(--color-contrast-error);background:#da4453}:host[color=warning]{color:var(--color-contrast-warning);background:#f6b042}:host[color=empty]{color:var(--color-contrast-empty);background:#cccdcc}:host[color=disabled]{color:var(--color-contrast-disabled);background:#bebebe}:host[color=background]{color:var(--color-contrast-background);background:#f7f7f7}:host[color=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}:host[color=border]{color:var(--color-contrast-border);background:#dbdbdb}:host[color=border2]{color:var(--color-contrast-border2);background:#f7f7f7}:host[color=text]{color:var(--color-contrast-text);background:#282828}:host[color=presentation]{color:var(--color-contrast-presentation);background:#5b6770}:host[color=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}:host[color=pulse]{color:var(--color-contrast-pulse);background:#3bafda}:host[color=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}:host[color=toast]{color:var(--color-contrast-toast);background:#0d2d42}:host[color=company]{color:var(--color-contrast-company);background:#39d}:host[color=candidate]{color:var(--color-contrast-candidate);background:#4b7}:host[color=lead]{color:var(--color-contrast-lead);background:#a69}:host[color=contact]{color:var(--color-contrast-contact);background:#fa4}:host[color=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}:host[color=opportunity]{color:var(--color-contrast-opportunity);background:#625}:host[color=job]{color:var(--color-contrast-job);background:#b56}:host[color=joborder]{color:var(--color-contrast-joborder);background:#b56}:host[color=submission]{color:var(--color-contrast-submission);background:#a9adbb}:host[color=sendout]{color:var(--color-contrast-sendout);background:#747884}:host[color=placement]{color:var(--color-contrast-placement);background:#0b344f}:host[color=note]{color:var(--color-contrast-note);background:#747884}:host[color=contract]{color:var(--color-contrast-contract);background:#454ea0}:host[color=task]{color:var(--color-contrast-task);background:#4f5361}:host[color=jobCode]{color:var(--color-contrast-job-code);background:#696d79}:host[color=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}:host[color=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}:host[color=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}:host[color=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}:host[color=user]{color:var(--color-contrast-user);background:#696d79}:host[color=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}:host[color=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}:host[color=credential]{color:var(--color-contrast-credential);background:#696d79}:host[color=person]{color:var(--color-contrast-person);background:#696d79}\n"] }]
        }] });
class CardElement {
    get cardClass() {
        return `${this.iconColorClass || ''} novo-card-inset-${this.inset}`;
    }
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.inset = 'none';
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
    }
    ngOnInit() {
        this.config = this.config || {};
    }
    ngOnChanges(changes) {
        this.config = this.config || {};
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').trim().toLowerCase().replace(/\s/g, '-')}-card`;
        const newIcon = this.icon || this.config.icon;
        const newMessageIcon = this.messageIcon || this.config.messageIcon;
        this.iconClass = newIcon ? `bhi-${newIcon}` : null;
        this.messageIconClass = newMessageIcon ? `bhi-${newMessageIcon}` : null;
    }
    toggleClose() {
        if (!this.config.onClose) {
            this.onClose.next();
        }
        else {
            this.config.onClose();
        }
    }
    toggleRefresh() {
        if (!this.config.onRefresh) {
            this.onRefresh.next();
        }
        else {
            this.config.onRefresh();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: CardElement, isStandalone: false, selector: "novo-card", inputs: { padding: "padding", config: "config", title: "title", message: "message", messageIcon: "messageIcon", icon: "icon", iconColorClass: "iconColorClass", iconTooltip: "iconTooltip", refresh: "refresh", close: "close", move: "move", loading: "loading", inline: "inline", inset: "inset" }, outputs: { onClose: "onClose", onRefresh: "onRefresh" }, host: { properties: { "attr.data-automation-id": "cardAutomationId", "class.loading": "loading || config.loading", "class.novo-card-inline": "this.inline", "class": "this.cardClass" }, classAttribute: "novo-card" }, usesOnChanges: true, ngImport: i0, template: `
    <!--Loading-->
    <div class="card-loading-container" *ngIf="loading || config.loading">
      <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
    </div>
    <!--Card Header-->
    <header *ngIf="title || config.title">
      <div class="title">
        <!--Grabber Icon-->
        <novo-icon
          *ngIf="move || config.move"
          tooltip="{{ labels.move }}"
          tooltipPosition="bottom-right"
          class="card-move-handle"
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="iconClass" class="card-flag-icon" [ngClass]="iconClass"></i></span><!--
          --><span class="novo-card-header-text">{{ title || config.title }}</span>
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          [icon]="'refresh-o' | ifBh2026Theme : 'refresh'"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          [icon]="'x' | ifBh2026Theme : 'close-o'"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></novo-button>
      </div>
    </header>
    <!--Content (transcluded)-->
    <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
    <!--Error/Empty Message-->
    <p
      class="card-message"
      *ngIf="!(loading || config.loading) && (message || config.message)"
      [attr.data-automation-id]="cardAutomationId + '-message'"
    >
      <i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span>
    </p>
    <!--Card Footer-->
    <ng-content
      *ngIf="!(loading || config.loading) && !(message || config.message)"
      select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"
    ></ng-content>
  `, isInline: true, styles: [":host{display:flex;flex-flow:column;background-color:var(--background-bright, #fff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:var(--border-radius-round);position:relative;overflow-x:hidden}:root[data-theme=bh2026] :host{--spacing-md: var(--spacing-padding-md)}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;inset:43px 0 0;border-radius:var(--border-radius-round);background-color:var(--background-bright, #fff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:var(--font-color-secondary);margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:var(--font-size-lg);font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:root:not([data-theme=bh2026]) :host header .title i.bhi-info{color:#dbdbdb}:host header .actions{color:hsl(from var(--color-dark) h s calc(l + 15));white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:hsl(from var(--color-grey) h s calc(l + 10))}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:hsl(from var(--color-grey) h s calc(l + 20))}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:var(--spacing-sm)}:host.novo-card-inset-medium{padding:var(--spacing-md)}:host.novo-card-inset-large{padding:var(--spacing-lg)}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:var(--spacing-sm)}:host ::ng-deep [novo-card-image]{width:100%;margin:var(--spacing-md) 0}:host-context([data-theme=bh2026]){border-radius:var(--border-radius-md);border:1px solid var(--color-border-default);box-shadow:0 1px 2px var(--color-transparency-charcoal-08)}:host-context([data-theme=bh2026]) div.card-loading-container{border-radius:var(--border-radius-md)}:host-context([data-theme=bh2026]) header{padding:var(--spacing-padding-md) var(--spacing-padding-lg) var(--spacing-padding-md) 0;border-bottom:1px solid var(--color-border-default)}:host-context([data-theme=bh2026]) header .title{padding-inline:var(--spacing-gutter)}:host-context([data-theme=bh2026]) header .title h1,:host-context([data-theme=bh2026]) header .title h2,:host-context([data-theme=bh2026]) header .title h3{font-size:var(--typography-card-header-font-size, var(--typography-font-size-18));font-weight:var(--typography-card-header-font-weight, var(--typography-font-weight-500))}:host-context([data-theme=bh2026]) header .title h1 ::ng-deep .card-flag-icon,:host-context([data-theme=bh2026]) header .title h2 ::ng-deep .card-flag-icon,:host-context([data-theme=bh2026]) header .title h3 ::ng-deep .card-flag-icon{font-size:var(--font-size-lg);vertical-align:10%}:host-context([data-theme=bh2026]) header .title ::ng-deep i{margin:0}:host-context([data-theme=bh2026]) header .card-move-handle{position:absolute;left:var(--spacing-padding-xxsm);color:var(--color-content-icon, #89909A)}:host-context([data-theme=bh2026]) header .actions{display:flex;align-items:center;gap:var(--spacing-gap-sm)}:host-context([data-theme=bh2026]) header novo-button{color:var(--color-text-subtle)}:host-context([data-theme=bh2026]) header ::ng-deep .novo-card-header-text{padding-inline-start:var(--spacing-padding-sm)}:host-context([data-theme=bh2026]) :host ::ng-deep .card-flag-icon{color:var(--color-content-subtle, #5d7798)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon{color:var(--page-entity-color, var(--color-content-subtle, #5d7798))}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-appointment{color:var(--color-entity-appointment)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-star{color:var(--color-entity-star)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-person{color:var(--color-entity-contact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-company{color:var(--color-entity-company)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-candidate{color:var(--color-entity-candidate)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-navigation{color:var(--color-entity-navigation)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-lead{color:var(--color-entity-lead)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-contact{color:var(--color-entity-contact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-clientcontact{color:var(--color-entity-clientcontact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-opportunity{color:var(--color-entity-opportunity)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-job{color:var(--color-entity-job)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-joborder{color:var(--color-entity-joborder)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-submission{color:var(--color-entity-submission)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-sendout{color:var(--color-entity-sendout)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-placement{color:var(--color-entity-placement)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-note{color:var(--color-entity-note)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-task{color:var(--color-entity-task)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-distributionList{color:var(--color-entity-distributionList)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-credential{color:var(--color-entity-credential)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-user{color:var(--color-entity-user)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-corporateuser{color:var(--color-entity-corporateuser)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-neutral{color:var(--color-entity-neutral)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-contract{color:var(--color-entity-contract)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-jobCode{color:var(--color-entity-jobCode)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-earnCode{color:var(--color-entity-earnCode)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-billableCharge{color:var(--color-entity-billableCharge)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-payableCharge{color:var(--color-entity-payableCharge)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-complianceManager{color:var(--color-entity-complianceManager)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-invoiceStatement{color:var(--color-entity-invoiceStatement)}:host-context([data-theme=bh2026]) :host.icon-color-parent ::ng-deep .card-flag-icon{color:var(--page-entity-color)}:host-context([data-theme=bh2026]) :host .novo-card-header{padding-inline-start:var(--spacing-gutter)}:host-context([data-theme=bh2026]) :host ::ng-deep .card-move-handle{position:absolute;left:var(--spacing-padding-xxsm);color:var(--color-content-icon, #89909A);transition:color .3s ease-in-out}:host-context([data-theme=bh2026]) :host header ::ng-deep:not(:hover) .card-move-handle,:host-context([data-theme=bh2026]) :host ::ng-deep .novo-card-header:not(:hover) .card-move-handle{color:transparent}:host-context([data-theme=bh2026]) :host header ::ng-deep .novo-icon.card-move-handle i,:host-context([data-theme=bh2026]) :host ::ng-deep .novo-card-header .novo-icon.card-move-handle i{color:inherit}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "directive", type: i6.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "pipe", type: i7.If2026ThemePipe, name: "ifBh2026Theme" }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: CardElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card', host: {
                        class: 'novo-card',
                        '[attr.data-automation-id]': 'cardAutomationId',
                        '[class.loading]': 'loading || config.loading',
                    }, template: `
    <!--Loading-->
    <div class="card-loading-container" *ngIf="loading || config.loading">
      <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
    </div>
    <!--Card Header-->
    <header *ngIf="title || config.title">
      <div class="title">
        <!--Grabber Icon-->
        <novo-icon
          *ngIf="move || config.move"
          tooltip="{{ labels.move }}"
          tooltipPosition="bottom-right"
          class="card-move-handle"
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="iconClass" class="card-flag-icon" [ngClass]="iconClass"></i></span><!--
          --><span class="novo-card-header-text">{{ title || config.title }}</span>
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          [icon]="'refresh-o' | ifBh2026Theme : 'refresh'"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          [icon]="'x' | ifBh2026Theme : 'close-o'"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></novo-button>
      </div>
    </header>
    <!--Content (transcluded)-->
    <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
    <!--Error/Empty Message-->
    <p
      class="card-message"
      *ngIf="!(loading || config.loading) && (message || config.message)"
      [attr.data-automation-id]="cardAutomationId + '-message'"
    >
      <i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span>
    </p>
    <!--Card Footer-->
    <ng-content
      *ngIf="!(loading || config.loading) && !(message || config.message)"
      select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"
    ></ng-content>
  `, standalone: false, styles: [":host{display:flex;flex-flow:column;background-color:var(--background-bright, #fff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:var(--border-radius-round);position:relative;overflow-x:hidden}:root[data-theme=bh2026] :host{--spacing-md: var(--spacing-padding-md)}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;inset:43px 0 0;border-radius:var(--border-radius-round);background-color:var(--background-bright, #fff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:var(--font-color-secondary);margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:var(--font-size-lg);font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:root:not([data-theme=bh2026]) :host header .title i.bhi-info{color:#dbdbdb}:host header .actions{color:hsl(from var(--color-dark) h s calc(l + 15));white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:hsl(from var(--color-grey) h s calc(l + 10))}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:hsl(from var(--color-grey) h s calc(l + 20))}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:var(--spacing-sm)}:host.novo-card-inset-medium{padding:var(--spacing-md)}:host.novo-card-inset-large{padding:var(--spacing-lg)}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:var(--spacing-sm)}:host ::ng-deep [novo-card-image]{width:100%;margin:var(--spacing-md) 0}:host-context([data-theme=bh2026]){border-radius:var(--border-radius-md);border:1px solid var(--color-border-default);box-shadow:0 1px 2px var(--color-transparency-charcoal-08)}:host-context([data-theme=bh2026]) div.card-loading-container{border-radius:var(--border-radius-md)}:host-context([data-theme=bh2026]) header{padding:var(--spacing-padding-md) var(--spacing-padding-lg) var(--spacing-padding-md) 0;border-bottom:1px solid var(--color-border-default)}:host-context([data-theme=bh2026]) header .title{padding-inline:var(--spacing-gutter)}:host-context([data-theme=bh2026]) header .title h1,:host-context([data-theme=bh2026]) header .title h2,:host-context([data-theme=bh2026]) header .title h3{font-size:var(--typography-card-header-font-size, var(--typography-font-size-18));font-weight:var(--typography-card-header-font-weight, var(--typography-font-weight-500))}:host-context([data-theme=bh2026]) header .title h1 ::ng-deep .card-flag-icon,:host-context([data-theme=bh2026]) header .title h2 ::ng-deep .card-flag-icon,:host-context([data-theme=bh2026]) header .title h3 ::ng-deep .card-flag-icon{font-size:var(--font-size-lg);vertical-align:10%}:host-context([data-theme=bh2026]) header .title ::ng-deep i{margin:0}:host-context([data-theme=bh2026]) header .card-move-handle{position:absolute;left:var(--spacing-padding-xxsm);color:var(--color-content-icon, #89909A)}:host-context([data-theme=bh2026]) header .actions{display:flex;align-items:center;gap:var(--spacing-gap-sm)}:host-context([data-theme=bh2026]) header novo-button{color:var(--color-text-subtle)}:host-context([data-theme=bh2026]) header ::ng-deep .novo-card-header-text{padding-inline-start:var(--spacing-padding-sm)}:host-context([data-theme=bh2026]) :host ::ng-deep .card-flag-icon{color:var(--color-content-subtle, #5d7798)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon{color:var(--page-entity-color, var(--color-content-subtle, #5d7798))}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-appointment{color:var(--color-entity-appointment)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-star{color:var(--color-entity-star)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-person{color:var(--color-entity-contact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-company{color:var(--color-entity-company)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-candidate{color:var(--color-entity-candidate)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-navigation{color:var(--color-entity-navigation)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-lead{color:var(--color-entity-lead)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-contact{color:var(--color-entity-contact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-clientcontact{color:var(--color-entity-clientcontact)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-opportunity{color:var(--color-entity-opportunity)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-job{color:var(--color-entity-job)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-joborder{color:var(--color-entity-joborder)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-submission{color:var(--color-entity-submission)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-sendout{color:var(--color-entity-sendout)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-placement{color:var(--color-entity-placement)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-note{color:var(--color-entity-note)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-task{color:var(--color-entity-task)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-distributionList{color:var(--color-entity-distributionList)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-credential{color:var(--color-entity-credential)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-user{color:var(--color-entity-user)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-corporateuser{color:var(--color-entity-corporateuser)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-neutral{color:var(--color-entity-neutral)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-contract{color:var(--color-entity-contract)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-jobCode{color:var(--color-entity-jobCode)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-earnCode{color:var(--color-entity-earnCode)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-billableCharge{color:var(--color-entity-billableCharge)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-payableCharge{color:var(--color-entity-payableCharge)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-complianceManager{color:var(--color-entity-complianceManager)}:host-context([data-theme=bh2026]) :host.icon-color-auto header .title ::ng-deep .card-flag-icon.bhi-invoiceStatement{color:var(--color-entity-invoiceStatement)}:host-context([data-theme=bh2026]) :host.icon-color-parent ::ng-deep .card-flag-icon{color:var(--page-entity-color)}:host-context([data-theme=bh2026]) :host .novo-card-header{padding-inline-start:var(--spacing-gutter)}:host-context([data-theme=bh2026]) :host ::ng-deep .card-move-handle{position:absolute;left:var(--spacing-padding-xxsm);color:var(--color-content-icon, #89909A);transition:color .3s ease-in-out}:host-context([data-theme=bh2026]) :host header ::ng-deep:not(:hover) .card-move-handle,:host-context([data-theme=bh2026]) :host ::ng-deep .novo-card-header:not(:hover) .card-move-handle{color:transparent}:host-context([data-theme=bh2026]) :host header ::ng-deep .novo-icon.card-move-handle i,:host-context([data-theme=bh2026]) :host ::ng-deep .novo-card-header .novo-icon.card-move-handle i{color:inherit}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { padding: [{
                type: Input
            }], config: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], messageIcon: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconColorClass: [{
                type: Input
            }], iconTooltip: [{
                type: Input
            }], refresh: [{
                type: Input
            }], close: [{
                type: Input
            }], move: [{
                type: Input
            }], loading: [{
                type: Input
            }], inline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.novo-card-inline']
            }], inset: [{
                type: Input
            }], cardClass: [{
                type: HostBinding,
                args: ['class']
            }], onClose: [{
                type: Output
            }], onRefresh: [{
                type: Output
            }] } });

// NG2
class NovoCardModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoCardModule, declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement], imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule, NovoCommonModule], exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoCardModule, imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule, NovoCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule, NovoCommonModule],
                    declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                    exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement, NovoCardModule };
//# sourceMappingURL=novo-elements-elements-card.mjs.map
