// NG2
import { Directive, OnInit, EventEmitter, ElementRef, Input, Output } from '@angular/core';
// App
import { DrawerService, OUTSIDE_CLICK, POSITION_LEFT } from './extras/drawer-service/DrawerService';

const drawerService = new DrawerService();

@Directive({
    selector: '[drawer]',
    host: {
        '[class.drawer]': 'true',
        '[class.open]': 'isOpen'
    }
})
export class NovoDrawerElement implements OnInit {
    @Input() autoClose: any;
    @Input() position: string;
    @Output() onDrawerToggle: EventEmitter<any> = new EventEmitter();

    _isOpen: boolean;
    drawerEl: any;
    toggleEl: any;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.autoClose = this.autoClose || OUTSIDE_CLICK;
        this.position = this.position || POSITION_LEFT;
    }

    set drawer(drawer) {
        // init drop down menu
        this.drawerEl = drawer.el;

        // add class name for the position
        this.drawerEl.nativeElement.classList.add(this.position);
    }

    set drawerToggle(drawerToggle) {
        // init toggle element
        this.toggleEl = drawerToggle.el;
    }

    toggle(open?: any) {
        return this.isOpen = open ? !!open : !this.isOpen;
    }

    @Input()
    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value) {
        this._isOpen = !!value;

        if (this.isOpen) {
            this.focusToggleElement();
            drawerService.open(this);
        } else {
            drawerService.close(this);
        }
        this.onDrawerToggle.next(this.isOpen);
    }

    focusToggleElement() {
        if (this.toggleEl) {
            this.toggleEl.nativeElement.focus();
        }
    }
}



