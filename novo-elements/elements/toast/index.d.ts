import * as i0 from '@angular/core';
import { OnInit, OnChanges, EventEmitter, SimpleChanges, ViewContainerRef, DestroyRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { DeferredPromise } from 'novo-elements/utils';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/button';
import { ComponentUtils } from 'novo-elements/services';

declare class NovoToastElement implements OnInit, OnChanges {
    private sanitizer;
    appearance: 'growl' | 'banner';
    theme: string;
    icon: string;
    title: string;
    action: string;
    hasDialogue: boolean;
    link: string;
    isCloseable: boolean;
    set message(m: string);
    closed: EventEmitter<any>;
    _message: SafeHtml;
    show: boolean;
    animate: boolean;
    parent: any;
    launched: boolean;
    position: any;
    time: any;
    iconClass: string;
    alertTheme: string;
    embedded: any;
    onActionPromise: DeferredPromise;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    clickHandler(event: any): void;
    close(event: any): void;
    actionHandler(event: any): void;
    onAction(fn: () => void): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToastElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoToastElement, "novo-toast", never, { "appearance": { "alias": "appearance"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "title": { "alias": "title"; "required": false; }; "action": { "alias": "action"; "required": false; }; "hasDialogue": { "alias": "hasDialogue"; "required": false; }; "link": { "alias": "link"; "required": false; }; "isCloseable": { "alias": "isCloseable"; "required": false; }; "message": { "alias": "message"; "required": false; }; }, { "closed": "closed"; }, never, ["*"], false, never>;
}

declare class NovoToastModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToastModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoToastModule, [typeof NovoToastElement], [typeof i2.CommonModule, typeof i3.NovoButtonModule], [typeof NovoToastElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoToastModule>;
}

type ToastThemes = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'positive' | string;
type ToastIcons = 'bell' | 'check' | 'info' | 'warning' | 'remove' | 'caution' | 'times' | 'coffee' | 'danger' | string;
type ToastPositions = 'fixedTop' | 'fixedBottom' | 'growlTopRight' | 'growlTopLeft' | 'growlBottomRight' | 'growlBottomLeft';
interface ToastOptions {
    title?: string;
    message?: string;
    action?: string;
    icon?: ToastIcons;
    theme?: ToastThemes;
    accent?: ToastThemes;
    hideDelay?: number;
    position?: ToastPositions;
    isCloseable?: boolean;
    customClass?: string;
}
declare class NovoToastService {
    private componentUtils;
    _parentViewContainer: any;
    references: Array<any>;
    icons: {
        default: string;
        success: string;
        info: string;
        warning: string;
        danger: string;
    };
    defaults: {
        hideDelay: number;
        position: string;
        theme: string;
    };
    constructor(componentUtils: ComponentUtils);
    set parentViewContainer(view: any);
    ownViewContainer(view: ViewContainerRef, destroyRef: DestroyRef): void;
    alert(options: ToastOptions, toastElement?: any): Promise<any>;
    isVisible(toast: any): any;
    hide(toast: any): void;
    handleAlert(toast: any, options: any): void;
    setToastOnSession(toast: any, opts: any): void;
    show(toast: any): void;
    toastTimer(toast: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoToastService>;
}

export { NovoToastElement, NovoToastModule, NovoToastService };
export type { ToastIcons, ToastOptions, ToastPositions, ToastThemes };
