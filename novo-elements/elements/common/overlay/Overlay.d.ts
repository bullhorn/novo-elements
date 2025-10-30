import { FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NovoOverlayTemplateComponent implements OnDestroy {
    protected overlay: Overlay;
    protected viewContainerRef: ViewContainerRef;
    protected zone: NgZone;
    protected changeDetectorRef: ChangeDetectorRef;
    protected document: any;
    id: string;
    template: TemplateRef<any>;
    panel: ElementRef;
    position: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    width: number;
    minWidth: number;
    height: number;
    closeOnSelect: boolean;
    hasBackdrop: boolean;
    select: EventEmitter<any>;
    opening: EventEmitter<any>;
    closing: EventEmitter<any>;
    backDropClicked: EventEmitter<any>;
    overlayRef: OverlayRef | null;
    portal: TemplatePortal<any>;
    protected closingActionsSubscription: Subscription;
    private _parent;
    private overlayContainer;
    private overlayContext;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, zone: NgZone, changeDetectorRef: ChangeDetectorRef, document: any);
    ngOnDestroy(): void;
    get panelOpen(): boolean;
    set parent(value: ElementRef);
    get parent(): ElementRef;
    openPanel(): void;
    closePanel(): void;
    onClosingAction(event: any): void;
    /**
     * A stream of actions that should close the panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<any>;
    /** Stream of clicks outside of the panel. */
    protected get outsideClickStream(): Observable<any>;
    private isInDocument;
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    protected subscribeToClosingActions(): Subscription;
    protected createOverlay(template: TemplateRef<any>): void;
    protected destroyOverlay(): void;
    protected getOverlayConfig(): OverlayConfig;
    /**
     * Supports the following position strategies:
     * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
     */
    protected getPosition(): FlexibleConnectedPositionStrategy;
    protected getScrollStrategy(): ScrollStrategy;
    protected checkSizes(): void;
    protected getConnectedElement(): ElementRef;
    private elementIsInContext;
    protected elementIsInNestedOverlay(el: any): boolean;
    protected getHostWidth(): number;
    isBlurRecipient(event: FocusEvent): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOverlayTemplateComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOverlayTemplateComponent, "novo-overlay-template", never, { "position": { "alias": "position"; "required": false; }; "scrollStrategy": { "alias": "scrollStrategy"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "height": { "alias": "height"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "parent": { "alias": "parent"; "required": false; }; }, { "select": "select"; "opening": "opening"; "closing": "closing"; "backDropClicked": "backDropClicked"; }, never, ["*"], false, never>;
}
