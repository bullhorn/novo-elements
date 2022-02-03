// NG
import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange,
  SimpleChanges, TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
// App
import { NovoFormGroup } from './NovoFormGroup';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';

export interface NovoControlGroupAddConfig {
  label: string;
}

export interface NovoControlGroupRowConfig {
  edit: boolean;
  remove: boolean;
}

@Component({
  selector: 'novo-control-group',
  templateUrl: './ControlGroup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoControlGroup implements AfterContentInit, OnChanges, OnDestroy {
  // Sets the display of the group to either be row (default) or vertical via flex-box
  @Input()
  set vertical(v: boolean) {
    this._vertical = coerceBooleanProperty(v);
  }
  get vertical() {
    return this._vertical;
  }
  private _vertical = false;
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
  // Edit icon at the end of each row (no bhi- prefix)
  @Input() editIcon = 'edit';
  // Remove icon at the end of each row (no bhi- prefix)
  @Input() removeIcon = 'delete-o';
  // The initial value object, will create the form rows off of
  @Input() initialValue: {}[];
  // Callback to determine if the user can edit
  @Input() canEdit: Function;
  // Callback to determine if the user can delete
  @Input() canRemove: Function;
  // Optional callback for whether or not to remove the given row
  @Input() shouldRemove: (number) => Promise<boolean>;
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
  disabledArray: { edit: boolean; remove: boolean }[] = [];

  currentIndex = 0;

  constructor(private formUtils: FormUtils, private fb: FormBuilder, private ref: ChangeDetectorRef) {}

  ngAfterContentInit() {
    if (!this.key) {
      throw new Error('novo-control-group must have the [key] attribute provided!');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const initialValueChange: SimpleChange = changes['initialValue'];

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

  ngOnDestroy() {
    this.clearControls();
  }

  onChange() {
    this.change.emit(this);
  }

  resetAddRemove() {
    this.disabledArray.forEach((item: NovoControlGroupRowConfig, idx: number) => {
      item.edit = this.checkCanEdit(idx);
      item.remove = this.checkCanRemove(idx);
    });
    this.ref.markForCheck();
  }

  addNewControl(value?: {}) {
    const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
    const nestedFormGroup: NovoFormGroup = this.buildNestedFormGroup(value);
    if (controlsArray) {
      controlsArray.push(nestedFormGroup);
    } else {
      this.form.addControl(this.key, this.fb.array([nestedFormGroup]));
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
    this.assignIndexes();
    // Ensure that field interaction changes for nested forms originating from outside the form will be reflected in the nested elements
    nestedFormGroup.fieldInteractionEvents.subscribe(this.onFieldInteractionEvent.bind(this));
    this.ref.markForCheck();
  }

  /**
   * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
   * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
   */
  removeControl(index: number, emitEvent = true) {
    if (emitEvent && Helpers.isFunction(this.shouldRemove)) {
      this.shouldRemove(index).then((shouldRemove: boolean) => {
        if (shouldRemove) {
          this.doRemoveControl(index, emitEvent);
        }
      });
    } else {
      this.doRemoveControl(index, emitEvent);
    }
  }

  private doRemoveControl(index: number, emitEvent: boolean) {
    const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
    const nestedFormGroup = controlsArray.at(index) as NovoFormGroup;
    nestedFormGroup.fieldInteractionEvents.unsubscribe();
    if (emitEvent) {
      this.onRemove.emit({ value: nestedFormGroup.value, index });
    }
    controlsArray.removeAt(index);
    this.disabledArray = this.disabledArray.filter((value: NovoControlGroupRowConfig, idx: number) => idx !== index);
    this.resetAddRemove();
    this.currentIndex--;
    this.assignIndexes();
    this.ref.markForCheck();
  }

  editControl(index: number) {
    const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
    this.onEdit.emit({ value: controlsArray.at(index).value, index });
  }

  toggle(event: MouseEvent) {
    Helpers.swallowEvent(event);
    if (this.collapsible) {
      this.toggled = !this.toggled;
      this.ref.markForCheck();
    }
  }

  private buildNestedFormGroup(value?: {}): NovoFormGroup {
    const newControls = this.getNewControls();
    if (value) {
      this.formUtils.setInitialValues(newControls, value);
    }
    return this.formUtils.toFormGroup(newControls);
  }

  private clearControls() {
    const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
    if (controlsArray) {
      for (let i: number = controlsArray.length - 1; i >= 0; i--) {
        this.removeControl(i, false);
      }
      this.currentIndex = 0;
    }
  }

  private checkCanEdit(index: number): boolean {
    if (this.canEdit) {
      const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
      return this.canEdit(controlsArray.at(index).value, index);
    }
    return true;
  }

  private checkCanRemove(index: number): boolean {
    if (this.canRemove) {
      const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
      if (controlsArray.at(index)) {
        return this.canRemove(controlsArray.at(index).value, index);
      }
      return true;
    }
    return true;
  }

  private getNewControls() {
    const ret: BaseControl[] = [];
    (this.controls || []).forEach((control: BaseControl) => {
      ret.push(new BaseControl(control.__type, control));
    });
    return ret;
  }

  private assignIndexes() {
    const controlsArray: FormArray = <FormArray>this.form.controls[this.key];
    if (controlsArray) {
      for (let i: number = 0; i < controlsArray.length; i++) {
        const form = controlsArray.at(i) as NovoFormGroup;
        form.associations = { ...form.associations, index: i };
      }
    }
  }

  private onFieldInteractionEvent() {
    this.ref.markForCheck();
  }
}
