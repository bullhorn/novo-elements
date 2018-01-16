import { Component, Input, HostBinding, AfterContentInit, QueryList, ContentChildren } from '@angular/core';

@Component({
  selector: 'novo-nav-content',
  styleUrls: ['./tab-outlet.component.scss'],
  template: '<ng-content></ng-content>',
})
export class NovoNavContentComponent {
  @HostBinding('class.active') @Input() public active: boolean = false;

  public deactivate(): void {
    this.active = false;
  }

  public activate(): void {
    this.active = true;
  }
}

@Component({
  selector: 'novo-nav-outlet, novo-tab-outlet',
  template: '<ng-content></ng-content>',
  styles: [`
      :host {
        display: block;
      }
  `],
})
export class NovoNavOutletComponent implements AfterContentInit {
  @ContentChildren(NovoNavContentComponent) public contents: QueryList<NovoNavContentComponent>;

  public ngAfterContentInit(): void {
    // this.contents.forEach((content: NovoNavContentComponent) => {
    //     content.select.subscribe((item: NovoNavContentComponent) => this.show(item));
    // });
  }

  public show(index: number): void {
    let item: NovoNavContentComponent = this.contents.toArray()[index];

    this.contents.forEach((t: NovoNavContentComponent) => t.deactivate());
    item.activate();

  }
}
