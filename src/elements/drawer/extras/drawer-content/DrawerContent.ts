// NG2
import { Directive, OnInit } from '@angular/core';
// App
import { NovoDrawerElement } from '../../Drawer';

@Directive({
    selector: '[drawerContent]'
})
export class NovoDrawerContentElement implements OnInit {
    constructor(private drawer: NovoDrawerElement) {
    }

    ngOnInit() {
        this.drawer.drawer = this;
    }
}
