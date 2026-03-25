import * as i2 from '@angular/cdk/overlay';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import * as _angular_animations from '@angular/animations';
import { AnimationEvent } from '@angular/animations';
import * as i3 from '@angular/cdk/portal';
import { Portal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Injector } from '@angular/core';

declare class AsideComponent {
    private injector;
    private asideRef;
    animationStateChanged: EventEmitter<AnimationEvent>;
    animationState: 'void' | 'enter' | 'leave';
    component: Portal<any>;
    constructor(injector: Injector, asideRef: NovoAsideRef);
    onAnimationStart(event: AnimationEvent): void;
    onAnimationDone(event: AnimationEvent): void;
    startExitAnimation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideComponent, "novo-aside", never, {}, { "animationStateChanged": "animationStateChanged"; }, never, never, false, never>;
}

declare class NovoAsideRef<T = any, R = any> {
    component: any;
    params: T;
    private overlayRef;
    constructor(component: any, params: T, overlayRef: OverlayRef);
    private _beforeClose;
    private _afterClosed;
    isClosed: boolean;
    componentInstance: AsideComponent;
    get onClosed(): Promise<R>;
    afterClosed(): Observable<R>;
    beforeClose(): Observable<R>;
    close(result?: R): void;
}

declare const slideInOut: _angular_animations.AnimationTriggerMetadata;

declare class NovoAsideModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAsideModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoAsideModule, [typeof AsideComponent], [typeof i2.OverlayModule, typeof i3.PortalModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoAsideModule>;
}

declare class NovoAsideService {
    private injector;
    private overlay;
    constructor(injector: Injector, overlay: Overlay);
    open<R = any>(component: any, params?: {}, config?: {}): NovoAsideRef<{}, R>;
    private createOverlay;
    private attachAsideContainer;
    private createInjector;
    private getOverlayConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAsideService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoAsideService>;
}

export { AsideComponent, NovoAsideModule, NovoAsideRef, NovoAsideService, slideInOut };
