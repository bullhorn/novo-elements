import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormUtils, NovoFormGroup} from 'novo-elements';
import {NovoControlGroupAddConfig, NovoControlGroupRowConfig} from './ControlGroup';
import {FormArray, FormBuilder} from '@angular/forms';
import {BaseControl} from './controls/BaseControl';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'novo-Embedded-form-group',
  template: `
    <novo-control-templates></novo-control-templates>
    <h6> it works</h6><div class="novo-control-group-controls horizontal">
      <div class="novo-control-group-control">
        <div *ngFor="let c of controls; let i = index" class="novo-control-container {{c.key}}" [class.is-label]="c.controlType === 'read-only'" [style.max-width.px]="c.width">
          <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="c.__type !== 'embedded-form-group'">
            <novo-control (change)="onChange($event)" [form]="form" [control]="c" [condensed]="c.controlType === 'read-only'"></novo-control>
          </div>
          <div *ngIf="c.__type === 'embedded-form-group'">
            <novo-Embedded-form-group [control]="c"></novo-Embedded-form-group>
          </div>
        <div class="novo-control-container last" *ngIf="edit">
          <button [disabled]="!disabledArray[i].edit" type="button" *ngIf="edit" theme="icon" icon="edit" (click)="editControl(i)" [attr.data-automation-id]="'novo-control-group-edit-' + key" index="-1"></button>
        </div>
        <div class="novo-control-container last" *ngIf="remove">
          <button [disabled]="!disabledArray[i].remove" type="button" *ngIf="remove" theme="icon" icon="delete-o" (click)="removeControl(i)" [attr.data-automation-id]="'novo-control-group-delete-' + key" index="-1"></button>
        </div>
      </div>
      </div>

      <div class="novo-control-group-control-label {{ label.key }}" *ngFor="let label of controlLabels" [style.max-width.px]="label.width" [class.column-required]="label.required">
        <span [attr.data-automation-id]="'novo-control-group-label-' + label.value">{{ label.value }}</span>
      </div>
      <div class="novo-control-group-control-label last" *ngIf="edit" [attr.data-automation-id]="'novo-control-group-edit-' + key"></div>
      <div class="novo-control-group-control-label last" *ngIf="remove" [attr.data-automation-id]="'novo-control-group-delete-' + key"></div>
    <p *ngIf="add">
      <button type="button" theme="dialogue" icon="add-thin" (click)="addNewControl()" [attr.data-automation-id]="'novo-control-group-bottom-add-' + key" index="-1">
        {{ add?.label }}
      </button>
    </p>
  </div>
  `,
})

export class NovoEmbeddedFormGroup implements OnInit, OnChanges {
  @Input() onCanRemove: Function;
  @Input() add: NovoControlGroupAddConfig;
  @Input()
  set remove(v: boolean) {
    this._remove = coerceBooleanProperty(v);
  }
  get remove() {
    return this._remove;
  }
  private _remove = false;
  // Hide/shows the edit button for editing a control
  @Input()
  set edit(v: boolean) {
    this._edit = coerceBooleanProperty(v);
  }
  get edit() {
    return this._edit;
  }
  private _edit = false;
  // Callback to determine if the user can edit
  @Input() canEdit: Function;
  // Callback to determine if the user can delete
  @Input() canRemove: Function;

  @Input() control: any;
  @Input() parentForm: any;
  controls = [];

  @Output() onRemove = new EventEmitter<{ value; index }>();
  @Output() onEdit = new EventEmitter<{ value; index }>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  key: string;
  form: NovoFormGroup;
  initialValue;
  currentIndex = 0;
  disabledArray: { edit: boolean; remove: boolean }[] = [];
  controlLabels: { value: string; width: number; required: boolean; key: string }[] = [];

  constructor(private formUtils: FormUtils, private ref: ChangeDetectorRef,  private fb: FormBuilder) {
  }

  ngOnInit() {
    this.key = this.control.key;
    this.controls = this.formUtils.toControls(this.control.associatedEntity, null, null, {});
    this.form = this.formUtils.toFormGroup(this.controls);
  }

  ngOnChanges() {
    this.controlLabels = (this.controls || []).map((control: BaseControl) => {
      return {
        value: control.label,
        width: control.width,
        required: control.required,
        key: control.key,
      };
    });
  }

  onChange(event) {
    this.change.emit(event);
  }

  onRemoveEvent(event) {
    this.onRemove.emit(event);
  }

  addNewControl(value?: {}) {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    const newCtrl: NovoFormGroup = this.buildControl(value);
    if (control) {
      control.push(newCtrl);
    } else {
      this.form.addControl(this.key, this.fb.array([newCtrl]));
    }
    this.disabledArray.push({
      edit: true,
      remove: true,
    });
    this.resetAddRemove();
    if (!value) {
      this.onAdd.emit();
    }
    this.currentIndex++;
    this.ref.markForCheck();
  }

  removeControl(index: number, emitEvent = true) {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    if (emitEvent) {
      this.onRemove.emit({ value: control.at(index).value, index });
    }
    control.removeAt(index);
    this.disabledArray = this.disabledArray.filter((value: NovoControlGroupRowConfig, idx: number) => idx !== index);
    this.resetAddRemove();
    this.currentIndex--;
    this.ref.markForCheck();
  }

  editControl(index: number) {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    this.onEdit.emit({ value: control.at(index).value, index });
  }

  resetAddRemove() {
    this.disabledArray.forEach((item: NovoControlGroupRowConfig, idx: number) => {
      item.edit = this.checkCanEdit(idx);
      item.remove = this.checkCanRemove(idx);
    });
    this.ref.markForCheck();
  }

  private checkCanEdit(index: number): boolean {
    if (this.canEdit) {
      const control: FormArray = <FormArray>this.form.controls[this.key];
      return this.canEdit(control.at(index).value, index);
    }
    return true;
  }

  private checkCanRemove(index: number): boolean {
    if (this.canRemove) {
      const control: FormArray = <FormArray>this.form.controls[this.key];
      if (control.at(index)) {
        return this.canRemove(control.at(index).value, index);
      }
      return true;
    }
    return true;
  }

  private getNewControls(controls: BaseControl[]) {
    const ret: BaseControl[] = [];
    (this.controls || []).forEach((control: BaseControl) => {
      ret.push(new BaseControl(control.__type, control));
    });
    return ret;
  }

  buildControl(value?: {}): NovoFormGroup {
    const newControls = this.getNewControls(this.controls);
    if (value) {
      this.formUtils.setInitialValues(newControls, value);
    }
    const ctrl: NovoFormGroup = this.formUtils.toFormGroup(newControls);
    return ctrl;
  }
}
