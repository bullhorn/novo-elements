import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export interface NovoDragFinishEvent<T> {
    draggedItem: T;
    allItems: T[];
    event: DragEvent;
}
interface NovoDragItem<T> {
    item: T;
    element: HTMLElement;
}
export declare class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {
    private elementRef;
    private renderer;
    pickedUp?: HTMLElement;
    savedOrder?: NovoDragItem<T>[];
    $destroy: ReplaySubject<void>;
    items: T[];
    novoDragDropFinish: EventEmitter<NovoDragFinishEvent<T>>;
    private trackedItems;
    get itemsReordered(): T[];
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
    private findDraggableParentOfElement;
    private applyTempSort;
    private resetSorting;
    private shouldBlockDragStart;
    isElementWithinEventBounds(element: Element, event: DragEvent): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDragBoxParent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDragBoxParent<any>, "[novoDragDrop]", never, { "items": { "alias": "novoDragDrop"; "required": false; }; }, { "novoDragDropFinish": "novoDragDropFinish"; }, never, never, false, never>;
}
export {};
