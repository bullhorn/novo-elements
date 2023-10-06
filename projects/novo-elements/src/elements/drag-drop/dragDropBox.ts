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

    get trackedElements(): HTMLElement[] {
        return this.trackedItems.map(item => item.element);
    }

    get itemsReordered(): T[] {
        return this.trackedItems.map(item => item.item);
    }

    mutationObserver = new MutationObserver(this.mutationDetected.bind(this));

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    
    ngAfterViewInit(): void {
        this.registerChildren();
        this.mutationObserver.observe(this.elementRef.nativeElement, { childList: true });
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

    private registerChildren(): void {
        if (this.items && this.items.length !== this.elementRef.nativeElement.children.length) {
            throw new Error('Could not match item list to children list');
        }
        this.trackedItems = [];
        for (let i = 0; i < this.elementRef.nativeElement.children.length; i++) {
            this.registerChild(this.elementRef.nativeElement.children[i], i);
        }
        
    }

    private registerChild(element: HTMLElement, index: number) {
        console.log('Registering child', element);
        const listeners = [
            this.renderer.listen(element, 'dragstart', this.onDragPickup.bind(this)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
            this.renderer.listen(element, 'dragover', this.onDragOver.bind(this)),
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
            const idx = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, node);
            this.registerChild(node, idx);
        });
        if (removedNodes.size > 0) {
            this.trackedItems = this.trackedItems.filter(
                item => !removedNodes.has(item.element));
        }
    }


    debugDragEvents: any[] = [];
    /** Per-item listeners */

    onDragPickup(event: DragEvent) {
        console.log('drag start');
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        this.pickedUp = event.currentTarget as HTMLElement;
        this.savedOrder = [...this.trackedItems];
        this.debugDragEvents = [];
    }

    onDragOver(event: DragEvent) {
        if (!this.pickedUp) {
            throw new Error('DragDrop: Received dragover event when no object was picked up');
        }
        this.applyTempSort(this.pickedUp, event.currentTarget as HTMLElement);
        event.preventDefault();
    }

    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event: DragEvent): void {
        this.pickedUp = null;
        this.savedOrder = null;
    }

    onDragFinish(event: DragEvent): void {
        const draggedItem = this.trackedItems.find(item => item.element === this.pickedUp)?.item;
        this.trackedItems = Array.prototype.map.call(this.elementRef.nativeElement.children, child => {
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
        event.preventDefault();
    }
    
    /** - end per-item listeners */

    @HostListener('window:mouseup', ['$event'])
    onMouseUp() {
        console.log('mouseup');
        this.pickedUp = null;
    }

    @HostListener('drag', ['$event'])
    onDragContinuous(event: DragEvent) {
        const bounds = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
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
            const rect = userDragTarget.getBoundingClientRect();
            const isInside = event.clientX > rect.left && event.clientX < rect.right &&
                event.clientY < rect.bottom && event.clientY > rect.top;
            return !isInside;
        }
    }
}

/*
@Directive({
    selector: '[novoPreventDrag]'
})
export class NovoPreventDrag {
    // Assign draggable so we can catch the dragstart event
    @HostBinding('attr.draggable') draggable = 'true';

    // Aria indicator: Not grabbable
    @HostBinding('attr.grab') ariaGrab = 'false';

    @HostListener('dragstart', ['$event'])
    blockDrag(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
}*/