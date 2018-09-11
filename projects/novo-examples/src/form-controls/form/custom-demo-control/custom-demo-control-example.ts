import { Component, Input } from '@angular/core';

/**
 * @title Custom Demo Control
 */
@Component({
  selector: 'custom-demo-control-example',
  template: `<div [formGroup]="form">
        My Custom Input <input [formControlName]="control.key" [id]="control.key" [type]="control.type" [placeholder]="control.placeholder">
    </div>`,
})
export class CustomDemoControlExample {
  @Input()
  control;
  @Input()
  form: any;
  @Input()
  edit: any;
  @Input()
  save: any;
  @Input()
  delete: any;
  @Input()
  upload: any;
}
