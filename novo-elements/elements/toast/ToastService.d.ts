import { ComponentUtils } from 'novo-elements/services';
import * as i0 from "@angular/core";
export type ToastThemes = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'positive' | string;
export type ToastIcons = 'bell' | 'check' | 'info' | 'warning' | 'remove' | 'caution' | 'times' | 'coffee' | 'danger' | string;
export type ToastPositions = 'fixedTop' | 'fixedBottom' | 'growlTopRight' | 'growlTopLeft' | 'growlBottomRight' | 'growlBottomLeft';
export interface ToastOptions {
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
export declare class NovoToastService {
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
