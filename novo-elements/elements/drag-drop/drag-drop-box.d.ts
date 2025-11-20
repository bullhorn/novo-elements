import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export interface NovoDragFinishEvent<T> {
    draggedItem: T;
    allItems: T[];
    event: DragEvent;
}
interface NovoDragItem<T> {
    item: T;
    element: HTMLElement;
    removeListeners: () => void;
}
export declare class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {
    private elementRef;
    private renderer;
    pickedUp?: HTMLElement;
    previewReplacing?: HTMLElement;
    savedOrder?: NovoDragItem<T>[];
    overlayContainer: OverlayContainer;
    items: T[];
    /**
     * A function to specify whether a given item in the child list is draggable.
     * (Note that altering this after setup is not yet supported)
     */
    dragFilter?: (item: T) => boolean;
    /**
     * Prevents behavior that eases the act of dragging an object to the edge of a scrollable container.
     */
    disableScroll?: boolean;
    novoDragDropFinish: EventEmitter<NovoDragFinishEvent<T>>;
    private trackedItems;
    private scrollContainer;
    private scrollContainerRect;
    private scrollX;
    private scrollY;
    get itemsReordered(): T[];
    get dragging(): boolean;
    mutationObserver: MutationObserver;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    get element(): HTMLElement;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private registerChildren;
    private registerChild;
    mutationDetected(mutations: MutationRecord[]): void;
    /** Per-item listeners */
    onDragStart(event: DragEvent): void;
    onDragStop(event: DragEvent): void;
    onDragFinish(event: DragEvent): void;
    /** - end per-item listeners */
    onDragOver(event: DragEvent): void;
    private inOverlay;
    private isValidTarget;
    private findDraggableParentOfElement;
    private applyTempSort;
    private resetSorting;
    private shouldBlockDragStart;
    private processScrollDuringMove;
    isElementWithinEventBounds(element: Element, event: DragEvent): boolean;
    private findScrollableParent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDragBoxParent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDragBoxParent<any>, "[novoDragDrop]", never, { "items": { "alias": "novoDragDrop"; "required": false; }; "dragFilter": { "alias": "novoDragDropFilter"; "required": false; }; "disableScroll": { "alias": "novoDragDropDisableScroll"; "required": false; }; }, { "novoDragDropFinish": "novoDragDropFinish"; }, never, never, false, never>;
}
export {};
