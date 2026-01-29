import { OverlayContainer } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { inject, EventEmitter, signal, computed, HostListener, HostBinding, Output, Input, Directive, NgModule } from '@angular/core';

const SCROLL_DRAGGABLE_PADDING_REGION = 30;
const SCROLL_DRAGGABLE_EVENT_AMT = 10;
class NovoDragBoxParent {
    get itemsReordered() {
        return this.trackedItems.map(item => item.item);
    }
    get dragging() {
        return Boolean(this.pickedUp);
    }
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.overlayContainer = inject(OverlayContainer, { optional: true });
        this.novoDragDropFinish = new EventEmitter();
        this.scrollContainer = signal(null);
        this.scrollContainerRect = computed(() => this.scrollContainer()?.getBoundingClientRect());
        this.scrollX = signal(false);
        this.scrollY = signal(false);
        this.mutationObserver = new MutationObserver(this.mutationDetected.bind(this));
    }
    get element() {
        return this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.items) {
            this.registerChildren();
            this.mutationObserver.observe(this.element, { childList: true });
        }
        // if items is falsey, then no behavior is set up. In future, this component may support late enablement,
        // but for now it's not a priority. (It would open the question of late disablement)
    }
    ngOnDestroy() {
        this.trackedItems?.forEach(item => {
            item.removeListeners();
        });
    }
    registerChildren() {
        if (this.items) {
            if (this.items.length !== this.element.children.length) {
                throw new Error(`Could not match item list to children list - drag box contains ${this.items.length} items, but has ${this.element.children.length} elements`);
            }
            this.trackedItems = [];
            for (let i = 0; i < this.element.children.length; i++) {
                this.registerChild(this.element.children[i], i);
            }
        }
    }
    registerChild(element, index) {
        const trackedItem = {
            item: this.items[index],
            element,
        };
        if (this.dragFilter && !this.dragFilter(this.items[index])) {
            element.draggable = false;
            trackedItem.removeListeners = () => { };
        }
        else {
            const listeners = [
                this.renderer.listen(element, 'dragstart', this.onDragStart.bind(this)),
                this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
                this.renderer.listen(element, 'dragend', this.onDragStop.bind(this)),
            ];
            element.draggable = true;
            trackedItem.removeListeners = () => listeners.forEach(cb => cb());
        }
        this.trackedItems.push(trackedItem);
    }
    mutationDetected(mutations) {
        if (this.pickedUp) {
            return;
        }
        const addedNodes = new Set();
        const removedNodes = new Set();
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((a) => {
                if (!removedNodes.delete(a)) {
                    addedNodes.add(a);
                }
            });
            mutation.removedNodes.forEach((a) => {
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
            this.trackedItems = this.trackedItems.filter(item => {
                const keep = !removedNodes.has(item.element);
                if (!keep) {
                    item.removeListeners();
                }
                return keep;
            });
        }
    }
    /** Per-item listeners */
    onDragStart(event) {
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
        this.pickedUp = event.target;
        event.stopPropagation();
        this.savedOrder = [...this.trackedItems];
    }
    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event) {
        this.pickedUp = null;
        this.previewReplacing = null;
        this.savedOrder = null;
        event.stopPropagation();
    }
    onDragFinish(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.element.contains(event.currentTarget)) {
            // this is for a different drag region - ignore
            return;
        }
        const draggedItem = this.trackedItems.find(item => item.element === this.pickedUp)?.item;
        this.trackedItems = Array.prototype.map.call(this.element.children, child => {
            const item = this.trackedItems.find(trackedItem => trackedItem.element === child);
            if (!item) {
                throw new Error('DragDrop: Error - could not reassociate an item post-drag');
            }
            return item;
        });
        this.novoDragDropFinish.emit({
            draggedItem,
            allItems: this.itemsReordered,
            event,
        });
    }
    /** - end per-item listeners */
    onDragOver(event) {
        if (!this.pickedUp || this.inOverlay(event)) {
            return;
        }
        let target = event.target;
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
                }
                else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        }
        else {
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
    inOverlay(event) {
        // Make sure a drag event is not looking at a tooltip or similar.
        // Return false if the dragbox itself is in an overlay - these scenarios will be harder to account for.
        const overlayElement = this.overlayContainer?.getContainerElement();
        return overlayElement && (overlayElement.contains(event.target) && !overlayElement.contains(this.element));
    }
    isValidTarget(target) {
        return target.draggable;
    }
    findDraggableParentOfElement(target) {
        const parentElement = target.parentElement;
        if (!parentElement) {
            return null;
        }
        else if (parentElement.draggable) {
            return parentElement;
        }
        else {
            return this.findDraggableParentOfElement(parentElement);
        }
    }
    applyTempSort(showXElement, inPlaceOfY) {
        if (showXElement === inPlaceOfY) {
            // same element - ignoring
            return;
        }
        // Apply the "preview" effect from dragging one item to another
        const aIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, showXElement);
        const bIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, inPlaceOfY);
        const diff = bIndex - aIndex;
        let insertPosition;
        if (diff > 0) {
            insertPosition = 'afterend';
        }
        else if (diff < 0) {
            insertPosition = 'beforebegin';
        }
        else {
            throw new Error('DragDrop: Two elements are in the same position');
        }
        inPlaceOfY.insertAdjacentElement(insertPosition, showXElement);
    }
    resetSorting() {
        // return to the order of elements from the last time we called onDragPickup
        if (!this.savedOrder) {
            throw new Error('DragDrop: Cannot reset sorting with no saved order');
        }
        const boxElem = this.elementRef.nativeElement;
        for (let i = 0; i < boxElem.children.length; i++) {
            const item = boxElem.children[i];
            if (this.savedOrder[i].element !== item && i > 0) {
                this.savedOrder[i - 1].element.insertAdjacentElement('afterend', this.savedOrder[i].element);
            }
        }
    }
    // If the user has provided classes indicating they only want a certain region to be draggable, ignore
    // this drag event if it is outside of there.
    shouldBlockDragStart(event) {
        const dragTarget = event.target;
        // TODO: Allow for multiple drag targets, and drag exclusion targets
        const userDragTarget = dragTarget.querySelector('.novo-drag-target');
        if (userDragTarget) {
            return !this.isElementWithinEventBounds(userDragTarget, event);
        }
    }
    processScrollDuringMove(event) {
        const scrollElement = this.scrollContainer();
        if (!scrollElement) {
            return;
        }
        const rect = this.scrollContainerRect();
        if (this.scrollX()) {
            if (event.x > rect.left && event.x < rect.left + SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollLeft -= 10;
            }
            else if (event.x < rect.right && event.x > rect.right - SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollLeft += 10;
            }
        }
        if (this.scrollY()) {
            if (event.y > rect.top && event.y < rect.top + SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollTop -= 10;
            }
            else if (event.y < rect.bottom && event.y > rect.bottom - SCROLL_DRAGGABLE_PADDING_REGION) {
                scrollElement.scrollTop += 10;
            }
        }
    }
    isElementWithinEventBounds(element, event) {
        const rect = element.getBoundingClientRect();
        const isInside = event.clientX > rect.left && event.clientX < rect.right &&
            event.clientY < rect.bottom && event.clientY > rect.top;
        return isInside;
    }
    findScrollableParent() {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragBoxParent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDragBoxParent, isStandalone: false, selector: "[novoDragDrop]", inputs: { items: ["novoDragDrop", "items"], dragFilter: ["novoDragDropFilter", "dragFilter"], disableScroll: ["novoDragDropDisableScroll", "disableScroll"] }, outputs: { novoDragDropFinish: "novoDragDropFinish" }, host: { listeners: { "window:dragover": "onDragOver($event)" }, properties: { "class.dragging": "this.dragging" }, classAttribute: "novo-drag-container" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragBoxParent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDragDrop]',
                    standalone: false,
                    host: {
                        class: 'novo-drag-container',
                        '[class.dragging]': '!!pickedUp',
                    },
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { items: [{
                type: Input,
                args: ['novoDragDrop']
            }], dragFilter: [{
                type: Input,
                args: ['novoDragDropFilter']
            }], disableScroll: [{
                type: Input,
                args: ['novoDragDropDisableScroll']
            }], novoDragDropFinish: [{
                type: Output
            }], dragging: [{
                type: HostBinding,
                args: ['class.dragging']
            }], onDragOver: [{
                type: HostListener,
                args: ['window:dragover', ['$event']]
            }] } });

class NovoDragDropModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragDropModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoDragDropModule, declarations: [NovoDragBoxParent], exports: [NovoDragBoxParent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragDropModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragDropModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NovoDragBoxParent],
                    exports: [NovoDragBoxParent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDragBoxParent, NovoDragDropModule };
//# sourceMappingURL=novo-elements-elements-drag-drop.mjs.map
