import { Component } from '@angular/core';
import { NovoAsideRef, NovoAsideService } from 'novo-elements';

@Component({
  selector: 'aside-custom-demo',
  template: `
    <novo-toolbar>
      <novo-toolbar-row accent="candidate" gap="md">
        <novo-icon>candidate</novo-icon>
        <novo-title>Ferdinand del Toro</novo-title>
        <span class="example-spacer" flex="1"></span>
        <novo-action icon="times" (click)="close()" aria-label="close the aside icon"></novo-action>
      </novo-toolbar-row>
      <novo-toolbar-row>
        <novo-nav [outlet]="nav">
          <novo-tab>Overview</novo-tab>
          <novo-tab>Activity</novo-tab>
          <novo-tab>Files</novo-tab>
        </novo-nav>
      </novo-toolbar-row>
    </novo-toolbar>
    <section padding="lg">
      <novo-nav-outlet #nav>
        <novo-nav-content>
          <novo-card padding="md">
            <novo-card-header>
              <novo-icon color="neutral">move</novo-icon>
              <novo-title>Details</novo-title>
              <novo-action icon="refresh" tooltip="Refresh Card Data"></novo-action>
              <novo-action icon="times" tooltip="Remove Card"></novo-action>
            </novo-card-header>
            <novo-card-content condensed>
              <novo-list class="bgc-off-white-striped" direction="vertical">
                <novo-value row *ngFor="let value of values" [label]="value.label" [data]="value.data"></novo-value>
              </novo-list>
            </novo-card-content>
          </novo-card>
        </novo-nav-content>
        <novo-nav-content>
          <h1>Tab 2 Content</h1>
        </novo-nav-content>
      </novo-nav-outlet>
    </section>
  `,
  host: {
    '[style.display]': "'block'",
    '[style.width.%]': "'100'",
  },
})
export class AsideCustomDemo {
  public values = [
    { label: 'Status', data: 'Open' },
    { label: 'Phone', data: '555-555-5555' },
    { label: 'Address', data: 'Boston, MA' },
  ];
  constructor(private ref: NovoAsideRef) {}
  close() {
    this.ref.close();
  }
}

/**
 * @title Aside Usage Example
 */
@Component({
  selector: 'aside-usage-example',
  templateUrl: 'aside-usage-example.html',
  styleUrls: ['aside-usage-example.css'],
})
export class AsideUsageExample {
  constructor(private aside: NovoAsideService) {}
  showAside() {
    this.aside.open(AsideCustomDemo);
  }
}
