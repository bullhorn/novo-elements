import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';

export interface NovoDragFinishEvent<T> {
    srcDirective: NovoDragDropItem<T>;
    draggedItem: T;
    allItems: T[];
    event: DragEvent;
}

@Directive({
    selector: '[novoDragDropItem]'
})
export class NovoDragDropItem<T> {

    @HostBinding('attr.draggable') draggable = true;

    @Input('novoDragDropItem') dataItem: T;

    @Output() novoDragDropFinish = new EventEmitter<NovoDragFinishEvent<T>>();

    private boxParent?: NovoDragBoxParent;

    constructor(public elementRef: ElementRef) {}

    setupParent(box: NovoDragBoxParent) {
        this.boxParent = box;
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(event: DragEvent) {
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        if (!this.boxParent) {
            throw new Error('DragDrop: No boxParent directive found');
        }
        this.boxParent.onDragPickup(this);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        this.novoDragDropFinish.emit({
            srcDirective: this,
            draggedItem: this.dataItem,
            allItems: this.boxParent.itemsExport(),
            event
        });
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        if (!this.boxParent) {
            throw new Error('DragDrop: No boxParent directive found');
        }
        this.boxParent.onDragOver(event.target as HTMLElement);
        event.preventDefault();
    }
}

@Directive({
    selector: '[novoDragDrop]'
})
export class NovoDragBoxParent implements AfterViewInit, OnDestroy {

    private savedOrder?: NovoDragDropItem<any>[];

    @ContentChildren(NovoDragDropItem)
    private menuItems: QueryList<NovoDragDropItem<any>>;
    pickedUp?: NovoDragDropItem<any>;

    $destroy = new ReplaySubject<void>(1);

    constructor(private elementRef: ElementRef) { }
    
    ngAfterViewInit(): void {
        this.registerChildren();
        this.menuItems.changes.pipe(takeUntil(this.$destroy)).subscribe(() => {
            this.registerChildren();
        });
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

    registerChildren(): void {
        this.menuItems.forEach(mI => {
            mI.setupParent(this);
        });
    }

    itemsExport<T>(): T[] {
        return Array.prototype.map.call(this.elementRef.nativeElement.children, childElement => {
            return this.menuItems.find(item => item.elementRef.nativeElement === childElement).dataItem;
        });
    }

    onDragPickup(item: NovoDragDropItem<any>) {
        this.pickedUp = item;
        this.savedOrder = Array.from(this.menuItems);
    }

    onDragOver(target: HTMLElement) {
        if (!this.pickedUp) {
            throw new Error('DragDrop: Received dragover event when no object was picked up');
        }
        this.applyTempSort(this.pickedUp.elementRef.nativeElement, target);
    }

    onDragFinish(): void {
        this.pickedUp = null;
        this.savedOrder = null;
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
            if (this.savedOrder[i].elementRef.nativeElement !== item && i > 0) {
                this.savedOrder[i - 1].elementRef.nativeElement.insertAdjacentElement('afterend', this.savedOrder[i].elementRef.nativeElement);
            }
        }
    }
}