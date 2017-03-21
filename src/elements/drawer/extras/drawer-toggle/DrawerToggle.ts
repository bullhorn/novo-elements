// NG2
import { Directive, OnInit, Input } from '@angular/core';
// App
import { NovoDrawerElement } from '../../Drawer';
import { Helpers } from '../../../../utils/Helpers';

@Directive({
    selector: '[drawerToggle]',
    host: {
        '(click)': 'toggleDrawer($event)',
        '[class.drawer-toggle]': 'true',
        '[class.disabled]': 'disabled'
    }
})
export class NovoDrawerToggleElement implements OnInit {
    @Input() disabled: boolean = false;

    constructor(public drawer: NovoDrawerElement ) {
    }

    ngOnInit() {
        this.drawer.drawerToggle = this;
    }

    get isOpen() {
        return this.drawer.isOpen;
    }

    toggleDrawer(event: KeyboardEvent) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            this.drawer.toggle();
        }
    }
}
