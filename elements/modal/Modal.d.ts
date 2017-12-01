import { ViewContainerRef, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
/**
 * Params that can be passed to the Modal
 */
export interface ModalParams {
    [propName: string]: any;
}
export declare class NovoModalParams implements ModalParams {
}
/**
 * Reference to an opened dialog.
 */
export declare class NovoModalRef {
    component: any;
    contentRef: any;
    containerRef: any;
    isClosed: boolean;
    _onClosed: any;
    readonly onClosed: any;
    open(): void;
    close(result?: any): void;
}
export declare class NovoModalContainerElement implements AfterViewInit {
    private modalRef;
    private componentUtils;
    container: ViewContainerRef;
    constructor(modalRef: NovoModalRef, componentUtils: ComponentUtils);
    ngAfterViewInit(): void;
}
export declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
}
export declare class NovoModalNotificationElement implements OnInit {
    private modalRef;
    type: string;
    icon: string;
    cancel: EventEmitter<any>;
    iconType: string;
    constructor(modalRef: NovoModalRef);
    close(): void;
    ngOnInit(): void;
}
