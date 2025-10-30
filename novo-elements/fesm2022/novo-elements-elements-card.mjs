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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardActionsElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CardActionsElement, isStandalone: false, selector: "novo-card-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardActionsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-card-actions',
                    template: '<ng-content></ng-content>',
                    standalone: false
                }]
        }] });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
class CardContentElement {
    constructor() {
        this.condensed = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardContentElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CardContentElement, isStandalone: false, selector: "novo-card-content, [novo-card-content], [novoCardContent]", inputs: { condensed: "condensed" }, host: { properties: { "class.condensed": "condensed" }, classAttribute: "novo-card-content" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block}:host:not(.condensed){padding:1rem}\n"] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-content, [novo-card-content], [novoCardContent]', host: { class: 'novo-card-content', '[class.condensed]': 'condensed' }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{display:block}:host:not(.condensed){padding:1rem}\n"] }]
        }], propDecorators: { condensed: [{
                type: Input
            }] } });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
class CardHeaderElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CardHeaderElement, isStandalone: false, selector: "novo-card-header, [novo-card-header], [novoCardHeader]", host: { classAttribute: "novo-card-header" }, ngImport: i0, template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `, isInline: true, styles: [":host{padding:1rem 1rem 0;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000}:host[color=white]{color:#3d464d;background:#fff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#39d}:host[color=candidate]{color:#fff;background:#4b7}:host[color=lead]{color:#fff;background:#a69}:host[color=contact]{color:#fff;background:#fa4}:host[color=clientcontact]{color:#fff;background:#fa4}:host[color=opportunity]{color:#fff;background:#625}:host[color=job]{color:#fff;background:#b56}:host[color=joborder]{color:#fff;background:#b56}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=task]{color:#fff;background:#4f5361}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}:host .novo-card-header-text{flex:1 1 0px}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardHeaderElement, decorators: [{
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
  `, standalone: false, styles: [":host{padding:1rem 1rem 0;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000}:host[color=white]{color:#3d464d;background:#fff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#39d}:host[color=candidate]{color:#fff;background:#4b7}:host[color=lead]{color:#fff;background:#a69}:host[color=contact]{color:#fff;background:#fa4}:host[color=clientcontact]{color:#fff;background:#fa4}:host[color=opportunity]{color:#fff;background:#625}:host[color=job]{color:#fff;background:#b56}:host[color=joborder]{color:#fff;background:#b56}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=task]{color:#fff;background:#4f5361}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}:host .novo-card-header-text{flex:1 1 0px}\n"] }]
        }] });
class CardFooterElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CardFooterElement, isStandalone: false, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:0 1rem 1rem;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000}:host[color=white]{color:#3d464d;background:#fff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#39d}:host[color=candidate]{color:#fff;background:#4b7}:host[color=lead]{color:#fff;background:#a69}:host[color=contact]{color:#fff;background:#fa4}:host[color=clientcontact]{color:#fff;background:#fa4}:host[color=opportunity]{color:#fff;background:#625}:host[color=job]{color:#fff;background:#b56}:host[color=joborder]{color:#fff;background:#b56}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=task]{color:#fff;background:#4f5361}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]', host: { class: 'novo-card-footer' }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{padding:0 1rem 1rem;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000}:host[color=white]{color:#3d464d;background:#fff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#39d}:host[color=candidate]{color:#fff;background:#4b7}:host[color=lead]{color:#fff;background:#a69}:host[color=contact]{color:#fff;background:#fa4}:host[color=clientcontact]{color:#fff;background:#fa4}:host[color=opportunity]{color:#fff;background:#625}:host[color=job]{color:#fff;background:#b56}:host[color=joborder]{color:#fff;background:#b56}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=task]{color:#fff;background:#4f5361}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}\n"] }]
        }] });
class CardElement {
    get hbInset() {
        return `novo-card-inset-${this.inset}`;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CardElement, isStandalone: false, selector: "novo-card", inputs: { padding: "padding", config: "config", title: "title", message: "message", messageIcon: "messageIcon", icon: "icon", iconTooltip: "iconTooltip", refresh: "refresh", close: "close", move: "move", loading: "loading", inline: "inline", inset: "inset" }, outputs: { onClose: "onClose", onRefresh: "onRefresh" }, host: { properties: { "attr.data-automation-id": "cardAutomationId", "class.loading": "loading || config.loading", "class.novo-card-inline": "this.inline", "class": "this.hbInset" }, classAttribute: "novo-card" }, usesOnChanges: true, ngImport: i0, template: `
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
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          icon="close-o"
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
  `, isInline: true, styles: [":host{display:flex;flex-flow:column;background-color:var(--background-bright, #ffffff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:.4em;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;inset:43px 0 0;border-radius:.4em;background-color:var(--background-bright, #ffffff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:#dbdbdb;margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:1.6rem;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:#dbdbdb}:host header .actions{color:#5f6d78;white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:#b8b8b8}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:#d1d1d1}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:.5rem}:host.novo-card-inset-medium{padding:1rem}:host.novo-card-inset-large{padding:1.25rem}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:.5rem}:host ::ng-deep [novo-card-image]{width:100%;margin:1rem 0}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "directive", type: i6.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CardElement, decorators: [{
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
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          icon="close-o"
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
  `, standalone: false, styles: [":host{display:flex;flex-flow:column;background-color:var(--background-bright, #ffffff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:.4em;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;inset:43px 0 0;border-radius:.4em;background-color:var(--background-bright, #ffffff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:#dbdbdb;margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:1.6rem;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:#dbdbdb}:host header .actions{color:#5f6d78;white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:#b8b8b8}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:#d1d1d1}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:.5rem}:host.novo-card-inset-medium{padding:1rem}:host.novo-card-inset-large{padding:1.25rem}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:.5rem}:host ::ng-deep [novo-card-image]{width:100%;margin:1rem 0}\n"] }]
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
            }], hbInset: [{
                type: HostBinding,
                args: ['class']
            }], onClose: [{
                type: Output
            }], onRefresh: [{
                type: Output
            }] } });

// NG2
class NovoCardModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoCardModule, declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement], imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule], exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCardModule, imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
                    declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                    exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement, NovoCardModule };
//# sourceMappingURL=novo-elements-elements-card.mjs.map
