// NG2
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
// Vendor
import { NovoToastService, NovoModalService } from 'novo-elements';

@Component({
  selector: 'novo-demo-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  menuOpen: boolean = false;
  designRoutes: Array<any>;
  componentRoutes: Array<any>;
  formRoutes: Array<any>;
  navigationRoutes: Array<any>;
  layoutRoutes: Array<any>;
  utilRoutes: Array<any>;

  constructor(router: Router, viewContainerRef: ViewContainerRef, toaster: NovoToastService, modalService: NovoModalService) {
    toaster.parentViewContainer = viewContainerRef;
    modalService.parentViewContainer = viewContainerRef;

    this.menuOpen = false;

    this.designRoutes = router.config.filter((r: any) => r.data.section === 'design').sort(this.sortMenu);
    this.componentRoutes = router.config.filter((r: any) => r.data.section === 'components').sort(this.sortMenu);
    this.formRoutes = router.config.filter((r: any) => r.data.section === 'form-controls').sort(this.sortMenu);
    this.layoutRoutes = router.config.filter((r: any) => r.data.section === 'layouts').sort(this.sortMenu);
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
