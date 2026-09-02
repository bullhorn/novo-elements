import * as i2 from '@angular/cdk/portal';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, HostBinding, Output, Component, Input, Injector, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';

class NovoModalParams {
}
class NovoModalRef {
    constructor(component, params, overlayRef) {
        this.component = component;
        this.params = params;
        this.overlayRef = overlayRef;
        this._beforeClose = new Subject();
        this._afterClosed = new Subject();
        this.isClosed = false;
    }
    // Gets a promise that is resolved when the dialog is closed.
    get onClosed() {
        return this._afterClosed.toPromise();
    }
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    beforeClose() {
        return this._beforeClose.asObservable();
    }
    close(result) {
        // Listen for animation 'start' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'start'), take(1))
            .subscribe(() => {
            this._beforeClose.next(result);
            this._beforeClose.complete();
            this.overlayRef.detachBackdrop();
        });
        // Listen for animation 'done' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'done' && event.toState === 'leave'), take(1))
            .subscribe(() => {
            this.isClosed = true;
            this.overlayRef.dispose();
            this._afterClosed.next(result);
            this._afterClosed.complete();
            // Make sure to also clear the reference to the
            // component instance to avoid memory leaks
            this.componentInstance = null;
        });
        // Start exit animation
        this.componentInstance.startExitAnimation();
    }
}

const zoomInOut = trigger('zoomInOut', [
    transition('void => *', [style({ transform: 'scale3d(.3, .3, .3)' }), animate(50)]),
    transition('* => void', [animate(50, style({ transform: 'scale3d(.0, .0, .0)' }))]),
]);

class NovoModalContainerComponent {
    constructor(injector, modalRef) {
        this.injector = injector;
        this.modalRef = modalRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.initTimestamp = Date.now();
        this.id = `modal-container-${this.initTimestamp}`;
        this.component = new ComponentPortal(modalRef.component, null, injector);
    }
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        this.animationState = 'leave';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalContainerComponent, deps: [{ token: i0.Injector }, { token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoModalContainerComponent, isStandalone: false, selector: "novo-modal-container", outputs: { animationStateChanged: "animationStateChanged" }, host: { properties: { "id": "this.id" } }, ngImport: i0, template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:#00000040}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;inset:0}\n"], dependencies: [{ kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [zoomInOut] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal-container', animations: [zoomInOut], standalone: false, template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:#00000040}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;inset:0}\n"] }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: NovoModalRef }], propDecorators: { animationStateChanged: [{
                type: Output
            }], id: [{
                type: HostBinding,
                args: ['id']
            }] } });

// NG2
class NovoModalElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoModalElement, isStandalone: false, selector: "novo-modal", host: { classAttribute: "novo-modal" }, ngImport: i0, template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true, styles: [":host{display:block;background-color:var(--background-bright);border-radius:var(--border-radius-md, 4px);box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host>::ng-deep header{border-top-left-radius:var(--border-radius-md, 4px);border-top-right-radius:var(--border-radius-md, 4px);overflow:hidden}:host>::ng-deep header h1,:host>::ng-deep header h2{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>::ng-deep header h1.text-capitalize,:host>::ng-deep header h2.text-capitalize{text-transform:capitalize}:host>::ng-deep header h1.text-uppercase,:host>::ng-deep header h2.text-uppercase{text-transform:uppercase}:host>::ng-deep header h1.text-nowrap,:host>::ng-deep header h2.text-nowrap{white-space:nowrap}:host>::ng-deep header h1.text-ellipsis,:host>::ng-deep header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>::ng-deep header h1.text-size-default,:host>::ng-deep header h2.text-size-default{font-size:inherit}:host>::ng-deep header h1.text-size-body,:host>::ng-deep header h2.text-size-body{font-size:var(--font-size-body)}:host>::ng-deep header h1.text-size-xs,:host>::ng-deep header h2.text-size-xs{font-size:var(--font-size-xs)}:host>::ng-deep header h1.text-size-sm,:host>::ng-deep header h2.text-size-sm{font-size:var(--font-size-sm)}:host>::ng-deep header h1.text-size-md,:host>::ng-deep header h2.text-size-md{font-size:var(--font-size-md)}:host>::ng-deep header h1.text-size-lg,:host>::ng-deep header h2.text-size-lg{font-size:var(--font-size-lg)}:host>::ng-deep header h1.text-size-xl,:host>::ng-deep header h2.text-size-xl{font-size:var(--font-size-xl)}:host>::ng-deep header h1.text-size-2xl,:host>::ng-deep header h2.text-size-2xl{font-size:var(--font-size-2xl)}:host>::ng-deep header h1.text-size-3xl,:host>::ng-deep header h2.text-size-3xl{font-size:var(--font-size-3xl)}:host>::ng-deep header h1.text-size-smaller,:host>::ng-deep header h2.text-size-smaller{font-size:.8em}:host>::ng-deep header h1.text-size-larger,:host>::ng-deep header h2.text-size-larger{font-size:1.2em}:host>::ng-deep header h1.text-color-black,:host>::ng-deep header h2.text-color-black{color:var(--color-black)}:host>::ng-deep header h1.text-color-white,:host>::ng-deep header h2.text-color-white{color:var(--color-white)}:host>::ng-deep header h1.text-color-gray,:host>::ng-deep header h2.text-color-gray{color:var(--color-gray)}:host>::ng-deep header h1.text-color-grey,:host>::ng-deep header h2.text-color-grey{color:var(--color-grey)}:host>::ng-deep header h1.text-color-offWhite,:host>::ng-deep header h2.text-color-offWhite{color:var(--color-off-white)}:host>::ng-deep header h1.text-color-bright,:host>::ng-deep header h2.text-color-bright{color:var(--color-bright)}:host>::ng-deep header h1.text-color-light,:host>::ng-deep header h2.text-color-light{color:var(--color-light)}:host>::ng-deep header h1.text-color-neutral,:host>::ng-deep header h2.text-color-neutral{color:var(--color-neutral)}:host>::ng-deep header h1.text-color-dark,:host>::ng-deep header h2.text-color-dark{color:var(--color-dark)}:host>::ng-deep header h1.text-color-orange,:host>::ng-deep header h2.text-color-orange{color:var(--color-orange)}:host>::ng-deep header h1.text-color-navigation,:host>::ng-deep header h2.text-color-navigation{color:var(--color-navigation)}:host>::ng-deep header h1.text-color-skyBlue,:host>::ng-deep header h2.text-color-skyBlue{color:var(--color-sky-blue)}:host>::ng-deep header h1.text-color-steel,:host>::ng-deep header h2.text-color-steel{color:var(--color-steel)}:host>::ng-deep header h1.text-color-metal,:host>::ng-deep header h2.text-color-metal{color:var(--color-metal)}:host>::ng-deep header h1.text-color-sand,:host>::ng-deep header h2.text-color-sand{color:var(--color-sand)}:host>::ng-deep header h1.text-color-silver,:host>::ng-deep header h2.text-color-silver{color:var(--color-silver)}:host>::ng-deep header h1.text-color-stone,:host>::ng-deep header h2.text-color-stone{color:var(--color-stone)}:host>::ng-deep header h1.text-color-ash,:host>::ng-deep header h2.text-color-ash{color:var(--color-ash)}:host>::ng-deep header h1.text-color-anonymous,:host>::ng-deep header h2.text-color-anonymous{color:var(--color-anonymous)}:host>::ng-deep header h1.text-color-slate,:host>::ng-deep header h2.text-color-slate{color:var(--color-slate)}:host>::ng-deep header h1.text-color-onyx,:host>::ng-deep header h2.text-color-onyx{color:var(--color-onyx)}:host>::ng-deep header h1.text-color-charcoal,:host>::ng-deep header h2.text-color-charcoal{color:var(--color-charcoal)}:host>::ng-deep header h1.text-color-moonlight,:host>::ng-deep header h2.text-color-moonlight{color:var(--color-moonlight)}:host>::ng-deep header h1.text-color-midnight,:host>::ng-deep header h2.text-color-midnight{color:var(--color-midnight)}:host>::ng-deep header h1.text-color-darkness,:host>::ng-deep header h2.text-color-darkness{color:var(--color-darkness)}:host>::ng-deep header h1.text-color-navy,:host>::ng-deep header h2.text-color-navy{color:var(--color-navy)}:host>::ng-deep header h1.text-color-aqua,:host>::ng-deep header h2.text-color-aqua{color:var(--color-aqua)}:host>::ng-deep header h1.text-color-ocean,:host>::ng-deep header h2.text-color-ocean{color:var(--color-ocean)}:host>::ng-deep header h1.text-color-mint,:host>::ng-deep header h2.text-color-mint{color:var(--color-mint)}:host>::ng-deep header h1.text-color-grass,:host>::ng-deep header h2.text-color-grass{color:var(--color-grass)}:host>::ng-deep header h1.text-color-sunflower,:host>::ng-deep header h2.text-color-sunflower{color:var(--color-sunflower)}:host>::ng-deep header h1.text-color-bittersweet,:host>::ng-deep header h2.text-color-bittersweet{color:var(--color-bittersweet)}:host>::ng-deep header h1.text-color-grapefruit,:host>::ng-deep header h2.text-color-grapefruit{color:var(--color-grapefruit)}:host>::ng-deep header h1.text-color-carnation,:host>::ng-deep header h2.text-color-carnation{color:var(--color-carnation)}:host>::ng-deep header h1.text-color-lavender,:host>::ng-deep header h2.text-color-lavender{color:var(--color-lavender)}:host>::ng-deep header h1.text-color-mountain,:host>::ng-deep header h2.text-color-mountain{color:var(--color-mountain)}:host>::ng-deep header h1.text-color-info,:host>::ng-deep header h2.text-color-info{color:var(--color-info)}:host>::ng-deep header h1.text-color-positive,:host>::ng-deep header h2.text-color-positive{color:var(--color-positive)}:host>::ng-deep header h1.text-color-success,:host>::ng-deep header h2.text-color-success{color:var(--color-success)}:host>::ng-deep header h1.text-color-negative,:host>::ng-deep header h2.text-color-negative{color:var(--color-negative)}:host>::ng-deep header h1.text-color-danger,:host>::ng-deep header h2.text-color-danger{color:var(--color-danger)}:host>::ng-deep header h1.text-color-error,:host>::ng-deep header h2.text-color-error{color:var(--color-error)}:host>::ng-deep header h1.text-color-warning,:host>::ng-deep header h2.text-color-warning{color:var(--color-warning)}:host>::ng-deep header h1.text-color-empty,:host>::ng-deep header h2.text-color-empty{color:var(--color-empty)}:host>::ng-deep header h1.text-color-disabled,:host>::ng-deep header h2.text-color-disabled{color:var(--color-disabled)}:host>::ng-deep header h1.text-color-background,:host>::ng-deep header h2.text-color-background{color:var(--color-background)}:host>::ng-deep header h1.text-color-backgroundDark,:host>::ng-deep header h2.text-color-backgroundDark{color:var(--color-background-dark)}:host>::ng-deep header h1.text-color-border,:host>::ng-deep header h2.text-color-border{color:var(--color-border)}:host>::ng-deep header h1.text-color-border2,:host>::ng-deep header h2.text-color-border2{color:var(--color-border2)}:host>::ng-deep header h1.text-color-text,:host>::ng-deep header h2.text-color-text{color:var(--color-text)}:host>::ng-deep header h1.text-color-presentation,:host>::ng-deep header h2.text-color-presentation{color:var(--color-presentation)}:host>::ng-deep header h1.text-color-bullhorn,:host>::ng-deep header h2.text-color-bullhorn{color:var(--color-bullhorn)}:host>::ng-deep header h1.text-color-pulse,:host>::ng-deep header h2.text-color-pulse{color:var(--color-pulse)}:host>::ng-deep header h1.text-color-fastFind,:host>::ng-deep header h2.text-color-fastFind{color:var(--color-fast-find)}:host>::ng-deep header h1.text-color-toast,:host>::ng-deep header h2.text-color-toast{color:var(--color-toast)}:host>::ng-deep header h1.text-color-company,:host>::ng-deep header h2.text-color-company{color:var(--color-company)}:host>::ng-deep header h1.text-color-candidate,:host>::ng-deep header h2.text-color-candidate{color:var(--color-candidate)}:host>::ng-deep header h1.text-color-lead,:host>::ng-deep header h2.text-color-lead{color:var(--color-lead)}:host>::ng-deep header h1.text-color-contact,:host>::ng-deep header h2.text-color-contact{color:var(--color-contact)}:host>::ng-deep header h1.text-color-clientcontact,:host>::ng-deep header h2.text-color-clientcontact{color:var(--color-clientcontact)}:host>::ng-deep header h1.text-color-opportunity,:host>::ng-deep header h2.text-color-opportunity{color:var(--color-opportunity)}:host>::ng-deep header h1.text-color-job,:host>::ng-deep header h2.text-color-job{color:var(--color-job)}:host>::ng-deep header h1.text-color-joborder,:host>::ng-deep header h2.text-color-joborder{color:var(--color-joborder)}:host>::ng-deep header h1.text-color-submission,:host>::ng-deep header h2.text-color-submission{color:var(--color-submission)}:host>::ng-deep header h1.text-color-sendout,:host>::ng-deep header h2.text-color-sendout{color:var(--color-sendout)}:host>::ng-deep header h1.text-color-placement,:host>::ng-deep header h2.text-color-placement{color:var(--color-placement)}:host>::ng-deep header h1.text-color-note,:host>::ng-deep header h2.text-color-note{color:var(--color-note)}:host>::ng-deep header h1.text-color-contract,:host>::ng-deep header h2.text-color-contract{color:var(--color-contract)}:host>::ng-deep header h1.text-color-task,:host>::ng-deep header h2.text-color-task{color:var(--color-task)}:host>::ng-deep header h1.text-color-jobCode,:host>::ng-deep header h2.text-color-jobCode{color:var(--color-job-code)}:host>::ng-deep header h1.text-color-earnCode,:host>::ng-deep header h2.text-color-earnCode{color:var(--color-earn-code)}:host>::ng-deep header h1.text-color-invoiceStatement,:host>::ng-deep header h2.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>::ng-deep header h1.text-color-billableCharge,:host>::ng-deep header h2.text-color-billableCharge{color:var(--color-billable-charge)}:host>::ng-deep header h1.text-color-payableCharge,:host>::ng-deep header h2.text-color-payableCharge{color:var(--color-payable-charge)}:host>::ng-deep header h1.text-color-user,:host>::ng-deep header h2.text-color-user{color:var(--color-user)}:host>::ng-deep header h1.text-color-corporateUser,:host>::ng-deep header h2.text-color-corporateUser{color:var(--color-corporate-user)}:host>::ng-deep header h1.text-color-distributionList,:host>::ng-deep header h2.text-color-distributionList{color:var(--color-distribution-list)}:host>::ng-deep header h1.text-color-credential,:host>::ng-deep header h2.text-color-credential{color:var(--color-credential)}:host>::ng-deep header h1.text-color-person,:host>::ng-deep header h2.text-color-person{color:var(--color-person)}:host>::ng-deep header h1.margin-before,:host>::ng-deep header h2.margin-before{margin-top:.4rem}:host>::ng-deep header h1.margin-after,:host>::ng-deep header h2.margin-after{margin-bottom:.8rem}:host>::ng-deep header h1.text-length-small,:host>::ng-deep header h2.text-length-small{max-width:40ch}:host>::ng-deep header h1.text-length-medium,:host>::ng-deep header h2.text-length-medium{max-width:55ch}:host>::ng-deep header h1.text-length-large,:host>::ng-deep header h2.text-length-large{max-width:70ch}:host>::ng-deep header h1.text-weight-hairline,:host>::ng-deep header h2.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>::ng-deep header h1.text-weight-thin,:host>::ng-deep header h2.text-weight-thin{font-weight:var(--font-weight-thin)}:host>::ng-deep header h1.text-weight-light,:host>::ng-deep header h2.text-weight-light{font-weight:var(--font-weight-light)}:host>::ng-deep header h1.text-weight-normal,:host>::ng-deep header h2.text-weight-normal{font-weight:var(--font-weight-normal)}:host>::ng-deep header h1.text-weight-medium,:host>::ng-deep header h2.text-weight-medium{font-weight:var(--font-weight-medium)}:host>::ng-deep header h1.text-weight-semibold,:host>::ng-deep header h2.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>::ng-deep header h1.text-weight-bold,:host>::ng-deep header h2.text-weight-bold{font-weight:var(--font-weight-bold)}:host>::ng-deep header h1.text-weight-extrabold,:host>::ng-deep header h2.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>::ng-deep header h1.text-weight-heavy,:host>::ng-deep header h2.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>::ng-deep header h1.text-weight-lighter,:host>::ng-deep header h2.text-weight-lighter{font-weight:lighter}:host>::ng-deep header h1.text-weight-bolder,:host>::ng-deep header h2.text-weight-bolder{font-weight:bolder}:host>::ng-deep section{padding:var(--spacing-md) var(--spacing-xl);max-height:500px;overflow:auto}:host ::ng-deep .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host ::ng-deep .novo-modal-footer ::ng-deep button{min-width:10rem}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal', template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, host: {
                        class: 'novo-modal',
                    }, standalone: false, styles: [":host{display:block;background-color:var(--background-bright);border-radius:var(--border-radius-md, 4px);box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host>::ng-deep header{border-top-left-radius:var(--border-radius-md, 4px);border-top-right-radius:var(--border-radius-md, 4px);overflow:hidden}:host>::ng-deep header h1,:host>::ng-deep header h2{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>::ng-deep header h1.text-capitalize,:host>::ng-deep header h2.text-capitalize{text-transform:capitalize}:host>::ng-deep header h1.text-uppercase,:host>::ng-deep header h2.text-uppercase{text-transform:uppercase}:host>::ng-deep header h1.text-nowrap,:host>::ng-deep header h2.text-nowrap{white-space:nowrap}:host>::ng-deep header h1.text-ellipsis,:host>::ng-deep header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>::ng-deep header h1.text-size-default,:host>::ng-deep header h2.text-size-default{font-size:inherit}:host>::ng-deep header h1.text-size-body,:host>::ng-deep header h2.text-size-body{font-size:var(--font-size-body)}:host>::ng-deep header h1.text-size-xs,:host>::ng-deep header h2.text-size-xs{font-size:var(--font-size-xs)}:host>::ng-deep header h1.text-size-sm,:host>::ng-deep header h2.text-size-sm{font-size:var(--font-size-sm)}:host>::ng-deep header h1.text-size-md,:host>::ng-deep header h2.text-size-md{font-size:var(--font-size-md)}:host>::ng-deep header h1.text-size-lg,:host>::ng-deep header h2.text-size-lg{font-size:var(--font-size-lg)}:host>::ng-deep header h1.text-size-xl,:host>::ng-deep header h2.text-size-xl{font-size:var(--font-size-xl)}:host>::ng-deep header h1.text-size-2xl,:host>::ng-deep header h2.text-size-2xl{font-size:var(--font-size-2xl)}:host>::ng-deep header h1.text-size-3xl,:host>::ng-deep header h2.text-size-3xl{font-size:var(--font-size-3xl)}:host>::ng-deep header h1.text-size-smaller,:host>::ng-deep header h2.text-size-smaller{font-size:.8em}:host>::ng-deep header h1.text-size-larger,:host>::ng-deep header h2.text-size-larger{font-size:1.2em}:host>::ng-deep header h1.text-color-black,:host>::ng-deep header h2.text-color-black{color:var(--color-black)}:host>::ng-deep header h1.text-color-white,:host>::ng-deep header h2.text-color-white{color:var(--color-white)}:host>::ng-deep header h1.text-color-gray,:host>::ng-deep header h2.text-color-gray{color:var(--color-gray)}:host>::ng-deep header h1.text-color-grey,:host>::ng-deep header h2.text-color-grey{color:var(--color-grey)}:host>::ng-deep header h1.text-color-offWhite,:host>::ng-deep header h2.text-color-offWhite{color:var(--color-off-white)}:host>::ng-deep header h1.text-color-bright,:host>::ng-deep header h2.text-color-bright{color:var(--color-bright)}:host>::ng-deep header h1.text-color-light,:host>::ng-deep header h2.text-color-light{color:var(--color-light)}:host>::ng-deep header h1.text-color-neutral,:host>::ng-deep header h2.text-color-neutral{color:var(--color-neutral)}:host>::ng-deep header h1.text-color-dark,:host>::ng-deep header h2.text-color-dark{color:var(--color-dark)}:host>::ng-deep header h1.text-color-orange,:host>::ng-deep header h2.text-color-orange{color:var(--color-orange)}:host>::ng-deep header h1.text-color-navigation,:host>::ng-deep header h2.text-color-navigation{color:var(--color-navigation)}:host>::ng-deep header h1.text-color-skyBlue,:host>::ng-deep header h2.text-color-skyBlue{color:var(--color-sky-blue)}:host>::ng-deep header h1.text-color-steel,:host>::ng-deep header h2.text-color-steel{color:var(--color-steel)}:host>::ng-deep header h1.text-color-metal,:host>::ng-deep header h2.text-color-metal{color:var(--color-metal)}:host>::ng-deep header h1.text-color-sand,:host>::ng-deep header h2.text-color-sand{color:var(--color-sand)}:host>::ng-deep header h1.text-color-silver,:host>::ng-deep header h2.text-color-silver{color:var(--color-silver)}:host>::ng-deep header h1.text-color-stone,:host>::ng-deep header h2.text-color-stone{color:var(--color-stone)}:host>::ng-deep header h1.text-color-ash,:host>::ng-deep header h2.text-color-ash{color:var(--color-ash)}:host>::ng-deep header h1.text-color-anonymous,:host>::ng-deep header h2.text-color-anonymous{color:var(--color-anonymous)}:host>::ng-deep header h1.text-color-slate,:host>::ng-deep header h2.text-color-slate{color:var(--color-slate)}:host>::ng-deep header h1.text-color-onyx,:host>::ng-deep header h2.text-color-onyx{color:var(--color-onyx)}:host>::ng-deep header h1.text-color-charcoal,:host>::ng-deep header h2.text-color-charcoal{color:var(--color-charcoal)}:host>::ng-deep header h1.text-color-moonlight,:host>::ng-deep header h2.text-color-moonlight{color:var(--color-moonlight)}:host>::ng-deep header h1.text-color-midnight,:host>::ng-deep header h2.text-color-midnight{color:var(--color-midnight)}:host>::ng-deep header h1.text-color-darkness,:host>::ng-deep header h2.text-color-darkness{color:var(--color-darkness)}:host>::ng-deep header h1.text-color-navy,:host>::ng-deep header h2.text-color-navy{color:var(--color-navy)}:host>::ng-deep header h1.text-color-aqua,:host>::ng-deep header h2.text-color-aqua{color:var(--color-aqua)}:host>::ng-deep header h1.text-color-ocean,:host>::ng-deep header h2.text-color-ocean{color:var(--color-ocean)}:host>::ng-deep header h1.text-color-mint,:host>::ng-deep header h2.text-color-mint{color:var(--color-mint)}:host>::ng-deep header h1.text-color-grass,:host>::ng-deep header h2.text-color-grass{color:var(--color-grass)}:host>::ng-deep header h1.text-color-sunflower,:host>::ng-deep header h2.text-color-sunflower{color:var(--color-sunflower)}:host>::ng-deep header h1.text-color-bittersweet,:host>::ng-deep header h2.text-color-bittersweet{color:var(--color-bittersweet)}:host>::ng-deep header h1.text-color-grapefruit,:host>::ng-deep header h2.text-color-grapefruit{color:var(--color-grapefruit)}:host>::ng-deep header h1.text-color-carnation,:host>::ng-deep header h2.text-color-carnation{color:var(--color-carnation)}:host>::ng-deep header h1.text-color-lavender,:host>::ng-deep header h2.text-color-lavender{color:var(--color-lavender)}:host>::ng-deep header h1.text-color-mountain,:host>::ng-deep header h2.text-color-mountain{color:var(--color-mountain)}:host>::ng-deep header h1.text-color-info,:host>::ng-deep header h2.text-color-info{color:var(--color-info)}:host>::ng-deep header h1.text-color-positive,:host>::ng-deep header h2.text-color-positive{color:var(--color-positive)}:host>::ng-deep header h1.text-color-success,:host>::ng-deep header h2.text-color-success{color:var(--color-success)}:host>::ng-deep header h1.text-color-negative,:host>::ng-deep header h2.text-color-negative{color:var(--color-negative)}:host>::ng-deep header h1.text-color-danger,:host>::ng-deep header h2.text-color-danger{color:var(--color-danger)}:host>::ng-deep header h1.text-color-error,:host>::ng-deep header h2.text-color-error{color:var(--color-error)}:host>::ng-deep header h1.text-color-warning,:host>::ng-deep header h2.text-color-warning{color:var(--color-warning)}:host>::ng-deep header h1.text-color-empty,:host>::ng-deep header h2.text-color-empty{color:var(--color-empty)}:host>::ng-deep header h1.text-color-disabled,:host>::ng-deep header h2.text-color-disabled{color:var(--color-disabled)}:host>::ng-deep header h1.text-color-background,:host>::ng-deep header h2.text-color-background{color:var(--color-background)}:host>::ng-deep header h1.text-color-backgroundDark,:host>::ng-deep header h2.text-color-backgroundDark{color:var(--color-background-dark)}:host>::ng-deep header h1.text-color-border,:host>::ng-deep header h2.text-color-border{color:var(--color-border)}:host>::ng-deep header h1.text-color-border2,:host>::ng-deep header h2.text-color-border2{color:var(--color-border2)}:host>::ng-deep header h1.text-color-text,:host>::ng-deep header h2.text-color-text{color:var(--color-text)}:host>::ng-deep header h1.text-color-presentation,:host>::ng-deep header h2.text-color-presentation{color:var(--color-presentation)}:host>::ng-deep header h1.text-color-bullhorn,:host>::ng-deep header h2.text-color-bullhorn{color:var(--color-bullhorn)}:host>::ng-deep header h1.text-color-pulse,:host>::ng-deep header h2.text-color-pulse{color:var(--color-pulse)}:host>::ng-deep header h1.text-color-fastFind,:host>::ng-deep header h2.text-color-fastFind{color:var(--color-fast-find)}:host>::ng-deep header h1.text-color-toast,:host>::ng-deep header h2.text-color-toast{color:var(--color-toast)}:host>::ng-deep header h1.text-color-company,:host>::ng-deep header h2.text-color-company{color:var(--color-company)}:host>::ng-deep header h1.text-color-candidate,:host>::ng-deep header h2.text-color-candidate{color:var(--color-candidate)}:host>::ng-deep header h1.text-color-lead,:host>::ng-deep header h2.text-color-lead{color:var(--color-lead)}:host>::ng-deep header h1.text-color-contact,:host>::ng-deep header h2.text-color-contact{color:var(--color-contact)}:host>::ng-deep header h1.text-color-clientcontact,:host>::ng-deep header h2.text-color-clientcontact{color:var(--color-clientcontact)}:host>::ng-deep header h1.text-color-opportunity,:host>::ng-deep header h2.text-color-opportunity{color:var(--color-opportunity)}:host>::ng-deep header h1.text-color-job,:host>::ng-deep header h2.text-color-job{color:var(--color-job)}:host>::ng-deep header h1.text-color-joborder,:host>::ng-deep header h2.text-color-joborder{color:var(--color-joborder)}:host>::ng-deep header h1.text-color-submission,:host>::ng-deep header h2.text-color-submission{color:var(--color-submission)}:host>::ng-deep header h1.text-color-sendout,:host>::ng-deep header h2.text-color-sendout{color:var(--color-sendout)}:host>::ng-deep header h1.text-color-placement,:host>::ng-deep header h2.text-color-placement{color:var(--color-placement)}:host>::ng-deep header h1.text-color-note,:host>::ng-deep header h2.text-color-note{color:var(--color-note)}:host>::ng-deep header h1.text-color-contract,:host>::ng-deep header h2.text-color-contract{color:var(--color-contract)}:host>::ng-deep header h1.text-color-task,:host>::ng-deep header h2.text-color-task{color:var(--color-task)}:host>::ng-deep header h1.text-color-jobCode,:host>::ng-deep header h2.text-color-jobCode{color:var(--color-job-code)}:host>::ng-deep header h1.text-color-earnCode,:host>::ng-deep header h2.text-color-earnCode{color:var(--color-earn-code)}:host>::ng-deep header h1.text-color-invoiceStatement,:host>::ng-deep header h2.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host>::ng-deep header h1.text-color-billableCharge,:host>::ng-deep header h2.text-color-billableCharge{color:var(--color-billable-charge)}:host>::ng-deep header h1.text-color-payableCharge,:host>::ng-deep header h2.text-color-payableCharge{color:var(--color-payable-charge)}:host>::ng-deep header h1.text-color-user,:host>::ng-deep header h2.text-color-user{color:var(--color-user)}:host>::ng-deep header h1.text-color-corporateUser,:host>::ng-deep header h2.text-color-corporateUser{color:var(--color-corporate-user)}:host>::ng-deep header h1.text-color-distributionList,:host>::ng-deep header h2.text-color-distributionList{color:var(--color-distribution-list)}:host>::ng-deep header h1.text-color-credential,:host>::ng-deep header h2.text-color-credential{color:var(--color-credential)}:host>::ng-deep header h1.text-color-person,:host>::ng-deep header h2.text-color-person{color:var(--color-person)}:host>::ng-deep header h1.margin-before,:host>::ng-deep header h2.margin-before{margin-top:.4rem}:host>::ng-deep header h1.margin-after,:host>::ng-deep header h2.margin-after{margin-bottom:.8rem}:host>::ng-deep header h1.text-length-small,:host>::ng-deep header h2.text-length-small{max-width:40ch}:host>::ng-deep header h1.text-length-medium,:host>::ng-deep header h2.text-length-medium{max-width:55ch}:host>::ng-deep header h1.text-length-large,:host>::ng-deep header h2.text-length-large{max-width:70ch}:host>::ng-deep header h1.text-weight-hairline,:host>::ng-deep header h2.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host>::ng-deep header h1.text-weight-thin,:host>::ng-deep header h2.text-weight-thin{font-weight:var(--font-weight-thin)}:host>::ng-deep header h1.text-weight-light,:host>::ng-deep header h2.text-weight-light{font-weight:var(--font-weight-light)}:host>::ng-deep header h1.text-weight-normal,:host>::ng-deep header h2.text-weight-normal{font-weight:var(--font-weight-normal)}:host>::ng-deep header h1.text-weight-medium,:host>::ng-deep header h2.text-weight-medium{font-weight:var(--font-weight-medium)}:host>::ng-deep header h1.text-weight-semibold,:host>::ng-deep header h2.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host>::ng-deep header h1.text-weight-bold,:host>::ng-deep header h2.text-weight-bold{font-weight:var(--font-weight-bold)}:host>::ng-deep header h1.text-weight-extrabold,:host>::ng-deep header h2.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host>::ng-deep header h1.text-weight-heavy,:host>::ng-deep header h2.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host>::ng-deep header h1.text-weight-lighter,:host>::ng-deep header h2.text-weight-lighter{font-weight:lighter}:host>::ng-deep header h1.text-weight-bolder,:host>::ng-deep header h2.text-weight-bolder{font-weight:bolder}:host>::ng-deep section{padding:var(--spacing-md) var(--spacing-xl);max-height:500px;overflow:auto}:host ::ng-deep .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host ::ng-deep .novo-modal-footer ::ng-deep button{min-width:10rem}\n"] }]
        }], ctorParameters: () => [{ type: NovoModalRef }] });
class NovoModalNotificationElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
        this.cancel = new EventEmitter();
        this.modalRef = modalRef;
    }
    close() {
        this.cancel.emit();
        this.modalRef.close();
    }
    ngOnInit() {
        switch (this.type) {
            case 'success':
                this.iconType = 'bhi-check';
                break;
            case 'warning':
                this.iconType = 'bhi-caution-o';
                break;
            case 'error':
                this.iconType = 'bhi-caution-o';
                break;
            case 'custom':
                this.iconType = `bhi-${this.icon}`;
                break;
            default:
                break;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalNotificationElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoModalNotificationElement, isStandalone: false, selector: "novo-notification", inputs: { type: "type", icon: "icon" }, outputs: { cancel: "cancel" }, host: { classAttribute: "novo-notification" }, ngImport: i0, template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button,novo-dropdown"></ng-content></footer>
  `, isInline: true, styles: [":host{text-align:center;display:block;background-color:var(--background-bright);border-radius:var(--border-radius-md, 4px);box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host ::ng-deep .novo-notification-body{display:flex;flex-direction:column;padding:0 var(--spacing-xl);margin:var(--spacing-lg) 0 55px}:host ::ng-deep .novo-notification-body>img{width:100%}:host ::ng-deep .novo-notification-body h1{font-size:var(--font-size-2xl);margin:10px auto 0}:host ::ng-deep .novo-notification-body h2{font-size:var(--font-size-xl);color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h3{font-size:var(--font-size-lg);margin:0 auto}:host ::ng-deep .novo-notification-body h4{font-size:var(--font-size-lg);color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h5{font-size:var(--font-size-md);margin:0 auto}:host ::ng-deep .novo-notification-body h6{font-size:var(--font-size-md);margin:0 auto}:host ::ng-deep .novo-notification-body i.indicator{color:var(--text-muted);border:1px solid var(--text-muted);font-size:var(--font-size-2xl);border-radius:50%;padding:var(--spacing-md);margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:var(--color-success);border-color:var(--color-success)}:host[type=warning] .novo-notification-body i.indicator{color:var(--color-warning);border-color:var(--color-warning)}:host[type=error] .novo-notification-body i.indicator{color:var(--color-negative);border-color:var(--color-negative)}:host ::ng-deep .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host ::ng-deep .novo-notification-footer button{min-width:10rem}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalNotificationElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-notification', template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button,novo-dropdown"></ng-content></footer>
  `, host: {
                        class: 'novo-notification',
                    }, standalone: false, styles: [":host{text-align:center;display:block;background-color:var(--background-bright);border-radius:var(--border-radius-md, 4px);box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host ::ng-deep .novo-notification-body{display:flex;flex-direction:column;padding:0 var(--spacing-xl);margin:var(--spacing-lg) 0 55px}:host ::ng-deep .novo-notification-body>img{width:100%}:host ::ng-deep .novo-notification-body h1{font-size:var(--font-size-2xl);margin:10px auto 0}:host ::ng-deep .novo-notification-body h2{font-size:var(--font-size-xl);color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h3{font-size:var(--font-size-lg);margin:0 auto}:host ::ng-deep .novo-notification-body h4{font-size:var(--font-size-lg);color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h5{font-size:var(--font-size-md);margin:0 auto}:host ::ng-deep .novo-notification-body h6{font-size:var(--font-size-md);margin:0 auto}:host ::ng-deep .novo-notification-body i.indicator{color:var(--text-muted);border:1px solid var(--text-muted);font-size:var(--font-size-2xl);border-radius:50%;padding:var(--spacing-md);margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:var(--color-success);border-color:var(--color-success)}:host[type=warning] .novo-notification-body i.indicator{color:var(--color-warning);border-color:var(--color-warning)}:host[type=error] .novo-notification-body i.indicator{color:var(--color-negative);border-color:var(--color-negative)}:host ::ng-deep .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host ::ng-deep .novo-notification-footer button{min-width:10rem}\n"] }]
        }], ctorParameters: () => [{ type: NovoModalRef }], propDecorators: { type: [{
                type: Input
            }], icon: [{
                type: Input
            }], cancel: [{
                type: Output
            }] } });

// NG2
const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'modal-overlay-backdrop',
    panelClass: 'modal-overlay-panel',
};
class NovoModalService {
    set parentViewContainer(view) {
        console.warn('parentViewContainer is deprecated - will be ignored');
    }
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open(component, params = {}) {
        // Override default configuration
        const modalConfig = DEFAULT_CONFIG;
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        this.overlayRef = overlayRef;
        // Instantiate remote control
        const modalRef = new NovoModalRef(component, params, overlayRef);
        const overlayComponent = this.attachModalContainer(NovoModalContainerComponent, overlayRef, modalConfig, modalRef);
        // Pass the instance of the overlay component to the remote control
        modalRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(() => modalRef.close());
        return modalRef;
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachModalContainer(component, overlayRef, config, modalRef) {
        const injector = this.createInjector(config, modalRef);
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createInjector(config, modalRef) {
        return Injector.create({
            parent: this.injector,
            providers: [
                { provide: NovoModalRef, useValue: modalRef },
                // Support backwards compatability
                { provide: NovoModalParams, useValue: modalRef.params },
            ],
        });
    }
    getOverlayConfig(config) {
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
        });
        return overlayConfig;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.Overlay }] });

// NG2
class NovoModalModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoModalModule, declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule], exports: [NovoModalElement, NovoModalNotificationElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalModule, providers: [NovoModalService], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
                    declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement],
                    exports: [NovoModalElement, NovoModalNotificationElement],
                    providers: [NovoModalService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoModalContainerComponent, NovoModalElement, NovoModalModule, NovoModalNotificationElement, NovoModalParams, NovoModalRef, NovoModalService, zoomInOut };
//# sourceMappingURL=novo-elements-elements-modal.mjs.map
