import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import * as i1$1 from '@angular/cdk/overlay';
import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { EventEmitter, HostListener, Output, Input, Component, ContentChild, Directive, ElementRef, Injectable, InjectionToken, ViewChild, ContentChildren, Optional, Inject, ViewEncapsulation, HostBinding, NgModule } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NovoOption, NovoCommonModule } from 'novo-elements/elements/common';
import { first } from 'rxjs/operators';
import { ComponentPortal } from '@angular/cdk/portal';
import { BooleanInput } from 'novo-elements/utils';
import { NovoIconModule } from 'novo-elements/elements/icon';

class MenuContentComponent {
    constructor() {
        this.menuItems = [];
        this.isLeaf = false;
        this.openSubMenu = new EventEmitter();
        this.closeLeafMenu = new EventEmitter();
        this.closeAllMenus = new EventEmitter();
        this.autoFocus = false;
        this.subscription = new Subscription();
    }
    ngOnInit() { }
    ngAfterViewInit() {
        if (this.autoFocus) {
            setTimeout(() => this.focus());
        }
        this.overlay.updatePosition();
        this._keyManager = new ActiveDescendantKeyManager(this.menu.menuOptions).withWrap();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    focus() { }
    stopEvent($event) {
        $event.stopPropagation();
    }
    isMenuItemEnabled(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.menuItemEnabled);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.menuItemVisible);
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
    isDisabled(link) {
        return link.enabled && !link.enabled(this.item);
    }
    onKeyEvent(event) {
        if (!this.isLeaf) {
            return;
        }
        this._keyManager.onKeydown(event);
    }
    keyboardOpenSubMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onOpenSubMenu(menuItem);
        }
    }
    keyboardMenuItemSelect(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        const option = this._keyManager.activeItem;
        option._clickViaInteraction();
    }
    onCloseLeafMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        this.closeLeafMenu.emit({ exceptRootMenu: event.key === "ArrowLeft" /* Key.ArrowLeft */, event });
    }
    closeMenu(event) {
        if (event.type === 'click' && event.button === 2) {
            return;
        }
        this.closeAllMenus.emit({ event });
    }
    onMouseLeave(event) {
        if (this.isLeaf) {
            this.closeLeafMenu.emit({ exceptRootMenu: true, event });
        }
    }
    onOpenSubMenu(menuItem, event) { }
    onMenuItemSelect(menuItem, event) {
        event.preventDefault();
        event.stopPropagation();
        this.onOpenSubMenu(menuItem, event);
    }
    cancelEvent(event) {
        if (!event) {
            return;
        }
        const target = event.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 || target.isContentEditable) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: MenuContentComponent, isStandalone: false, selector: "menu-content", inputs: { menuItems: "menuItems", item: "item", event: "event", menu: "menu", parentMenu: "parentMenu", menuClass: "menuClass", overlay: "overlay", isLeaf: "isLeaf" }, outputs: { openSubMenu: "openSubMenu", closeLeafMenu: "closeLeafMenu", closeAllMenus: "closeAllMenus" }, host: { listeners: { "window:keydown.ArrowDown": "onKeyEvent($event)", "window:keydown.ArrowUp": "onKeyEvent($event)", "window:keydown.ArrowRight": "keyboardOpenSubMenu($event)", "window:keydown.Enter": "keyboardMenuItemSelect($event)", "window:keydown.Space": "keyboardMenuItemSelect($event)", "window:keydown.Escape": "onCloseLeafMenu($event)", "window:keydown.ArrowLeft": "onCloseLeafMenu($event)", "document:click": "closeMenu($event)", "mouseleave": "onMouseLeave($event)" } }, ngImport: i0, template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </ul>
  </div> `, isInline: true, styles: [":host .passive{display:block;padding:3px 20px;clear:both;font-weight:400;white-space:nowrap}:host .menu-container{width:180px}:host .menu-container .menu{cursor:default;list-style:none;background-color:var(--background-bright);padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .menu-container .menu :hover{background:rgb(from var(--color-positive) r g b/.1);color:var(--font-color-base)}:host .menu-container .menu :active{background:rgb(from var(--color-positive) r g b/.4)}:host .menu-container .menu .menu-item-container{display:flex;align-items:center;position:relative}:host .menu-container .menu .menu-item-container .sub-menu-caret{position:absolute;right:var(--spacing-sm)}:host .menu-container .menu .menu-item{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;cursor:pointer;margin:0;padding:var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-lg);box-sizing:border-box;display:flex;align-items:center;gap:1rem;flex:1}:host .menu-container .menu .menu-item.text-capitalize{text-transform:capitalize}:host .menu-container .menu .menu-item.text-uppercase{text-transform:uppercase}:host .menu-container .menu .menu-item.text-nowrap{white-space:nowrap}:host .menu-container .menu .menu-item.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .menu-container .menu .menu-item.text-size-default{font-size:inherit}:host .menu-container .menu .menu-item.text-size-body{font-size:var(--font-size-body)}:host .menu-container .menu .menu-item.text-size-xs{font-size:var(--font-size-xs)}:host .menu-container .menu .menu-item.text-size-sm{font-size:var(--font-size-sm)}:host .menu-container .menu .menu-item.text-size-md{font-size:var(--font-size-md)}:host .menu-container .menu .menu-item.text-size-lg{font-size:var(--font-size-lg)}:host .menu-container .menu .menu-item.text-size-xl{font-size:var(--font-size-xl)}:host .menu-container .menu .menu-item.text-size-2xl{font-size:var(--font-size-2xl)}:host .menu-container .menu .menu-item.text-size-3xl{font-size:var(--font-size-3xl)}:host .menu-container .menu .menu-item.text-size-smaller{font-size:.8em}:host .menu-container .menu .menu-item.text-size-larger{font-size:1.2em}:host .menu-container .menu .menu-item.text-color-black{color:var(--color-black)}:host .menu-container .menu .menu-item.text-color-white{color:var(--color-white)}:host .menu-container .menu .menu-item.text-color-gray{color:var(--color-gray)}:host .menu-container .menu .menu-item.text-color-grey{color:var(--color-grey)}:host .menu-container .menu .menu-item.text-color-offWhite{color:var(--color-off-white)}:host .menu-container .menu .menu-item.text-color-bright{color:var(--color-bright)}:host .menu-container .menu .menu-item.text-color-light{color:var(--color-light)}:host .menu-container .menu .menu-item.text-color-neutral{color:var(--color-neutral)}:host .menu-container .menu .menu-item.text-color-dark{color:var(--color-dark)}:host .menu-container .menu .menu-item.text-color-orange{color:var(--color-orange)}:host .menu-container .menu .menu-item.text-color-navigation{color:var(--color-navigation)}:host .menu-container .menu .menu-item.text-color-skyBlue{color:var(--color-sky-blue)}:host .menu-container .menu .menu-item.text-color-steel{color:var(--color-steel)}:host .menu-container .menu .menu-item.text-color-metal{color:var(--color-metal)}:host .menu-container .menu .menu-item.text-color-sand{color:var(--color-sand)}:host .menu-container .menu .menu-item.text-color-silver{color:var(--color-silver)}:host .menu-container .menu .menu-item.text-color-stone{color:var(--color-stone)}:host .menu-container .menu .menu-item.text-color-ash{color:var(--color-ash)}:host .menu-container .menu .menu-item.text-color-anonymous{color:var(--color-anonymous)}:host .menu-container .menu .menu-item.text-color-slate{color:var(--color-slate)}:host .menu-container .menu .menu-item.text-color-onyx{color:var(--color-onyx)}:host .menu-container .menu .menu-item.text-color-charcoal{color:var(--color-charcoal)}:host .menu-container .menu .menu-item.text-color-moonlight{color:var(--color-moonlight)}:host .menu-container .menu .menu-item.text-color-midnight{color:var(--color-midnight)}:host .menu-container .menu .menu-item.text-color-darkness{color:var(--color-darkness)}:host .menu-container .menu .menu-item.text-color-navy{color:var(--color-navy)}:host .menu-container .menu .menu-item.text-color-aqua{color:var(--color-aqua)}:host .menu-container .menu .menu-item.text-color-ocean{color:var(--color-ocean)}:host .menu-container .menu .menu-item.text-color-mint{color:var(--color-mint)}:host .menu-container .menu .menu-item.text-color-grass{color:var(--color-grass)}:host .menu-container .menu .menu-item.text-color-sunflower{color:var(--color-sunflower)}:host .menu-container .menu .menu-item.text-color-bittersweet{color:var(--color-bittersweet)}:host .menu-container .menu .menu-item.text-color-grapefruit{color:var(--color-grapefruit)}:host .menu-container .menu .menu-item.text-color-carnation{color:var(--color-carnation)}:host .menu-container .menu .menu-item.text-color-lavender{color:var(--color-lavender)}:host .menu-container .menu .menu-item.text-color-mountain{color:var(--color-mountain)}:host .menu-container .menu .menu-item.text-color-info{color:var(--color-info)}:host .menu-container .menu .menu-item.text-color-positive{color:var(--color-positive)}:host .menu-container .menu .menu-item.text-color-success{color:var(--color-success)}:host .menu-container .menu .menu-item.text-color-negative{color:var(--color-negative)}:host .menu-container .menu .menu-item.text-color-danger{color:var(--color-danger)}:host .menu-container .menu .menu-item.text-color-error{color:var(--color-error)}:host .menu-container .menu .menu-item.text-color-warning{color:var(--color-warning)}:host .menu-container .menu .menu-item.text-color-empty{color:var(--color-empty)}:host .menu-container .menu .menu-item.text-color-disabled{color:var(--color-disabled)}:host .menu-container .menu .menu-item.text-color-background{color:var(--color-background)}:host .menu-container .menu .menu-item.text-color-backgroundDark{color:var(--color-background-dark)}:host .menu-container .menu .menu-item.text-color-border{color:var(--color-border)}:host .menu-container .menu .menu-item.text-color-border2{color:var(--color-border2)}:host .menu-container .menu .menu-item.text-color-text{color:var(--color-text)}:host .menu-container .menu .menu-item.text-color-presentation{color:var(--color-presentation)}:host .menu-container .menu .menu-item.text-color-bullhorn{color:var(--color-bullhorn)}:host .menu-container .menu .menu-item.text-color-pulse{color:var(--color-pulse)}:host .menu-container .menu .menu-item.text-color-fastFind{color:var(--color-fast-find)}:host .menu-container .menu .menu-item.text-color-toast{color:var(--color-toast)}:host .menu-container .menu .menu-item.text-color-company{color:var(--color-company)}:host .menu-container .menu .menu-item.text-color-candidate{color:var(--color-candidate)}:host .menu-container .menu .menu-item.text-color-lead{color:var(--color-lead)}:host .menu-container .menu .menu-item.text-color-contact{color:var(--color-contact)}:host .menu-container .menu .menu-item.text-color-clientcontact{color:var(--color-clientcontact)}:host .menu-container .menu .menu-item.text-color-opportunity{color:var(--color-opportunity)}:host .menu-container .menu .menu-item.text-color-job{color:var(--color-job)}:host .menu-container .menu .menu-item.text-color-joborder{color:var(--color-joborder)}:host .menu-container .menu .menu-item.text-color-submission{color:var(--color-submission)}:host .menu-container .menu .menu-item.text-color-sendout{color:var(--color-sendout)}:host .menu-container .menu .menu-item.text-color-placement{color:var(--color-placement)}:host .menu-container .menu .menu-item.text-color-note{color:var(--color-note)}:host .menu-container .menu .menu-item.text-color-contract{color:var(--color-contract)}:host .menu-container .menu .menu-item.text-color-task{color:var(--color-task)}:host .menu-container .menu .menu-item.text-color-jobCode{color:var(--color-job-code)}:host .menu-container .menu .menu-item.text-color-earnCode{color:var(--color-earn-code)}:host .menu-container .menu .menu-item.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .menu-container .menu .menu-item.text-color-billableCharge{color:var(--color-billable-charge)}:host .menu-container .menu .menu-item.text-color-payableCharge{color:var(--color-payable-charge)}:host .menu-container .menu .menu-item.text-color-user{color:var(--color-user)}:host .menu-container .menu .menu-item.text-color-corporateUser{color:var(--color-corporate-user)}:host .menu-container .menu .menu-item.text-color-distributionList{color:var(--color-distribution-list)}:host .menu-container .menu .menu-item.text-color-credential{color:var(--color-credential)}:host .menu-container .menu .menu-item.text-color-person{color:var(--color-person)}:host .menu-container .menu .menu-item.margin-before{margin-top:.4rem}:host .menu-container .menu .menu-item.margin-after{margin-bottom:.8rem}:host .menu-container .menu .menu-item.text-length-small{max-width:40ch}:host .menu-container .menu .menu-item.text-length-medium{max-width:55ch}:host .menu-container .menu .menu-item.text-length-large{max-width:70ch}:host .menu-container .menu .menu-item.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .menu-container .menu .menu-item.text-weight-thin{font-weight:var(--font-weight-thin)}:host .menu-container .menu .menu-item.text-weight-light{font-weight:var(--font-weight-light)}:host .menu-container .menu .menu-item.text-weight-normal{font-weight:var(--font-weight-normal)}:host .menu-container .menu .menu-item.text-weight-medium{font-weight:var(--font-weight-medium)}:host .menu-container .menu .menu-item.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .menu-container .menu .menu-item.text-weight-bold{font-weight:var(--font-weight-bold)}:host .menu-container .menu .menu-item.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .menu-container .menu .menu-item.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .menu-container .menu .menu-item.text-weight-lighter{font-weight:lighter}:host .menu-container .menu .menu-item.text-weight-bolder{font-weight:bolder}:host .menu-container .menu .divider{order:none;height:1px;background:var(--background-dark)}:host .menu-container .menu a.disabled{color:var(--color-disabled);cursor:not-allowed}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'menu-content', template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </ul>
  </div> `, standalone: false, styles: [":host .passive{display:block;padding:3px 20px;clear:both;font-weight:400;white-space:nowrap}:host .menu-container{width:180px}:host .menu-container .menu{cursor:default;list-style:none;background-color:var(--background-bright);padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .menu-container .menu :hover{background:rgb(from var(--color-positive) r g b/.1);color:var(--font-color-base)}:host .menu-container .menu :active{background:rgb(from var(--color-positive) r g b/.4)}:host .menu-container .menu .menu-item-container{display:flex;align-items:center;position:relative}:host .menu-container .menu .menu-item-container .sub-menu-caret{position:absolute;right:var(--spacing-sm)}:host .menu-container .menu .menu-item{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;cursor:pointer;margin:0;padding:var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-lg);box-sizing:border-box;display:flex;align-items:center;gap:1rem;flex:1}:host .menu-container .menu .menu-item.text-capitalize{text-transform:capitalize}:host .menu-container .menu .menu-item.text-uppercase{text-transform:uppercase}:host .menu-container .menu .menu-item.text-nowrap{white-space:nowrap}:host .menu-container .menu .menu-item.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .menu-container .menu .menu-item.text-size-default{font-size:inherit}:host .menu-container .menu .menu-item.text-size-body{font-size:var(--font-size-body)}:host .menu-container .menu .menu-item.text-size-xs{font-size:var(--font-size-xs)}:host .menu-container .menu .menu-item.text-size-sm{font-size:var(--font-size-sm)}:host .menu-container .menu .menu-item.text-size-md{font-size:var(--font-size-md)}:host .menu-container .menu .menu-item.text-size-lg{font-size:var(--font-size-lg)}:host .menu-container .menu .menu-item.text-size-xl{font-size:var(--font-size-xl)}:host .menu-container .menu .menu-item.text-size-2xl{font-size:var(--font-size-2xl)}:host .menu-container .menu .menu-item.text-size-3xl{font-size:var(--font-size-3xl)}:host .menu-container .menu .menu-item.text-size-smaller{font-size:.8em}:host .menu-container .menu .menu-item.text-size-larger{font-size:1.2em}:host .menu-container .menu .menu-item.text-color-black{color:var(--color-black)}:host .menu-container .menu .menu-item.text-color-white{color:var(--color-white)}:host .menu-container .menu .menu-item.text-color-gray{color:var(--color-gray)}:host .menu-container .menu .menu-item.text-color-grey{color:var(--color-grey)}:host .menu-container .menu .menu-item.text-color-offWhite{color:var(--color-off-white)}:host .menu-container .menu .menu-item.text-color-bright{color:var(--color-bright)}:host .menu-container .menu .menu-item.text-color-light{color:var(--color-light)}:host .menu-container .menu .menu-item.text-color-neutral{color:var(--color-neutral)}:host .menu-container .menu .menu-item.text-color-dark{color:var(--color-dark)}:host .menu-container .menu .menu-item.text-color-orange{color:var(--color-orange)}:host .menu-container .menu .menu-item.text-color-navigation{color:var(--color-navigation)}:host .menu-container .menu .menu-item.text-color-skyBlue{color:var(--color-sky-blue)}:host .menu-container .menu .menu-item.text-color-steel{color:var(--color-steel)}:host .menu-container .menu .menu-item.text-color-metal{color:var(--color-metal)}:host .menu-container .menu .menu-item.text-color-sand{color:var(--color-sand)}:host .menu-container .menu .menu-item.text-color-silver{color:var(--color-silver)}:host .menu-container .menu .menu-item.text-color-stone{color:var(--color-stone)}:host .menu-container .menu .menu-item.text-color-ash{color:var(--color-ash)}:host .menu-container .menu .menu-item.text-color-anonymous{color:var(--color-anonymous)}:host .menu-container .menu .menu-item.text-color-slate{color:var(--color-slate)}:host .menu-container .menu .menu-item.text-color-onyx{color:var(--color-onyx)}:host .menu-container .menu .menu-item.text-color-charcoal{color:var(--color-charcoal)}:host .menu-container .menu .menu-item.text-color-moonlight{color:var(--color-moonlight)}:host .menu-container .menu .menu-item.text-color-midnight{color:var(--color-midnight)}:host .menu-container .menu .menu-item.text-color-darkness{color:var(--color-darkness)}:host .menu-container .menu .menu-item.text-color-navy{color:var(--color-navy)}:host .menu-container .menu .menu-item.text-color-aqua{color:var(--color-aqua)}:host .menu-container .menu .menu-item.text-color-ocean{color:var(--color-ocean)}:host .menu-container .menu .menu-item.text-color-mint{color:var(--color-mint)}:host .menu-container .menu .menu-item.text-color-grass{color:var(--color-grass)}:host .menu-container .menu .menu-item.text-color-sunflower{color:var(--color-sunflower)}:host .menu-container .menu .menu-item.text-color-bittersweet{color:var(--color-bittersweet)}:host .menu-container .menu .menu-item.text-color-grapefruit{color:var(--color-grapefruit)}:host .menu-container .menu .menu-item.text-color-carnation{color:var(--color-carnation)}:host .menu-container .menu .menu-item.text-color-lavender{color:var(--color-lavender)}:host .menu-container .menu .menu-item.text-color-mountain{color:var(--color-mountain)}:host .menu-container .menu .menu-item.text-color-info{color:var(--color-info)}:host .menu-container .menu .menu-item.text-color-positive{color:var(--color-positive)}:host .menu-container .menu .menu-item.text-color-success{color:var(--color-success)}:host .menu-container .menu .menu-item.text-color-negative{color:var(--color-negative)}:host .menu-container .menu .menu-item.text-color-danger{color:var(--color-danger)}:host .menu-container .menu .menu-item.text-color-error{color:var(--color-error)}:host .menu-container .menu .menu-item.text-color-warning{color:var(--color-warning)}:host .menu-container .menu .menu-item.text-color-empty{color:var(--color-empty)}:host .menu-container .menu .menu-item.text-color-disabled{color:var(--color-disabled)}:host .menu-container .menu .menu-item.text-color-background{color:var(--color-background)}:host .menu-container .menu .menu-item.text-color-backgroundDark{color:var(--color-background-dark)}:host .menu-container .menu .menu-item.text-color-border{color:var(--color-border)}:host .menu-container .menu .menu-item.text-color-border2{color:var(--color-border2)}:host .menu-container .menu .menu-item.text-color-text{color:var(--color-text)}:host .menu-container .menu .menu-item.text-color-presentation{color:var(--color-presentation)}:host .menu-container .menu .menu-item.text-color-bullhorn{color:var(--color-bullhorn)}:host .menu-container .menu .menu-item.text-color-pulse{color:var(--color-pulse)}:host .menu-container .menu .menu-item.text-color-fastFind{color:var(--color-fast-find)}:host .menu-container .menu .menu-item.text-color-toast{color:var(--color-toast)}:host .menu-container .menu .menu-item.text-color-company{color:var(--color-company)}:host .menu-container .menu .menu-item.text-color-candidate{color:var(--color-candidate)}:host .menu-container .menu .menu-item.text-color-lead{color:var(--color-lead)}:host .menu-container .menu .menu-item.text-color-contact{color:var(--color-contact)}:host .menu-container .menu .menu-item.text-color-clientcontact{color:var(--color-clientcontact)}:host .menu-container .menu .menu-item.text-color-opportunity{color:var(--color-opportunity)}:host .menu-container .menu .menu-item.text-color-job{color:var(--color-job)}:host .menu-container .menu .menu-item.text-color-joborder{color:var(--color-joborder)}:host .menu-container .menu .menu-item.text-color-submission{color:var(--color-submission)}:host .menu-container .menu .menu-item.text-color-sendout{color:var(--color-sendout)}:host .menu-container .menu .menu-item.text-color-placement{color:var(--color-placement)}:host .menu-container .menu .menu-item.text-color-note{color:var(--color-note)}:host .menu-container .menu .menu-item.text-color-contract{color:var(--color-contract)}:host .menu-container .menu .menu-item.text-color-task{color:var(--color-task)}:host .menu-container .menu .menu-item.text-color-jobCode{color:var(--color-job-code)}:host .menu-container .menu .menu-item.text-color-earnCode{color:var(--color-earn-code)}:host .menu-container .menu .menu-item.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .menu-container .menu .menu-item.text-color-billableCharge{color:var(--color-billable-charge)}:host .menu-container .menu .menu-item.text-color-payableCharge{color:var(--color-payable-charge)}:host .menu-container .menu .menu-item.text-color-user{color:var(--color-user)}:host .menu-container .menu .menu-item.text-color-corporateUser{color:var(--color-corporate-user)}:host .menu-container .menu .menu-item.text-color-distributionList{color:var(--color-distribution-list)}:host .menu-container .menu .menu-item.text-color-credential{color:var(--color-credential)}:host .menu-container .menu .menu-item.text-color-person{color:var(--color-person)}:host .menu-container .menu .menu-item.margin-before{margin-top:.4rem}:host .menu-container .menu .menu-item.margin-after{margin-bottom:.8rem}:host .menu-container .menu .menu-item.text-length-small{max-width:40ch}:host .menu-container .menu .menu-item.text-length-medium{max-width:55ch}:host .menu-container .menu .menu-item.text-length-large{max-width:70ch}:host .menu-container .menu .menu-item.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .menu-container .menu .menu-item.text-weight-thin{font-weight:var(--font-weight-thin)}:host .menu-container .menu .menu-item.text-weight-light{font-weight:var(--font-weight-light)}:host .menu-container .menu .menu-item.text-weight-normal{font-weight:var(--font-weight-normal)}:host .menu-container .menu .menu-item.text-weight-medium{font-weight:var(--font-weight-medium)}:host .menu-container .menu .menu-item.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .menu-container .menu .menu-item.text-weight-bold{font-weight:var(--font-weight-bold)}:host .menu-container .menu .menu-item.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .menu-container .menu .menu-item.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .menu-container .menu .menu-item.text-weight-lighter{font-weight:lighter}:host .menu-container .menu .menu-item.text-weight-bolder{font-weight:bolder}:host .menu-container .menu .divider{order:none;height:1px;background:var(--background-dark)}:host .menu-container .menu a.disabled{color:var(--color-disabled);cursor:not-allowed}\n"] }]
        }], ctorParameters: () => [], propDecorators: { menuItems: [{
                type: Input
            }], item: [{
                type: Input
            }], event: [{
                type: Input
            }], menu: [{
                type: Input
            }], parentMenu: [{
                type: Input
            }], menuClass: [{
                type: Input
            }], overlay: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], openSubMenu: [{
                type: Output
            }], closeLeafMenu: [{
                type: Output
            }], closeAllMenus: [{
                type: Output
            }], onKeyEvent: [{
                type: HostListener,
                args: ['window:keydown.ArrowDown', ['$event']]
            }, {
                type: HostListener,
                args: ['window:keydown.ArrowUp', ['$event']]
            }], keyboardOpenSubMenu: [{
                type: HostListener,
                args: ['window:keydown.ArrowRight', ['$event']]
            }], keyboardMenuItemSelect: [{
                type: HostListener,
                args: ['window:keydown.Enter', ['$event']]
            }, {
                type: HostListener,
                args: ['window:keydown.Space', ['$event']]
            }], onCloseLeafMenu: [{
                type: HostListener,
                args: ['window:keydown.Escape', ['$event']]
            }, {
                type: HostListener,
                args: ['window:keydown.ArrowLeft', ['$event']]
            }], closeMenu: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }] } });

/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
class MenuItemDirective {
    constructor(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.menuItemEnabled = true;
        this.menuItemVisible = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuItemDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: MenuItemDirective, isStandalone: false, selector: "[menuItem]", inputs: { menuItemEnabled: "menuItemEnabled", menuItemVisible: "menuItemVisible" }, queries: [{ propertyName: "optionRef", first: true, predicate: NovoOption, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[menuItem]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ElementRef }], propDecorators: { menuItemEnabled: [{
                type: Input
            }], menuItemVisible: [{
                type: Input
            }], optionRef: [{
                type: ContentChild,
                args: [NovoOption]
            }] } });

class NovoMenuService {
    constructor(overlay, scrollStrategy) {
        this.overlay = overlay;
        this.scrollStrategy = scrollStrategy;
        this.isDestroyingLeafMenu = false;
        this.show = new Subject();
        this.triggerClose = new Subject();
        this.close = new Subject();
        this.overlays = [];
        this.fakeElement = {
            getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
                x: 0,
                y: 0,
            }),
        };
    }
    openMenu(context) {
        const { anchorElement, event, parentMenu } = context;
        if (!parentMenu) {
            const mouseEvent = event;
            this.fakeElement.getBoundingClientRect = () => ({
                bottom: mouseEvent.clientY,
                height: 0,
                left: mouseEvent.clientX,
                right: mouseEvent.clientX,
                top: mouseEvent.clientY,
                width: 0,
                x: mouseEvent.clientX,
                y: mouseEvent.clientY,
            });
            this.closeAllMenus({ eventType: 'cancel', event });
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(new ElementRef(anchorElement || this.fakeElement))
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
                { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
                { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
            ]);
            this.overlays = [
                this.overlay.create({
                    positionStrategy,
                    panelClass: 'novo-menu',
                    scrollStrategy: this.scrollStrategy.close(),
                }),
            ];
            this.attachMenu(this.overlays[0], context);
        }
        else {
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(new ElementRef(event ? event.target : anchorElement))
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
                { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
            ]);
            const newOverlay = this.overlay.create({
                positionStrategy,
                panelClass: 'novo-menu',
                scrollStrategy: this.scrollStrategy.close(),
            });
            this.overlays = this.overlays.concat(newOverlay);
            this.attachMenu(newOverlay, context);
        }
    }
    attachMenu(overlay, context) {
        const { event, item, menu, menuItems, menuClass, menuTrigger } = context;
        const menuContent = overlay.attach(new ComponentPortal(MenuContentComponent));
        menuContent.instance.event = event;
        menuContent.instance.item = item;
        menuContent.instance.menu = menu;
        menuContent.instance.menuItems = menuItems;
        menuContent.instance.overlay = overlay;
        menuContent.instance.isLeaf = true;
        menuContent.instance.menuClass = menuClass;
        overlay.menu = menuContent.instance;
        if (!!menuTrigger) {
            menuTrigger.menuContent = menuContent.instance;
        }
        const subscriptions = new Subscription();
        subscriptions.add(menuContent.instance.closeAllMenus
            .asObservable()
            .subscribe((closeAllEvent) => this.closeAllMenus({ eventType: 'cancel', ...closeAllEvent })));
        subscriptions.add(menuContent.instance.closeLeafMenu.asObservable().subscribe((closeLeafMenuEvent) => this.destroyLeafMenu(closeLeafMenuEvent)));
        subscriptions.add(menuContent.instance.openSubMenu.asObservable().subscribe((subMenuEvent) => {
            this.destroySubMenus(menuContent.instance);
            if (!subMenuEvent.menu) {
                menuContent.instance.isLeaf = true;
                return;
            }
            menuContent.instance.isLeaf = false;
            this.show.next(subMenuEvent);
        }));
        menuContent.onDestroy(() => {
            subscriptions.unsubscribe();
        });
        menuContent.changeDetectorRef.detectChanges();
    }
    closeAllMenus(closeEvent) {
        if (this.overlays) {
            this.close.next(closeEvent);
            this.overlays.forEach((overlay, index) => {
                overlay.detach();
                overlay.dispose();
            });
        }
        this.overlays = [];
    }
    hasOpenMenus() {
        return this.overlays?.length > 0;
    }
    getLastAttachedOverlay() {
        let overlay = this.overlays[this.overlays.length - 1];
        while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
            overlay.detach();
            overlay.dispose();
            this.overlays = this.overlays.slice(0, -1);
            overlay = this.overlays[this.overlays.length - 1];
        }
        return overlay;
    }
    destroyLeafMenu({ exceptRootMenu, event } = {}) {
        if (this.isDestroyingLeafMenu) {
            return;
        }
        this.isDestroyingLeafMenu = true;
        setTimeout(() => {
            const overlay = this.getLastAttachedOverlay();
            if (this.overlays.length > 1 && overlay) {
                overlay.detach();
                overlay.dispose();
            }
            if (!exceptRootMenu && this.overlays.length > 0 && overlay) {
                this.close.next({ eventType: 'cancel', event });
                overlay.detach();
                overlay.dispose();
            }
            const newLeaf = this.getLastAttachedOverlay();
            if (newLeaf) {
                newLeaf.menu.isLeaf = true;
            }
            this.isDestroyingLeafMenu = false;
        });
    }
    destroySubMenus(menu) {
        const overlay = menu.overlay;
        const index = this.overlays.indexOf(overlay);
        this.overlays.slice(index + 1).forEach((subMenuOverlay) => {
            subMenuOverlay.detach();
            subMenuOverlay.dispose();
        });
    }
    isLeafMenu(menuContent) {
        const overlay = this.getLastAttachedOverlay();
        return menuContent.overlay === overlay;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuService, deps: [{ token: i1$1.Overlay }, { token: i1$1.ScrollStrategyOptions }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1$1.Overlay }, { type: i1$1.ScrollStrategyOptions }] });

const MENU_OPTIONS = new InjectionToken('MENU_OPTIONS');
const PARENT_MENU = new InjectionToken('PARENT_MENU');

class MenuComponent {
    constructor(menuService, changeDetector, elementRef, options) {
        this.menuService = menuService;
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.options = options;
        this.menuClass = '';
        this.autoFocus = false;
        this.disabled = false;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.visibleMenuItems = [];
        this.links = [];
        this.subscription = new Subscription();
        if (options) {
            this.autoFocus = options.autoFocus;
        }
        this.subscription.add(menuService.show.subscribe((menuEvent) => {
            this.onMenuEvent(menuEvent);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onMenuEvent(menuEvent) {
        if (this.disabled) {
            return;
        }
        const { menu, event, item } = menuEvent;
        if (menu && menu !== this) {
            return;
        }
        this.event = event;
        this.item = item;
        this.setVisibleMenuItems();
        this.menuService.openMenu({ ...menuEvent, menuItems: this.visibleMenuItems, menuClass: this.menuClass });
        this.menuService.close
            .asObservable()
            .pipe(first())
            .subscribe((closeEvent) => this.close.emit(closeEvent));
        this.open.next(menuEvent);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem.menuItemVisible);
    }
    setVisibleMenuItems() {
        this.visibleMenuItems = this.menuItems.filter((menuItem) => this.isMenuItemVisible(menuItem));
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuComponent, deps: [{ token: NovoMenuService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: MENU_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: MenuComponent, isStandalone: false, selector: "novo-menu", inputs: { menuClass: "menuClass", autoFocus: "autoFocus", disabled: "disabled" }, outputs: { close: "close", open: "open" }, providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }], queries: [{ propertyName: "menuItems", predicate: MenuItemDirective }, { propertyName: "menuOptions", predicate: NovoOption }], viewQueries: [{ propertyName: "menuElement", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: '', isInline: true, styles: [".cdk-overlay-container{position:fixed;z-index:z(overlay);pointer-events:none;top:0;left:0;width:100%;height:100%}.novo-menu.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, selector: 'novo-menu', template: '', providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }], standalone: false, styles: [".cdk-overlay-container{position:fixed;z-index:z(overlay);pointer-events:none;top:0;left:0;width:100%;height:100%}.novo-menu.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box}\n"] }]
        }], ctorParameters: () => [{ type: NovoMenuService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MENU_OPTIONS]
                }] }], propDecorators: { menuClass: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], disabled: [{
                type: Input
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], menuItems: [{
                type: ContentChildren,
                args: [MenuItemDirective]
            }], menuOptions: [{
                type: ContentChildren,
                args: [NovoOption]
            }], menuElement: [{
                type: ViewChild,
                args: ['menu']
            }] } });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class MenuDirective {
    get hb_menuActive() {
        return this.isActive;
    }
    constructor(element, menuService, cdr, _parentMenu) {
        this.element = element;
        this.menuService = menuService;
        this.cdr = cdr;
        this._parentMenu = _parentMenu;
        this.waitWhenOpen = false;
        this.capture = false;
        this.anchor = false;
        this.trigger = 'click';
        this.isSubMenu = false;
        this.isActive = false;
        if (!!this._parentMenu) {
            this.isSubMenu = true;
            this.trigger = 'mouseenter';
        }
    }
    ngOnInit() {
        this.subscription = this.menuService.close.subscribe(() => {
            this.isActive = false;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        this.isActive = false;
        this.subscription.unsubscribe();
    }
    onMenuClick(event) {
        if (this.trigger !== event.type) {
            return;
        }
        if (this.trigger === 'click' && event.button !== 0) {
            return;
        }
        else if (this.trigger === 'contextmenu' && event.button !== 2) {
            return;
        }
        else if (this.waitWhenOpen && this.menuService.hasOpenMenus()) {
            return;
        }
        if (!this.menu.disabled) {
            this.menuService.show.next({
                menu: this.menu,
                event,
                item: this.menuContext,
                anchorElement: this.anchor ? this.element.nativeElement : null,
                parentMenu: this._parentMenu,
                menuTrigger: this,
            });
            this.isActive = true;
            event.preventDefault();
            event.stopPropagation();
            this.cdr.detectChanges();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuDirective, deps: [{ token: i0.ElementRef }, { token: NovoMenuService }, { token: i0.ChangeDetectorRef }, { token: PARENT_MENU, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: MenuDirective, isStandalone: false, selector: "[menu]", inputs: { menuContext: "menuContext", menu: "menu", menuContent: "menuContent", waitWhenOpen: "waitWhenOpen", capture: "capture", anchor: "anchor", trigger: "trigger" }, host: { listeners: { "click": "onMenuClick($event)", "contextmenu": "onMenuClick($event)", "mouseenter": "onMenuClick($event)" }, properties: { "class.menu-active": "this.hb_menuActive" } }, ngImport: i0 }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "waitWhenOpen", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "capture", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "anchor", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: MenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[menu]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: NovoMenuService }, { type: i0.ChangeDetectorRef }, { type: MenuComponent, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [PARENT_MENU]
                }] }], propDecorators: { menuContext: [{
                type: Input
            }], menu: [{
                type: Input
            }], menuContent: [{
                type: Input
            }], waitWhenOpen: [{
                type: Input
            }], capture: [{
                type: Input
            }], anchor: [{
                type: Input
            }], trigger: [{
                type: Input
            }], hb_menuActive: [{
                type: HostBinding,
                args: ['class.menu-active']
            }], onMenuClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }, {
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }, {
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }] } });

class NovoMenuModule {
    static forRoot(options) {
        return {
            ngModule: NovoMenuModule,
            providers: [
                NovoMenuService,
                {
                    provide: MENU_OPTIONS,
                    useValue: options,
                },
                { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuModule, declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective], imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule], exports: [MenuDirective, MenuComponent, MenuItemDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuModule, imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
                    exports: [MenuDirective, MenuComponent, MenuItemDirective],
                    imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule],
                }]
        }] });

/*
 * Public API Surface of ngx-contextmenu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MENU_OPTIONS, MenuComponent, MenuContentComponent, MenuDirective, MenuItemDirective, NovoMenuModule, NovoMenuService, PARENT_MENU };
//# sourceMappingURL=novo-elements-elements-menu.mjs.map
