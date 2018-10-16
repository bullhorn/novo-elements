import {
  Component,
  Directive,
  TemplateRef,
  Input,
  Output,
  AfterContentInit,
  ViewContainerRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoFormGroup, NovoFormControl } from './NovoFormControl';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export interface NovoControlGroupAddConfig {
  label: string;
}

@Component({
  selector: 'novo-control-group',
  template: `
        <h6 class="novo-section-header" *ngIf="label">
            <span (click)="toggle($event)" [class.clickable]="collapsible">
                <i *ngIf="icon && !collapsible" [ngClass]="icon" [attr.data-automation-id]="'novo-control-group-icon-' + key"></i>
                <i *ngIf="collapsible" class="bhi-next" [class.toggled]="toggled" [attr.data-automation-id]="'novo-control-group-collapse-' + key"></i>
                <span [attr.data-automation-id]="'novo-control-group-label-' + key">{{ label }}</span>
            </span>
            <label class="novo-control-group-description" *ngIf="description" [attr.data-automation-id]="'novo-control-group-description-' + key">{{ description }}</label>
        </h6>
        <div class="novo-control-group-controls" [class.vertical]="vertical" [class.horizontal]="!vertical" [class.hidden]="collapsible && !toggled">
            <ng-template #defaultTemplate let-index="index" let-form="form" let-key="key">
                <div class="novo-control-group-control">
                    <div *ngFor="let c of controls" class="novo-control-container" [class.is-label]="c.controlType === 'read-only'" [style.max-width.px]="c.width">
                        <novo-control [form]="form?.controls[key]['controls'][index]" [control]="c" [condensed]="!vertical || c.controlType === 'read-only'"></novo-control>
                    </div>
                    <div class="novo-control-container last" *ngIf="edit && !vertical">
                        <button [disabled]="!disabledArray[index].edit" type="button" *ngIf="edit && !vertical" theme="icon" icon="edit" (click)="editControl(index)" [attr.data-automation-id]="'novo-control-group-edit-' + key" index="-1"></button>
                    </div>
                    <div class="novo-control-container last" *ngIf="remove && !vertical">
                        <button [disabled]="!disabledArray[index].remove" type="button" *ngIf="remove && !vertical" theme="icon" icon="delete-o" (click)="removeControl(index)" [attr.data-automation-id]="'novo-control-group-delete-' + key" index="-1"></button>
                    </div>
                </div>
                <button [disabled]="!disabledArray[index].edit" type="button" *ngIf="edit && vertical" theme="icon" icon="edit" (click)="editControl(index)" [attr.data-automation-id]="'novo-control-group-edit-' + key" index="-1"></button>
                <button [disabled]="!disabledArray[index].remove" type="button" *ngIf="remove && vertical" theme="icon" icon="delete-o" (click)="removeControl(index)" [attr.data-automation-id]="'novo-control-group-delete-' + key" index="-1"></button>
            </ng-template>
            <div class="novo-control-group-labels" *ngIf="!vertical && form?.controls[key] && form?.controls[key]['controls'].length !== 0">
                <div class="novo-control-group-control-label" *ngFor="let label of controlLabels" [style.max-width.px]="label.width">
                    <span [attr.data-automation-id]="'novo-control-group-label-' + label.value">{{ label.value }}</span>
                </div>
                <div class="novo-control-group-control-label last" *ngIf="edit" [attr.data-automation-id]="'novo-control-group-edit-' + key"></div>
                <div class="novo-control-group-control-label last" *ngIf="remove" [attr.data-automation-id]="'novo-control-group-delete-' + key"></div>
            </div>
            <ng-container *ngIf="form?.controls[key]">
                <div class="novo-control-group-row" *ngFor="let control of form?.controls[key]['controls']; let index = index;">
                    <ng-template
                        [ngTemplateOutlet]="rowTemplate || defaultTemplate"
                        [ngTemplateOutletContext]="{form: form, index: index, key: key, controls: controls}">
                    </ng-template>
                </div>
            </ng-container>
            <div class="novo-control-group-empty" *ngIf="form?.controls[key] && form?.controls[key]['controls'].length === 0" [attr.data-automation-id]="'novo-control-group-empty-' + key">
                {{ emptyMessage }}
            </div>
            <p *ngIf="add">
                <button type="button" theme="dialogue" icon="add-thin" (click)="addNewControl()" [attr.data-automation-id]="'novo-control-group-bottom-add-' + key" index="-1">{{ add?.label }}</button>
            </p>
        </div>
   `,
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
  private _vertical: boolean = false;
  // Hides/shows the add button for adding a new control
  @Input()
  add: NovoControlGroupAddConfig;
  // Hide/shows the remove button for removing a control
  @Input()
  set remove(v: boolean) {
    this._remove = coerceBooleanProperty(v);
  }
  get remove() {
    return this._remove;
  }
  private _remove: boolean = false;
  // Hide/shows the edit button for editing a control
  @Input()
  set edit(v: boolean) {
    this._edit = coerceBooleanProperty(v);
  }
  get edit() {
    return this._edit;
  }
  private _edit: boolean = false;
  // Allows the control to collapse or not
  @Input()
  set collapsible(v: boolean) {
    this._collapsible = coerceBooleanProperty(v);
  }
  get collapsible() {
    return this._collapsible;
  }
  private _collapsible: boolean = false;
  // Main form group
  @Input()
  form: NovoFormGroup;
  // Controls for each item in the control group
  @Input()
  controls: BaseControl[];
  // Key of the control group (on the main form)
  @Input()
  key: string;
  // Label of the control group
  @Input()
  label: string;
  // Description of the control group (only use with position:bottom Add button!)
  @Input()
  description: string;
  // Message to display if there are no controls
  @Input()
  emptyMessage: string;
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
  @Input()
  initialValue: {}[];
  // Callback to determine if the user can edit
  @Input()
  canEdit: Function;
  // Callback to determine if the user can delete
  @Input()
  canRemove: Function;
  // Template for custom row rendering
  @Input()
  rowTemplate: TemplateRef<any>;

  @Output()
  public onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onAdd: EventEmitter<any> = new EventEmitter<any>();

  public controlLabels: { value: string; width: number }[] = [];
  public toggled: boolean = false;
  public disabledArray: { edit: boolean; remove: boolean }[] = [];

  private currentIndex: number = 0;

  constructor(private formUtils: FormUtils, private fb: FormBuilder, private ref: ChangeDetectorRef, private labels: NovoLabelService) {}

  public ngAfterContentInit(): void {
    if (!this.key) {
      throw new Error('novo-control-group must have the [key] attribute provided!');
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    let initialValueChange: SimpleChange = changes['initialValue'];

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
        };
      });
      this.ref.markForCheck();
    }
  }

  public addNewControl(value?: {}): void {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    const newCtrl: NovoFormGroup = this.buildControl(value);
    if (control) {
      control.push(newCtrl);
    } else {
      this.form.addControl(this.key, this.fb.array([newCtrl]));
    }
    this.disabledArray.push({
      edit: this.checkCanEdit(this.currentIndex),
      remove: this.checkCanRemove(this.currentIndex),
    });
    if (!value) {
      this.onAdd.emit();
    }
    this.currentIndex++;
    this.ref.markForCheck();
  }

  public buildControl(value?: {}): NovoFormGroup {
    const newControls = this.getNewControls(this.controls);
    if (value) {
      this.formUtils.setInitialValues(newControls, value);
    }
    const ctrl: NovoFormGroup = this.formUtils.toFormGroup(newControls);
    return ctrl;
  }

  public removeControl(index: number, emitEvent: boolean = true): void {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    if (emitEvent) {
      this.onRemove.emit({ value: control.at(index).value, index: index });
    }
    control.removeAt(index);
    this.ref.markForCheck();
  }

  public editControl(index: number): void {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    this.onEdit.emit({ value: control.at(index).value, index: index });
  }

  public toggle(event: MouseEvent) {
    Helpers.swallowEvent(event);
    if (this.collapsible) {
      this.toggled = !this.toggled;
      this.ref.markForCheck();
    }
  }

  private clearControls() {
    const control: FormArray = <FormArray>this.form.controls[this.key];
    if (control) {
      for (let i: number = control.controls.length; i >= 0; i--) {
        this.removeControl(i, false);
      }
      this.currentIndex = 0;
    }
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
      return this.canRemove(control.at(index).value, index);
    }
    return true;
  }

  private getNewControls(controls: BaseControl[]) {
    let ret: BaseControl[] = [];
    (this.controls || []).forEach((control: BaseControl) => {
      ret.push(new BaseControl(control.__type, control));
    });
    return ret;
  }
}
