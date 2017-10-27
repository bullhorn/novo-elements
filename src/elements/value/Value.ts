// NG2
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'novo-value',
    template:`<div> {{data}} </div>`
})
export class ValueElement implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }
}
