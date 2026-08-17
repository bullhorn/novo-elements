import * as i0 from '@angular/core';
import { EventEmitter, ViewChild, Input, Component, HostListener, Output, Directive, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class PopOverContent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'top';
        this.animation = true;
        this.onCloseFromOutside = new EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.displayType = 'none';
        this.isHidden = false;
    }
    ngAfterViewInit() {
        this.show();
        this.cdr.detectChanges();
    }
    toggle() {
        if (this.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (!this.popover || !this.popover.getElement()) {
            return;
        }
        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isHidden = false;
    }
    hide() {
        this.top = -10000;
        this.left = -10000;
        this.isHidden = true;
        this.popover.hide();
    }
    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
    }
    positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
        const positionStrParts = positionStr.split('-');
        const mainSide = (this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl));
        const orientation = (this.effectiveAlignment = positionStrParts[1] || 'center');
        const hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        const targetElWidth = targetEl.offsetWidth;
        const targetElHeight = targetEl.offsetHeight;
        const shiftWidth = {
            center() {
                return hostElPos.left + (hostElPos.width - targetElWidth) / 2;
            },
            right() {
                return hostElPos.left;
            },
            left() {
                return hostElPos.left + (hostElPos.width - targetElWidth);
            },
        };
        const shiftHeight = {
            center() {
                return hostElPos.top + (hostElPos.height - targetElHeight) / 2;
            },
            bottom() {
                return hostElPos.top;
            },
            top() {
                return hostElPos.top + (hostElPos.height - targetElHeight);
            },
        };
        let targetElPos;
        switch (mainSide) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left + hostElPos.width,
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left - targetElWidth,
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: hostElPos.top + hostElPos.height,
                    left: shiftWidth[orientation](),
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[orientation](),
                };
                break;
        }
        return targetElPos;
    }
    position(nativeEl) {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left,
        };
    }
    offset(nativeEl) {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
        };
    }
    getStyle(nativeEl, cssProp) {
        if (nativeEl.currentStyle) {
            return nativeEl.currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(nativeEl)[cssProp];
        }
        return nativeEl.style[cssProp];
    }
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }
    parentOffsetEl(nativeEl) {
        let offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
    getEffectivePlacement(desiredPlacement, hostElement, targetElement) {
        const hostElBoundingRect = hostElement.getBoundingClientRect();
        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }
        return desiredPlacement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PopOverContent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: PopOverContent, isStandalone: false, selector: "popover-content", inputs: { content: "content", htmlContent: "htmlContent", placement: "placement", title: "title", animation: "animation" }, viewQueries: [{ propertyName: "popoverDiv", first: true, predicate: ["popoverDiv"], descendants: true }], ngImport: i0, template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div *ngIf="htmlContent" class="popover-content-text" [innerHTML]="htmlContent"></div>
        <div *ngIf="!htmlContent" class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, isInline: true, styles: [":host .popover{position:absolute;top:0;left:0;z-index:1000;display:none;width:40rem;padding:2rem;background-color:var(--background-bright, #fff);color:var(--text-main, #3d464d);background-clip:padding-box;box-shadow:0 1px 2px #00000026;border-radius:var(--border-radius-sm)}:host .popover.top{margin-top:-1rem}:host .popover.top.virtual-area{bottom:-1.1rem}:host .popover.right{margin-left:var(--spacing-md)}:host .popover.right.virtual-area{left:-1.1rem}:host .popover.bottom{margin-top:1rem}:host .popover.bottom.virtual-area{top:-1.1rem}:host .popover.left{margin-left:-1rem}:host .popover.left.virtual-area{right:-1.1rem}:host .popover .virtual-area{height:1.1rem;width:100%;position:absolute}:host .popover.top>.arrow{margin-left:-9px;border-bottom-width:0;border-top-color:#0000001a;bottom:-9px}:host .popover.top>.arrow:before{content:\" \";bottom:1px;margin-left:-1rem;border-bottom-width:0;border-top-color:var(--background-bright, #fff)}:host .popover.top>.arrow.center{left:50%}:host .popover.top>.arrow.left{left:91%}:host .popover.top>.arrow.right{left:9%}:host .popover.right>.arrow{left:-9px;margin-top:-9px;border-left-width:0;border-right-color:#0000001a}:host .popover.right>.arrow:before{content:\" \";left:1px;bottom:-1rem;border-left-width:0;border-right-color:var(--background-bright, #fff)}:host .popover.right>.arrow.center{top:50%}:host .popover.right>.arrow.top{top:91%}:host .popover.right>.arrow.bottom{top:9%}:host .popover.bottom>.arrow{margin-left:-9px;border-top-width:0;border-bottom-color:#0000001a;top:-9px}:host .popover.bottom>.arrow:before{content:\" \";top:1px;margin-left:-1rem;border-top-width:0;border-bottom-color:var(--background-bright, #fff)}:host .popover.bottom>.arrow.center{left:50%}:host .popover.bottom>.arrow.left{left:91%}:host .popover.bottom>.arrow.right{left:9%}:host .popover.left>.arrow{right:-9px;margin-top:-9px;border-right-width:0;border-left-color:#0000001a}:host .popover.left>.arrow:before{content:\" \";right:1px;border-right-width:0;border-left-color:var(--background-bright, #fff);bottom:-1rem}:host .popover.left>.arrow.center{top:50%}:host .popover.left>.arrow.top{top:91%}:host .popover.left>.arrow.bottom{top:9%}:host .popover>.arrow{border-width:9px}:host .popover>.arrow,:host .popover>.arrow:before{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}:host .popover>.arrow:before{border-width:1rem;content:\"\"}:host .popover-title{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;margin-bottom:1rem;white-space:normal;overflow:hidden;max-width:100%}:host .popover-title.text-capitalize{text-transform:capitalize}:host .popover-title.text-uppercase{text-transform:uppercase}:host .popover-title.text-nowrap{white-space:nowrap}:host .popover-title.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-title.text-size-default{font-size:inherit}:host .popover-title.text-size-body{font-size:var(--font-size-body)}:host .popover-title.text-size-xs{font-size:var(--font-size-xs)}:host .popover-title.text-size-sm{font-size:var(--font-size-sm)}:host .popover-title.text-size-md{font-size:var(--font-size-md)}:host .popover-title.text-size-lg{font-size:var(--font-size-lg)}:host .popover-title.text-size-xl{font-size:var(--font-size-xl)}:host .popover-title.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-title.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-title.text-size-smaller{font-size:.8em}:host .popover-title.text-size-larger{font-size:1.2em}:host .popover-title.text-color-black{color:var(--color-black)}:host .popover-title.text-color-white{color:var(--color-white)}:host .popover-title.text-color-gray{color:var(--color-gray)}:host .popover-title.text-color-grey{color:var(--color-grey)}:host .popover-title.text-color-offWhite{color:var(--color-off-white)}:host .popover-title.text-color-bright{color:var(--color-bright)}:host .popover-title.text-color-light{color:var(--color-light)}:host .popover-title.text-color-neutral{color:var(--color-neutral)}:host .popover-title.text-color-dark{color:var(--color-dark)}:host .popover-title.text-color-orange{color:var(--color-orange)}:host .popover-title.text-color-navigation{color:var(--color-navigation)}:host .popover-title.text-color-skyBlue{color:var(--color-sky-blue)}:host .popover-title.text-color-steel{color:var(--color-steel)}:host .popover-title.text-color-metal{color:var(--color-metal)}:host .popover-title.text-color-sand{color:var(--color-sand)}:host .popover-title.text-color-silver{color:var(--color-silver)}:host .popover-title.text-color-stone{color:var(--color-stone)}:host .popover-title.text-color-ash{color:var(--color-ash)}:host .popover-title.text-color-anonymous{color:var(--color-anonymous)}:host .popover-title.text-color-slate{color:var(--color-slate)}:host .popover-title.text-color-onyx{color:var(--color-onyx)}:host .popover-title.text-color-charcoal{color:var(--color-charcoal)}:host .popover-title.text-color-moonlight{color:var(--color-moonlight)}:host .popover-title.text-color-midnight{color:var(--color-midnight)}:host .popover-title.text-color-darkness{color:var(--color-darkness)}:host .popover-title.text-color-navy{color:var(--color-navy)}:host .popover-title.text-color-aqua{color:var(--color-aqua)}:host .popover-title.text-color-ocean{color:var(--color-ocean)}:host .popover-title.text-color-mint{color:var(--color-mint)}:host .popover-title.text-color-grass{color:var(--color-grass)}:host .popover-title.text-color-sunflower{color:var(--color-sunflower)}:host .popover-title.text-color-bittersweet{color:var(--color-bittersweet)}:host .popover-title.text-color-grapefruit{color:var(--color-grapefruit)}:host .popover-title.text-color-carnation{color:var(--color-carnation)}:host .popover-title.text-color-lavender{color:var(--color-lavender)}:host .popover-title.text-color-mountain{color:var(--color-mountain)}:host .popover-title.text-color-info{color:var(--color-info)}:host .popover-title.text-color-positive{color:var(--color-positive)}:host .popover-title.text-color-success{color:var(--color-success)}:host .popover-title.text-color-negative{color:var(--color-negative)}:host .popover-title.text-color-danger{color:var(--color-danger)}:host .popover-title.text-color-error{color:var(--color-error)}:host .popover-title.text-color-warning{color:var(--color-warning)}:host .popover-title.text-color-empty{color:var(--color-empty)}:host .popover-title.text-color-disabled{color:var(--color-disabled)}:host .popover-title.text-color-background{color:var(--color-background)}:host .popover-title.text-color-backgroundDark{color:var(--color-background-dark)}:host .popover-title.text-color-border{color:var(--color-border)}:host .popover-title.text-color-border2{color:var(--color-border2)}:host .popover-title.text-color-text{color:var(--color-text)}:host .popover-title.text-color-presentation{color:var(--color-presentation)}:host .popover-title.text-color-bullhorn{color:var(--color-bullhorn)}:host .popover-title.text-color-pulse{color:var(--color-pulse)}:host .popover-title.text-color-fastFind{color:var(--color-fast-find)}:host .popover-title.text-color-toast{color:var(--color-toast)}:host .popover-title.text-color-company{color:var(--color-company)}:host .popover-title.text-color-candidate{color:var(--color-candidate)}:host .popover-title.text-color-lead{color:var(--color-lead)}:host .popover-title.text-color-contact{color:var(--color-contact)}:host .popover-title.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-title.text-color-opportunity{color:var(--color-opportunity)}:host .popover-title.text-color-job{color:var(--color-job)}:host .popover-title.text-color-joborder{color:var(--color-joborder)}:host .popover-title.text-color-submission{color:var(--color-submission)}:host .popover-title.text-color-sendout{color:var(--color-sendout)}:host .popover-title.text-color-placement{color:var(--color-placement)}:host .popover-title.text-color-note{color:var(--color-note)}:host .popover-title.text-color-contract{color:var(--color-contract)}:host .popover-title.text-color-task{color:var(--color-task)}:host .popover-title.text-color-jobCode{color:var(--color-job-code)}:host .popover-title.text-color-earnCode{color:var(--color-earn-code)}:host .popover-title.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .popover-title.text-color-billableCharge{color:var(--color-billable-charge)}:host .popover-title.text-color-payableCharge{color:var(--color-payable-charge)}:host .popover-title.text-color-user{color:var(--color-user)}:host .popover-title.text-color-corporateUser{color:var(--color-corporate-user)}:host .popover-title.text-color-distributionList{color:var(--color-distribution-list)}:host .popover-title.text-color-credential{color:var(--color-credential)}:host .popover-title.text-color-person{color:var(--color-person)}:host .popover-title.margin-before{margin-top:.4rem}:host .popover-title.margin-after{margin-bottom:.8rem}:host .popover-title.text-length-small{max-width:40ch}:host .popover-title.text-length-medium{max-width:55ch}:host .popover-title.text-length-large{max-width:70ch}:host .popover-title.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .popover-title.text-weight-thin{font-weight:var(--font-weight-thin)}:host .popover-title.text-weight-light{font-weight:var(--font-weight-light)}:host .popover-title.text-weight-normal{font-weight:var(--font-weight-normal)}:host .popover-title.text-weight-medium{font-weight:var(--font-weight-medium)}:host .popover-title.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .popover-title.text-weight-bold{font-weight:var(--font-weight-bold)}:host .popover-title.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .popover-title.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .popover-title.text-weight-lighter{font-weight:lighter}:host .popover-title.text-weight-bolder{font-weight:bolder}:host .popover-content{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host .popover-content.text-capitalize{text-transform:capitalize}:host .popover-content.text-uppercase{text-transform:uppercase}:host .popover-content.text-nowrap{white-space:nowrap}:host .popover-content.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-content.text-size-default{font-size:inherit}:host .popover-content.text-size-body{font-size:var(--font-size-body)}:host .popover-content.text-size-xs{font-size:var(--font-size-xs)}:host .popover-content.text-size-sm{font-size:var(--font-size-sm)}:host .popover-content.text-size-md{font-size:var(--font-size-md)}:host .popover-content.text-size-lg{font-size:var(--font-size-lg)}:host .popover-content.text-size-xl{font-size:var(--font-size-xl)}:host .popover-content.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-content.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-content.text-size-smaller{font-size:.8em}:host .popover-content.text-size-larger{font-size:1.2em}:host .popover-content.text-color-black{color:var(--color-black)}:host .popover-content.text-color-white{color:var(--color-white)}:host .popover-content.text-color-gray{color:var(--color-gray)}:host .popover-content.text-color-grey{color:var(--color-grey)}:host .popover-content.text-color-offWhite{color:var(--color-off-white)}:host .popover-content.text-color-bright{color:var(--color-bright)}:host .popover-content.text-color-light{color:var(--color-light)}:host .popover-content.text-color-neutral{color:var(--color-neutral)}:host .popover-content.text-color-dark{color:var(--color-dark)}:host .popover-content.text-color-orange{color:var(--color-orange)}:host .popover-content.text-color-navigation{color:var(--color-navigation)}:host .popover-content.text-color-skyBlue{color:var(--color-sky-blue)}:host .popover-content.text-color-steel{color:var(--color-steel)}:host .popover-content.text-color-metal{color:var(--color-metal)}:host .popover-content.text-color-sand{color:var(--color-sand)}:host .popover-content.text-color-silver{color:var(--color-silver)}:host .popover-content.text-color-stone{color:var(--color-stone)}:host .popover-content.text-color-ash{color:var(--color-ash)}:host .popover-content.text-color-anonymous{color:var(--color-anonymous)}:host .popover-content.text-color-slate{color:var(--color-slate)}:host .popover-content.text-color-onyx{color:var(--color-onyx)}:host .popover-content.text-color-charcoal{color:var(--color-charcoal)}:host .popover-content.text-color-moonlight{color:var(--color-moonlight)}:host .popover-content.text-color-midnight{color:var(--color-midnight)}:host .popover-content.text-color-darkness{color:var(--color-darkness)}:host .popover-content.text-color-navy{color:var(--color-navy)}:host .popover-content.text-color-aqua{color:var(--color-aqua)}:host .popover-content.text-color-ocean{color:var(--color-ocean)}:host .popover-content.text-color-mint{color:var(--color-mint)}:host .popover-content.text-color-grass{color:var(--color-grass)}:host .popover-content.text-color-sunflower{color:var(--color-sunflower)}:host .popover-content.text-color-bittersweet{color:var(--color-bittersweet)}:host .popover-content.text-color-grapefruit{color:var(--color-grapefruit)}:host .popover-content.text-color-carnation{color:var(--color-carnation)}:host .popover-content.text-color-lavender{color:var(--color-lavender)}:host .popover-content.text-color-mountain{color:var(--color-mountain)}:host .popover-content.text-color-info{color:var(--color-info)}:host .popover-content.text-color-positive{color:var(--color-positive)}:host .popover-content.text-color-success{color:var(--color-success)}:host .popover-content.text-color-negative{color:var(--color-negative)}:host .popover-content.text-color-danger{color:var(--color-danger)}:host .popover-content.text-color-error{color:var(--color-error)}:host .popover-content.text-color-warning{color:var(--color-warning)}:host .popover-content.text-color-empty{color:var(--color-empty)}:host .popover-content.text-color-disabled{color:var(--color-disabled)}:host .popover-content.text-color-background{color:var(--color-background)}:host .popover-content.text-color-backgroundDark{color:var(--color-background-dark)}:host .popover-content.text-color-border{color:var(--color-border)}:host .popover-content.text-color-border2{color:var(--color-border2)}:host .popover-content.text-color-text{color:var(--color-text)}:host .popover-content.text-color-presentation{color:var(--color-presentation)}:host .popover-content.text-color-bullhorn{color:var(--color-bullhorn)}:host .popover-content.text-color-pulse{color:var(--color-pulse)}:host .popover-content.text-color-fastFind{color:var(--color-fast-find)}:host .popover-content.text-color-toast{color:var(--color-toast)}:host .popover-content.text-color-company{color:var(--color-company)}:host .popover-content.text-color-candidate{color:var(--color-candidate)}:host .popover-content.text-color-lead{color:var(--color-lead)}:host .popover-content.text-color-contact{color:var(--color-contact)}:host .popover-content.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-content.text-color-opportunity{color:var(--color-opportunity)}:host .popover-content.text-color-job{color:var(--color-job)}:host .popover-content.text-color-joborder{color:var(--color-joborder)}:host .popover-content.text-color-submission{color:var(--color-submission)}:host .popover-content.text-color-sendout{color:var(--color-sendout)}:host .popover-content.text-color-placement{color:var(--color-placement)}:host .popover-content.text-color-note{color:var(--color-note)}:host .popover-content.text-color-contract{color:var(--color-contract)}:host .popover-content.text-color-task{color:var(--color-task)}:host .popover-content.text-color-jobCode{color:var(--color-job-code)}:host .popover-content.text-color-earnCode{color:var(--color-earn-code)}:host .popover-content.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .popover-content.text-color-billableCharge{color:var(--color-billable-charge)}:host .popover-content.text-color-payableCharge{color:var(--color-payable-charge)}:host .popover-content.text-color-user{color:var(--color-user)}:host .popover-content.text-color-corporateUser{color:var(--color-corporate-user)}:host .popover-content.text-color-distributionList{color:var(--color-distribution-list)}:host .popover-content.text-color-credential{color:var(--color-credential)}:host .popover-content.text-color-person{color:var(--color-person)}:host .popover-content.margin-before{margin-top:.4rem}:host .popover-content.margin-after{margin-bottom:.8rem}:host .popover-content.text-length-small{max-width:40ch}:host .popover-content.text-length-medium{max-width:55ch}:host .popover-content.text-length-large{max-width:70ch}:host .popover-content.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .popover-content.text-weight-thin{font-weight:var(--font-weight-thin)}:host .popover-content.text-weight-light{font-weight:var(--font-weight-light)}:host .popover-content.text-weight-normal{font-weight:var(--font-weight-normal)}:host .popover-content.text-weight-medium{font-weight:var(--font-weight-medium)}:host .popover-content.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .popover-content.text-weight-bold{font-weight:var(--font-weight-bold)}:host .popover-content.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .popover-content.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .popover-content.text-weight-lighter{font-weight:lighter}:host .popover-content.text-weight-bolder{font-weight:bolder}:host .popover-content .popover-content-text{white-space:pre-line}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PopOverContent, decorators: [{
            type: Component,
            args: [{ selector: 'popover-content', template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div *ngIf="htmlContent" class="popover-content-text" [innerHTML]="htmlContent"></div>
        <div *ngIf="!htmlContent" class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, standalone: false, styles: [":host .popover{position:absolute;top:0;left:0;z-index:1000;display:none;width:40rem;padding:2rem;background-color:var(--background-bright, #fff);color:var(--text-main, #3d464d);background-clip:padding-box;box-shadow:0 1px 2px #00000026;border-radius:var(--border-radius-sm)}:host .popover.top{margin-top:-1rem}:host .popover.top.virtual-area{bottom:-1.1rem}:host .popover.right{margin-left:var(--spacing-md)}:host .popover.right.virtual-area{left:-1.1rem}:host .popover.bottom{margin-top:1rem}:host .popover.bottom.virtual-area{top:-1.1rem}:host .popover.left{margin-left:-1rem}:host .popover.left.virtual-area{right:-1.1rem}:host .popover .virtual-area{height:1.1rem;width:100%;position:absolute}:host .popover.top>.arrow{margin-left:-9px;border-bottom-width:0;border-top-color:#0000001a;bottom:-9px}:host .popover.top>.arrow:before{content:\" \";bottom:1px;margin-left:-1rem;border-bottom-width:0;border-top-color:var(--background-bright, #fff)}:host .popover.top>.arrow.center{left:50%}:host .popover.top>.arrow.left{left:91%}:host .popover.top>.arrow.right{left:9%}:host .popover.right>.arrow{left:-9px;margin-top:-9px;border-left-width:0;border-right-color:#0000001a}:host .popover.right>.arrow:before{content:\" \";left:1px;bottom:-1rem;border-left-width:0;border-right-color:var(--background-bright, #fff)}:host .popover.right>.arrow.center{top:50%}:host .popover.right>.arrow.top{top:91%}:host .popover.right>.arrow.bottom{top:9%}:host .popover.bottom>.arrow{margin-left:-9px;border-top-width:0;border-bottom-color:#0000001a;top:-9px}:host .popover.bottom>.arrow:before{content:\" \";top:1px;margin-left:-1rem;border-top-width:0;border-bottom-color:var(--background-bright, #fff)}:host .popover.bottom>.arrow.center{left:50%}:host .popover.bottom>.arrow.left{left:91%}:host .popover.bottom>.arrow.right{left:9%}:host .popover.left>.arrow{right:-9px;margin-top:-9px;border-right-width:0;border-left-color:#0000001a}:host .popover.left>.arrow:before{content:\" \";right:1px;border-right-width:0;border-left-color:var(--background-bright, #fff);bottom:-1rem}:host .popover.left>.arrow.center{top:50%}:host .popover.left>.arrow.top{top:91%}:host .popover.left>.arrow.bottom{top:9%}:host .popover>.arrow{border-width:9px}:host .popover>.arrow,:host .popover>.arrow:before{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}:host .popover>.arrow:before{border-width:1rem;content:\"\"}:host .popover-title{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;margin-bottom:1rem;white-space:normal;overflow:hidden;max-width:100%}:host .popover-title.text-capitalize{text-transform:capitalize}:host .popover-title.text-uppercase{text-transform:uppercase}:host .popover-title.text-nowrap{white-space:nowrap}:host .popover-title.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-title.text-size-default{font-size:inherit}:host .popover-title.text-size-body{font-size:var(--font-size-body)}:host .popover-title.text-size-xs{font-size:var(--font-size-xs)}:host .popover-title.text-size-sm{font-size:var(--font-size-sm)}:host .popover-title.text-size-md{font-size:var(--font-size-md)}:host .popover-title.text-size-lg{font-size:var(--font-size-lg)}:host .popover-title.text-size-xl{font-size:var(--font-size-xl)}:host .popover-title.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-title.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-title.text-size-smaller{font-size:.8em}:host .popover-title.text-size-larger{font-size:1.2em}:host .popover-title.text-color-black{color:var(--color-black)}:host .popover-title.text-color-white{color:var(--color-white)}:host .popover-title.text-color-gray{color:var(--color-gray)}:host .popover-title.text-color-grey{color:var(--color-grey)}:host .popover-title.text-color-offWhite{color:var(--color-off-white)}:host .popover-title.text-color-bright{color:var(--color-bright)}:host .popover-title.text-color-light{color:var(--color-light)}:host .popover-title.text-color-neutral{color:var(--color-neutral)}:host .popover-title.text-color-dark{color:var(--color-dark)}:host .popover-title.text-color-orange{color:var(--color-orange)}:host .popover-title.text-color-navigation{color:var(--color-navigation)}:host .popover-title.text-color-skyBlue{color:var(--color-sky-blue)}:host .popover-title.text-color-steel{color:var(--color-steel)}:host .popover-title.text-color-metal{color:var(--color-metal)}:host .popover-title.text-color-sand{color:var(--color-sand)}:host .popover-title.text-color-silver{color:var(--color-silver)}:host .popover-title.text-color-stone{color:var(--color-stone)}:host .popover-title.text-color-ash{color:var(--color-ash)}:host .popover-title.text-color-anonymous{color:var(--color-anonymous)}:host .popover-title.text-color-slate{color:var(--color-slate)}:host .popover-title.text-color-onyx{color:var(--color-onyx)}:host .popover-title.text-color-charcoal{color:var(--color-charcoal)}:host .popover-title.text-color-moonlight{color:var(--color-moonlight)}:host .popover-title.text-color-midnight{color:var(--color-midnight)}:host .popover-title.text-color-darkness{color:var(--color-darkness)}:host .popover-title.text-color-navy{color:var(--color-navy)}:host .popover-title.text-color-aqua{color:var(--color-aqua)}:host .popover-title.text-color-ocean{color:var(--color-ocean)}:host .popover-title.text-color-mint{color:var(--color-mint)}:host .popover-title.text-color-grass{color:var(--color-grass)}:host .popover-title.text-color-sunflower{color:var(--color-sunflower)}:host .popover-title.text-color-bittersweet{color:var(--color-bittersweet)}:host .popover-title.text-color-grapefruit{color:var(--color-grapefruit)}:host .popover-title.text-color-carnation{color:var(--color-carnation)}:host .popover-title.text-color-lavender{color:var(--color-lavender)}:host .popover-title.text-color-mountain{color:var(--color-mountain)}:host .popover-title.text-color-info{color:var(--color-info)}:host .popover-title.text-color-positive{color:var(--color-positive)}:host .popover-title.text-color-success{color:var(--color-success)}:host .popover-title.text-color-negative{color:var(--color-negative)}:host .popover-title.text-color-danger{color:var(--color-danger)}:host .popover-title.text-color-error{color:var(--color-error)}:host .popover-title.text-color-warning{color:var(--color-warning)}:host .popover-title.text-color-empty{color:var(--color-empty)}:host .popover-title.text-color-disabled{color:var(--color-disabled)}:host .popover-title.text-color-background{color:var(--color-background)}:host .popover-title.text-color-backgroundDark{color:var(--color-background-dark)}:host .popover-title.text-color-border{color:var(--color-border)}:host .popover-title.text-color-border2{color:var(--color-border2)}:host .popover-title.text-color-text{color:var(--color-text)}:host .popover-title.text-color-presentation{color:var(--color-presentation)}:host .popover-title.text-color-bullhorn{color:var(--color-bullhorn)}:host .popover-title.text-color-pulse{color:var(--color-pulse)}:host .popover-title.text-color-fastFind{color:var(--color-fast-find)}:host .popover-title.text-color-toast{color:var(--color-toast)}:host .popover-title.text-color-company{color:var(--color-company)}:host .popover-title.text-color-candidate{color:var(--color-candidate)}:host .popover-title.text-color-lead{color:var(--color-lead)}:host .popover-title.text-color-contact{color:var(--color-contact)}:host .popover-title.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-title.text-color-opportunity{color:var(--color-opportunity)}:host .popover-title.text-color-job{color:var(--color-job)}:host .popover-title.text-color-joborder{color:var(--color-joborder)}:host .popover-title.text-color-submission{color:var(--color-submission)}:host .popover-title.text-color-sendout{color:var(--color-sendout)}:host .popover-title.text-color-placement{color:var(--color-placement)}:host .popover-title.text-color-note{color:var(--color-note)}:host .popover-title.text-color-contract{color:var(--color-contract)}:host .popover-title.text-color-task{color:var(--color-task)}:host .popover-title.text-color-jobCode{color:var(--color-job-code)}:host .popover-title.text-color-earnCode{color:var(--color-earn-code)}:host .popover-title.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .popover-title.text-color-billableCharge{color:var(--color-billable-charge)}:host .popover-title.text-color-payableCharge{color:var(--color-payable-charge)}:host .popover-title.text-color-user{color:var(--color-user)}:host .popover-title.text-color-corporateUser{color:var(--color-corporate-user)}:host .popover-title.text-color-distributionList{color:var(--color-distribution-list)}:host .popover-title.text-color-credential{color:var(--color-credential)}:host .popover-title.text-color-person{color:var(--color-person)}:host .popover-title.margin-before{margin-top:.4rem}:host .popover-title.margin-after{margin-bottom:.8rem}:host .popover-title.text-length-small{max-width:40ch}:host .popover-title.text-length-medium{max-width:55ch}:host .popover-title.text-length-large{max-width:70ch}:host .popover-title.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .popover-title.text-weight-thin{font-weight:var(--font-weight-thin)}:host .popover-title.text-weight-light{font-weight:var(--font-weight-light)}:host .popover-title.text-weight-normal{font-weight:var(--font-weight-normal)}:host .popover-title.text-weight-medium{font-weight:var(--font-weight-medium)}:host .popover-title.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .popover-title.text-weight-bold{font-weight:var(--font-weight-bold)}:host .popover-title.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .popover-title.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .popover-title.text-weight-lighter{font-weight:lighter}:host .popover-title.text-weight-bolder{font-weight:bolder}:host .popover-content{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host .popover-content.text-capitalize{text-transform:capitalize}:host .popover-content.text-uppercase{text-transform:uppercase}:host .popover-content.text-nowrap{white-space:nowrap}:host .popover-content.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-content.text-size-default{font-size:inherit}:host .popover-content.text-size-body{font-size:var(--font-size-body)}:host .popover-content.text-size-xs{font-size:var(--font-size-xs)}:host .popover-content.text-size-sm{font-size:var(--font-size-sm)}:host .popover-content.text-size-md{font-size:var(--font-size-md)}:host .popover-content.text-size-lg{font-size:var(--font-size-lg)}:host .popover-content.text-size-xl{font-size:var(--font-size-xl)}:host .popover-content.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-content.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-content.text-size-smaller{font-size:.8em}:host .popover-content.text-size-larger{font-size:1.2em}:host .popover-content.text-color-black{color:var(--color-black)}:host .popover-content.text-color-white{color:var(--color-white)}:host .popover-content.text-color-gray{color:var(--color-gray)}:host .popover-content.text-color-grey{color:var(--color-grey)}:host .popover-content.text-color-offWhite{color:var(--color-off-white)}:host .popover-content.text-color-bright{color:var(--color-bright)}:host .popover-content.text-color-light{color:var(--color-light)}:host .popover-content.text-color-neutral{color:var(--color-neutral)}:host .popover-content.text-color-dark{color:var(--color-dark)}:host .popover-content.text-color-orange{color:var(--color-orange)}:host .popover-content.text-color-navigation{color:var(--color-navigation)}:host .popover-content.text-color-skyBlue{color:var(--color-sky-blue)}:host .popover-content.text-color-steel{color:var(--color-steel)}:host .popover-content.text-color-metal{color:var(--color-metal)}:host .popover-content.text-color-sand{color:var(--color-sand)}:host .popover-content.text-color-silver{color:var(--color-silver)}:host .popover-content.text-color-stone{color:var(--color-stone)}:host .popover-content.text-color-ash{color:var(--color-ash)}:host .popover-content.text-color-anonymous{color:var(--color-anonymous)}:host .popover-content.text-color-slate{color:var(--color-slate)}:host .popover-content.text-color-onyx{color:var(--color-onyx)}:host .popover-content.text-color-charcoal{color:var(--color-charcoal)}:host .popover-content.text-color-moonlight{color:var(--color-moonlight)}:host .popover-content.text-color-midnight{color:var(--color-midnight)}:host .popover-content.text-color-darkness{color:var(--color-darkness)}:host .popover-content.text-color-navy{color:var(--color-navy)}:host .popover-content.text-color-aqua{color:var(--color-aqua)}:host .popover-content.text-color-ocean{color:var(--color-ocean)}:host .popover-content.text-color-mint{color:var(--color-mint)}:host .popover-content.text-color-grass{color:var(--color-grass)}:host .popover-content.text-color-sunflower{color:var(--color-sunflower)}:host .popover-content.text-color-bittersweet{color:var(--color-bittersweet)}:host .popover-content.text-color-grapefruit{color:var(--color-grapefruit)}:host .popover-content.text-color-carnation{color:var(--color-carnation)}:host .popover-content.text-color-lavender{color:var(--color-lavender)}:host .popover-content.text-color-mountain{color:var(--color-mountain)}:host .popover-content.text-color-info{color:var(--color-info)}:host .popover-content.text-color-positive{color:var(--color-positive)}:host .popover-content.text-color-success{color:var(--color-success)}:host .popover-content.text-color-negative{color:var(--color-negative)}:host .popover-content.text-color-danger{color:var(--color-danger)}:host .popover-content.text-color-error{color:var(--color-error)}:host .popover-content.text-color-warning{color:var(--color-warning)}:host .popover-content.text-color-empty{color:var(--color-empty)}:host .popover-content.text-color-disabled{color:var(--color-disabled)}:host .popover-content.text-color-background{color:var(--color-background)}:host .popover-content.text-color-backgroundDark{color:var(--color-background-dark)}:host .popover-content.text-color-border{color:var(--color-border)}:host .popover-content.text-color-border2{color:var(--color-border2)}:host .popover-content.text-color-text{color:var(--color-text)}:host .popover-content.text-color-presentation{color:var(--color-presentation)}:host .popover-content.text-color-bullhorn{color:var(--color-bullhorn)}:host .popover-content.text-color-pulse{color:var(--color-pulse)}:host .popover-content.text-color-fastFind{color:var(--color-fast-find)}:host .popover-content.text-color-toast{color:var(--color-toast)}:host .popover-content.text-color-company{color:var(--color-company)}:host .popover-content.text-color-candidate{color:var(--color-candidate)}:host .popover-content.text-color-lead{color:var(--color-lead)}:host .popover-content.text-color-contact{color:var(--color-contact)}:host .popover-content.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-content.text-color-opportunity{color:var(--color-opportunity)}:host .popover-content.text-color-job{color:var(--color-job)}:host .popover-content.text-color-joborder{color:var(--color-joborder)}:host .popover-content.text-color-submission{color:var(--color-submission)}:host .popover-content.text-color-sendout{color:var(--color-sendout)}:host .popover-content.text-color-placement{color:var(--color-placement)}:host .popover-content.text-color-note{color:var(--color-note)}:host .popover-content.text-color-contract{color:var(--color-contract)}:host .popover-content.text-color-task{color:var(--color-task)}:host .popover-content.text-color-jobCode{color:var(--color-job-code)}:host .popover-content.text-color-earnCode{color:var(--color-earn-code)}:host .popover-content.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host .popover-content.text-color-billableCharge{color:var(--color-billable-charge)}:host .popover-content.text-color-payableCharge{color:var(--color-payable-charge)}:host .popover-content.text-color-user{color:var(--color-user)}:host .popover-content.text-color-corporateUser{color:var(--color-corporate-user)}:host .popover-content.text-color-distributionList{color:var(--color-distribution-list)}:host .popover-content.text-color-credential{color:var(--color-credential)}:host .popover-content.text-color-person{color:var(--color-person)}:host .popover-content.margin-before{margin-top:.4rem}:host .popover-content.margin-after{margin-bottom:.8rem}:host .popover-content.text-length-small{max-width:40ch}:host .popover-content.text-length-medium{max-width:55ch}:host .popover-content.text-length-large{max-width:70ch}:host .popover-content.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host .popover-content.text-weight-thin{font-weight:var(--font-weight-thin)}:host .popover-content.text-weight-light{font-weight:var(--font-weight-light)}:host .popover-content.text-weight-normal{font-weight:var(--font-weight-normal)}:host .popover-content.text-weight-medium{font-weight:var(--font-weight-medium)}:host .popover-content.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host .popover-content.text-weight-bold{font-weight:var(--font-weight-bold)}:host .popover-content.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host .popover-content.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host .popover-content.text-weight-lighter{font-weight:lighter}:host .popover-content.text-weight-bolder{font-weight:bolder}:host .popover-content .popover-content-text{white-space:pre-line}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { content: [{
                type: Input
            }], htmlContent: [{
                type: Input
            }], placement: [{
                type: Input
            }], title: [{
                type: Input
            }], animation: [{
                type: Input
            }], popoverDiv: [{
                type: ViewChild,
                args: ['popoverDiv']
            }] } });

// NG2
class PopOverDirective {
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.PopoverComponent = PopOverContent;
        this.subscriptions = new Subscription();
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
    }
    set novoPopover(content) {
        this.content = content;
    }
    // ---------------------------------------------------
    // Event listeners
    // ---------------------------------------------------
    showOrHideOnClick() {
        if (this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.toggle();
    }
    showOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.show();
    }
    hideOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.hide();
    }
    ngOnChanges(changes) {
        if (changes.popoverDisabled) {
            if (changes.popoverDisabled.currentValue) {
                this.hide();
            }
        }
        if (changes.popoverAlways) {
            if (changes.popoverAlways.currentValue) {
                this.show();
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    toggle() {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (this.visible || (!this.content && !this.popoverHtmlContent)) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string' || this.popoverHtmlContent) {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance;
            popover.popover = this;
            if (this.content) {
                popover.content = this.content;
            }
            if (this.popoverHtmlContent) {
                popover.htmlContent = this.popoverHtmlContent;
            }
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            this.subscriptions.add(popover.onCloseFromOutside.subscribe(() => this.hide()));
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
        }
        else {
            const popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            this.subscriptions.add(popover.onCloseFromOutside.subscribe(() => this.hide()));
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
            popover.show();
        }
        this.onShown.emit(this);
    }
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }
        if (this.content instanceof PopOverContent) {
            this.content.hideFromPopover();
        }
        this.onHidden.emit(this);
    }
    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PopOverDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: PopOverDirective, isStandalone: false, selector: "[popover], [novoPopover]", inputs: { content: ["popover", "content"], novoPopover: "novoPopover", popoverHtmlContent: "popoverHtmlContent", popoverDisabled: "popoverDisabled", popoverAlways: "popoverAlways", popoverAnimation: "popoverAnimation", popoverPlacement: "popoverPlacement", popoverTitle: "popoverTitle", popoverOnHover: "popoverOnHover", popoverDismissTimeout: "popoverDismissTimeout" }, outputs: { onShown: "onShown", onHidden: "onHidden" }, host: { listeners: { "click": "showOrHideOnClick()", "focusin": "showOnHover()", "mouseenter": "showOnHover()", "focusout": "hideOnHover()", "mouseleave": "hideOnHover()" } }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PopOverDirective, decorators: [{
            type: Directive,
            args: [{
                    /**
                     *  [popover] selector retained for backwards compatability, but should be avoived as
                     *  it interferes with the newly added (2023) HTML standard spec popover attribute.
                     */
                    selector: '[popover], [novoPopover]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }], propDecorators: { content: [{
                type: Input,
                args: ['popover']
            }], novoPopover: [{
                type: Input,
                args: ['novoPopover']
            }], popoverHtmlContent: [{
                type: Input
            }], popoverDisabled: [{
                type: Input
            }], popoverAlways: [{
                type: Input
            }], popoverAnimation: [{
                type: Input
            }], popoverPlacement: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], popoverOnHover: [{
                type: Input
            }], popoverDismissTimeout: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], showOrHideOnClick: [{
                type: HostListener,
                args: ['click']
            }], showOnHover: [{
                type: HostListener,
                args: ['focusin']
            }, {
                type: HostListener,
                args: ['mouseenter']
            }], hideOnHover: [{
                type: HostListener,
                args: ['focusout']
            }, {
                type: HostListener,
                args: ['mouseleave']
            }] } });

// NG2
class NovoPopOverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoPopOverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoPopOverModule, declarations: [PopOverContent, PopOverDirective], imports: [CommonModule], exports: [PopOverContent, PopOverDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoPopOverModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoPopOverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PopOverContent, PopOverDirective],
                    exports: [PopOverContent, PopOverDirective],
                    imports: [
                        CommonModule,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoPopOverModule, PopOverContent, PopOverDirective };
//# sourceMappingURL=novo-elements-elements-popover.mjs.map
