// NG2
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'novo-value',
    template:`<div class="label" [innerHTML]="data.label"></div>
    <div class="value" [innerHTML]="data.value" *ngSwitchDefault></div>
    `
})
export class ValueElement implements OnInit {
  @Input() data: any;
  @Input() meta: any;

  ngOnInit() {
  }
}
