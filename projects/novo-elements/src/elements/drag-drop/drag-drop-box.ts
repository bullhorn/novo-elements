import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface NovoDragFinishEvent<T> {
    draggedItem: T;
    allItems: T[];
    event: DragEvent;
}

interface NovoDragItem<T> {
    item: T;
    element: HTMLElement;
}

@Directive({
    selector: '[novoDragDrop]'
})
export class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {

    pickedUp?: HTMLElement;
    savedOrder?: NovoDragItem<T>[];

    $destroy = new ReplaySubject<void>(1);

    @Input('novoDragDrop') items: T[];

    @Output() novoDragDropFinish = new EventEmitter<NovoDragFinishEvent<T>>();

    private trackedItems: NovoDragItem<T>[];

    get itemsReordered(): T[] {
        return this.trackedItems.map(item => item.item);
    }

    mutationObserver = new MutationObserver(this.mutationDetected.bind(this));

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }
    
    ngAfterViewInit(): void {
        this.registerChildren();
        this.mutationObserver.observe(this.element, { childList: true });
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

    private registerChildren(): void {
        if (this.items && this.items.length !== this.element.children.length) {
            throw new Error(`Could not match item list to children list - drag box contains ${this.items.length} items, but has ${this.element.children.length} elements`);
        }
        this.trackedItems = [];
        for (let i = 0; i < this.element.children.length; i++) {
            this.registerChild(this.element.children[i] as HTMLElement, i);
        }
        
    }

    private registerChild(element: HTMLElement, index: number) {
        const listeners = [
            this.renderer.listen(element, 'dragstart', this.onDragStart.bind(this)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
            this.renderer.listen(element, 'dragend', this.onDragStop.bind(this))
        ];
        element.draggable = true;
        this.$destroy.subscribe(() => listeners.forEach(cb => cb()));
        this.trackedItems.push({
            item: this.items[index],
            element
        });
    }

    mutationDetected(mutations: MutationRecord[]) {
        if (this.pickedUp) {
            return;
        }
        const addedNodes = new Set<HTMLElement>();
        const removedNodes = new Set<HTMLElement>();
        for (let mutation of mutations) {
            mutation.addedNodes.forEach((a: HTMLElement) => {
                if (!removedNodes.delete(a)) {
                    addedNodes.add(a);
                }
            });
            mutation.removedNodes.forEach((a: HTMLElement) => {
                if (!addedNodes.delete(a)) {
                    removedNodes.add(a);
                }
            });
        }
        addedNodes.forEach(node => {
            const idx = Array.prototype.indexOf.call(this.element.children, node);
            this.registerChild(node, idx);
        });
        if (removedNodes.size > 0) {
            this.trackedItems = this.trackedItems.filter(
                item => !removedNodes.has(item.element));
        }
    }

    /** Per-item listeners */

    onDragStart(event: DragEvent) {
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        this.pickedUp = event.target as HTMLElement;
        event.stopPropagation();
        this.savedOrder = [...this.trackedItems];
    }

    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event: DragEvent): void {
        this.pickedUp = null;
        this.savedOrder = null;
        event.stopPropagation();
    }

    onDragFinish(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.element.contains(event.currentTarget as HTMLElement)) {
            // this is for a different drag region - ignore
            return;
        }
        const draggedItem = this.trackedItems.find(item => item.element === this.pickedUp)?.item;
        this.trackedItems = Array.prototype.map.call(this.element.children, child => {
            const item = this.trackedItems.find(item => item.element === child);
            if (!item) {
                throw new Error('DragDrop: Error - could not reassociate an item post-drag');
            }
            return item;
        });
        this.novoDragDropFinish.emit({
            draggedItem,
            allItems: this.itemsReordered,
            event
        });
        
    }
    
    /** - end per-item listeners */

    @HostListener('window:dragover', ['$event'])
    onDragOver(event: DragEvent): void {
        if (!this.pickedUp) {
            return;
        }
        let target = event.target as HTMLElement;
        if (!this.element.contains(target)) {
            target = null;
        }
        // In some cases (maybe browser-specific) we may have this event reported from a sub-element of a drag destination.
        // We need to go upwards in the tree to find the actual target
        if (target && !target.draggable) {
            target = this.findDraggableParentOfElement(target);
        }
        // Check if this drag event is within this drag box
        if (target && target.parentElement === this.element) {
            event.stopPropagation();
            event.preventDefault();
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
            this.applyTempSort(this.pickedUp, target);
        } else {
            // if not within this drag box, then move this item back to its original position and show a diabled drag effect
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'none';
            }
            this.resetSorting();
        }
    }

    private findDraggableParentOfElement(target: HTMLElement): HTMLElement | null {
        const parentElement = target.parentElement;
        if (!parentElement) {
            return null;
        } else if (parentElement.draggable) {
            return parentElement;
        } else {
            return this.findDraggableParentOfElement(parentElement);
        }
    }

    private applyTempSort(showXElement: HTMLElement, inPlaceOfY: HTMLElement) {
        if (showXElement === inPlaceOfY) {
            // same element - ignoring
            return;
        }
        // Apply the "preview" effect from dragging one item to another
        const aIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, showXElement);
        const bIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, inPlaceOfY);
        const diff = bIndex - aIndex;
        let insertPosition: InsertPosition;
        if (diff > 0) {
            insertPosition = 'afterend';
        } else if (diff < 0) {
            insertPosition = 'beforebegin';
        } else {
            throw new Error('DragDrop: Two elements are in the same position');
        }
        inPlaceOfY.insertAdjacentElement(insertPosition, showXElement);
    }

    private resetSorting(): void {
        // return to the order of elements from the last time we called onDragPickup
        if (!this.savedOrder) {
            throw new Error('DragDrop: Cannot reset sorting with no saved order');
        }
        const boxElem = this.elementRef.nativeElement as HTMLElement;
        for (let i = 0; i < boxElem.children.length; i++) {
            const item = boxElem.children[i];
            if (this.savedOrder[i].element !== item && i > 0) {
                this.savedOrder[i - 1].element.insertAdjacentElement('afterend', this.savedOrder[i].element);
            }
        }
    }

    // If the user has provided classes indicating they only want a certain region to be draggable, ignore
    // this drag event if it is outside of there.
    private shouldBlockDragStart(event: DragEvent): boolean {
        const dragTarget = event.target as HTMLElement;
        // TODO: Allow for multiple drag targets, and drag exclusion targets
        const userDragTarget = dragTarget.querySelector('.novo-drag-target');
        if (userDragTarget) {
            return !this.isElementWithinEventBounds(userDragTarget, event);
        }
    }

    public isElementWithinEventBounds(element: Element, event: DragEvent) {
        const rect = element.getBoundingClientRect();
        const isInside = event.clientX > rect.left && event.clientX < rect.right &&
            event.clientY < rect.bottom && event.clientY > rect.top;
        return isInside;
    }
}