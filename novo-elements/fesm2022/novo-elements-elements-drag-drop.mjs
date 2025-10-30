import * as i0 from '@angular/core';
import { EventEmitter, HostListener, Output, Input, Directive, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';

class NovoDragBoxParent {
    get itemsReordered() {
        return this.trackedItems.map(item => item.item);
    }
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.$destroy = new ReplaySubject(1);
        this.novoDragDropFinish = new EventEmitter();
        this.mutationObserver = new MutationObserver(this.mutationDetected.bind(this));
    }
    get element() {
        return this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        this.registerChildren();
        this.mutationObserver.observe(this.element, { childList: true });
    }
    ngOnDestroy() {
        this.$destroy.next();
        this.$destroy.complete();
    }
    registerChildren() {
        if (this.items && this.items.length !== this.element.children.length) {
            throw new Error(`Could not match item list to children list - drag box contains ${this.items.length} items, but has ${this.element.children.length} elements`);
        }
        this.trackedItems = [];
        for (let i = 0; i < this.element.children.length; i++) {
            this.registerChild(this.element.children[i], i);
        }
    }
    registerChild(element, index) {
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
    mutationDetected(mutations) {
        if (this.pickedUp) {
            return;
        }
        const addedNodes = new Set();
        const removedNodes = new Set();
        for (let mutation of mutations) {
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
            this.trackedItems = this.trackedItems.filter(item => !removedNodes.has(item.element));
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
        this.pickedUp = event.target;
        event.stopPropagation();
        this.savedOrder = [...this.trackedItems];
    }
    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event) {
        this.pickedUp = null;
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
    onDragOver(event) {
        if (!this.pickedUp) {
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
            this.applyTempSort(this.pickedUp, target);
        }
        else {
            // if not within this drag box, then move this item back to its original position and show a diabled drag effect
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'none';
            }
            this.resetSorting();
        }
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
    isElementWithinEventBounds(element, event) {
        const rect = element.getBoundingClientRect();
        const isInside = event.clientX > rect.left && event.clientX < rect.right &&
            event.clientY < rect.bottom && event.clientY > rect.top;
        return isInside;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragBoxParent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDragBoxParent, isStandalone: false, selector: "[novoDragDrop]", inputs: { items: ["novoDragDrop", "items"] }, outputs: { novoDragDropFinish: "novoDragDropFinish" }, host: { listeners: { "window:dragover": "onDragOver($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDragBoxParent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDragDrop]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { items: [{
                type: Input,
                args: ['novoDragDrop']
            }], novoDragDropFinish: [{
                type: Output
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
                    exports: [NovoDragBoxParent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDragBoxParent, NovoDragDropModule };
//# sourceMappingURL=novo-elements-elements-drag-drop.mjs.map
