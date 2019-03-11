// NG
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// App
import { IFieldInteractionEvent } from './FormInterfaces';
import { NovoFormControl } from './NovoFormControl';

export class NovoFormGroup extends FormGroup {
  public fieldInteractionEvents: EventEmitter<IFieldInteractionEvent> = new EventEmitter();
  public layout: string;
  public edit: boolean;
  public currentEntity: string;
  public currentEntityId: string;
  public associations: object;
  public _value: any;

  get value() {
    return this.getRawValue();
  }

  set value(v: any) {
    this._value = v;
  }

  public enableAllControls(): void {
    for (let key in this.controls) {
      if ((this.controls[key] as NovoFormControl).readOnly) {
        (this.controls[key] as NovoFormControl).readOnly = false;
        this.controls[key].enable();
      }
    }
  }

  public disableAllControls(): void {
    for (let key in this.controls) {
      if (!(this.controls[key] as NovoFormControl).readOnly) {
        (this.controls[key] as NovoFormControl).readOnly = true;
        this.controls[key].disable();
      }
    }
  }
}
