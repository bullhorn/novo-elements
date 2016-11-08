// NG2
import { Directive, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';

export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDE_CLICK = 'outsideClick';

export const POSITION_LEFT = 'left';
export const POSITION_RIGHT = 'right';
export const POSITION_TOP = 'top';
export const POSITION_BOTTOM = 'bottom';

class DrawerService {
    constructor() {
        this.closeDrawerBind = this.closeDrawer.bind(this);
    }

    open(scope) {
        if (!this.openScope) {
            window.document.addEventListener('click', this.closeDrawerBind);
        }

        if (this.openScope && this.openScope !== this.scope) {
            this.openScope.isOpen = false;
        }

        this.openScope = scope;
    }

    close(scope) {
        if (this.openScope !== scope) {
            return;
        }

        this.openScope = null;
        window.document.removeEventListener('click', this.closeDrawerBind);
    }

    closeDrawer(event) {
        if (!this.openScope) {
            return;
        }

        if (event && this.openScope.autoClose === DISABLED) {
            return;
        }

        if (event && this.openScope.toggleEl && this.openScope.toggleEl.nativeElement === event.target) {
            return;
        }

        if (event && this.openScope.autoClose === OUTSIDE_CLICK && this.openScope.drawerEl && this.openScope.drawerEl.nativeElement === event.target) {
            return;
        }

        this.openScope.isOpen = false;
    }
}
const drawerService = new DrawerService();

@Directive({
    selector: '[drawer]',
    inputs: ['isOpen', 'autoClose', 'position'],
    outputs: ['onDrawerToggle'],
    host: {
        '[class.drawer]': 'true',
        '[class.open]': 'isOpen'
    }
})
export class NovoDrawerElement implements OnInit, OnDestroy {
    constructor(el: ElementRef) {
        this.el = el;
        this.onDrawerToggle = new EventEmitter();
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

    toggle(open) {
        return this.isOpen = open ? !!open : !this.isOpen;
    }

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

@Directive({
    selector: '[drawerContent], .drawer-content'
})
export class NovoDrawerContentElement implements OnInit {
    constructor(drawer: NovoDrawerElement, el: ElementRef) {
        this.drawer = drawer;
        this.el = el;
    }

    ngOnInit() {
        this.drawer.drawer = this;
    }
}

@Directive({
    selector: '[drawerToggle]',
    inputs: ['disabled'],
    host: {
        '(click)': 'toggleDrawer($event)',
        '[class.drawer-toggle]': 'true',
        '[class.disabled]': 'disabled'
    }
})
export class NovoDrawerToggleElement implements OnInit {
    constructor(drawer: NovoDrawerElement, el: ElementRef) {
        this.el = el;
        this.disabled = false;
        this.drawer = drawer;
    }

    ngOnInit() {
        this.drawer.drawerToggle = this;
    }

    get isOpen() {
        return this.drawer.isOpen;
    }

    toggleDrawer(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.disabled) {
            this.drawer.toggle();
        }
    }
}
