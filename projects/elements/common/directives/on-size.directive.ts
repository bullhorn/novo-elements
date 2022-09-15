import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[onSize]',
})
export class OnSizeDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;
  private _sizes: string[] = [];
  private result: BreakpointState | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.subscription = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.result = result;
        this.updateView();
      });
  }

  @Input() set onSize(sizes: string[]) {
    this._sizes = sizes;
    this.updateView();
  }

  private updateView() {
    let viewChange = false;

    if (this.result !== undefined) {
      if (
        (this.result.breakpoints[Breakpoints.XSmall] && this.containsSize('xs')) ||
        (this.result.breakpoints[Breakpoints.Small] && this.containsSize('sm')) ||
        (this.result.breakpoints[Breakpoints.Medium] && this.containsSize('md')) ||
        (this.result.breakpoints[Breakpoints.Large] && this.containsSize('lg')) ||
        (this.result.breakpoints[Breakpoints.XLarge] && this.containsSize('xl'))
      ) {
        viewChange = true;
      }
    }

    this.setView(viewChange);
  }

  setView(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  containsSize(size: string): boolean {
    return this._sizes.filter((item) => item === size).length > 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
