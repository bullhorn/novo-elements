import { Component, Input, AfterContentInit, HostBinding, ContentChildren, QueryList } from '@angular/core';
import { NovoTabComponent } from './tab.component';
import { NovoNavOutletComponent } from './tab-outlet.component';

@Component({
  selector: 'novo-nav, novo-tab-group',
  styleUrls: ['./tabs.component.scss'],
  template: '<ng-content></ng-content>',
})
export class NovoNavComponent implements AfterContentInit {
  @HostBinding('class.condensed') @Input() public condensed: boolean = false;
  @HostBinding('class.block') @Input() public block: boolean = false;
  @HostBinding('attr.theme') @Input() public theme: string = '';
  @HostBinding('attr.direction') @Input() public direction: string = 'horizontal';
  @Input() public router: string;
  @Input() public outlet: NovoNavOutletComponent;
  @ContentChildren(NovoTabComponent) public tabs: QueryList<NovoTabComponent>;

  @Input()
  public set selectedIndex(value: number) {
    this._selectedIndex = value;
    if (this.tabs.length) {
      this.onSelect(this.tabs.toArray()[this.selectedIndex]);
    }
  }
  public get selectedIndex(): number { return this._selectedIndex; }
  private _selectedIndex: number = 0;

  public ngAfterContentInit(): void {
    this.tabs.forEach((tab: NovoTabComponent) => {
      tab.select.subscribe((item: NovoTabComponent) => this.onSelect(item));
    });
    if (this.tabs.length) {
      this.onSelect(this.tabs.toArray()[this.selectedIndex]);
    }
  }

  public onSelect(tab: NovoTabComponent): void {
    /**
     * Deactivate all other tabs
     */
    this.tabs.forEach((t: NovoTabComponent) => t.deactivate());
    tab.activate();
    if (this.outlet) {
      this.outlet.show(this.tabs.toArray().indexOf(tab));
    }
  }
}
