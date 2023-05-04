// NG
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  public fieldsets: any[];
  public _value: any;
  public controls: { [key: string]: any };
  public novoControls: any[];

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
