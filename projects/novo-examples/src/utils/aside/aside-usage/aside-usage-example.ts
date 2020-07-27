import { Component } from '@angular/core';
import { NovoAsideService, NovoAsideRef } from 'novo-elements';

@Component({
  selector: 'aside-custom-demo',
  template: `
    <div>
      <h1>I have a trending icon!</h1>
      <h2>This notification type allows for any Bullhorn Icon</h2>
      <button theme="primary" icon="check" (click)="close()">Sweet.</button>
    </div>
  `,
})
export class AsideCustomDemo {
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
