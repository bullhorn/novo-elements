// NG
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// App
import { IFieldInteractionEvent } from './FormInterfaces';
import { NovoFormControl } from './NovoFormControl';

export class NovoFormGroup extends FormGroup {
  fieldInteractionEvents: EventEmitter<IFieldInteractionEvent> = new EventEmitter();
  layout: string;
  edit: boolean;
  currentEntity: string;
  currentEntityId: string;
  associations: object;
  _value: any;

  get value() {
    return this.getRawValue();
  }

  set value(v: any) {
    this._value = v;
  }

  public enableAllControls(): void {
    for (const key in this.controls) {
      if ((this.controls[key] as NovoFormControl).readOnly) {
        (this.controls[key] as NovoFormControl).readOnly = false;
        this.controls[key].enable();
      }
    }
  }

  public disableAllControls(): void {
    for (const key in this.controls) {
      if (!(this.controls[key] as NovoFormControl).readOnly) {
        (this.controls[key] as NovoFormControl).readOnly = true;
        this.controls[key].disable();
      }
    }
  }
}
