import * as i2 from '@angular/cdk/portal';
import { ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, HostBinding, Output, Component, Input, Injectable, NgModule } from '@angular/core';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalContainerComponent, deps: [{ token: i0.Injector }, { token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoModalContainerComponent, isStandalone: false, selector: "novo-modal-container", outputs: { animationStateChanged: "animationStateChanged" }, host: { properties: { "id": "this.id" } }, ngImport: i0, template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:#00000040}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;inset:0}\n"], dependencies: [{ kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [zoomInOut] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalContainerComponent, decorators: [{
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoModalElement, isStandalone: false, selector: "novo-modal", host: { classAttribute: "novo-modal" }, ngImport: i0, template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true, styles: [":host{display:block;background-color:var(--background-bright);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:1.5rem;top:1.5rem}:host>::ng-deep header{border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}:host>::ng-deep header h1,:host>::ng-deep header h2{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>::ng-deep header h1.text-capitalize,:host>::ng-deep header h2.text-capitalize{text-transform:capitalize}:host>::ng-deep header h1.text-uppercase,:host>::ng-deep header h2.text-uppercase{text-transform:uppercase}:host>::ng-deep header h1.text-nowrap,:host>::ng-deep header h2.text-nowrap{white-space:nowrap}:host>::ng-deep header h1.text-ellipsis,:host>::ng-deep header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>::ng-deep header h1.text-size-default,:host>::ng-deep header h2.text-size-default{font-size:inherit}:host>::ng-deep header h1.text-size-body,:host>::ng-deep header h2.text-size-body{font-size:1.3rem}:host>::ng-deep header h1.text-size-xs,:host>::ng-deep header h2.text-size-xs{font-size:1rem}:host>::ng-deep header h1.text-size-sm,:host>::ng-deep header h2.text-size-sm{font-size:1.2rem}:host>::ng-deep header h1.text-size-md,:host>::ng-deep header h2.text-size-md{font-size:1.3rem}:host>::ng-deep header h1.text-size-lg,:host>::ng-deep header h2.text-size-lg{font-size:1.6rem}:host>::ng-deep header h1.text-size-xl,:host>::ng-deep header h2.text-size-xl{font-size:2rem}:host>::ng-deep header h1.text-size-2xl,:host>::ng-deep header h2.text-size-2xl{font-size:2.6rem}:host>::ng-deep header h1.text-size-3xl,:host>::ng-deep header h2.text-size-3xl{font-size:3.2rem}:host>::ng-deep header h1.text-size-smaller,:host>::ng-deep header h2.text-size-smaller{font-size:.8em}:host>::ng-deep header h1.text-size-larger,:host>::ng-deep header h2.text-size-larger{font-size:1.2em}:host>::ng-deep header h1.text-color-black,:host>::ng-deep header h2.text-color-black{color:#000}:host>::ng-deep header h1.text-color-white,:host>::ng-deep header h2.text-color-white{color:#fff}:host>::ng-deep header h1.text-color-gray,:host>::ng-deep header h2.text-color-gray{color:#9e9e9e}:host>::ng-deep header h1.text-color-grey,:host>::ng-deep header h2.text-color-grey{color:#9e9e9e}:host>::ng-deep header h1.text-color-offWhite,:host>::ng-deep header h2.text-color-offWhite{color:#f7f7f7}:host>::ng-deep header h1.text-color-bright,:host>::ng-deep header h2.text-color-bright{color:#f7f7f7}:host>::ng-deep header h1.text-color-light,:host>::ng-deep header h2.text-color-light{color:#dbdbdb}:host>::ng-deep header h1.text-color-neutral,:host>::ng-deep header h2.text-color-neutral{color:#4f5361}:host>::ng-deep header h1.text-color-dark,:host>::ng-deep header h2.text-color-dark{color:#3d464d}:host>::ng-deep header h1.text-color-orange,:host>::ng-deep header h2.text-color-orange{color:#ff6900}:host>::ng-deep header h1.text-color-navigation,:host>::ng-deep header h2.text-color-navigation{color:#202945}:host>::ng-deep header h1.text-color-skyBlue,:host>::ng-deep header h2.text-color-skyBlue{color:#009bdf}:host>::ng-deep header h1.text-color-steel,:host>::ng-deep header h2.text-color-steel{color:#5b6770}:host>::ng-deep header h1.text-color-metal,:host>::ng-deep header h2.text-color-metal{color:#637893}:host>::ng-deep header h1.text-color-sand,:host>::ng-deep header h2.text-color-sand{color:#f4f4f4}:host>::ng-deep header h1.text-color-silver,:host>::ng-deep header h2.text-color-silver{color:#e2e2e2}:host>::ng-deep header h1.text-color-stone,:host>::ng-deep header h2.text-color-stone{color:#bebebe}:host>::ng-deep header h1.text-color-ash,:host>::ng-deep header h2.text-color-ash{color:#a0a0a0}:host>::ng-deep header h1.text-color-slate,:host>::ng-deep header h2.text-color-slate{color:#707070}:host>::ng-deep header h1.text-color-onyx,:host>::ng-deep header h2.text-color-onyx{color:#526980}:host>::ng-deep header h1.text-color-charcoal,:host>::ng-deep header h2.text-color-charcoal{color:#282828}:host>::ng-deep header h1.text-color-moonlight,:host>::ng-deep header h2.text-color-moonlight{color:#1a242f}:host>::ng-deep header h1.text-color-midnight,:host>::ng-deep header h2.text-color-midnight{color:#202945}:host>::ng-deep header h1.text-color-darkness,:host>::ng-deep header h2.text-color-darkness{color:#161f27}:host>::ng-deep header h1.text-color-navy,:host>::ng-deep header h2.text-color-navy{color:#0d2d42}:host>::ng-deep header h1.text-color-aqua,:host>::ng-deep header h2.text-color-aqua{color:#3bafda}:host>::ng-deep header h1.text-color-ocean,:host>::ng-deep header h2.text-color-ocean{color:#4a89dc}:host>::ng-deep header h1.text-color-mint,:host>::ng-deep header h2.text-color-mint{color:#37bc9b}:host>::ng-deep header h1.text-color-grass,:host>::ng-deep header h2.text-color-grass{color:#8cc152}:host>::ng-deep header h1.text-color-sunflower,:host>::ng-deep header h2.text-color-sunflower{color:#f6b042}:host>::ng-deep header h1.text-color-bittersweet,:host>::ng-deep header h2.text-color-bittersweet{color:#eb6845}:host>::ng-deep header h1.text-color-grapefruit,:host>::ng-deep header h2.text-color-grapefruit{color:#da4453}:host>::ng-deep header h1.text-color-carnation,:host>::ng-deep header h2.text-color-carnation{color:#d770ad}:host>::ng-deep header h1.text-color-lavender,:host>::ng-deep header h2.text-color-lavender{color:#967adc}:host>::ng-deep header h1.text-color-mountain,:host>::ng-deep header h2.text-color-mountain{color:#9678b6}:host>::ng-deep header h1.text-color-info,:host>::ng-deep header h2.text-color-info{color:#4a89dc}:host>::ng-deep header h1.text-color-positive,:host>::ng-deep header h2.text-color-positive{color:#4a89dc}:host>::ng-deep header h1.text-color-success,:host>::ng-deep header h2.text-color-success{color:#8cc152}:host>::ng-deep header h1.text-color-negative,:host>::ng-deep header h2.text-color-negative{color:#da4453}:host>::ng-deep header h1.text-color-danger,:host>::ng-deep header h2.text-color-danger{color:#da4453}:host>::ng-deep header h1.text-color-error,:host>::ng-deep header h2.text-color-error{color:#da4453}:host>::ng-deep header h1.text-color-warning,:host>::ng-deep header h2.text-color-warning{color:#f6b042}:host>::ng-deep header h1.text-color-empty,:host>::ng-deep header h2.text-color-empty{color:#cccdcc}:host>::ng-deep header h1.text-color-disabled,:host>::ng-deep header h2.text-color-disabled{color:#bebebe}:host>::ng-deep header h1.text-color-background,:host>::ng-deep header h2.text-color-background{color:#f7f7f7}:host>::ng-deep header h1.text-color-backgroundDark,:host>::ng-deep header h2.text-color-backgroundDark{color:#e2e2e2}:host>::ng-deep header h1.text-color-presentation,:host>::ng-deep header h2.text-color-presentation{color:#5b6770}:host>::ng-deep header h1.text-color-bullhorn,:host>::ng-deep header h2.text-color-bullhorn{color:#ff6900}:host>::ng-deep header h1.text-color-pulse,:host>::ng-deep header h2.text-color-pulse{color:#3bafda}:host>::ng-deep header h1.text-color-company,:host>::ng-deep header h2.text-color-company{color:#39d}:host>::ng-deep header h1.text-color-candidate,:host>::ng-deep header h2.text-color-candidate{color:#4b7}:host>::ng-deep header h1.text-color-lead,:host>::ng-deep header h2.text-color-lead{color:#a69}:host>::ng-deep header h1.text-color-contact,:host>::ng-deep header h2.text-color-contact{color:#fa4}:host>::ng-deep header h1.text-color-clientcontact,:host>::ng-deep header h2.text-color-clientcontact{color:#fa4}:host>::ng-deep header h1.text-color-opportunity,:host>::ng-deep header h2.text-color-opportunity{color:#625}:host>::ng-deep header h1.text-color-job,:host>::ng-deep header h2.text-color-job{color:#b56}:host>::ng-deep header h1.text-color-joborder,:host>::ng-deep header h2.text-color-joborder{color:#b56}:host>::ng-deep header h1.text-color-submission,:host>::ng-deep header h2.text-color-submission{color:#a9adbb}:host>::ng-deep header h1.text-color-sendout,:host>::ng-deep header h2.text-color-sendout{color:#747884}:host>::ng-deep header h1.text-color-placement,:host>::ng-deep header h2.text-color-placement{color:#0b344f}:host>::ng-deep header h1.text-color-note,:host>::ng-deep header h2.text-color-note{color:#747884}:host>::ng-deep header h1.text-color-contract,:host>::ng-deep header h2.text-color-contract{color:#454ea0}:host>::ng-deep header h1.text-color-task,:host>::ng-deep header h2.text-color-task{color:#4f5361}:host>::ng-deep header h1.text-color-jobCode,:host>::ng-deep header h2.text-color-jobCode{color:#696d79}:host>::ng-deep header h1.text-color-earnCode,:host>::ng-deep header h2.text-color-earnCode{color:#696d79}:host>::ng-deep header h1.text-color-invoiceStatement,:host>::ng-deep header h2.text-color-invoiceStatement{color:#696d79}:host>::ng-deep header h1.text-color-billableCharge,:host>::ng-deep header h2.text-color-billableCharge{color:#696d79}:host>::ng-deep header h1.text-color-payableCharge,:host>::ng-deep header h2.text-color-payableCharge{color:#696d79}:host>::ng-deep header h1.text-color-user,:host>::ng-deep header h2.text-color-user{color:#696d79}:host>::ng-deep header h1.text-color-corporateUser,:host>::ng-deep header h2.text-color-corporateUser{color:#696d79}:host>::ng-deep header h1.text-color-distributionList,:host>::ng-deep header h2.text-color-distributionList{color:#696d79}:host>::ng-deep header h1.text-color-credential,:host>::ng-deep header h2.text-color-credential{color:#696d79}:host>::ng-deep header h1.text-color-person,:host>::ng-deep header h2.text-color-person{color:#696d79}:host>::ng-deep header h1.margin-before,:host>::ng-deep header h2.margin-before{margin-top:.4rem}:host>::ng-deep header h1.margin-after,:host>::ng-deep header h2.margin-after{margin-bottom:.8rem}:host>::ng-deep header h1.text-length-small,:host>::ng-deep header h2.text-length-small{max-width:40ch}:host>::ng-deep header h1.text-length-medium,:host>::ng-deep header h2.text-length-medium{max-width:55ch}:host>::ng-deep header h1.text-length-large,:host>::ng-deep header h2.text-length-large{max-width:70ch}:host>::ng-deep header h1.text-weight-hairline,:host>::ng-deep header h2.text-weight-hairline{font-weight:100}:host>::ng-deep header h1.text-weight-thin,:host>::ng-deep header h2.text-weight-thin{font-weight:200}:host>::ng-deep header h1.text-weight-light,:host>::ng-deep header h2.text-weight-light{font-weight:300}:host>::ng-deep header h1.text-weight-normal,:host>::ng-deep header h2.text-weight-normal{font-weight:400}:host>::ng-deep header h1.text-weight-medium,:host>::ng-deep header h2.text-weight-medium{font-weight:500}:host>::ng-deep header h1.text-weight-semibold,:host>::ng-deep header h2.text-weight-semibold{font-weight:600}:host>::ng-deep header h1.text-weight-bold,:host>::ng-deep header h2.text-weight-bold{font-weight:700}:host>::ng-deep header h1.text-weight-extrabold,:host>::ng-deep header h2.text-weight-extrabold{font-weight:800}:host>::ng-deep header h1.text-weight-heavy,:host>::ng-deep header h2.text-weight-heavy{font-weight:900}:host>::ng-deep header h1.text-weight-lighter,:host>::ng-deep header h2.text-weight-lighter{font-weight:lighter}:host>::ng-deep header h1.text-weight-bolder,:host>::ng-deep header h2.text-weight-bolder{font-weight:bolder}:host>::ng-deep section{padding:1rem 1.5rem;max-height:500px;overflow:auto}:host ::ng-deep .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem;gap:1rem}:host ::ng-deep .novo-modal-footer ::ng-deep button{min-width:10rem}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal', template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, host: {
                        class: 'novo-modal',
                    }, standalone: false, styles: [":host{display:block;background-color:var(--background-bright);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:1.5rem;top:1.5rem}:host>::ng-deep header{border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}:host>::ng-deep header h1,:host>::ng-deep header h2{font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>::ng-deep header h1.text-capitalize,:host>::ng-deep header h2.text-capitalize{text-transform:capitalize}:host>::ng-deep header h1.text-uppercase,:host>::ng-deep header h2.text-uppercase{text-transform:uppercase}:host>::ng-deep header h1.text-nowrap,:host>::ng-deep header h2.text-nowrap{white-space:nowrap}:host>::ng-deep header h1.text-ellipsis,:host>::ng-deep header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>::ng-deep header h1.text-size-default,:host>::ng-deep header h2.text-size-default{font-size:inherit}:host>::ng-deep header h1.text-size-body,:host>::ng-deep header h2.text-size-body{font-size:1.3rem}:host>::ng-deep header h1.text-size-xs,:host>::ng-deep header h2.text-size-xs{font-size:1rem}:host>::ng-deep header h1.text-size-sm,:host>::ng-deep header h2.text-size-sm{font-size:1.2rem}:host>::ng-deep header h1.text-size-md,:host>::ng-deep header h2.text-size-md{font-size:1.3rem}:host>::ng-deep header h1.text-size-lg,:host>::ng-deep header h2.text-size-lg{font-size:1.6rem}:host>::ng-deep header h1.text-size-xl,:host>::ng-deep header h2.text-size-xl{font-size:2rem}:host>::ng-deep header h1.text-size-2xl,:host>::ng-deep header h2.text-size-2xl{font-size:2.6rem}:host>::ng-deep header h1.text-size-3xl,:host>::ng-deep header h2.text-size-3xl{font-size:3.2rem}:host>::ng-deep header h1.text-size-smaller,:host>::ng-deep header h2.text-size-smaller{font-size:.8em}:host>::ng-deep header h1.text-size-larger,:host>::ng-deep header h2.text-size-larger{font-size:1.2em}:host>::ng-deep header h1.text-color-black,:host>::ng-deep header h2.text-color-black{color:#000}:host>::ng-deep header h1.text-color-white,:host>::ng-deep header h2.text-color-white{color:#fff}:host>::ng-deep header h1.text-color-gray,:host>::ng-deep header h2.text-color-gray{color:#9e9e9e}:host>::ng-deep header h1.text-color-grey,:host>::ng-deep header h2.text-color-grey{color:#9e9e9e}:host>::ng-deep header h1.text-color-offWhite,:host>::ng-deep header h2.text-color-offWhite{color:#f7f7f7}:host>::ng-deep header h1.text-color-bright,:host>::ng-deep header h2.text-color-bright{color:#f7f7f7}:host>::ng-deep header h1.text-color-light,:host>::ng-deep header h2.text-color-light{color:#dbdbdb}:host>::ng-deep header h1.text-color-neutral,:host>::ng-deep header h2.text-color-neutral{color:#4f5361}:host>::ng-deep header h1.text-color-dark,:host>::ng-deep header h2.text-color-dark{color:#3d464d}:host>::ng-deep header h1.text-color-orange,:host>::ng-deep header h2.text-color-orange{color:#ff6900}:host>::ng-deep header h1.text-color-navigation,:host>::ng-deep header h2.text-color-navigation{color:#202945}:host>::ng-deep header h1.text-color-skyBlue,:host>::ng-deep header h2.text-color-skyBlue{color:#009bdf}:host>::ng-deep header h1.text-color-steel,:host>::ng-deep header h2.text-color-steel{color:#5b6770}:host>::ng-deep header h1.text-color-metal,:host>::ng-deep header h2.text-color-metal{color:#637893}:host>::ng-deep header h1.text-color-sand,:host>::ng-deep header h2.text-color-sand{color:#f4f4f4}:host>::ng-deep header h1.text-color-silver,:host>::ng-deep header h2.text-color-silver{color:#e2e2e2}:host>::ng-deep header h1.text-color-stone,:host>::ng-deep header h2.text-color-stone{color:#bebebe}:host>::ng-deep header h1.text-color-ash,:host>::ng-deep header h2.text-color-ash{color:#a0a0a0}:host>::ng-deep header h1.text-color-slate,:host>::ng-deep header h2.text-color-slate{color:#707070}:host>::ng-deep header h1.text-color-onyx,:host>::ng-deep header h2.text-color-onyx{color:#526980}:host>::ng-deep header h1.text-color-charcoal,:host>::ng-deep header h2.text-color-charcoal{color:#282828}:host>::ng-deep header h1.text-color-moonlight,:host>::ng-deep header h2.text-color-moonlight{color:#1a242f}:host>::ng-deep header h1.text-color-midnight,:host>::ng-deep header h2.text-color-midnight{color:#202945}:host>::ng-deep header h1.text-color-darkness,:host>::ng-deep header h2.text-color-darkness{color:#161f27}:host>::ng-deep header h1.text-color-navy,:host>::ng-deep header h2.text-color-navy{color:#0d2d42}:host>::ng-deep header h1.text-color-aqua,:host>::ng-deep header h2.text-color-aqua{color:#3bafda}:host>::ng-deep header h1.text-color-ocean,:host>::ng-deep header h2.text-color-ocean{color:#4a89dc}:host>::ng-deep header h1.text-color-mint,:host>::ng-deep header h2.text-color-mint{color:#37bc9b}:host>::ng-deep header h1.text-color-grass,:host>::ng-deep header h2.text-color-grass{color:#8cc152}:host>::ng-deep header h1.text-color-sunflower,:host>::ng-deep header h2.text-color-sunflower{color:#f6b042}:host>::ng-deep header h1.text-color-bittersweet,:host>::ng-deep header h2.text-color-bittersweet{color:#eb6845}:host>::ng-deep header h1.text-color-grapefruit,:host>::ng-deep header h2.text-color-grapefruit{color:#da4453}:host>::ng-deep header h1.text-color-carnation,:host>::ng-deep header h2.text-color-carnation{color:#d770ad}:host>::ng-deep header h1.text-color-lavender,:host>::ng-deep header h2.text-color-lavender{color:#967adc}:host>::ng-deep header h1.text-color-mountain,:host>::ng-deep header h2.text-color-mountain{color:#9678b6}:host>::ng-deep header h1.text-color-info,:host>::ng-deep header h2.text-color-info{color:#4a89dc}:host>::ng-deep header h1.text-color-positive,:host>::ng-deep header h2.text-color-positive{color:#4a89dc}:host>::ng-deep header h1.text-color-success,:host>::ng-deep header h2.text-color-success{color:#8cc152}:host>::ng-deep header h1.text-color-negative,:host>::ng-deep header h2.text-color-negative{color:#da4453}:host>::ng-deep header h1.text-color-danger,:host>::ng-deep header h2.text-color-danger{color:#da4453}:host>::ng-deep header h1.text-color-error,:host>::ng-deep header h2.text-color-error{color:#da4453}:host>::ng-deep header h1.text-color-warning,:host>::ng-deep header h2.text-color-warning{color:#f6b042}:host>::ng-deep header h1.text-color-empty,:host>::ng-deep header h2.text-color-empty{color:#cccdcc}:host>::ng-deep header h1.text-color-disabled,:host>::ng-deep header h2.text-color-disabled{color:#bebebe}:host>::ng-deep header h1.text-color-background,:host>::ng-deep header h2.text-color-background{color:#f7f7f7}:host>::ng-deep header h1.text-color-backgroundDark,:host>::ng-deep header h2.text-color-backgroundDark{color:#e2e2e2}:host>::ng-deep header h1.text-color-presentation,:host>::ng-deep header h2.text-color-presentation{color:#5b6770}:host>::ng-deep header h1.text-color-bullhorn,:host>::ng-deep header h2.text-color-bullhorn{color:#ff6900}:host>::ng-deep header h1.text-color-pulse,:host>::ng-deep header h2.text-color-pulse{color:#3bafda}:host>::ng-deep header h1.text-color-company,:host>::ng-deep header h2.text-color-company{color:#39d}:host>::ng-deep header h1.text-color-candidate,:host>::ng-deep header h2.text-color-candidate{color:#4b7}:host>::ng-deep header h1.text-color-lead,:host>::ng-deep header h2.text-color-lead{color:#a69}:host>::ng-deep header h1.text-color-contact,:host>::ng-deep header h2.text-color-contact{color:#fa4}:host>::ng-deep header h1.text-color-clientcontact,:host>::ng-deep header h2.text-color-clientcontact{color:#fa4}:host>::ng-deep header h1.text-color-opportunity,:host>::ng-deep header h2.text-color-opportunity{color:#625}:host>::ng-deep header h1.text-color-job,:host>::ng-deep header h2.text-color-job{color:#b56}:host>::ng-deep header h1.text-color-joborder,:host>::ng-deep header h2.text-color-joborder{color:#b56}:host>::ng-deep header h1.text-color-submission,:host>::ng-deep header h2.text-color-submission{color:#a9adbb}:host>::ng-deep header h1.text-color-sendout,:host>::ng-deep header h2.text-color-sendout{color:#747884}:host>::ng-deep header h1.text-color-placement,:host>::ng-deep header h2.text-color-placement{color:#0b344f}:host>::ng-deep header h1.text-color-note,:host>::ng-deep header h2.text-color-note{color:#747884}:host>::ng-deep header h1.text-color-contract,:host>::ng-deep header h2.text-color-contract{color:#454ea0}:host>::ng-deep header h1.text-color-task,:host>::ng-deep header h2.text-color-task{color:#4f5361}:host>::ng-deep header h1.text-color-jobCode,:host>::ng-deep header h2.text-color-jobCode{color:#696d79}:host>::ng-deep header h1.text-color-earnCode,:host>::ng-deep header h2.text-color-earnCode{color:#696d79}:host>::ng-deep header h1.text-color-invoiceStatement,:host>::ng-deep header h2.text-color-invoiceStatement{color:#696d79}:host>::ng-deep header h1.text-color-billableCharge,:host>::ng-deep header h2.text-color-billableCharge{color:#696d79}:host>::ng-deep header h1.text-color-payableCharge,:host>::ng-deep header h2.text-color-payableCharge{color:#696d79}:host>::ng-deep header h1.text-color-user,:host>::ng-deep header h2.text-color-user{color:#696d79}:host>::ng-deep header h1.text-color-corporateUser,:host>::ng-deep header h2.text-color-corporateUser{color:#696d79}:host>::ng-deep header h1.text-color-distributionList,:host>::ng-deep header h2.text-color-distributionList{color:#696d79}:host>::ng-deep header h1.text-color-credential,:host>::ng-deep header h2.text-color-credential{color:#696d79}:host>::ng-deep header h1.text-color-person,:host>::ng-deep header h2.text-color-person{color:#696d79}:host>::ng-deep header h1.margin-before,:host>::ng-deep header h2.margin-before{margin-top:.4rem}:host>::ng-deep header h1.margin-after,:host>::ng-deep header h2.margin-after{margin-bottom:.8rem}:host>::ng-deep header h1.text-length-small,:host>::ng-deep header h2.text-length-small{max-width:40ch}:host>::ng-deep header h1.text-length-medium,:host>::ng-deep header h2.text-length-medium{max-width:55ch}:host>::ng-deep header h1.text-length-large,:host>::ng-deep header h2.text-length-large{max-width:70ch}:host>::ng-deep header h1.text-weight-hairline,:host>::ng-deep header h2.text-weight-hairline{font-weight:100}:host>::ng-deep header h1.text-weight-thin,:host>::ng-deep header h2.text-weight-thin{font-weight:200}:host>::ng-deep header h1.text-weight-light,:host>::ng-deep header h2.text-weight-light{font-weight:300}:host>::ng-deep header h1.text-weight-normal,:host>::ng-deep header h2.text-weight-normal{font-weight:400}:host>::ng-deep header h1.text-weight-medium,:host>::ng-deep header h2.text-weight-medium{font-weight:500}:host>::ng-deep header h1.text-weight-semibold,:host>::ng-deep header h2.text-weight-semibold{font-weight:600}:host>::ng-deep header h1.text-weight-bold,:host>::ng-deep header h2.text-weight-bold{font-weight:700}:host>::ng-deep header h1.text-weight-extrabold,:host>::ng-deep header h2.text-weight-extrabold{font-weight:800}:host>::ng-deep header h1.text-weight-heavy,:host>::ng-deep header h2.text-weight-heavy{font-weight:900}:host>::ng-deep header h1.text-weight-lighter,:host>::ng-deep header h2.text-weight-lighter{font-weight:lighter}:host>::ng-deep header h1.text-weight-bolder,:host>::ng-deep header h2.text-weight-bolder{font-weight:bolder}:host>::ng-deep section{padding:1rem 1.5rem;max-height:500px;overflow:auto}:host ::ng-deep .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem;gap:1rem}:host ::ng-deep .novo-modal-footer ::ng-deep button{min-width:10rem}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalNotificationElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoModalNotificationElement, isStandalone: false, selector: "novo-notification", inputs: { type: "type", icon: "icon" }, outputs: { cancel: "cancel" }, host: { classAttribute: "novo-notification" }, ngImport: i0, template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button,novo-dropdown"></ng-content></footer>
  `, isInline: true, styles: [":host{text-align:center;display:block;background-color:var(--background-bright);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:1.5rem;top:1.5rem}:host ::ng-deep .novo-notification-body{display:flex;flex-direction:column;padding:0 1.5rem;margin:1.25rem 0 55px}:host ::ng-deep .novo-notification-body>img{width:100%}:host ::ng-deep .novo-notification-body h1{font-size:2.6rem;margin:10px auto 0}:host ::ng-deep .novo-notification-body h2{font-size:2rem;color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h3{font-size:1.6rem;margin:0 auto}:host ::ng-deep .novo-notification-body h4{font-size:1.6rem;color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h5{font-size:1.3rem;margin:0 auto}:host ::ng-deep .novo-notification-body h6{font-size:1.3rem;margin:0 auto}:host ::ng-deep .novo-notification-body i.indicator{color:var(--text-muted);border:1px solid var(--text-muted);font-size:2.6rem;border-radius:50%;padding:1rem;margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:#8cc152;border-color:#8cc152}:host[type=warning] .novo-notification-body i.indicator{color:#f6b042;border-color:#f6b042}:host[type=error] .novo-notification-body i.indicator{color:#da4453;border-color:#da4453}:host ::ng-deep .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem;gap:1rem}:host ::ng-deep .novo-notification-footer button{min-width:10rem}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalNotificationElement, decorators: [{
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
                    }, standalone: false, styles: [":host{text-align:center;display:block;background-color:var(--background-bright);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:1.5rem;top:1.5rem}:host ::ng-deep .novo-notification-body{display:flex;flex-direction:column;padding:0 1.5rem;margin:1.25rem 0 55px}:host ::ng-deep .novo-notification-body>img{width:100%}:host ::ng-deep .novo-notification-body h1{font-size:2.6rem;margin:10px auto 0}:host ::ng-deep .novo-notification-body h2{font-size:2rem;color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h3{font-size:1.6rem;margin:0 auto}:host ::ng-deep .novo-notification-body h4{font-size:1.6rem;color:var(--text-muted);margin:0 auto;padding:0}:host ::ng-deep .novo-notification-body h5{font-size:1.3rem;margin:0 auto}:host ::ng-deep .novo-notification-body h6{font-size:1.3rem;margin:0 auto}:host ::ng-deep .novo-notification-body i.indicator{color:var(--text-muted);border:1px solid var(--text-muted);font-size:2.6rem;border-radius:50%;padding:1rem;margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:#8cc152;border-color:#8cc152}:host[type=warning] .novo-notification-body i.indicator{color:#f6b042;border-color:#f6b042}:host[type=error] .novo-notification-body i.indicator{color:#da4453;border-color:#da4453}:host ::ng-deep .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem;gap:1rem}:host ::ng-deep .novo-notification-footer button{min-width:10rem}\n"] }]
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
        console.warn('parentViewContainer is deprecated');
        this._parentViewContainer = view;
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
        const injectionTokens = new WeakMap();
        injectionTokens.set(NovoModalRef, modalRef);
        // Support backwards compatability
        injectionTokens.set(NovoModalParams, modalRef.params);
        return new PortalInjector(this.injector, injectionTokens);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.Overlay }] });

// NG2
class NovoModalModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoModalModule, declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule], exports: [NovoModalElement, NovoModalNotificationElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalModule, providers: [NovoModalService], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoModalModule, decorators: [{
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
