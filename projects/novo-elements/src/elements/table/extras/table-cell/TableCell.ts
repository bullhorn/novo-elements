// NG2
import { Component, ElementRef, ViewChild, ViewContainerRef, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Vendor
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';

@Component({
  selector: 'novo-table-cell',
  template: `
        <div [ngSwitch]="column._type">
            <span #container></span>
            <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
            <a *ngSwitchCase="'link'" (click)="onClick($event);">{{ value }}</a>
            <span *ngSwitchDefault>{{ value }}</span>
        </div>
    `,
})
export class TableCell implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input()
  column: any;
  @Input()
  row: any;
  @Input()
  form: FormGroup;
  @Input()
  hasEditor: boolean;

  public value: any = '';
  private valueChangeSubscription: any;

  constructor(private element: ElementRef, private componentUtils: ComponentUtils) {
    this.element = element;
    this.componentUtils = componentUtils;
  }

  ngOnInit() {
    this.column._type = this.column.type || 'text';
    if (this.column.renderer) {
      if (this.column.renderer.prototype instanceof BaseRenderer) {
        this.column._type = 'custom';
        let componentRef = this.componentUtils.appendNextToLocation(this.column.renderer, this.container);
        componentRef.instance.meta = this.column;
        componentRef.instance.data = this.row;
        componentRef.instance.value = this.form && this.hasEditor ? this.form.value[this.column.name] : this.row[this.column.name];
        // TODO - save ref to this and update in the valueChanges below!!
      } else {
        // TODO - wtf to do here?
        this.value = this.column.renderer(this.row);
      }
    } else {
      this.value = this.form && this.hasEditor ? this.form.value[this.column.name] : this.row[this.column.name];
    }

    if (this.form && this.hasEditor) {
      this.valueChangeSubscription = this.form.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe((value) => {
          this.value = value[this.column.name];
        });
    }
  }

  ngOnDestroy() {
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }

  onClick(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.column.onClick) {
      this.column.onClick(this.row);
    }
  }
}
