import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, computed, Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, OnDestroy, Output, Renderer2, signal } from '@angular/core';

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

const SCROLL_DRAGGABLE_PADDING_REGION = 30;
const SCROLL_DRAGGABLE_EVENT_AMT = 10;

@Directive({
    selector: '[novoDragDrop]',
    standalone: false,
    host: {
        class: 'novo-drag-container',
        '[class.dragging]': '!!pickedUp',
    }
})
export class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {

    pickedUp?: HTMLElement;
    previewReplacing?: HTMLElement;
    savedOrder?: NovoDragItem<T>[];

    overlayContainer = inject(OverlayContainer, { optional: true });

    @Input('novoDragDrop') items: T[];
    /**
     * A function to specify whether a given item in the child list is draggable.
     * (Note that altering this after setup is not yet supported)
     */
    @Input('novoDragDropFilter') dragFilter?: (item: T) => boolean;
    /**
     * Prevents behavior that eases the act of dragging an object to the edge of a scrollable container. 
     */
    @Input('novoDragDropDisableScroll') disableScroll?: boolean;

    @Output() novoDragDropFinish = new EventEmitter<NovoDragFinishEvent<T>>();

    private trackedItems: NovoDragItem<T>[];
    private scrollContainer = signal<HTMLElement>(null);
    private scrollContainerRect = computed(() => this.scrollContainer()?.getBoundingClientRect());
    private scrollX = signal<boolean>(false);
    private scrollY = signal<boolean>(false);

    get itemsReordered(): T[] {
        return this.trackedItems.map(item => item.item);
    }

    @HostBinding('class.dragging')
    get dragging() {
        return Boolean(this.pickedUp);
    }

    mutationObserver = new MutationObserver(this.mutationDetected.bind(this));

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngAfterViewInit(): void {
        if (this.items) {
            this.registerChildren();
            this.mutationObserver.observe(this.element, { childList: true });
        }
        // if items is falsey, then no behavior is set up. In future, this component may support late enablement,
        // but for now it's not a priority. (It would open the question of late disablement)
    }

    ngOnDestroy(): void {
        this.trackedItems?.forEach(item => {
            item.removeListeners();
        });
    }

    private registerChildren(): void {
        if (this.items) {
            if (this.items.length !== this.element.children.length) {
                throw new Error(`Could not match item list to children list - drag box contains ${this.items.length} items, but has ${this.element.children.length} elements`);
            }
            this.trackedItems = [];
            for (let i = 0; i < this.element.children.length; i++) {
                this.registerChild(this.element.children[i] as HTMLElement, i);
            }
        }
    }

    private registerChild(element: HTMLElement, index: number) {
        const trackedItem: Partial<NovoDragItem<T>> = {
            item: this.items[index],
            element
        };
        if (this.dragFilter && !this.dragFilter(this.items[index])) {
            element.draggable = false;
            trackedItem.removeListeners = () => {};
        } else {
            const listeners = [
                this.renderer.listen(element, 'dragstart', this.onDragStart.bind(this)),
                this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
                this.renderer.listen(element, 'dragend', this.onDragStop.bind(this))
            ];
            element.draggable = true;
            trackedItem.removeListeners = () => listeners.forEach(cb => cb());
        }
        this.trackedItems.push(trackedItem as NovoDragItem<T>);
    }

    mutationDetected(mutations: MutationRecord[]) {
        if (this.pickedUp) {
            return;
        }
        const addedNodes = new Set<HTMLElement>();
        const removedNodes = new Set<HTMLElement>();
        for (const mutation of mutations) {
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
                item => {
                    const keep = !removedNodes.has(item.element);
                    if (!keep) {
                        item.removeListeners();
                    }
                    return keep;
                });
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
        if (!this.disableScroll) {
            this.scrollContainer.set(this.findScrollableParent());
        }

        this.pickedUp = event.target as HTMLElement;
        event.stopPropagation();
        this.savedOrder = [...this.trackedItems];
    }

    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event: DragEvent): void {
        this.pickedUp = null;
        this.previewReplacing = null;
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
        if (!this.pickedUp || this.inOverlay(event)) {
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
            if (this.previewReplacing !== target) {
                if (this.isValidTarget(target)) {
                    this.previewReplacing = target;
                    this.applyTempSort(this.pickedUp, target);
                } else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        } else {
            // if not within this drag box, then move this item back to its original position and show a diabled drag effect
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'none';
            }
            this.resetSorting();
        }
        if (!this.disableScroll) {
            this.processScrollDuringMove(event);
        }
    }

    private inOverlay(event: DragEvent): boolean {
        // Make sure a drag event is not looking at a tooltip or similar.
        // Return false if the dragbox itself is in an overlay - these scenarios will be harder to account for.
        const overlayElement = this.overlayContainer?.getContainerElement();
        return overlayElement && (overlayElement.contains(event.target as Node) && !overlayElement.contains(this.element));
    }

    private isValidTarget(target: HTMLElement): boolean {
        return target.draggable;
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

    private processScrollDuringMove(event: DragEvent) {
        const scrollElement = this.scrollContainer();
        if (!scrollElement) {
            return;
        }
        const rect = this.scrollContainerRect();
        if (this.scrollX()) {
            if (event.x > rect.left && event.x < rect.left + SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollLeft -= 10;
            } else if (event.x < rect.right && event.x > rect.right - SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollLeft += 10;
            }
        }
        if (this.scrollY()) {
            if (event.y > rect.top && event.y < rect.top + SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollTop -= 10;
            } else if (event.y < rect.bottom && event.y > rect.bottom - SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollTop += 10;
            }
        }
    }

    public isElementWithinEventBounds(element: Element, event: DragEvent) {
        const rect = element.getBoundingClientRect();
        const isInside = event.clientX > rect.left && event.clientX < rect.right &&
            event.clientY < rect.bottom && event.clientY > rect.top;
        return isInside;
    }

    private findScrollableParent(): HTMLElement | null {
        let currentElement = this.element.parentElement;
        this.scrollX.set(false);
        this.scrollY.set(false);
        
        while (currentElement) {
            const hasVerticalScroll = currentElement.scrollHeight > currentElement.clientHeight;
            const hasHorizontalScroll = currentElement.scrollWidth > currentElement.clientWidth;
            const isScrollable = hasVerticalScroll || hasHorizontalScroll;
            
            if (isScrollable) {
                const computedStyle = window.getComputedStyle(currentElement);
                const overflowY = computedStyle.overflowY;
                const overflowX = computedStyle.overflowX;
                
                // Check if overflow is set to allow scrolling
                if ((overflowY === 'auto' || overflowY === 'scroll') || 
                    (overflowX === 'auto' || overflowX === 'scroll')) {
                    // Verify the scrollable parent is smaller than the drag container
                    if (currentElement.clientHeight < this.element.clientHeight) {
                        this.scrollY.set(true);
                    }
                    if (currentElement.clientWidth < this.element.clientWidth) {
                        this.scrollX.set(true);
                    }
                    if (this.scrollX() || this.scrollY()) {
                        return currentElement;
                    }
                }
            }
            
            currentElement = currentElement.parentElement;
        }
        
        return null;
    }

}
