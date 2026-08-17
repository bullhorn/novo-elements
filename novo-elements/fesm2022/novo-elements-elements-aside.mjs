import * as i0 from '@angular/core';
import { signal, EventEmitter, Output, Component, Injector, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i3 from '@angular/cdk/portal';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import * as i2 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NovoCommonModule } from 'novo-elements/elements/common';

class NovoAsideRef {
    constructor(component, params, overlayRef) {
        this.component = component;
        this.params = params;
        this.overlayRef = overlayRef;
        this._beforeClose = new Subject();
        this._afterClosed = new Subject();
        this.isClosed = false;
        this.draggable = signal(false, ...(ngDevMode ? [{ debugName: "draggable" }] : []));
        this.disableDrag = signal(true, ...(ngDevMode ? [{ debugName: "disableDrag" }] : []));
        this.onDragStart = new EventEmitter();
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

const slideInOut = trigger('slideInOut', [
    state('void', style({ transform: 'translateX(100%)' })),
    state('enter', style({ transform: 'none' })),
    state('leave', style({ transform: 'translateX(100%)' })),
    transition('* => *', animate('800ms cubic-bezier(0.2, 1, 0.3, 1)')),
]);

class AsideComponent {
    constructor(injector, asideRef) {
        this.injector = injector;
        this.asideRef = asideRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.draggable = signal(false, ...(ngDevMode ? [{ debugName: "draggable" }] : []));
        this.disableDrag = signal(true, ...(ngDevMode ? [{ debugName: "disableDrag" }] : []));
        this.draggable = asideRef.draggable;
        this.disableDrag = asideRef.disableDrag;
        this.component = new ComponentPortal(asideRef.component, null, injector);
    }
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        if (this.draggable()) {
            this.onAnimationDone({ phaseName: 'done', toState: 'leave' });
        }
        this.animationState = 'leave';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: AsideComponent, deps: [{ token: i0.Injector }, { token: NovoAsideRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.19", type: AsideComponent, isStandalone: false, selector: "novo-aside", outputs: { animationStateChanged: "animationStateChanged" }, ngImport: i0, template: "@if(!draggable()) {\n  <div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n    (@slideInOut.done)=\"onAnimationDone($event)\">\n    <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n  </div>\n} @else {\n  <div class=\"aside-panel draggable\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n    (@slideInOut.done)=\"onAnimationDone($event)\" cdkDrag [cdkDragDisabled]=\"disableDrag()\" (cdkDragStarted)=\"asideRef?.onDragStart.emit()\" cdkDragBoundary=\".cdk-overlay-container\">\n    <div class=\"drag-handle\">\n      <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n    </div>\n  </div>\n}\n", styles: [":host .aside-panel{background-color:var(--background-bright, #fff);box-shadow:-3px 3px 15px 4px #3d464d33;height:100vh;width:50%;min-width:min-content;max-width:560px;position:absolute;top:0;right:0;padding:0;display:flex;justify-content:stretch;align-items:stretch}:host .aside-panel.draggable{position:absolute;max-width:none;height:auto;width:540px;left:calc(100vw - 560px);overflow:hidden;resize:both}:host .aside-panel.draggable .drag-handle{width:100%;height:calc(100% - 1rem)}\n"], dependencies: [{ kind: "directive", type: i2.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer", "cdkDragScale"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [slideInOut] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: AsideComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-aside', animations: [slideInOut], standalone: false, template: "@if(!draggable()) {\n  <div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n    (@slideInOut.done)=\"onAnimationDone($event)\">\n    <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n  </div>\n} @else {\n  <div class=\"aside-panel draggable\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n    (@slideInOut.done)=\"onAnimationDone($event)\" cdkDrag [cdkDragDisabled]=\"disableDrag()\" (cdkDragStarted)=\"asideRef?.onDragStart.emit()\" cdkDragBoundary=\".cdk-overlay-container\">\n    <div class=\"drag-handle\">\n      <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n    </div>\n  </div>\n}\n", styles: [":host .aside-panel{background-color:var(--background-bright, #fff);box-shadow:-3px 3px 15px 4px #3d464d33;height:100vh;width:50%;min-width:min-content;max-width:560px;position:absolute;top:0;right:0;padding:0;display:flex;justify-content:stretch;align-items:stretch}:host .aside-panel.draggable{position:absolute;max-width:none;height:auto;width:540px;left:calc(100vw - 560px);overflow:hidden;resize:both}:host .aside-panel.draggable .drag-handle{width:100%;height:calc(100% - 1rem)}\n"] }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: NovoAsideRef }], propDecorators: { animationStateChanged: [{
                type: Output
            }] } });

const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'aside-overlay-backdrop',
    panelClass: 'aside-overlay-panel',
};
class NovoAsideService {
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open(component, params = {}, config = {}, draggable = false) {
        // Override default configuration
        const asideConfig = this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config });
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(asideConfig);
        // Instantiate remote control
        const asideRef = new NovoAsideRef(component, params, overlayRef);
        asideRef.draggable.set(draggable);
        const overlayComponent = this.attachAsideContainer(AsideComponent, overlayRef, asideConfig, asideRef);
        // Pass the instance of the overlay component to the remote control
        asideRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(() => asideRef.close());
        return asideRef;
    }
    createOverlay(config) {
        return this.overlay.create(config);
    }
    attachAsideContainer(component, overlayRef, config, asideRef) {
        const injector = this.createInjector(config, asideRef);
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createInjector(config, asideRef) {
        return Injector.create({
            parent: this.injector,
            providers: [{ provide: NovoAsideRef, useValue: asideRef }],
        });
    }
    getOverlayConfig(config) {
        const scrollStrategy = config.hasBackdrop ? this.overlay.scrollStrategies.block() : this.overlay.scrollStrategies.noop();
        return {
            scrollStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.Overlay }] });

class NovoAsideModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideModule, declarations: [AsideComponent], imports: [CommonModule, DragDropModule, NovoCommonModule, OverlayModule, PortalModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideModule, providers: [NovoAsideService], imports: [CommonModule, DragDropModule, NovoCommonModule, OverlayModule, PortalModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAsideModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DragDropModule, NovoCommonModule, OverlayModule, PortalModule],
                    declarations: [AsideComponent],
                    providers: [NovoAsideService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AsideComponent, NovoAsideModule, NovoAsideRef, NovoAsideService, slideInOut };
//# sourceMappingURL=novo-elements-elements-aside.mjs.map
