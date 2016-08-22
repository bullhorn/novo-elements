// NG2
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
// Vendor
import { NovoToastService, NovoModalService } from './../../src/novo-elements';

@Component({
    selector: 'demo-app',
    template: require('./App.html')
})
export class DemoComponent {
    constructor(router:Router, viewContainerRef:ViewContainerRef, toaster:NovoToastService, modalService:NovoModalService) {
        this.viewContainerRef = viewContainerRef;

        toaster.parentViewContainer = viewContainerRef;
        modalService.parentViewContainer = viewContainerRef;

        this.menuOpen = false;
        this.version = VERSION;

        this.designRoutes = router.config.filter(r => r.section === 'design').sort(this.sortMenu);
        this.componentRoutes = router.config.filter(r => r.section === 'components').sort(this.sortMenu);
        this.utilRoutes = router.config.filter(r => r.section === 'utils').sort(this.sortMenu);

        router.routerEvents.subscribe(() => {
            document.body.scrollTop = 0;
            this.menuOpen = false;
        });
    }

    sortMenu(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
