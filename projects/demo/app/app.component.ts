import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { NovoLayoutContent, NovoModalService, NovoSidenavComponent, NovoToastService } from 'novo-elements';
import { delay, filter, startWith } from 'rxjs/operators';
import { AnchorViewportScroller } from './anchor-scroller';
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
  updateRoutes: Array<any>;
  @ViewChild(NovoSidenavComponent)
  sidenav!: NovoSidenavComponent;

  @ViewChild('scrollContainer')
  scrollContainer!: NovoLayoutContent;

  constructor(
    private router: Router,
    viewContainerRef: ViewContainerRef,
    toaster: NovoToastService,
    modalService: NovoModalService,
    private observer: BreakpointObserver,
  ) {
    toaster.parentViewContainer = viewContainerRef;

    this.menuOpen = false;
    this.sectionRoutes = ['Home', 'Design', 'Components', 'Patterns', 'Resources'];
    this.designRoutes = router.config.filter((r: any) => r.data.section === 'design').sort(this.sortAlphabetically);
    this.componentRoutes = router.config.filter((r: any) => r.data.section === 'components').sort(this.sortAlphabetically);
    this.formRoutes = router.config.filter((r: any) => r.data.section === 'form-controls').sort(this.sortAlphabetically);
    this.layoutRoutes = router.config.filter((r: any) => r.data.section === 'layouts').sort(this.sortAlphabetically);
    this.utilRoutes = router.config.filter((r: any) => r.data.section === 'utils').sort(this.sortAlphabetically);
    this.patternRoutes = router.config.filter((r: any) => r.data.section === 'patterns').sort(this.sortAlphabetically);
    this.updateRoutes = router.config.filter((r: any) => r.data.section === 'updates').sort(this.sortByOrder);
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 480px)'])
      .pipe(startWith({ matches: false }), delay(10))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    const viewportScroller = new AnchorViewportScroller(document, this.scrollContainer.getHostElement());

    this.router.events.pipe(filter((e) => e instanceof Scroll)).subscribe((e: Scroll) => {
      this.menuOpen = false;
      if (e.anchor) {
        console.log('anchor', e.anchor);
        // anchor navigation
        setTimeout(() => {
          viewportScroller.scrollToAnchor(e.anchor);
        });
      } else if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  sortAlphabetically(a, b) {
    if (a.data.title < b.data.title) {
      return -1;
    }
    if (a.data.title > b.data.title) {
      return 1;
    }
    return 0;
  }

  sortByOrder(a, b) {
    if (a.data.order < b.data.order) {
      return -1;
    }
    if (a.data.order > b.data.order) {
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
