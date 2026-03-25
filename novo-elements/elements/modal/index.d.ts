import * as _angular_animations from '@angular/animations';
import { AnimationEvent } from '@angular/animations';
import * as i4 from '@angular/cdk/portal';
import { Portal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Injector, OnInit, ViewContainerRef } from '@angular/core';
import * as i3 from '@angular/cdk/overlay';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import * as i5 from '@angular/common';
import * as i6 from 'novo-elements/elements/button';

/**
 * Params that can be passed to the Modal
 */
interface ModalParams {
    [propName: string]: any;
}
declare class NovoModalParams implements ModalParams {
}
declare class NovoModalRef<T = any, R = any> {
    component: any;
    params: T;
    private overlayRef;
    constructor(component: any, params: T, overlayRef: OverlayRef);
    private _beforeClose;
    private _afterClosed;
    componentInstance: NovoModalContainerComponent;
    isClosed: boolean;
    get onClosed(): Promise<R>;
    afterClosed(): Observable<R>;
    beforeClose(): Observable<R>;
    close(result?: R): void;
}

declare class NovoModalContainerComponent {
    private injector;
    private modalRef;
    animationStateChanged: EventEmitter<AnimationEvent>;
    animationState: 'void' | 'enter' | 'leave';
    component: Portal<any>;
    initTimestamp: number;
    id: string;
    constructor(injector: Injector, modalRef: NovoModalRef);
    onAnimationStart(event: AnimationEvent): void;
    onAnimationDone(event: AnimationEvent): void;
    startExitAnimation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalContainerComponent, "novo-modal-container", never, {}, { "animationStateChanged": "animationStateChanged"; }, never, never, false, never>;
}

declare const zoomInOut: _angular_animations.AnimationTriggerMetadata;

declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalElement, "novo-modal", never, {}, {}, never, ["header,novo-header,novo-card-header", "section,novo-card-content", "button,novo-button"], false, never>;
}
declare class NovoModalNotificationElement implements OnInit {
    private modalRef;
    type: string;
    icon: string;
    cancel: EventEmitter<any>;
    iconType: string;
    constructor(modalRef: NovoModalRef);
    close(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalNotificationElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalNotificationElement, "novo-notification", never, { "type": { "alias": "type"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, { "cancel": "cancel"; }, never, ["label,novo-label", "h1", "h2", "p", "button,novo-button,novo-dropdown"], false, never>;
}

declare class NovoModalModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoModalModule, [typeof NovoModalContainerComponent, typeof NovoModalElement, typeof NovoModalNotificationElement], [typeof i3.OverlayModule, typeof i4.PortalModule, typeof i5.CommonModule, typeof i6.NovoButtonModule], [typeof NovoModalElement, typeof NovoModalNotificationElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoModalModule>;
}

declare class NovoModalService {
    private injector;
    private overlay;
    _parentViewContainer: ViewContainerRef;
    overlayRef: OverlayRef;
    set parentViewContainer(view: ViewContainerRef);
    constructor(injector: Injector, overlay: Overlay);
    open<T extends Record<string, any>>(component: any, params?: Partial<T>): NovoModalRef<Partial<T>, any>;
    private createOverlay;
    private attachModalContainer;
    private createInjector;
    private getOverlayConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoModalService>;
}

export { NovoModalContainerComponent, NovoModalElement, NovoModalModule, NovoModalNotificationElement, NovoModalParams, NovoModalRef, NovoModalService, zoomInOut };
export type { ModalParams };
