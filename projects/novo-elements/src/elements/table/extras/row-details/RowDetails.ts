// NG2
import { Component, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
  selector: 'novo-row-details',
  template: ` <span #container></span> <span>{{ value }}</span> `,
})
export class RowDetails implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
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
        const componentRef: ComponentRef<RowDetails> = this.componentUtils.append(this.renderer, this.container);
        componentRef.instance.data = this.data;
      } else {
        this.value = this.renderer(this.data);
      }
    } else {
      // this.value = this.row[this.column.name];
    }
  }
}
