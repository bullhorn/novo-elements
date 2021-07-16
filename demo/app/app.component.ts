import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NovoModalService, NovoSidenavComponent, NovoToastService } from 'novo-elements';

@Component({
  selector: 'novo-demo-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  menuOpen: boolean = false;
  sectionRoutes: Array<any>;
  designRoutes: Array<any>;
  componentRoutes: Array<any>;
  formRoutes: Array<any>;
  navigationRoutes: Array<any>;
  layoutRoutes: Array<any>;
  utilRoutes: Array<any>;
  patternRoutes: Array<any>;
  @ViewChild(NovoSidenavComponent)
  sidenav!: NovoSidenavComponent;

  constructor(
    router: Router,
    viewContainerRef: ViewContainerRef,
    toaster: NovoToastService,
    modalService: NovoModalService,
    private observer: BreakpointObserver,
  ) {
    toaster.parentViewContainer = viewContainerRef;
    modalService.parentViewContainer = viewContainerRef;

    this.menuOpen = false;
    this.sectionRoutes = ['Home', 'Design', 'Components', 'Patterns', 'Resources'];
    this.designRoutes = router.config.filter((r: any) => r.data.section === 'design').sort(this.sortMenu);
    this.componentRoutes = router.config.filter((r: any) => r.data.section === 'components').sort(this.sortMenu);
    this.formRoutes = router.config.filter((r: any) => r.data.section === 'form-controls').sort(this.sortMenu);
    this.layoutRoutes = router.config.filter((r: any) => r.data.section === 'layouts').sort(this.sortMenu);
    this.utilRoutes = router.config.filter((r: any) => r.data.section === 'utils').sort(this.sortMenu);
    this.patternRoutes = router.config.filter((r: any) => r.data.section === 'patterns').sort(this.sortMenu);

    router.events.subscribe(() => {
      window.scrollTo(0, 0);
      this.menuOpen = false;
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 480px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
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

  toggleDarkMode() {
    document.documentElement.classList.toggle('theme-dark');
  }
}
