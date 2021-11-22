import { Component } from '@angular/core';

@Component({
  template: ` <novo-select (selectionChange)="onChange($event)"></novo-select> `,
})
class A {}
