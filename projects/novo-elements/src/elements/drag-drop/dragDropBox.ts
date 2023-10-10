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
    eventRemovers: (() => void)[];
}

@Directive({
    selector: '[novoDragDrop]'
})
export class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {

    private static pickedUp?: {
        element: HTMLElement;
        parent: NovoDragBoxParent<any>;
        newParent?: NovoDragBoxParent<any>;
    }
    savedOrder?: NovoDragItem<T>[];

    $destroy = new ReplaySubject<void>(1);

    @Input('novoDragDrop') items: T[];

    @Output() novoDragDropFinish = new EventEmitter<NovoDragFinishEvent<T>>();

    // Array of objects that associate an HTML element to an unspecified "data type"
    private trackedItems: NovoDragItem<T>[];

    get trackedElements(): HTMLElement[] {
        return this.trackedItems.map(item => item.element);
    }

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
        this.mutationObserver.disconnect();
    }

    private registerChildren(): void {
        if (this.items && this.items.length !== this.element.children.length) {
            throw new Error('DragDrop: Could not match item list to children list');
        }
        this.trackedItems = [];
        for (let i = 0; i < this.element.children.length; i++) {
            this.registerChild(this.element.children[i] as HTMLElement, this.items[i]);
        }
        
    }

    // Create event listeners for a child element, and add its associated data to the trackedItems list
    private registerChild(element: HTMLElement, dataItem?: T) {
        console.log('Registering child', element);
        const insertionIdx = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, element);
        if (!dataItem) {
            if (this.items) {
                // Figure out in what position the element was inserted, and presume that the @Input() items array
                // has adjusted to include the associated value.
                dataItem = this.items[insertionIdx];
            }
        }
        const eventRemovers = this.addChildListeners(element);
        element.draggable = true;
        const trackItem = {
            item: dataItem,
            element,
            eventRemovers
        };
        this.trackedItems.splice(insertionIdx, 0, trackItem);
        
    }

    private addChildListeners(element: HTMLElement) {
        const eventRemovers = [
            this.renderer.listen(element, 'dragstart', this.onDragPickup.bind(this)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
            this.renderer.listen(element, 'dragover', this.onDragOver.bind(this)),
            this.renderer.listen(element, 'dragend', this.onDragStop.bind(this))
        ];
        this.$destroy.subscribe(() => eventRemovers.forEach(cb => cb()));
        return eventRemovers;
    }

    mutationDetected(mutations: MutationRecord[]) {
        // Do not check for mutations during a drag event
        if (NovoDragBoxParent.pickedUp) {
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
            // registerChild could have already been called manually, with a defined data item - in which case, don't do anything
            if (this.elementRef.nativeElement.children.length !== this.trackedItems.length) {
                this.registerChild(node);
            }
        });
        if (removedNodes.size > 0) {
            for (let i = this.trackedItems.length - 1; i >= 0; i --) {
                if (removedNodes.has(this.trackedItems[i].element)) {
                    console.log('removing event listeners', this.trackedItems[i].element);
                    this.trackedItems[i].eventRemovers.forEach(r => r());
                    this.trackedItems.splice(i, 1);
                }
            }
        }
    }


    /** Per-item listeners */

    onDragPickup(event: DragEvent) {
        console.log('drag start, target', event.currentTarget);
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        NovoDragBoxParent.pickedUp = {
            element: event.currentTarget as HTMLElement,
            parent: this
        };
        this.savedOrder = [...this.trackedItems];
    }

    onDragOver(event: DragEvent) {
        if (!NovoDragBoxParent.pickedUp) {
            console.warn('Received dragover event when no object was picked up');
            return;
        }
        if (NovoDragBoxParent.pickedUp.parent === this) {
            delete NovoDragBoxParent.pickedUp.newParent;
            this.applyTempSort(NovoDragBoxParent.pickedUp.element, event.currentTarget as HTMLElement);
        } else {
            NovoDragBoxParent.pickedUp.newParent = this;
            (event.currentTarget as HTMLElement).insertAdjacentElement('beforebegin', NovoDragBoxParent.pickedUp.element);
            // this.moveChildToNewParent(NovoDragBoxParent.pickedUp.parent, NovoDragBoxParent.pickedUp.element, event.currentTarget as HTMLElement);
        }
        event.preventDefault();
    }

    private moveChildToNewParent(oldParent: NovoDragBoxParent<T>, newChild: HTMLElement): void {

        // if the user dragged this item from one spot to another inside this new parent, it may already be in the tracking list of the new parent.
        const trackItem = oldParent.trackedItems.find(item => item.element === newChild) || this.trackedItems.find(item => item.element === newChild);
        console.log('removing event listeners', trackItem.element);
        trackItem.eventRemovers.forEach(r => r());
        this.registerChild(newChild, trackItem.item);
    }

    onDragStop(): void {
        console.log('Drag stopped', NovoDragBoxParent.pickedUp?.newParent);
        if (NovoDragBoxParent.pickedUp?.newParent && !this.element.contains(NovoDragBoxParent.pickedUp.element)) {
            // This element is no longer in the same parent, meaning the user has completed a move from one drag box to another
            NovoDragBoxParent.pickedUp.newParent.moveChildToNewParent(NovoDragBoxParent.pickedUp.parent, NovoDragBoxParent.pickedUp.element);
        }
        NovoDragBoxParent.pickedUp = null;
        this.savedOrder = null;
    }

    onDragFinish(event: DragEvent): void {
        console.log('Drag finished', event.target);
        // TODO: Emit this to other drag drop boxes?
        const draggedItem = this.trackedItems.find(item => item.element === NovoDragBoxParent.pickedUp.element)?.item;
        this.trackedItems = Array.prototype.map.call(this.elementRef.nativeElement.children, child => {
            const item = this.trackedItems.find(item => item.element === child);
            if (!item) {
                // TODO: This simply means an item was moved out of our container? Remove our event listeners
                throw new Error('DragDrop: Could not reassociate an item post-drag');
            }
            return item;
        });
        this.novoDragDropFinish.emit({
            draggedItem,
            allItems: this.itemsReordered,
            event
        });
        this.onDragStop();
        // event.preventDefault();
    }
    
    /** - end per-item listeners */

    @HostListener('drag', ['$event'])
    onDragContinuous(event: DragEvent) {
        if (!NovoDragBoxParent.pickedUp) {
            console.warn('Receiving continuous drag event with no drag object');
        }
        else if (NovoDragBoxParent.pickedUp.parent !== this || NovoDragBoxParent.pickedUp.newParent) {
            // ignore
            return;
        }
        const bounds = this.element.getBoundingClientRect();
        if (event.clientX > bounds.right || event.clientX < bounds.left ||
                event.clientY > bounds.bottom || event.clientY < bounds.top) {
            // The user's mouse has exited the bounds of the draggable container - reset to the last saved state
            this.resetSorting();
        }
    }

    private applyTempSort(showXElement: HTMLElement, inPlaceOfY: HTMLElement) {
        if (showXElement === inPlaceOfY) {
            // same element - ignoring
            return;
        }
        // Apply the "preview" effect from dragging one item to another
        // TODO: If the element is coming from another drag box, then it is always "prepended".
        const aIndex = Array.prototype.indexOf.call(this.element.children, showXElement);
        const bIndex = Array.prototype.indexOf.call(this.element.children, inPlaceOfY);
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
        console.log(`Resetting sorting from directive with ${this.trackedItems.length} items`);
        // return to the order of elements from the last time we called onDragPickup
        if (!this.savedOrder) {
            throw new Error('DragDrop: Cannot reset sorting with no saved order');
        }
        for (let i = 0; i < this.element.children.length; i++) {
            // iterate through children, and for the first element that doesn't match the saved order, insert the missing element.
            const item = this.element.children[i];
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
            const rect = userDragTarget.getBoundingClientRect();
            const isInside = event.clientX > rect.left && event.clientX < rect.right &&
                event.clientY < rect.bottom && event.clientY > rect.top;
            return !isInside;
        }
    }
}
