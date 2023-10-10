import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NovoDragDropController, NovoDragItemTracker } from './dragDrop.controller';

export interface NovoDragFinishEvent<T> {
    draggedItem: T;
    allItems: T[];
    event: DragEvent;
}

@Directive({
    selector: '[novoDragDrop]'
})
export class NovoDragBoxParent<T> implements AfterViewInit, OnDestroy {

    $destroy = new ReplaySubject<void>(1);

    @Input('novoDragDrop') items: T[];

    @Output() novoDragDropFinish = new EventEmitter<NovoDragFinishEvent<T>>();
    @Output() novoDragDropRemoved = new EventEmitter<NovoDragFinishEvent<T>>();

    // Array of objects that associate an HTML element to an unspecified "data type"
    trackedItems: NovoDragItemTracker<T>[];

    get trackedElements(): HTMLElement[] {
        return this.trackedItems.map(item => item.element);
    }

    get itemsReordered(): T[] {
        return this.trackedItems.map(item => item.item);
    }

    mutationObserver = new MutationObserver(this.mutationDetected.bind(this));

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private controller: NovoDragDropController) {}
    
    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngAfterViewInit(): void {
        this.registerWithController();
        this.mutationObserver.observe(this.element, { childList: true });
    }

    ngOnDestroy(): void {
        this.trackedItems.forEach(item => {
            item.eventRemovers.forEach(r => r());
        });
        this.$destroy.next();
        this.$destroy.complete();
        this.mutationObserver.disconnect();
        this.controller.removeBox(this);
    }

    private registerWithController(): void {
        this.controller.registerParent(this, this.renderer);
        if (this.items && this.items.length !== this.element.children.length) {
            throw new Error('DragDrop: Could not match item list to children list');
        }
        this.trackedItems = [];
        for (let i = 0; i < this.element.children.length; i++) {
            this.trackedItems.push(this.controller.registerChild(this.element.children[i] as HTMLElement, this, this.items[i]));
        }
        
    }

    mutationDetected(mutations: MutationRecord[]) {
        if (this.controller.pickedUp) {
            // don't process events while drag is occurring.
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
            this.controller.registerOrMoveChild(node, this);
        });
        if (removedNodes.size > 0) {
            for (let i = this.trackedItems.length - 1; i >= 0; i --) {
                if (removedNodes.has(this.trackedItems[i].element)) {
                    this.trackedItems.splice(i, 1);
                }
            }
        }
    }

    
    /** - end per-item listeners */

    @HostListener('drag', ['$event'])
    onDragContinuous(event: DragEvent) {
        if (!this.controller.pickedUp) {
            console.warn('Receiving continuous drag event with no drag object');
        }
        else if (this.controller.pickedUp.parent !== this) {
            // ignore
            return;
        }
        if (!this.controller.isEventWithinADragRegion(event)) {
            // The user's mouse has exited the bounds of the draggable container - reset to the last saved state
            this.resetSorting(this.controller.savedOrder);
        }
    }

    applyTempSort(showXElement: Element, inPlaceOfY: Element) {
        if (showXElement === inPlaceOfY) {
            // same element - ignoring
            return;
        }
        // Apply the "preview" effect from dragging one item to another
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
        /*if (diff > 0) {
            inPlaceOfY = inPlaceOfY.nextElementSibling;

        }
        
        if (inPlaceOfY) {
            this.renderer.insertBefore(this.element, showXElement, inPlaceOfY, true);
        } else {
            this.renderer.appendChild(this.element, showXElement);
        }*/
    }

    resetSorting(savedOrder: NovoDragItemTracker<any>[]): void {
        // return to the order of elements from the last time we called onDragPickup
        for (let i = 0; i < this.element.children.length; i++) {
            // iterate through children, and for the first element that doesn't match the saved order, insert the missing element.
            const item = this.element.children[i];
            if (savedOrder[i].element !== item && i > 0) {
                this.renderer.insertBefore(this.element, savedOrder[i].element, item, true);
                // savedOrder[i - 1].element.insertAdjacentElement('afterend', savedOrder[i].element);
            }
        }
    }
}
