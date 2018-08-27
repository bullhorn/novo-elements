// NG2
import { Component, ElementRef, ViewContainerRef, ViewChild, Input, OnInit } from '@angular/core';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';

@Component({
  selector: 'novo-row-details',
  template: `
        <span #container></span>
        <span>{{value}}</span>
    `,
})
export class RowDetails implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input()
  data: any;
  @Input()
  renderer: any;

  value: any = '';

  constructor(private element: ElementRef, private componentUtils: ComponentUtils) {}

  ngOnInit() {
    if (this.renderer) {
      if (this.renderer.prototype instanceof BaseRenderer) {
        let componentRef = this.componentUtils.appendNextToLocation(this.renderer, this.container);
        componentRef.instance.data = this.data;
      } else {
        this.value = this.renderer(this.data);
      }
    } else {
      // this.value = this.row[this.column.name];
    }
  }
}
