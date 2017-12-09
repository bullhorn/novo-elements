import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'novo-loading',
  templateUrl: './novo-loading.html',
})

export class NovoLoadingComponent {
  @HostBinding('class') @Input() public theme: string;
}

@Component({
  selector: 'novo-spinner',
  templateUrl: './novo-spinner.html',
})

export class NovoSpinnerComponent {
  @Input() public theme: string;
  @Input() public inverse: boolean;
  @Input() public baseHref: string;
}
