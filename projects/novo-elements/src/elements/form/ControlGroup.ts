// NG
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
// App
import { NovoFormGroup } from './NovoFormGroup';

export interface NovoControlGroupAddConfig {
  label: string;
}

export enum EditState {
  EDITING = 'editing',
  NOT_EDITING = 'notediting',
}

export interface NovoControlGroupRowConfig {
  edit: boolean;
  remove: boolean;
  state: EditState;
}

@Component({
  selector: 'novo-control-group',
  templateUrl: './ControlGroup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoControlGroup implements AfterContentInit, OnChanges {
  // Sets the display of the group to either be row (default) or vertical via flex-box
  @Input()
  set vertical(v: boolean) {
    this._vertical = coerceBooleanProperty(v);
  }
  get vertical() {
    return this._vertical;
  }
  private _vertical = false;
  @Input()
  set stacked(v: boolean) {
    this._stacked = coerceBooleanProperty(v);
  }
  get stacked() {
    return this._stacked;
  }
  private _stacked = false;

  // Hides/shows the add button for adding a new control
  @Input() add: NovoControlGroupAddConfig;
  // Hide/shows the remove button for removing a control
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
  // Allows the control to collapse or not
  @Input()
  set collapsible(v: boolean) {
    this._collapsible = coerceBooleanProperty(v);
  }
  get collapsible() {
    return this._collapsible;
  }
  private _collapsible = false;
  // Main form group
  @Input() form: NovoFormGroup;
  // Controls for each item in the control group
  @Input() controls: BaseControl[];
  // Key of the control group (on the main form)
  @Input() key: string;
  // Label of the control group
  @Input() label: string;
  // Description of the control group (only use with position:bottom Add button!)
  @Input() description: string;
  // Message to display if there are no controls
  @Input() emptyMessage: string;
  // Icon of the control group (can have bhi prefix or not)
  @Input()
  set icon(v: string) {
    this._icon = v && v.indexOf('bhi') !== -1 ? v : `bhi-${v}`;
  }
  get icon() {
    return this._icon;
  }
  private _icon: string;
  // The initial value object, will create the form rows off of
  @Input() initialValue: {}[];
  // Callback to determine if the user can edit
  @Input() canEdit: Function;
  // Callback to determine if the user can delete
  @Input() canRemove: Function;
  // Template for custom row rendering
  @Input() rowTemplate: TemplateRef<any>;
  // Template for custom column label rendering
  @Input() columnLabelTemplate: TemplateRef<any>;

  @Output() onRemove = new EventEmitter<{ value; index }>();
  @Output() onEdit = new EventEmitter<{ value; index }>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  controlLabels: { value: string; width: number; required: boolean; key: string }[] = [];
  toggled = false;
  disabledArray: NovoControlGroupRowConfig[] = [];
  editState: EditState = EditState.NOT_EDITING;
  currentIndex = 0;

  constructor(private formUtils: FormUtils, private fb: FormBuilder, private ref: ChangeDetectorRef, private labels: NovoLabelService) {}

  ngAfterContentInit() {
    if (!this.key) {
      throw new Error('novo-control-group must have the [key] attribute provided!');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const initialValueChange: SimpleChange = changes.initialValue;

    // If initial value changes, clear the controls
    if (initialValueChange && initialValueChange.currentValue !== initialValueChange.previousValue && !initialValueChange.firstChange) {
      this.clearControls();
    }

    // Check for array, add a control for each value
    if (this.initialValue && Array.isArray(this.initialValue)) {
      if (this.initialValue.length !== 0) {
        this.currentIndex = 0;
        this.initialValue.forEach((value) => this.addNewControl(value));
      }
    } else if (this.initialValue) {
      // If value is an object, just add one control
      this.addNewControl(this.initialValue);
    }
    // If we are horizontal, grab the labels to help with layout
    if (!this.vertical) {
      this.controlLabels = (this.controls || []).map((control: BaseControl) => {
        return {
          value: control.label,
          width: control.width,
          required: control.required,
          key: control.key,
        };
      });
      this.ref.markForCheck();
    }
  }

  onChange(change) {
    this.change.emit(this);
  }

  onClickAdd() {
    this.addNewControl();
    // this.editState = EditState.EDITING;
  }
  onClickCancel() {
    this.editState = EditState.NOT_EDITING;
  }
  onClickSave() {
    this.disabledArray[this.currentIndex - 1].state = EditState.NOT_EDITING;
    this.editState = EditState.NOT_EDITING;
    const control: FormArray = this.form.controls[this.key] as FormArray;
    if (control) {
      const fg: NovoFormGroup = control.at(this.currentIndex - 1) as NovoFormGroup;
      fg.disableAllControls();
    }
  }

  resetAddRemove() {
    this.disabledArray.forEach((item: NovoControlGroupRowConfig, idx: number) => {
      item.edit = this.checkCanEdit(idx);
      item.remove = this.checkCanRemove(idx);
      if (!item.edit) {
        item.state = EditState.NOT_EDITING;
      }
    });
    this.ref.markForCheck();
  }

  addNewControl(value?: {}) {
    const control: FormArray = this.form.controls[this.key] as FormArray;
    const newCtrl: NovoFormGroup = this.buildControl(value);
    if (control) {
      control.push(newCtrl);
    } else {
      this.form.addControl(this.key, this.fb.array([newCtrl]));
    }
    this.disabledArray.push({
      state: EditState.EDITING,
      edit: true,
      remove: true,
    });
    this.resetAddRemove();
    if (!value) {
      this.onAdd.emit(newCtrl);
    }
    this.currentIndex++;
    this.ref.markForCheck();
  }

  buildControl(value?: {}): NovoFormGroup {
    const newControls = this.getNewControls(this.controls);
    if (value) {
      this.formUtils.setInitialValues(newControls, value);
    }
    const ctrl: NovoFormGroup = this.formUtils.toFormGroup(newControls);
    return ctrl;
  }

  removeControl(index: number, emitEvent = true) {
    const control: FormArray = this.form.controls[this.key] as FormArray;
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
    const control: FormArray = this.form.controls[this.key] as FormArray;
    const fg = control.at(index) as NovoFormGroup;
    fg.enableAllControls();
    this.onEdit.emit({ value: control.at(index).value, index });
  }

  toggle(event: MouseEvent) {
    Helpers.swallowEvent(event);
    if (this.collapsible) {
      this.toggled = !this.toggled;
      this.ref.markForCheck();
    }
  }

  private clearControls() {
    const control: FormArray = this.form.controls[this.key] as FormArray;
    if (control) {
      for (let i: number = control.controls.length; i >= 0; i--) {
        this.removeControl(i, false);
      }
      this.currentIndex = 0;
    }
  }

  private checkCanEdit(index: number): boolean {
    if (this.canEdit) {
      const control: FormArray = this.form.controls[this.key] as FormArray;
      return this.canEdit(control.at(index).value, index);
    }
    return true;
  }

  private checkCanRemove(index: number): boolean {
    if (this.canRemove) {
      const control: FormArray = this.form.controls[this.key] as FormArray;
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

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_stacked: BooleanInput;
  static ngAcceptInputType_vertical: BooleanInput;
}
