import {
  Component,
  AfterContentInit,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {
  PageScrollConfig,
  PageScrollService,
  PageScrollInstance,
} from 'ng2-page-scroll';

PageScrollConfig.defaultDuration = 11;
PageScrollConfig.defaultScrollOffset = 70;

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  @ViewChild('main') private main: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
  ) {}

  public ngAfterContentInit(): any {
    const getUrl: Function = (router: Router) =>
      router.routerState.snapshot.url.slice(
        0,
        router.routerState.snapshot.url.indexOf('#'),
      );
    let previousURL: string = getUrl(this.router);

    const scrollAndPrettyPrint: Function = (event: any): void => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      let currentURL: string = getUrl(this.router);

      if (typeof PR !== 'undefined' && previousURL !== currentURL) {
        previousURL = currentURL;
        PR.prettyPrint();
      }

      let hash: string = this.route.snapshot.fragment;
      if (hash) {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(
          {
            document: this.document,
            scrollTarget: `#${hash}`,
            scrollingViews: [
              this.main.nativeElement.querySelector('#main') || {},
            ],
          },
        );
        this.pageScrollService.start(pageScrollInstance);
      }
    };

    this.router.events.subscribe((event: any) =>
      setTimeout(() => scrollAndPrettyPrint(event), 50),
    );
  }
}
