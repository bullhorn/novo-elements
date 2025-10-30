import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injector, ViewContainerRef } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NovoModalService {
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
