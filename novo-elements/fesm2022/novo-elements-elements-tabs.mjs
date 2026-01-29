import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, HostBinding, Component, ViewChild, ChangeDetectionStrategy, Optional, ViewEncapsulation, NgModule } from '@angular/core';
import * as i1 from '@angular/router';
import { BooleanInput } from 'novo-elements/utils';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoNavElement {
    constructor() {
        this.theme = '';
        this.direction = '';
        this.condensed = false;
        this.items = [];
        this._selectedIndex = null;
        /** The tab index that should be selected after the content has been checked. */
        this._indexToSelect = 0;
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        this.selectedIndexChange = new EventEmitter();
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        this._indexToSelect = coerceNumberProperty(value, null);
    }
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        const indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));
        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = this._selectedIndex == null;
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(() => {
                this._deactivateAllItems(this.items);
                this._activateSelectedItem(indexToSelect);
                this._showActiveContent(indexToSelect);
                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            });
            this._selectedIndex = indexToSelect;
        }
    }
    select(item) {
        const indexToSelect = this.items.indexOf(item);
        // Deactivate all other tabs
        this._deactivateAllItems(this.items);
        this._activateSelectedItem(indexToSelect);
        this._showActiveContent(indexToSelect);
        this.selectedIndexChange.emit(indexToSelect);
    }
    add(item) {
        if (this.items.length === 0) {
            item.active = true;
            // item.selected.next();
        }
        this.items.push(item);
    }
    _activateSelectedItem(indexToSelect) {
        const item = this.items[indexToSelect];
        if (item) {
            item.active = true;
        }
    }
    _showActiveContent(indexToSelect) {
        if (this.outlet) {
            this.outlet.show(indexToSelect);
        }
    }
    _deactivateAllItems(items) {
        items.forEach((t) => {
            if (t.active === true) {
                // t.deselected.next();
            }
            t.active = false;
        });
    }
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    _clampTabIndex(index) {
        return Math.min(this.items.length - 1, Math.max(index || 0, 0));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoNavElement, isStandalone: false, selector: "novo-nav", inputs: { theme: "theme", direction: "direction", outlet: "outlet", router: "router", condensed: "condensed", selectedIndex: "selectedIndex" }, outputs: { selectedIndexChange: "selectedIndexChange" }, host: { properties: { "class.condensed": "this.condensed" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:0;list-style:none;display:flex;align-items:center;justify-content:flex-start;margin:0}:host[type=button-bar]{display:inline-flex;border-radius:3px;border:2px solid #fff}:host[theme=neutral],:host[theme=color]{background:#0003}:host[theme=neutral][type=button-bar],:host[theme=color][type=button-bar]{border:2px solid #fff}:host[theme=white]{background-color:#fff}:host[theme=white][direction=vertical]{background:transparent}:host[theme=white][type=button-bar]{border:2px solid #dbdbdb}:host[direction=vertical]{flex-direction:column;width:auto}\n"] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoNavElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav', template: '<ng-content></ng-content>', standalone: false, styles: [":host{padding:0;list-style:none;display:flex;align-items:center;justify-content:flex-start;margin:0}:host[type=button-bar]{display:inline-flex;border-radius:3px;border:2px solid #fff}:host[theme=neutral],:host[theme=color]{background:#0003}:host[theme=neutral][type=button-bar],:host[theme=color][type=button-bar]{border:2px solid #fff}:host[theme=white]{background-color:#fff}:host[theme=white][direction=vertical]{background:transparent}:host[theme=white][type=button-bar]{border:2px solid #dbdbdb}:host[direction=vertical]{flex-direction:column;width:auto}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], direction: [{
                type: Input
            }], outlet: [{
                type: Input
            }], router: [{
                type: Input
            }], condensed: [{
                type: HostBinding,
                args: ['class.condensed']
            }, {
                type: Input
            }], selectedIndex: [{
                type: Input
            }], selectedIndexChange: [{
                type: Output
            }] } });
class NovoTabElement {
    get hb_textOnly() {
        return this.onlyText;
    }
    constructor(nav, el, cdr) {
        this.el = el;
        this.cdr = cdr;
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.activeChange = new EventEmitter();
        this.onlyText = true;
        this.nav = nav;
        this.nav.add(this);
        const tablink = el.nativeElement.querySelector('.novo-tab-link');
        if (tablink) {
            for (let i = 0; i < tablink.childNodes.length; i++) {
                if (tablink.childNodes[i].nodeType !== Node.TEXT_NODE) {
                    this.onlyText = false;
                }
            }
        }
    }
    select() {
        if (!this.disabled) {
            this.activeChange.emit(true);
            this.nav.select(this);
        }
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabElement, deps: [{ token: NovoNavElement }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTabElement, isStandalone: false, selector: "novo-tab", inputs: { active: "active", color: "color", disabled: "disabled" }, outputs: { activeChange: "activeChange" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role", "class.text-only": "this.hb_textOnly" } }, viewQueries: [{ propertyName: "tablink", first: true, predicate: ["tablink"], descendants: true }], ngImport: i0, template: `
    <div #tablink class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;position:relative}:host[color=black]{color:#000}:host[color=black] i{color:#000}:host[color=white]{color:#fff}:host[color=white] i{color:#fff}:host[color=gray]{color:#9e9e9e}:host[color=gray] i{color:#9e9e9e}:host[color=grey]{color:#9e9e9e}:host[color=grey] i{color:#9e9e9e}:host[color=offWhite]{color:#f7f7f7}:host[color=offWhite] i{color:#f7f7f7}:host[color=bright]{color:#f7f7f7}:host[color=bright] i{color:#f7f7f7}:host[color=light]{color:#dbdbdb}:host[color=light] i{color:#dbdbdb}:host[color=neutral]{color:#4f5361}:host[color=neutral] i{color:#4f5361}:host[color=dark]{color:#3d464d}:host[color=dark] i{color:#3d464d}:host[color=orange]{color:#ff6900}:host[color=orange] i{color:#ff6900}:host[color=navigation]{color:#202945}:host[color=navigation] i{color:#202945}:host[color=skyBlue]{color:#009bdf}:host[color=skyBlue] i{color:#009bdf}:host[color=steel]{color:#5b6770}:host[color=steel] i{color:#5b6770}:host[color=metal]{color:#637893}:host[color=metal] i{color:#637893}:host[color=sand]{color:#f4f4f4}:host[color=sand] i{color:#f4f4f4}:host[color=silver]{color:#e2e2e2}:host[color=silver] i{color:#e2e2e2}:host[color=stone]{color:#bebebe}:host[color=stone] i{color:#bebebe}:host[color=ash]{color:#a0a0a0}:host[color=ash] i{color:#a0a0a0}:host[color=slate]{color:#707070}:host[color=slate] i{color:#707070}:host[color=onyx]{color:#526980}:host[color=onyx] i{color:#526980}:host[color=charcoal]{color:#282828}:host[color=charcoal] i{color:#282828}:host[color=moonlight]{color:#1a242f}:host[color=moonlight] i{color:#1a242f}:host[color=midnight]{color:#202945}:host[color=midnight] i{color:#202945}:host[color=darkness]{color:#161f27}:host[color=darkness] i{color:#161f27}:host[color=navy]{color:#0d2d42}:host[color=navy] i{color:#0d2d42}:host[color=aqua]{color:#3bafda}:host[color=aqua] i{color:#3bafda}:host[color=ocean]{color:#4a89dc}:host[color=ocean] i{color:#4a89dc}:host[color=mint]{color:#37bc9b}:host[color=mint] i{color:#37bc9b}:host[color=grass]{color:#8cc152}:host[color=grass] i{color:#8cc152}:host[color=sunflower]{color:#f6b042}:host[color=sunflower] i{color:#f6b042}:host[color=bittersweet]{color:#eb6845}:host[color=bittersweet] i{color:#eb6845}:host[color=grapefruit]{color:#da4453}:host[color=grapefruit] i{color:#da4453}:host[color=carnation]{color:#d770ad}:host[color=carnation] i{color:#d770ad}:host[color=lavender]{color:#967adc}:host[color=lavender] i{color:#967adc}:host[color=mountain]{color:#9678b6}:host[color=mountain] i{color:#9678b6}:host[color=info]{color:#4a89dc}:host[color=info] i{color:#4a89dc}:host[color=positive]{color:#4a89dc}:host[color=positive] i{color:#4a89dc}:host[color=success]{color:#8cc152}:host[color=success] i{color:#8cc152}:host[color=negative]{color:#da4453}:host[color=negative] i{color:#da4453}:host[color=danger]{color:#da4453}:host[color=danger] i{color:#da4453}:host[color=error]{color:#da4453}:host[color=error] i{color:#da4453}:host[color=warning]{color:#f6b042}:host[color=warning] i{color:#f6b042}:host[color=empty]{color:#cccdcc}:host[color=empty] i{color:#cccdcc}:host[color=disabled]{color:#bebebe}:host[color=disabled] i{color:#bebebe}:host[color=background]{color:#f7f7f7}:host[color=background] i{color:#f7f7f7}:host[color=backgroundDark]{color:#e2e2e2}:host[color=backgroundDark] i{color:#e2e2e2}:host[color=presentation]{color:#5b6770}:host[color=presentation] i{color:#5b6770}:host[color=bullhorn]{color:#ff6900}:host[color=bullhorn] i{color:#ff6900}:host[color=pulse]{color:#3bafda}:host[color=pulse] i{color:#3bafda}:host[color=company]{color:#39d}:host[color=company] i{color:#39d}:host[color=candidate]{color:#4b7}:host[color=candidate] i{color:#4b7}:host[color=lead]{color:#a69}:host[color=lead] i{color:#a69}:host[color=contact]{color:#fa4}:host[color=contact] i{color:#fa4}:host[color=clientcontact]{color:#fa4}:host[color=clientcontact] i{color:#fa4}:host[color=opportunity]{color:#625}:host[color=opportunity] i{color:#625}:host[color=job]{color:#b56}:host[color=job] i{color:#b56}:host[color=joborder]{color:#b56}:host[color=joborder] i{color:#b56}:host[color=submission]{color:#a9adbb}:host[color=submission] i{color:#a9adbb}:host[color=sendout]{color:#747884}:host[color=sendout] i{color:#747884}:host[color=placement]{color:#0b344f}:host[color=placement] i{color:#0b344f}:host[color=note]{color:#747884}:host[color=note] i{color:#747884}:host[color=contract]{color:#454ea0}:host[color=contract] i{color:#454ea0}:host[color=task]{color:#4f5361}:host[color=task] i{color:#4f5361}:host[color=jobCode]{color:#696d79}:host[color=jobCode] i{color:#696d79}:host[color=earnCode]{color:#696d79}:host[color=earnCode] i{color:#696d79}:host[color=invoiceStatement]{color:#696d79}:host[color=invoiceStatement] i{color:#696d79}:host[color=billableCharge]{color:#696d79}:host[color=billableCharge] i{color:#696d79}:host[color=payableCharge]{color:#696d79}:host[color=payableCharge] i{color:#696d79}:host[color=user]{color:#696d79}:host[color=user] i{color:#696d79}:host[color=corporateUser]{color:#696d79}:host[color=corporateUser] i{color:#696d79}:host[color=distributionList]{color:#696d79}:host[color=distributionList] i{color:#696d79}:host[color=credential]{color:#696d79}:host[color=credential] i{color:#696d79}:host[color=person]{color:#696d79}:host[color=person] i{color:#696d79}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;font-size:var(--font-size-tab);padding:1rem;display:flex;align-items:center;gap:.25rem;cursor:pointer;text-transform:uppercase}:host .novo-tab-link.text-capitalize{text-transform:capitalize}:host .novo-tab-link.text-uppercase{text-transform:uppercase}:host .novo-tab-link.text-nowrap{white-space:nowrap}:host .novo-tab-link.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-tab-link.text-size-default{font-size:inherit}:host .novo-tab-link.text-size-body{font-size:1.3rem}:host .novo-tab-link.text-size-xs{font-size:1rem}:host .novo-tab-link.text-size-sm{font-size:1.2rem}:host .novo-tab-link.text-size-md{font-size:1.3rem}:host .novo-tab-link.text-size-lg{font-size:1.6rem}:host .novo-tab-link.text-size-xl{font-size:2rem}:host .novo-tab-link.text-size-2xl{font-size:2.6rem}:host .novo-tab-link.text-size-3xl{font-size:3.2rem}:host .novo-tab-link.text-size-smaller{font-size:.8em}:host .novo-tab-link.text-size-larger{font-size:1.2em}:host .novo-tab-link.text-color-black{color:#000}:host .novo-tab-link.text-color-white{color:#fff}:host .novo-tab-link.text-color-gray{color:#9e9e9e}:host .novo-tab-link.text-color-grey{color:#9e9e9e}:host .novo-tab-link.text-color-offWhite{color:#f7f7f7}:host .novo-tab-link.text-color-bright{color:#f7f7f7}:host .novo-tab-link.text-color-light{color:#dbdbdb}:host .novo-tab-link.text-color-neutral{color:#4f5361}:host .novo-tab-link.text-color-dark{color:#3d464d}:host .novo-tab-link.text-color-orange{color:#ff6900}:host .novo-tab-link.text-color-navigation{color:#202945}:host .novo-tab-link.text-color-skyBlue{color:#009bdf}:host .novo-tab-link.text-color-steel{color:#5b6770}:host .novo-tab-link.text-color-metal{color:#637893}:host .novo-tab-link.text-color-sand{color:#f4f4f4}:host .novo-tab-link.text-color-silver{color:#e2e2e2}:host .novo-tab-link.text-color-stone{color:#bebebe}:host .novo-tab-link.text-color-ash{color:#a0a0a0}:host .novo-tab-link.text-color-slate{color:#707070}:host .novo-tab-link.text-color-onyx{color:#526980}:host .novo-tab-link.text-color-charcoal{color:#282828}:host .novo-tab-link.text-color-moonlight{color:#1a242f}:host .novo-tab-link.text-color-midnight{color:#202945}:host .novo-tab-link.text-color-darkness{color:#161f27}:host .novo-tab-link.text-color-navy{color:#0d2d42}:host .novo-tab-link.text-color-aqua{color:#3bafda}:host .novo-tab-link.text-color-ocean{color:#4a89dc}:host .novo-tab-link.text-color-mint{color:#37bc9b}:host .novo-tab-link.text-color-grass{color:#8cc152}:host .novo-tab-link.text-color-sunflower{color:#f6b042}:host .novo-tab-link.text-color-bittersweet{color:#eb6845}:host .novo-tab-link.text-color-grapefruit{color:#da4453}:host .novo-tab-link.text-color-carnation{color:#d770ad}:host .novo-tab-link.text-color-lavender{color:#967adc}:host .novo-tab-link.text-color-mountain{color:#9678b6}:host .novo-tab-link.text-color-info{color:#4a89dc}:host .novo-tab-link.text-color-positive{color:#4a89dc}:host .novo-tab-link.text-color-success{color:#8cc152}:host .novo-tab-link.text-color-negative{color:#da4453}:host .novo-tab-link.text-color-danger{color:#da4453}:host .novo-tab-link.text-color-error{color:#da4453}:host .novo-tab-link.text-color-warning{color:#f6b042}:host .novo-tab-link.text-color-empty{color:#cccdcc}:host .novo-tab-link.text-color-disabled{color:#bebebe}:host .novo-tab-link.text-color-background{color:#f7f7f7}:host .novo-tab-link.text-color-backgroundDark{color:#e2e2e2}:host .novo-tab-link.text-color-presentation{color:#5b6770}:host .novo-tab-link.text-color-bullhorn{color:#ff6900}:host .novo-tab-link.text-color-pulse{color:#3bafda}:host .novo-tab-link.text-color-company{color:#39d}:host .novo-tab-link.text-color-candidate{color:#4b7}:host .novo-tab-link.text-color-lead{color:#a69}:host .novo-tab-link.text-color-contact{color:#fa4}:host .novo-tab-link.text-color-clientcontact{color:#fa4}:host .novo-tab-link.text-color-opportunity{color:#625}:host .novo-tab-link.text-color-job{color:#b56}:host .novo-tab-link.text-color-joborder{color:#b56}:host .novo-tab-link.text-color-submission{color:#a9adbb}:host .novo-tab-link.text-color-sendout{color:#747884}:host .novo-tab-link.text-color-placement{color:#0b344f}:host .novo-tab-link.text-color-note{color:#747884}:host .novo-tab-link.text-color-contract{color:#454ea0}:host .novo-tab-link.text-color-task{color:#4f5361}:host .novo-tab-link.text-color-jobCode{color:#696d79}:host .novo-tab-link.text-color-earnCode{color:#696d79}:host .novo-tab-link.text-color-invoiceStatement{color:#696d79}:host .novo-tab-link.text-color-billableCharge{color:#696d79}:host .novo-tab-link.text-color-payableCharge{color:#696d79}:host .novo-tab-link.text-color-user{color:#696d79}:host .novo-tab-link.text-color-corporateUser{color:#696d79}:host .novo-tab-link.text-color-distributionList{color:#696d79}:host .novo-tab-link.text-color-credential{color:#696d79}:host .novo-tab-link.text-color-person{color:#696d79}:host .novo-tab-link.margin-before{margin-top:.4rem}:host .novo-tab-link.margin-after{margin-bottom:.8rem}:host .novo-tab-link.text-length-small{max-width:40ch}:host .novo-tab-link.text-length-medium{max-width:55ch}:host .novo-tab-link.text-length-large{max-width:70ch}:host .novo-tab-link.text-weight-hairline{font-weight:100}:host .novo-tab-link.text-weight-thin{font-weight:200}:host .novo-tab-link.text-weight-light{font-weight:300}:host .novo-tab-link.text-weight-normal{font-weight:400}:host .novo-tab-link.text-weight-medium{font-weight:500}:host .novo-tab-link.text-weight-semibold{font-weight:600}:host .novo-tab-link.text-weight-bold{font-weight:700}:host .novo-tab-link.text-weight-extrabold{font-weight:800}:host .novo-tab-link.text-weight-heavy{font-weight:900}:host .novo-tab-link.text-weight-lighter{font-weight:lighter}:host .novo-tab-link.text-weight-bolder{font-weight:bolder}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--focus);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;width:100%;flex-direction:row;align-items:center;min-width:12rem;justify-content:space-between;transition:all .12s ease-in-out}:host-context(novo-nav[direction=vertical]) .novo-tab-link{order:2;flex:1;width:100%;display:flex;flex-flow:row nowrap;gap:.25rem;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.75}:host-context(novo-nav[direction=vertical]) .indicator{order:1;width:4px;height:0;display:block;background:transparent;transition:all .22s ease-in-out}:host-context(novo-nav[direction=vertical]).active,:host-context(novo-nav[direction=vertical]).router-link-active{background:#0000000d}:host-context(novo-nav[direction=vertical]).active .novo-tab-link,:host-context(novo-nav[direction=vertical]).router-link-active .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).active .indicator,:host-context(novo-nav[direction=vertical]).router-link-active .indicator{height:100%;top:0;bottom:0}:host-context(novo-nav[direction=vertical]):hover .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[direction=vertical]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav[theme=white]){height:auto}:host-context(novo-nav[theme=white]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover .novo-tab-link{opacity:.5;font-weight:400}:host-context(novo-nav[theme=white]) .novo-tab-link{color:var(--text-main);opacity:.75}:host-context(novo-nav[theme=white]).active,:host-context(novo-nav[theme=white]).router-link-active{color:var(--selection)}:host-context(novo-nav[theme=white]).active .novo-tab-link,:host-context(novo-nav[theme=white]).router-link-active .novo-tab-link{color:var(--selection);opacity:1}:host-context(novo-nav[theme=white]).active .indicator,:host-context(novo-nav[theme=white]).router-link-active .indicator{background:currentColor}:host-context(novo-nav[theme=white]):hover .novo-tab-link{font-weight:500}:host-context(novo-nav[theme=color]) .novo-tab-link,:host-context(novo-nav[theme=neutral]) .novo-tab-link{color:#fff}:host-context(novo-nav[theme=color]).active .indicator,:host-context(novo-nav[theme=color]).router-link-active .indicator,:host-context(novo-nav[theme=neutral]).active .indicator,:host-context(novo-nav[theme=neutral]).router-link-active .indicator{background:#fff}:host-context(novo-nav[theme=color]).disabled .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav.condensed){font-size:1rem}:host-context(novo-nav.condensed) .novo-tab-link{padding:.5rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoTabElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                        '[attr.role]': 'tab',
                    }, template: `
    <div #tablink class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;position:relative}:host[color=black]{color:#000}:host[color=black] i{color:#000}:host[color=white]{color:#fff}:host[color=white] i{color:#fff}:host[color=gray]{color:#9e9e9e}:host[color=gray] i{color:#9e9e9e}:host[color=grey]{color:#9e9e9e}:host[color=grey] i{color:#9e9e9e}:host[color=offWhite]{color:#f7f7f7}:host[color=offWhite] i{color:#f7f7f7}:host[color=bright]{color:#f7f7f7}:host[color=bright] i{color:#f7f7f7}:host[color=light]{color:#dbdbdb}:host[color=light] i{color:#dbdbdb}:host[color=neutral]{color:#4f5361}:host[color=neutral] i{color:#4f5361}:host[color=dark]{color:#3d464d}:host[color=dark] i{color:#3d464d}:host[color=orange]{color:#ff6900}:host[color=orange] i{color:#ff6900}:host[color=navigation]{color:#202945}:host[color=navigation] i{color:#202945}:host[color=skyBlue]{color:#009bdf}:host[color=skyBlue] i{color:#009bdf}:host[color=steel]{color:#5b6770}:host[color=steel] i{color:#5b6770}:host[color=metal]{color:#637893}:host[color=metal] i{color:#637893}:host[color=sand]{color:#f4f4f4}:host[color=sand] i{color:#f4f4f4}:host[color=silver]{color:#e2e2e2}:host[color=silver] i{color:#e2e2e2}:host[color=stone]{color:#bebebe}:host[color=stone] i{color:#bebebe}:host[color=ash]{color:#a0a0a0}:host[color=ash] i{color:#a0a0a0}:host[color=slate]{color:#707070}:host[color=slate] i{color:#707070}:host[color=onyx]{color:#526980}:host[color=onyx] i{color:#526980}:host[color=charcoal]{color:#282828}:host[color=charcoal] i{color:#282828}:host[color=moonlight]{color:#1a242f}:host[color=moonlight] i{color:#1a242f}:host[color=midnight]{color:#202945}:host[color=midnight] i{color:#202945}:host[color=darkness]{color:#161f27}:host[color=darkness] i{color:#161f27}:host[color=navy]{color:#0d2d42}:host[color=navy] i{color:#0d2d42}:host[color=aqua]{color:#3bafda}:host[color=aqua] i{color:#3bafda}:host[color=ocean]{color:#4a89dc}:host[color=ocean] i{color:#4a89dc}:host[color=mint]{color:#37bc9b}:host[color=mint] i{color:#37bc9b}:host[color=grass]{color:#8cc152}:host[color=grass] i{color:#8cc152}:host[color=sunflower]{color:#f6b042}:host[color=sunflower] i{color:#f6b042}:host[color=bittersweet]{color:#eb6845}:host[color=bittersweet] i{color:#eb6845}:host[color=grapefruit]{color:#da4453}:host[color=grapefruit] i{color:#da4453}:host[color=carnation]{color:#d770ad}:host[color=carnation] i{color:#d770ad}:host[color=lavender]{color:#967adc}:host[color=lavender] i{color:#967adc}:host[color=mountain]{color:#9678b6}:host[color=mountain] i{color:#9678b6}:host[color=info]{color:#4a89dc}:host[color=info] i{color:#4a89dc}:host[color=positive]{color:#4a89dc}:host[color=positive] i{color:#4a89dc}:host[color=success]{color:#8cc152}:host[color=success] i{color:#8cc152}:host[color=negative]{color:#da4453}:host[color=negative] i{color:#da4453}:host[color=danger]{color:#da4453}:host[color=danger] i{color:#da4453}:host[color=error]{color:#da4453}:host[color=error] i{color:#da4453}:host[color=warning]{color:#f6b042}:host[color=warning] i{color:#f6b042}:host[color=empty]{color:#cccdcc}:host[color=empty] i{color:#cccdcc}:host[color=disabled]{color:#bebebe}:host[color=disabled] i{color:#bebebe}:host[color=background]{color:#f7f7f7}:host[color=background] i{color:#f7f7f7}:host[color=backgroundDark]{color:#e2e2e2}:host[color=backgroundDark] i{color:#e2e2e2}:host[color=presentation]{color:#5b6770}:host[color=presentation] i{color:#5b6770}:host[color=bullhorn]{color:#ff6900}:host[color=bullhorn] i{color:#ff6900}:host[color=pulse]{color:#3bafda}:host[color=pulse] i{color:#3bafda}:host[color=company]{color:#39d}:host[color=company] i{color:#39d}:host[color=candidate]{color:#4b7}:host[color=candidate] i{color:#4b7}:host[color=lead]{color:#a69}:host[color=lead] i{color:#a69}:host[color=contact]{color:#fa4}:host[color=contact] i{color:#fa4}:host[color=clientcontact]{color:#fa4}:host[color=clientcontact] i{color:#fa4}:host[color=opportunity]{color:#625}:host[color=opportunity] i{color:#625}:host[color=job]{color:#b56}:host[color=job] i{color:#b56}:host[color=joborder]{color:#b56}:host[color=joborder] i{color:#b56}:host[color=submission]{color:#a9adbb}:host[color=submission] i{color:#a9adbb}:host[color=sendout]{color:#747884}:host[color=sendout] i{color:#747884}:host[color=placement]{color:#0b344f}:host[color=placement] i{color:#0b344f}:host[color=note]{color:#747884}:host[color=note] i{color:#747884}:host[color=contract]{color:#454ea0}:host[color=contract] i{color:#454ea0}:host[color=task]{color:#4f5361}:host[color=task] i{color:#4f5361}:host[color=jobCode]{color:#696d79}:host[color=jobCode] i{color:#696d79}:host[color=earnCode]{color:#696d79}:host[color=earnCode] i{color:#696d79}:host[color=invoiceStatement]{color:#696d79}:host[color=invoiceStatement] i{color:#696d79}:host[color=billableCharge]{color:#696d79}:host[color=billableCharge] i{color:#696d79}:host[color=payableCharge]{color:#696d79}:host[color=payableCharge] i{color:#696d79}:host[color=user]{color:#696d79}:host[color=user] i{color:#696d79}:host[color=corporateUser]{color:#696d79}:host[color=corporateUser] i{color:#696d79}:host[color=distributionList]{color:#696d79}:host[color=distributionList] i{color:#696d79}:host[color=credential]{color:#696d79}:host[color=credential] i{color:#696d79}:host[color=person]{color:#696d79}:host[color=person] i{color:#696d79}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;font-size:var(--font-size-tab);padding:1rem;display:flex;align-items:center;gap:.25rem;cursor:pointer;text-transform:uppercase}:host .novo-tab-link.text-capitalize{text-transform:capitalize}:host .novo-tab-link.text-uppercase{text-transform:uppercase}:host .novo-tab-link.text-nowrap{white-space:nowrap}:host .novo-tab-link.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-tab-link.text-size-default{font-size:inherit}:host .novo-tab-link.text-size-body{font-size:1.3rem}:host .novo-tab-link.text-size-xs{font-size:1rem}:host .novo-tab-link.text-size-sm{font-size:1.2rem}:host .novo-tab-link.text-size-md{font-size:1.3rem}:host .novo-tab-link.text-size-lg{font-size:1.6rem}:host .novo-tab-link.text-size-xl{font-size:2rem}:host .novo-tab-link.text-size-2xl{font-size:2.6rem}:host .novo-tab-link.text-size-3xl{font-size:3.2rem}:host .novo-tab-link.text-size-smaller{font-size:.8em}:host .novo-tab-link.text-size-larger{font-size:1.2em}:host .novo-tab-link.text-color-black{color:#000}:host .novo-tab-link.text-color-white{color:#fff}:host .novo-tab-link.text-color-gray{color:#9e9e9e}:host .novo-tab-link.text-color-grey{color:#9e9e9e}:host .novo-tab-link.text-color-offWhite{color:#f7f7f7}:host .novo-tab-link.text-color-bright{color:#f7f7f7}:host .novo-tab-link.text-color-light{color:#dbdbdb}:host .novo-tab-link.text-color-neutral{color:#4f5361}:host .novo-tab-link.text-color-dark{color:#3d464d}:host .novo-tab-link.text-color-orange{color:#ff6900}:host .novo-tab-link.text-color-navigation{color:#202945}:host .novo-tab-link.text-color-skyBlue{color:#009bdf}:host .novo-tab-link.text-color-steel{color:#5b6770}:host .novo-tab-link.text-color-metal{color:#637893}:host .novo-tab-link.text-color-sand{color:#f4f4f4}:host .novo-tab-link.text-color-silver{color:#e2e2e2}:host .novo-tab-link.text-color-stone{color:#bebebe}:host .novo-tab-link.text-color-ash{color:#a0a0a0}:host .novo-tab-link.text-color-slate{color:#707070}:host .novo-tab-link.text-color-onyx{color:#526980}:host .novo-tab-link.text-color-charcoal{color:#282828}:host .novo-tab-link.text-color-moonlight{color:#1a242f}:host .novo-tab-link.text-color-midnight{color:#202945}:host .novo-tab-link.text-color-darkness{color:#161f27}:host .novo-tab-link.text-color-navy{color:#0d2d42}:host .novo-tab-link.text-color-aqua{color:#3bafda}:host .novo-tab-link.text-color-ocean{color:#4a89dc}:host .novo-tab-link.text-color-mint{color:#37bc9b}:host .novo-tab-link.text-color-grass{color:#8cc152}:host .novo-tab-link.text-color-sunflower{color:#f6b042}:host .novo-tab-link.text-color-bittersweet{color:#eb6845}:host .novo-tab-link.text-color-grapefruit{color:#da4453}:host .novo-tab-link.text-color-carnation{color:#d770ad}:host .novo-tab-link.text-color-lavender{color:#967adc}:host .novo-tab-link.text-color-mountain{color:#9678b6}:host .novo-tab-link.text-color-info{color:#4a89dc}:host .novo-tab-link.text-color-positive{color:#4a89dc}:host .novo-tab-link.text-color-success{color:#8cc152}:host .novo-tab-link.text-color-negative{color:#da4453}:host .novo-tab-link.text-color-danger{color:#da4453}:host .novo-tab-link.text-color-error{color:#da4453}:host .novo-tab-link.text-color-warning{color:#f6b042}:host .novo-tab-link.text-color-empty{color:#cccdcc}:host .novo-tab-link.text-color-disabled{color:#bebebe}:host .novo-tab-link.text-color-background{color:#f7f7f7}:host .novo-tab-link.text-color-backgroundDark{color:#e2e2e2}:host .novo-tab-link.text-color-presentation{color:#5b6770}:host .novo-tab-link.text-color-bullhorn{color:#ff6900}:host .novo-tab-link.text-color-pulse{color:#3bafda}:host .novo-tab-link.text-color-company{color:#39d}:host .novo-tab-link.text-color-candidate{color:#4b7}:host .novo-tab-link.text-color-lead{color:#a69}:host .novo-tab-link.text-color-contact{color:#fa4}:host .novo-tab-link.text-color-clientcontact{color:#fa4}:host .novo-tab-link.text-color-opportunity{color:#625}:host .novo-tab-link.text-color-job{color:#b56}:host .novo-tab-link.text-color-joborder{color:#b56}:host .novo-tab-link.text-color-submission{color:#a9adbb}:host .novo-tab-link.text-color-sendout{color:#747884}:host .novo-tab-link.text-color-placement{color:#0b344f}:host .novo-tab-link.text-color-note{color:#747884}:host .novo-tab-link.text-color-contract{color:#454ea0}:host .novo-tab-link.text-color-task{color:#4f5361}:host .novo-tab-link.text-color-jobCode{color:#696d79}:host .novo-tab-link.text-color-earnCode{color:#696d79}:host .novo-tab-link.text-color-invoiceStatement{color:#696d79}:host .novo-tab-link.text-color-billableCharge{color:#696d79}:host .novo-tab-link.text-color-payableCharge{color:#696d79}:host .novo-tab-link.text-color-user{color:#696d79}:host .novo-tab-link.text-color-corporateUser{color:#696d79}:host .novo-tab-link.text-color-distributionList{color:#696d79}:host .novo-tab-link.text-color-credential{color:#696d79}:host .novo-tab-link.text-color-person{color:#696d79}:host .novo-tab-link.margin-before{margin-top:.4rem}:host .novo-tab-link.margin-after{margin-bottom:.8rem}:host .novo-tab-link.text-length-small{max-width:40ch}:host .novo-tab-link.text-length-medium{max-width:55ch}:host .novo-tab-link.text-length-large{max-width:70ch}:host .novo-tab-link.text-weight-hairline{font-weight:100}:host .novo-tab-link.text-weight-thin{font-weight:200}:host .novo-tab-link.text-weight-light{font-weight:300}:host .novo-tab-link.text-weight-normal{font-weight:400}:host .novo-tab-link.text-weight-medium{font-weight:500}:host .novo-tab-link.text-weight-semibold{font-weight:600}:host .novo-tab-link.text-weight-bold{font-weight:700}:host .novo-tab-link.text-weight-extrabold{font-weight:800}:host .novo-tab-link.text-weight-heavy{font-weight:900}:host .novo-tab-link.text-weight-lighter{font-weight:lighter}:host .novo-tab-link.text-weight-bolder{font-weight:bolder}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--focus);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;width:100%;flex-direction:row;align-items:center;min-width:12rem;justify-content:space-between;transition:all .12s ease-in-out}:host-context(novo-nav[direction=vertical]) .novo-tab-link{order:2;flex:1;width:100%;display:flex;flex-flow:row nowrap;gap:.25rem;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.75}:host-context(novo-nav[direction=vertical]) .indicator{order:1;width:4px;height:0;display:block;background:transparent;transition:all .22s ease-in-out}:host-context(novo-nav[direction=vertical]).active,:host-context(novo-nav[direction=vertical]).router-link-active{background:#0000000d}:host-context(novo-nav[direction=vertical]).active .novo-tab-link,:host-context(novo-nav[direction=vertical]).router-link-active .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).active .indicator,:host-context(novo-nav[direction=vertical]).router-link-active .indicator{height:100%;top:0;bottom:0}:host-context(novo-nav[direction=vertical]):hover .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[direction=vertical]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav[theme=white]){height:auto}:host-context(novo-nav[theme=white]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover .novo-tab-link{opacity:.5;font-weight:400}:host-context(novo-nav[theme=white]) .novo-tab-link{color:var(--text-main);opacity:.75}:host-context(novo-nav[theme=white]).active,:host-context(novo-nav[theme=white]).router-link-active{color:var(--selection)}:host-context(novo-nav[theme=white]).active .novo-tab-link,:host-context(novo-nav[theme=white]).router-link-active .novo-tab-link{color:var(--selection);opacity:1}:host-context(novo-nav[theme=white]).active .indicator,:host-context(novo-nav[theme=white]).router-link-active .indicator{background:currentColor}:host-context(novo-nav[theme=white]):hover .novo-tab-link{font-weight:500}:host-context(novo-nav[theme=color]) .novo-tab-link,:host-context(novo-nav[theme=neutral]) .novo-tab-link{color:#fff}:host-context(novo-nav[theme=color]).active .indicator,:host-context(novo-nav[theme=color]).router-link-active .indicator,:host-context(novo-nav[theme=neutral]).active .indicator,:host-context(novo-nav[theme=neutral]).router-link-active .indicator{background:#fff}:host-context(novo-nav[theme=color]).disabled .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav.condensed){font-size:1rem}:host-context(novo-nav.condensed) .novo-tab-link{padding:.5rem}\n"] }]
        }], ctorParameters: () => [{ type: NovoNavElement }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], color: [{
                type: Input
            }], disabled: [{
                type: Input
            }], activeChange: [{
                type: Output
            }], hb_textOnly: [{
                type: HostBinding,
                args: ['class.text-only']
            }], tablink: [{
                type: ViewChild,
                args: ['tablink']
            }] } });
class NovoTabButtonElement {
    constructor(nav) {
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    select() {
        if (!this.disabled) {
            this.nav.select(this);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabButtonElement, deps: [{ token: NovoNavElement }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTabButtonElement, isStandalone: false, selector: "novo-tab-button", inputs: { active: "active", disabled: "disabled" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:var(--spacing-md);cursor:pointer;transition:all .12s ease-in-out}:host.disabled{opacity:.5;cursor:not-allowed}:host.disabled:hover{opacity:.5}:host-context(novo-nav[theme=neutral]),:host-context(novo-nav[theme=color]){color:#ffffffbf}:host-context(novo-nav[theme=neutral]).active,:host-context(novo-nav[theme=color]).active{color:#fff;background:#0003}:host-context(novo-nav[theme=neutral]):hover,:host-context(novo-nav[theme=color]):hover{background:#0000001a}:host-context(novo-nav[theme=neutral]).disabled,:host-context(novo-nav[theme=color]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=neutral]).disabled:hover,:host-context(novo-nav[theme=color]).disabled:hover{opacity:.5}:host-context(novo-nav[theme=white]){color:var(--color-text);opacity:.75}:host-context(novo-nav[theme=white]).active{color:var(--color-selection);background:#0000000d;opacity:1}:host-context(novo-nav[theme=white]):hover{opacity:1}:host-context(novo-nav[theme=white]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover{opacity:.5}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabButtonElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab-button', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{padding:var(--spacing-md);cursor:pointer;transition:all .12s ease-in-out}:host.disabled{opacity:.5;cursor:not-allowed}:host.disabled:hover{opacity:.5}:host-context(novo-nav[theme=neutral]),:host-context(novo-nav[theme=color]){color:#ffffffbf}:host-context(novo-nav[theme=neutral]).active,:host-context(novo-nav[theme=color]).active{color:#fff;background:#0003}:host-context(novo-nav[theme=neutral]):hover,:host-context(novo-nav[theme=color]):hover{background:#0000001a}:host-context(novo-nav[theme=neutral]).disabled,:host-context(novo-nav[theme=color]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=neutral]).disabled:hover,:host-context(novo-nav[theme=color]).disabled:hover{opacity:.5}:host-context(novo-nav[theme=white]){color:var(--color-text);opacity:.75}:host-context(novo-nav[theme=white]).active{color:var(--color-selection);background:#0000000d;opacity:1}:host-context(novo-nav[theme=white]):hover{opacity:1}:host-context(novo-nav[theme=white]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover{opacity:.5}\n"] }]
        }], ctorParameters: () => [{ type: NovoNavElement }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
class NovoTabLinkElement {
    constructor(nav, router, cdr, link) {
        this.router = router;
        this.cdr = cdr;
        this.link = link;
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    ngOnInit() {
        if (this.isLinkActive(this.link)) {
            this.nav.select(this);
        }
    }
    select() {
        if (!this.disabled) {
            this.nav.select(this);
            if (this.spy) {
                const el = document.querySelector(`#${this.spy}`);
                el?.scrollIntoView(true);
            }
        }
    }
    isLinkActive(link) {
        return link && link.urlTree ? this.router.isActive(link.urlTree, false) : false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabLinkElement, deps: [{ token: NovoNavElement }, { token: i1.Router }, { token: i0.ChangeDetectorRef }, { token: i1.RouterLink, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTabLinkElement, isStandalone: false, selector: "novo-tab-link", inputs: { active: "active", disabled: "disabled", spy: "spy" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role" } }, ngImport: i0, template: `
    <div class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;position:relative}:host[color=black]{color:#000}:host[color=black] i{color:#000}:host[color=white]{color:#fff}:host[color=white] i{color:#fff}:host[color=gray]{color:#9e9e9e}:host[color=gray] i{color:#9e9e9e}:host[color=grey]{color:#9e9e9e}:host[color=grey] i{color:#9e9e9e}:host[color=offWhite]{color:#f7f7f7}:host[color=offWhite] i{color:#f7f7f7}:host[color=bright]{color:#f7f7f7}:host[color=bright] i{color:#f7f7f7}:host[color=light]{color:#dbdbdb}:host[color=light] i{color:#dbdbdb}:host[color=neutral]{color:#4f5361}:host[color=neutral] i{color:#4f5361}:host[color=dark]{color:#3d464d}:host[color=dark] i{color:#3d464d}:host[color=orange]{color:#ff6900}:host[color=orange] i{color:#ff6900}:host[color=navigation]{color:#202945}:host[color=navigation] i{color:#202945}:host[color=skyBlue]{color:#009bdf}:host[color=skyBlue] i{color:#009bdf}:host[color=steel]{color:#5b6770}:host[color=steel] i{color:#5b6770}:host[color=metal]{color:#637893}:host[color=metal] i{color:#637893}:host[color=sand]{color:#f4f4f4}:host[color=sand] i{color:#f4f4f4}:host[color=silver]{color:#e2e2e2}:host[color=silver] i{color:#e2e2e2}:host[color=stone]{color:#bebebe}:host[color=stone] i{color:#bebebe}:host[color=ash]{color:#a0a0a0}:host[color=ash] i{color:#a0a0a0}:host[color=slate]{color:#707070}:host[color=slate] i{color:#707070}:host[color=onyx]{color:#526980}:host[color=onyx] i{color:#526980}:host[color=charcoal]{color:#282828}:host[color=charcoal] i{color:#282828}:host[color=moonlight]{color:#1a242f}:host[color=moonlight] i{color:#1a242f}:host[color=midnight]{color:#202945}:host[color=midnight] i{color:#202945}:host[color=darkness]{color:#161f27}:host[color=darkness] i{color:#161f27}:host[color=navy]{color:#0d2d42}:host[color=navy] i{color:#0d2d42}:host[color=aqua]{color:#3bafda}:host[color=aqua] i{color:#3bafda}:host[color=ocean]{color:#4a89dc}:host[color=ocean] i{color:#4a89dc}:host[color=mint]{color:#37bc9b}:host[color=mint] i{color:#37bc9b}:host[color=grass]{color:#8cc152}:host[color=grass] i{color:#8cc152}:host[color=sunflower]{color:#f6b042}:host[color=sunflower] i{color:#f6b042}:host[color=bittersweet]{color:#eb6845}:host[color=bittersweet] i{color:#eb6845}:host[color=grapefruit]{color:#da4453}:host[color=grapefruit] i{color:#da4453}:host[color=carnation]{color:#d770ad}:host[color=carnation] i{color:#d770ad}:host[color=lavender]{color:#967adc}:host[color=lavender] i{color:#967adc}:host[color=mountain]{color:#9678b6}:host[color=mountain] i{color:#9678b6}:host[color=info]{color:#4a89dc}:host[color=info] i{color:#4a89dc}:host[color=positive]{color:#4a89dc}:host[color=positive] i{color:#4a89dc}:host[color=success]{color:#8cc152}:host[color=success] i{color:#8cc152}:host[color=negative]{color:#da4453}:host[color=negative] i{color:#da4453}:host[color=danger]{color:#da4453}:host[color=danger] i{color:#da4453}:host[color=error]{color:#da4453}:host[color=error] i{color:#da4453}:host[color=warning]{color:#f6b042}:host[color=warning] i{color:#f6b042}:host[color=empty]{color:#cccdcc}:host[color=empty] i{color:#cccdcc}:host[color=disabled]{color:#bebebe}:host[color=disabled] i{color:#bebebe}:host[color=background]{color:#f7f7f7}:host[color=background] i{color:#f7f7f7}:host[color=backgroundDark]{color:#e2e2e2}:host[color=backgroundDark] i{color:#e2e2e2}:host[color=presentation]{color:#5b6770}:host[color=presentation] i{color:#5b6770}:host[color=bullhorn]{color:#ff6900}:host[color=bullhorn] i{color:#ff6900}:host[color=pulse]{color:#3bafda}:host[color=pulse] i{color:#3bafda}:host[color=company]{color:#39d}:host[color=company] i{color:#39d}:host[color=candidate]{color:#4b7}:host[color=candidate] i{color:#4b7}:host[color=lead]{color:#a69}:host[color=lead] i{color:#a69}:host[color=contact]{color:#fa4}:host[color=contact] i{color:#fa4}:host[color=clientcontact]{color:#fa4}:host[color=clientcontact] i{color:#fa4}:host[color=opportunity]{color:#625}:host[color=opportunity] i{color:#625}:host[color=job]{color:#b56}:host[color=job] i{color:#b56}:host[color=joborder]{color:#b56}:host[color=joborder] i{color:#b56}:host[color=submission]{color:#a9adbb}:host[color=submission] i{color:#a9adbb}:host[color=sendout]{color:#747884}:host[color=sendout] i{color:#747884}:host[color=placement]{color:#0b344f}:host[color=placement] i{color:#0b344f}:host[color=note]{color:#747884}:host[color=note] i{color:#747884}:host[color=contract]{color:#454ea0}:host[color=contract] i{color:#454ea0}:host[color=task]{color:#4f5361}:host[color=task] i{color:#4f5361}:host[color=jobCode]{color:#696d79}:host[color=jobCode] i{color:#696d79}:host[color=earnCode]{color:#696d79}:host[color=earnCode] i{color:#696d79}:host[color=invoiceStatement]{color:#696d79}:host[color=invoiceStatement] i{color:#696d79}:host[color=billableCharge]{color:#696d79}:host[color=billableCharge] i{color:#696d79}:host[color=payableCharge]{color:#696d79}:host[color=payableCharge] i{color:#696d79}:host[color=user]{color:#696d79}:host[color=user] i{color:#696d79}:host[color=corporateUser]{color:#696d79}:host[color=corporateUser] i{color:#696d79}:host[color=distributionList]{color:#696d79}:host[color=distributionList] i{color:#696d79}:host[color=credential]{color:#696d79}:host[color=credential] i{color:#696d79}:host[color=person]{color:#696d79}:host[color=person] i{color:#696d79}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;font-size:var(--font-size-tab);padding:1rem;display:flex;align-items:center;gap:.25rem;cursor:pointer;text-transform:uppercase}:host .novo-tab-link.text-capitalize{text-transform:capitalize}:host .novo-tab-link.text-uppercase{text-transform:uppercase}:host .novo-tab-link.text-nowrap{white-space:nowrap}:host .novo-tab-link.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-tab-link.text-size-default{font-size:inherit}:host .novo-tab-link.text-size-body{font-size:1.3rem}:host .novo-tab-link.text-size-xs{font-size:1rem}:host .novo-tab-link.text-size-sm{font-size:1.2rem}:host .novo-tab-link.text-size-md{font-size:1.3rem}:host .novo-tab-link.text-size-lg{font-size:1.6rem}:host .novo-tab-link.text-size-xl{font-size:2rem}:host .novo-tab-link.text-size-2xl{font-size:2.6rem}:host .novo-tab-link.text-size-3xl{font-size:3.2rem}:host .novo-tab-link.text-size-smaller{font-size:.8em}:host .novo-tab-link.text-size-larger{font-size:1.2em}:host .novo-tab-link.text-color-black{color:#000}:host .novo-tab-link.text-color-white{color:#fff}:host .novo-tab-link.text-color-gray{color:#9e9e9e}:host .novo-tab-link.text-color-grey{color:#9e9e9e}:host .novo-tab-link.text-color-offWhite{color:#f7f7f7}:host .novo-tab-link.text-color-bright{color:#f7f7f7}:host .novo-tab-link.text-color-light{color:#dbdbdb}:host .novo-tab-link.text-color-neutral{color:#4f5361}:host .novo-tab-link.text-color-dark{color:#3d464d}:host .novo-tab-link.text-color-orange{color:#ff6900}:host .novo-tab-link.text-color-navigation{color:#202945}:host .novo-tab-link.text-color-skyBlue{color:#009bdf}:host .novo-tab-link.text-color-steel{color:#5b6770}:host .novo-tab-link.text-color-metal{color:#637893}:host .novo-tab-link.text-color-sand{color:#f4f4f4}:host .novo-tab-link.text-color-silver{color:#e2e2e2}:host .novo-tab-link.text-color-stone{color:#bebebe}:host .novo-tab-link.text-color-ash{color:#a0a0a0}:host .novo-tab-link.text-color-slate{color:#707070}:host .novo-tab-link.text-color-onyx{color:#526980}:host .novo-tab-link.text-color-charcoal{color:#282828}:host .novo-tab-link.text-color-moonlight{color:#1a242f}:host .novo-tab-link.text-color-midnight{color:#202945}:host .novo-tab-link.text-color-darkness{color:#161f27}:host .novo-tab-link.text-color-navy{color:#0d2d42}:host .novo-tab-link.text-color-aqua{color:#3bafda}:host .novo-tab-link.text-color-ocean{color:#4a89dc}:host .novo-tab-link.text-color-mint{color:#37bc9b}:host .novo-tab-link.text-color-grass{color:#8cc152}:host .novo-tab-link.text-color-sunflower{color:#f6b042}:host .novo-tab-link.text-color-bittersweet{color:#eb6845}:host .novo-tab-link.text-color-grapefruit{color:#da4453}:host .novo-tab-link.text-color-carnation{color:#d770ad}:host .novo-tab-link.text-color-lavender{color:#967adc}:host .novo-tab-link.text-color-mountain{color:#9678b6}:host .novo-tab-link.text-color-info{color:#4a89dc}:host .novo-tab-link.text-color-positive{color:#4a89dc}:host .novo-tab-link.text-color-success{color:#8cc152}:host .novo-tab-link.text-color-negative{color:#da4453}:host .novo-tab-link.text-color-danger{color:#da4453}:host .novo-tab-link.text-color-error{color:#da4453}:host .novo-tab-link.text-color-warning{color:#f6b042}:host .novo-tab-link.text-color-empty{color:#cccdcc}:host .novo-tab-link.text-color-disabled{color:#bebebe}:host .novo-tab-link.text-color-background{color:#f7f7f7}:host .novo-tab-link.text-color-backgroundDark{color:#e2e2e2}:host .novo-tab-link.text-color-presentation{color:#5b6770}:host .novo-tab-link.text-color-bullhorn{color:#ff6900}:host .novo-tab-link.text-color-pulse{color:#3bafda}:host .novo-tab-link.text-color-company{color:#39d}:host .novo-tab-link.text-color-candidate{color:#4b7}:host .novo-tab-link.text-color-lead{color:#a69}:host .novo-tab-link.text-color-contact{color:#fa4}:host .novo-tab-link.text-color-clientcontact{color:#fa4}:host .novo-tab-link.text-color-opportunity{color:#625}:host .novo-tab-link.text-color-job{color:#b56}:host .novo-tab-link.text-color-joborder{color:#b56}:host .novo-tab-link.text-color-submission{color:#a9adbb}:host .novo-tab-link.text-color-sendout{color:#747884}:host .novo-tab-link.text-color-placement{color:#0b344f}:host .novo-tab-link.text-color-note{color:#747884}:host .novo-tab-link.text-color-contract{color:#454ea0}:host .novo-tab-link.text-color-task{color:#4f5361}:host .novo-tab-link.text-color-jobCode{color:#696d79}:host .novo-tab-link.text-color-earnCode{color:#696d79}:host .novo-tab-link.text-color-invoiceStatement{color:#696d79}:host .novo-tab-link.text-color-billableCharge{color:#696d79}:host .novo-tab-link.text-color-payableCharge{color:#696d79}:host .novo-tab-link.text-color-user{color:#696d79}:host .novo-tab-link.text-color-corporateUser{color:#696d79}:host .novo-tab-link.text-color-distributionList{color:#696d79}:host .novo-tab-link.text-color-credential{color:#696d79}:host .novo-tab-link.text-color-person{color:#696d79}:host .novo-tab-link.margin-before{margin-top:.4rem}:host .novo-tab-link.margin-after{margin-bottom:.8rem}:host .novo-tab-link.text-length-small{max-width:40ch}:host .novo-tab-link.text-length-medium{max-width:55ch}:host .novo-tab-link.text-length-large{max-width:70ch}:host .novo-tab-link.text-weight-hairline{font-weight:100}:host .novo-tab-link.text-weight-thin{font-weight:200}:host .novo-tab-link.text-weight-light{font-weight:300}:host .novo-tab-link.text-weight-normal{font-weight:400}:host .novo-tab-link.text-weight-medium{font-weight:500}:host .novo-tab-link.text-weight-semibold{font-weight:600}:host .novo-tab-link.text-weight-bold{font-weight:700}:host .novo-tab-link.text-weight-extrabold{font-weight:800}:host .novo-tab-link.text-weight-heavy{font-weight:900}:host .novo-tab-link.text-weight-lighter{font-weight:lighter}:host .novo-tab-link.text-weight-bolder{font-weight:bolder}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--focus);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;width:100%;flex-direction:row;align-items:center;min-width:12rem;justify-content:space-between;transition:all .12s ease-in-out}:host-context(novo-nav[direction=vertical]) .novo-tab-link{order:2;flex:1;width:100%;display:flex;flex-flow:row nowrap;gap:.25rem;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.75}:host-context(novo-nav[direction=vertical]) .indicator{order:1;width:4px;height:0;display:block;background:transparent;transition:all .22s ease-in-out}:host-context(novo-nav[direction=vertical]).active,:host-context(novo-nav[direction=vertical]).router-link-active{background:#0000000d}:host-context(novo-nav[direction=vertical]).active .novo-tab-link,:host-context(novo-nav[direction=vertical]).router-link-active .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).active .indicator,:host-context(novo-nav[direction=vertical]).router-link-active .indicator{height:100%;top:0;bottom:0}:host-context(novo-nav[direction=vertical]):hover .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[direction=vertical]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav[theme=white]){height:auto}:host-context(novo-nav[theme=white]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover .novo-tab-link{opacity:.5;font-weight:400}:host-context(novo-nav[theme=white]) .novo-tab-link{color:var(--text-main);opacity:.75}:host-context(novo-nav[theme=white]).active,:host-context(novo-nav[theme=white]).router-link-active{color:var(--selection)}:host-context(novo-nav[theme=white]).active .novo-tab-link,:host-context(novo-nav[theme=white]).router-link-active .novo-tab-link{color:var(--selection);opacity:1}:host-context(novo-nav[theme=white]).active .indicator,:host-context(novo-nav[theme=white]).router-link-active .indicator{background:currentColor}:host-context(novo-nav[theme=white]):hover .novo-tab-link{font-weight:500}:host-context(novo-nav[theme=color]) .novo-tab-link,:host-context(novo-nav[theme=neutral]) .novo-tab-link{color:#fff}:host-context(novo-nav[theme=color]).active .indicator,:host-context(novo-nav[theme=color]).router-link-active .indicator,:host-context(novo-nav[theme=neutral]).active .indicator,:host-context(novo-nav[theme=neutral]).router-link-active .indicator{background:#fff}:host-context(novo-nav[theme=color]).disabled .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav.condensed){font-size:1rem}:host-context(novo-nav.condensed) .novo-tab-link{padding:.5rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabLinkElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab-link', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    }, template: `
    <div class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;position:relative}:host[color=black]{color:#000}:host[color=black] i{color:#000}:host[color=white]{color:#fff}:host[color=white] i{color:#fff}:host[color=gray]{color:#9e9e9e}:host[color=gray] i{color:#9e9e9e}:host[color=grey]{color:#9e9e9e}:host[color=grey] i{color:#9e9e9e}:host[color=offWhite]{color:#f7f7f7}:host[color=offWhite] i{color:#f7f7f7}:host[color=bright]{color:#f7f7f7}:host[color=bright] i{color:#f7f7f7}:host[color=light]{color:#dbdbdb}:host[color=light] i{color:#dbdbdb}:host[color=neutral]{color:#4f5361}:host[color=neutral] i{color:#4f5361}:host[color=dark]{color:#3d464d}:host[color=dark] i{color:#3d464d}:host[color=orange]{color:#ff6900}:host[color=orange] i{color:#ff6900}:host[color=navigation]{color:#202945}:host[color=navigation] i{color:#202945}:host[color=skyBlue]{color:#009bdf}:host[color=skyBlue] i{color:#009bdf}:host[color=steel]{color:#5b6770}:host[color=steel] i{color:#5b6770}:host[color=metal]{color:#637893}:host[color=metal] i{color:#637893}:host[color=sand]{color:#f4f4f4}:host[color=sand] i{color:#f4f4f4}:host[color=silver]{color:#e2e2e2}:host[color=silver] i{color:#e2e2e2}:host[color=stone]{color:#bebebe}:host[color=stone] i{color:#bebebe}:host[color=ash]{color:#a0a0a0}:host[color=ash] i{color:#a0a0a0}:host[color=slate]{color:#707070}:host[color=slate] i{color:#707070}:host[color=onyx]{color:#526980}:host[color=onyx] i{color:#526980}:host[color=charcoal]{color:#282828}:host[color=charcoal] i{color:#282828}:host[color=moonlight]{color:#1a242f}:host[color=moonlight] i{color:#1a242f}:host[color=midnight]{color:#202945}:host[color=midnight] i{color:#202945}:host[color=darkness]{color:#161f27}:host[color=darkness] i{color:#161f27}:host[color=navy]{color:#0d2d42}:host[color=navy] i{color:#0d2d42}:host[color=aqua]{color:#3bafda}:host[color=aqua] i{color:#3bafda}:host[color=ocean]{color:#4a89dc}:host[color=ocean] i{color:#4a89dc}:host[color=mint]{color:#37bc9b}:host[color=mint] i{color:#37bc9b}:host[color=grass]{color:#8cc152}:host[color=grass] i{color:#8cc152}:host[color=sunflower]{color:#f6b042}:host[color=sunflower] i{color:#f6b042}:host[color=bittersweet]{color:#eb6845}:host[color=bittersweet] i{color:#eb6845}:host[color=grapefruit]{color:#da4453}:host[color=grapefruit] i{color:#da4453}:host[color=carnation]{color:#d770ad}:host[color=carnation] i{color:#d770ad}:host[color=lavender]{color:#967adc}:host[color=lavender] i{color:#967adc}:host[color=mountain]{color:#9678b6}:host[color=mountain] i{color:#9678b6}:host[color=info]{color:#4a89dc}:host[color=info] i{color:#4a89dc}:host[color=positive]{color:#4a89dc}:host[color=positive] i{color:#4a89dc}:host[color=success]{color:#8cc152}:host[color=success] i{color:#8cc152}:host[color=negative]{color:#da4453}:host[color=negative] i{color:#da4453}:host[color=danger]{color:#da4453}:host[color=danger] i{color:#da4453}:host[color=error]{color:#da4453}:host[color=error] i{color:#da4453}:host[color=warning]{color:#f6b042}:host[color=warning] i{color:#f6b042}:host[color=empty]{color:#cccdcc}:host[color=empty] i{color:#cccdcc}:host[color=disabled]{color:#bebebe}:host[color=disabled] i{color:#bebebe}:host[color=background]{color:#f7f7f7}:host[color=background] i{color:#f7f7f7}:host[color=backgroundDark]{color:#e2e2e2}:host[color=backgroundDark] i{color:#e2e2e2}:host[color=presentation]{color:#5b6770}:host[color=presentation] i{color:#5b6770}:host[color=bullhorn]{color:#ff6900}:host[color=bullhorn] i{color:#ff6900}:host[color=pulse]{color:#3bafda}:host[color=pulse] i{color:#3bafda}:host[color=company]{color:#39d}:host[color=company] i{color:#39d}:host[color=candidate]{color:#4b7}:host[color=candidate] i{color:#4b7}:host[color=lead]{color:#a69}:host[color=lead] i{color:#a69}:host[color=contact]{color:#fa4}:host[color=contact] i{color:#fa4}:host[color=clientcontact]{color:#fa4}:host[color=clientcontact] i{color:#fa4}:host[color=opportunity]{color:#625}:host[color=opportunity] i{color:#625}:host[color=job]{color:#b56}:host[color=job] i{color:#b56}:host[color=joborder]{color:#b56}:host[color=joborder] i{color:#b56}:host[color=submission]{color:#a9adbb}:host[color=submission] i{color:#a9adbb}:host[color=sendout]{color:#747884}:host[color=sendout] i{color:#747884}:host[color=placement]{color:#0b344f}:host[color=placement] i{color:#0b344f}:host[color=note]{color:#747884}:host[color=note] i{color:#747884}:host[color=contract]{color:#454ea0}:host[color=contract] i{color:#454ea0}:host[color=task]{color:#4f5361}:host[color=task] i{color:#4f5361}:host[color=jobCode]{color:#696d79}:host[color=jobCode] i{color:#696d79}:host[color=earnCode]{color:#696d79}:host[color=earnCode] i{color:#696d79}:host[color=invoiceStatement]{color:#696d79}:host[color=invoiceStatement] i{color:#696d79}:host[color=billableCharge]{color:#696d79}:host[color=billableCharge] i{color:#696d79}:host[color=payableCharge]{color:#696d79}:host[color=payableCharge] i{color:#696d79}:host[color=user]{color:#696d79}:host[color=user] i{color:#696d79}:host[color=corporateUser]{color:#696d79}:host[color=corporateUser] i{color:#696d79}:host[color=distributionList]{color:#696d79}:host[color=distributionList] i{color:#696d79}:host[color=credential]{color:#696d79}:host[color=credential] i{color:#696d79}:host[color=person]{color:#696d79}:host[color=person] i{color:#696d79}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;font-size:var(--font-size-tab);padding:1rem;display:flex;align-items:center;gap:.25rem;cursor:pointer;text-transform:uppercase}:host .novo-tab-link.text-capitalize{text-transform:capitalize}:host .novo-tab-link.text-uppercase{text-transform:uppercase}:host .novo-tab-link.text-nowrap{white-space:nowrap}:host .novo-tab-link.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-tab-link.text-size-default{font-size:inherit}:host .novo-tab-link.text-size-body{font-size:1.3rem}:host .novo-tab-link.text-size-xs{font-size:1rem}:host .novo-tab-link.text-size-sm{font-size:1.2rem}:host .novo-tab-link.text-size-md{font-size:1.3rem}:host .novo-tab-link.text-size-lg{font-size:1.6rem}:host .novo-tab-link.text-size-xl{font-size:2rem}:host .novo-tab-link.text-size-2xl{font-size:2.6rem}:host .novo-tab-link.text-size-3xl{font-size:3.2rem}:host .novo-tab-link.text-size-smaller{font-size:.8em}:host .novo-tab-link.text-size-larger{font-size:1.2em}:host .novo-tab-link.text-color-black{color:#000}:host .novo-tab-link.text-color-white{color:#fff}:host .novo-tab-link.text-color-gray{color:#9e9e9e}:host .novo-tab-link.text-color-grey{color:#9e9e9e}:host .novo-tab-link.text-color-offWhite{color:#f7f7f7}:host .novo-tab-link.text-color-bright{color:#f7f7f7}:host .novo-tab-link.text-color-light{color:#dbdbdb}:host .novo-tab-link.text-color-neutral{color:#4f5361}:host .novo-tab-link.text-color-dark{color:#3d464d}:host .novo-tab-link.text-color-orange{color:#ff6900}:host .novo-tab-link.text-color-navigation{color:#202945}:host .novo-tab-link.text-color-skyBlue{color:#009bdf}:host .novo-tab-link.text-color-steel{color:#5b6770}:host .novo-tab-link.text-color-metal{color:#637893}:host .novo-tab-link.text-color-sand{color:#f4f4f4}:host .novo-tab-link.text-color-silver{color:#e2e2e2}:host .novo-tab-link.text-color-stone{color:#bebebe}:host .novo-tab-link.text-color-ash{color:#a0a0a0}:host .novo-tab-link.text-color-slate{color:#707070}:host .novo-tab-link.text-color-onyx{color:#526980}:host .novo-tab-link.text-color-charcoal{color:#282828}:host .novo-tab-link.text-color-moonlight{color:#1a242f}:host .novo-tab-link.text-color-midnight{color:#202945}:host .novo-tab-link.text-color-darkness{color:#161f27}:host .novo-tab-link.text-color-navy{color:#0d2d42}:host .novo-tab-link.text-color-aqua{color:#3bafda}:host .novo-tab-link.text-color-ocean{color:#4a89dc}:host .novo-tab-link.text-color-mint{color:#37bc9b}:host .novo-tab-link.text-color-grass{color:#8cc152}:host .novo-tab-link.text-color-sunflower{color:#f6b042}:host .novo-tab-link.text-color-bittersweet{color:#eb6845}:host .novo-tab-link.text-color-grapefruit{color:#da4453}:host .novo-tab-link.text-color-carnation{color:#d770ad}:host .novo-tab-link.text-color-lavender{color:#967adc}:host .novo-tab-link.text-color-mountain{color:#9678b6}:host .novo-tab-link.text-color-info{color:#4a89dc}:host .novo-tab-link.text-color-positive{color:#4a89dc}:host .novo-tab-link.text-color-success{color:#8cc152}:host .novo-tab-link.text-color-negative{color:#da4453}:host .novo-tab-link.text-color-danger{color:#da4453}:host .novo-tab-link.text-color-error{color:#da4453}:host .novo-tab-link.text-color-warning{color:#f6b042}:host .novo-tab-link.text-color-empty{color:#cccdcc}:host .novo-tab-link.text-color-disabled{color:#bebebe}:host .novo-tab-link.text-color-background{color:#f7f7f7}:host .novo-tab-link.text-color-backgroundDark{color:#e2e2e2}:host .novo-tab-link.text-color-presentation{color:#5b6770}:host .novo-tab-link.text-color-bullhorn{color:#ff6900}:host .novo-tab-link.text-color-pulse{color:#3bafda}:host .novo-tab-link.text-color-company{color:#39d}:host .novo-tab-link.text-color-candidate{color:#4b7}:host .novo-tab-link.text-color-lead{color:#a69}:host .novo-tab-link.text-color-contact{color:#fa4}:host .novo-tab-link.text-color-clientcontact{color:#fa4}:host .novo-tab-link.text-color-opportunity{color:#625}:host .novo-tab-link.text-color-job{color:#b56}:host .novo-tab-link.text-color-joborder{color:#b56}:host .novo-tab-link.text-color-submission{color:#a9adbb}:host .novo-tab-link.text-color-sendout{color:#747884}:host .novo-tab-link.text-color-placement{color:#0b344f}:host .novo-tab-link.text-color-note{color:#747884}:host .novo-tab-link.text-color-contract{color:#454ea0}:host .novo-tab-link.text-color-task{color:#4f5361}:host .novo-tab-link.text-color-jobCode{color:#696d79}:host .novo-tab-link.text-color-earnCode{color:#696d79}:host .novo-tab-link.text-color-invoiceStatement{color:#696d79}:host .novo-tab-link.text-color-billableCharge{color:#696d79}:host .novo-tab-link.text-color-payableCharge{color:#696d79}:host .novo-tab-link.text-color-user{color:#696d79}:host .novo-tab-link.text-color-corporateUser{color:#696d79}:host .novo-tab-link.text-color-distributionList{color:#696d79}:host .novo-tab-link.text-color-credential{color:#696d79}:host .novo-tab-link.text-color-person{color:#696d79}:host .novo-tab-link.margin-before{margin-top:.4rem}:host .novo-tab-link.margin-after{margin-bottom:.8rem}:host .novo-tab-link.text-length-small{max-width:40ch}:host .novo-tab-link.text-length-medium{max-width:55ch}:host .novo-tab-link.text-length-large{max-width:70ch}:host .novo-tab-link.text-weight-hairline{font-weight:100}:host .novo-tab-link.text-weight-thin{font-weight:200}:host .novo-tab-link.text-weight-light{font-weight:300}:host .novo-tab-link.text-weight-normal{font-weight:400}:host .novo-tab-link.text-weight-medium{font-weight:500}:host .novo-tab-link.text-weight-semibold{font-weight:600}:host .novo-tab-link.text-weight-bold{font-weight:700}:host .novo-tab-link.text-weight-extrabold{font-weight:800}:host .novo-tab-link.text-weight-heavy{font-weight:900}:host .novo-tab-link.text-weight-lighter{font-weight:lighter}:host .novo-tab-link.text-weight-bolder{font-weight:bolder}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--focus);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;width:100%;flex-direction:row;align-items:center;min-width:12rem;justify-content:space-between;transition:all .12s ease-in-out}:host-context(novo-nav[direction=vertical]) .novo-tab-link{order:2;flex:1;width:100%;display:flex;flex-flow:row nowrap;gap:.25rem;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.75}:host-context(novo-nav[direction=vertical]) .indicator{order:1;width:4px;height:0;display:block;background:transparent;transition:all .22s ease-in-out}:host-context(novo-nav[direction=vertical]).active,:host-context(novo-nav[direction=vertical]).router-link-active{background:#0000000d}:host-context(novo-nav[direction=vertical]).active .novo-tab-link,:host-context(novo-nav[direction=vertical]).router-link-active .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).active .indicator,:host-context(novo-nav[direction=vertical]).router-link-active .indicator{height:100%;top:0;bottom:0}:host-context(novo-nav[direction=vertical]):hover .novo-tab-link{opacity:1}:host-context(novo-nav[direction=vertical]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[direction=vertical]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav[theme=white]){height:auto}:host-context(novo-nav[theme=white]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover .novo-tab-link{opacity:.5;font-weight:400}:host-context(novo-nav[theme=white]) .novo-tab-link{color:var(--text-main);opacity:.75}:host-context(novo-nav[theme=white]).active,:host-context(novo-nav[theme=white]).router-link-active{color:var(--selection)}:host-context(novo-nav[theme=white]).active .novo-tab-link,:host-context(novo-nav[theme=white]).router-link-active .novo-tab-link{color:var(--selection);opacity:1}:host-context(novo-nav[theme=white]).active .indicator,:host-context(novo-nav[theme=white]).router-link-active .indicator{background:currentColor}:host-context(novo-nav[theme=white]):hover .novo-tab-link{font-weight:500}:host-context(novo-nav[theme=color]) .novo-tab-link,:host-context(novo-nav[theme=neutral]) .novo-tab-link{color:#fff}:host-context(novo-nav[theme=color]).active .indicator,:host-context(novo-nav[theme=color]).router-link-active .indicator,:host-context(novo-nav[theme=neutral]).active .indicator,:host-context(novo-nav[theme=neutral]).router-link-active .indicator{background:#fff}:host-context(novo-nav[theme=color]).disabled .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover .novo-tab-link,:host-context(novo-nav[theme=neutral]).disabled:hover .novo-tab-link{opacity:.5}:host-context(novo-nav.condensed){font-size:1rem}:host-context(novo-nav.condensed) .novo-tab-link{padding:.5rem}\n"] }]
        }], ctorParameters: () => [{ type: NovoNavElement }, { type: i1.Router }, { type: i0.ChangeDetectorRef }, { type: i1.RouterLink, decorators: [{
                    type: Optional
                }] }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }], spy: [{
                type: Input
            }] } });
class NovoNavOutletElement {
    constructor() {
        this.items = [];
    }
    show(index) {
        const item = this.items[index];
        /**
         * Deactivates other tab items
         * @param items - deactivated items
         */
        function _deactivateAllItems(items) {
            items.forEach((t) => {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }
        _deactivateAllItems(this.items);
        item.active = true;
    }
    add(item) {
        if (this.items.length === 0) {
            item.active = true;
        }
        this.items.push(item);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavOutletElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoNavOutletElement, isStandalone: false, selector: "novo-nav-outlet", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: ["novo-nav-outlet{display:block}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavOutletElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-outlet', template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, standalone: false, styles: ["novo-nav-outlet{display:block}\n"] }]
        }] });
class NovoNavContentElement {
    constructor(outlet) {
        this.active = false;
        outlet.add(this);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavContentElement, deps: [{ token: NovoNavOutletElement }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoNavContentElement, isStandalone: false, selector: "novo-nav-content", inputs: { active: "active" }, host: { properties: { "class.active": "active" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: ["novo-nav-content{display:none}novo-nav-content.active{display:block}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-content', host: {
                        '[class.active]': 'active',
                    }, template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, standalone: false, styles: ["novo-nav-content{display:none}novo-nav-content.active{display:block}\n"] }]
        }], ctorParameters: () => [{ type: NovoNavOutletElement }], propDecorators: { active: [{
                type: Input
            }] } });
class NovoNavHeaderElement {
    constructor(outlet) {
        this.role = 'tabpanel';
        this.active = false;
        this.active = this.active || false;
        this.outlet = outlet;
    }
    show(event) {
        try {
            const INDEX = this.outlet.items.indexOf(this.forElement);
            if (INDEX > -1) {
                this.outlet.show(INDEX);
            }
        }
        catch (err) {
            // do nothing
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavHeaderElement, deps: [{ token: NovoNavOutletElement }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoNavHeaderElement, isStandalone: false, selector: "novo-nav-header", inputs: { active: "active", forElement: ["for", "forElement"] }, host: { listeners: { "click": "show($event)" }, properties: { "class.active": "active", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNavHeaderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-header', host: {
                        '[class.active]': 'active',
                        '(click)': 'show($event)',
                    }, template: '<ng-content></ng-content>', standalone: false, styles: [":host{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}\n"] }]
        }], ctorParameters: () => [{ type: NovoNavOutletElement }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], forElement: [{
                type: Input,
                args: ['for']
            }] } });

// NG2
class NovoTabModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoTabModule, declarations: [NovoNavElement,
            NovoTabElement,
            NovoTabButtonElement,
            NovoTabLinkElement,
            NovoNavOutletElement,
            NovoNavContentElement,
            NovoNavHeaderElement], imports: [CommonModule], exports: [NovoNavElement,
            NovoTabElement,
            NovoTabButtonElement,
            NovoTabLinkElement,
            NovoNavOutletElement,
            NovoNavContentElement,
            NovoNavHeaderElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        NovoNavElement,
                        NovoTabElement,
                        NovoTabButtonElement,
                        NovoTabLinkElement,
                        NovoNavOutletElement,
                        NovoNavContentElement,
                        NovoNavHeaderElement,
                    ],
                    exports: [
                        NovoNavElement,
                        NovoTabElement,
                        NovoTabButtonElement,
                        NovoTabLinkElement,
                        NovoNavOutletElement,
                        NovoNavContentElement,
                        NovoNavHeaderElement,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoNavContentElement, NovoNavElement, NovoNavHeaderElement, NovoNavOutletElement, NovoTabButtonElement, NovoTabElement, NovoTabLinkElement, NovoTabModule };
//# sourceMappingURL=novo-elements-elements-tabs.mjs.map
