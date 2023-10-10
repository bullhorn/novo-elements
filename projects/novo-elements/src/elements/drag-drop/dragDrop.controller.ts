import { Injectable, Renderer2 } from '@angular/core';
import { NovoDragBoxParent } from './dragDropBox';

export interface NovoDragItemTracker<T> {
    item: T;
    element: HTMLElement;
    eventRemovers: (() => void)[];
    parent: NovoDragBoxParent<T>;
}

@Injectable()
export class NovoDragDropController {
    // This object holds the event listeners for the draggable objects, and removes them when
    // their associated parent is destroyed.

    private dragDropBoxes: NovoDragBoxParent<any>[] = [];

    pickedUp: NovoDragItemTracker<any>;
    // pickupNewParentTarget?: NovoDragBoxParent<any>;
    savedOrder: NovoDragItemTracker<any>[];

    private renderer: Renderer2;

    public registerParent(parent: NovoDragBoxParent<any>, renderer: Renderer2): void {
        if (this.dragDropBoxes.indexOf(parent) !== -1) {
            throw new Error('DragDrop: Could not register drop parent - it is already listed');
        }
        this.dragDropBoxes.push(parent);
        if (!this.renderer) {
            this.renderer = renderer;
        }
    }

    // Create event listeners for a child element, and add its associated data to the trackedItems list
    public registerChild<T>(element: HTMLElement, parent: NovoDragBoxParent<T>, dataItem?: T): NovoDragItemTracker<T> {
        console.log('Registering child', element);
        if (!parent) {
            throw new Error('DragDrop: Could not locate parent of new child');
        }
        if (element.draggable) {
            console.warn('NovoDragDropController attempted to register child, but it was already marked as draggable. Could this have been registered twice?');
        }
        element.draggable = true;
        const tracker: NovoDragItemTracker<T> = {
            item: dataItem,
            element,
            parent,
            eventRemovers: []
        };
        tracker.eventRemovers = this.addChildListeners(element, tracker);
        return tracker;
        
    }

    generateRandomString() {
        const charRangeA = 65;
        const charRangeB = 122;
        const diff = charRangeB - charRangeA;
        let str = '';
        for (let i = 0; i < 5; i++) {
            let chr = charRangeA + Math.floor(Math.random() * diff);
            str += String.fromCharCode(chr);
        }
        return str;
    }

    private addChildListeners(element: HTMLElement, tracker: NovoDragItemTracker<any>): (()=>void)[] {
        return [
            this.renderer.listen(element, 'dragstart', this.onDragPickup.bind(this, tracker)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this, tracker)),
            this.renderer.listen(element, 'dragover', this.onDragOver.bind(this, tracker)),
            this.renderer.listen(element, 'dragend', this.onDragStop.bind(this, tracker))
        ];
    }

    removeBox(box: NovoDragBoxParent<any>): void {
        const boxIndex = this.dragDropBoxes.indexOf(box);
        if (boxIndex === -1) {
            // Attempted to clean up drag box, but it was already removed from controller
            return;
        }
        this.dragDropBoxes.splice(boxIndex, 1);
    }

    /**
     * Determine if this element is already tracked by a drag box, or if it needs to be newly registered.
     * Return the new or found tracker either way
     * @param element 
     * @param parent The drag parent to either use when newly creating the drag box, or to assign to change it.
     */
    registerOrMoveChild<T>(element: HTMLElement, parent: NovoDragBoxParent<T>) {
        
        let tracker: NovoDragItemTracker<T>;
        for (let parent of this.dragDropBoxes) {
            tracker = parent.trackedItems.find(item => item.element === element);
            if (tracker) {
                break;
            }
        }
        if (tracker) {
            // remove the tracker from the old parent's list, add it to the new one in the correct index based on the element position
            this.moveTrackerToNewParent<T>(tracker, parent);
        } else {
            const elementIndex: number = this.indexOfElement(element);
            // New element, likely created from external @Input array addition. Take its value from that array
            const dataItem = parent.items[elementIndex];
            this.registerChild(element, parent, dataItem);
        }
    }

    private indexOfElement(element: HTMLElement): number {
        return Array.prototype.indexOf.call(element.parentElement.children, element);;
    }

    private moveTrackerToNewParent<T>(tracker: NovoDragItemTracker<T>, parent: NovoDragBoxParent<T>) {
        // use the DOM index to determine the correct array position to insert the tracker
        const elementIndex: number = this.indexOfElement(tracker.element);
        const originalIndex = tracker.parent.trackedItems.indexOf(tracker);
        tracker.parent.trackedItems.splice(originalIndex, 1);
        tracker.parent = parent;
        parent.trackedItems.splice(elementIndex, 0, tracker);
    }

    private findDragParent(element: HTMLElement): NovoDragBoxParent<any> {
        return this.dragDropBoxes.find(box => box.element.contains(element));
    }

    onDragPickup(tracker: NovoDragItemTracker<any>, event: DragEvent) {
        console.log('drag start, target', event.currentTarget);
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        dataTransfer.dropEffect = 'move';
        this.pickedUp = tracker;
        this.savedOrder = [...tracker.parent.trackedItems];
    }

    onDragOver(tracker: NovoDragItemTracker<any>, event: DragEvent) {
        if (!this.pickedUp) {
            console.warn('Received dragover event when no object was picked up');
            return;
        }
        const targetParent = this.findDragParent(event.currentTarget as HTMLElement);
        if (targetParent === tracker.parent) {
            targetParent.applyTempSort(this.pickedUp.element, event.currentTarget as HTMLElement);
        } else {
            // even if moving to a new parent, do not move the tracker until the drag event has "finalized"
            // in onDragFinish.
            // this.renderer.insertBefore(targetParent.element, this.pickedUp.element, event.currentTarget, true);
            (event.currentTarget as HTMLElement).insertAdjacentElement('beforebegin', this.pickedUp.element);
        }
        event.preventDefault();
    }

    // User released drag without targetting a valid drop target
    onDragStop(tracker: NovoDragItemTracker<any>, event: DragEvent): void {
        // this.onDragFinish(tracker, event);
        this.pickedUp = null;
        this.savedOrder = null;
        event.preventDefault();
    }

    onDragFinish(tracker: NovoDragItemTracker<any>, event: DragEvent): void {
        console.log('Drag finished', event.target);
        const targetParent = this.findDragParent(event.currentTarget as HTMLElement);
        // determine the new order of elements (presume all HTML Elements have already moved through previewing system)
        if (targetParent === tracker.parent) {
            targetParent.trackedItems = Array.prototype.map.call(targetParent.element.children, child => {
                const item = targetParent.trackedItems.find(item => item.element === child);
                if (!item) {
                    // TODO: This simply means an item was moved out of our container? Remove our event listeners
                    throw new Error('DragDrop: Could not reassociate an item post-drag');
                }
                return item;
            });
        } else {
            // moved from old parent
            const oldParent = tracker.parent;
            this.moveTrackerToNewParent(tracker, targetParent);
            oldParent.novoDragDropRemoved.emit({
                draggedItem: tracker.item,
                allItems: oldParent.itemsReordered,
                event
            });
        }
        this.pickedUp = null;
        this.savedOrder = null;
        targetParent.novoDragDropFinish.emit({
            draggedItem: tracker.item,
            allItems: targetParent.itemsReordered,
            event
        });
    }

    public isEventWithinADragRegion(event: DragEvent): NovoDragBoxParent<any> {
        return this.dragDropBoxes.find(parent => {
            const bounds = parent.element.getBoundingClientRect();
            // return true if event bounds are inside
            return event.clientX < bounds.right && event.clientX > bounds.left &&
                event.clientY < bounds.bottom && event.clientY > bounds.top;
        });
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