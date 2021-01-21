import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormUtils, NovoFormGroup} from 'novo-elements';
import { NovoControlGroupAddConfig } from '../form/ControlGroup';

@Component({
  selector: 'novo-Embedded-form-group',
  template: `
    <novo-control-group [key]="key" remove="true" edit="false" [canRemove]="onCanRemove"
                        [add]="add" [initialValue]="initialValue" [form]="form" [controls]="controls"
                        (onRemove)="onRemoveEvent($event)" (change)="onChangeEvent()"></novo-control-group>
  `,
})

export class NovoEmbeddedFormGroup implements OnInit {

  @Input() key: string;
  @Input() onCanRemove: Function;
  @Input() add: NovoControlGroupAddConfig;

  @Output() onRemove = new EventEmitter<{ value; index }>();
  @Output() onEdit = new EventEmitter<{ value; index }>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  form: NovoFormGroup;
  controls = [];
  initialValue;

  constructor(private formUtils: FormUtils) {
  }

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }

  onChangeEvent() {
    this.change.emit();
  }

  onRemoveEvent(event) {
    this.onRemove.emit(event);
  }
}
