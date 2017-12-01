// NG2
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
// Vendor
import { NovoToastService, NovoModalService } from './../platform/index';

@Component({
    selector: 'demo-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    menuOpen: boolean = false;
    version: string;
    designRoutes: Array<any>;
    componentRoutes: Array<any>;
    utilRoutes: Array<any>;

    constructor(router: Router, private viewContainerRef: ViewContainerRef, toaster: NovoToastService, modalService: NovoModalService) {
        toaster.parentViewContainer = viewContainerRef;
        modalService.parentViewContainer = viewContainerRef;

        this.menuOpen = false;
        this.version = 'VERSION';

        this.designRoutes = router.config.filter((r: any) => r.data.section === 'design').sort(this.sortMenu);
        this.componentRoutes = router.config.filter((r: any) => r.data.section === 'components').sort(this.sortMenu);
        this.utilRoutes = router.config.filter((r: any) => r.data.section === 'utils').sort(this.sortMenu);

        router.events.subscribe(() => {
            window.scrollTo(0, 0);
            this.menuOpen = false;
        });
    }

    sortMenu(a, b) {
        if (a.data.title < b.data.title) {
            return -1;
        }
        if (a.data.title > b.data.title) {
            return 1;
        }
        return 0;
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
