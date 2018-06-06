// NG2
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { NovoControlConfig } from './FormControls';
import { IFieldInteractionEvent } from './FormInterfaces';
import { notify } from '../../utils/notifier/notifier.util';

export class NovoFormControl extends FormControl {
  displayValueChanges: EventEmitter<any> = new EventEmitter<any>();
  hidden: boolean;
  encrypted: boolean;
  key: string;
  required: boolean;
  readOnly: boolean;
  hasRequiredValidator: boolean;
  label: string;
  tooltip: string;
  tooltipPosition: string;
  initialValue: any;
  valueHistory: any[] = [];
  validators: any;
  config: any;
  sortOrder: number;
  controlType: string;
  placeholder: string;
  multiple: boolean;
  headerConfig: any;
  optionsType: string;
  maxlength: number;
  minlength: number;
  options: Array<any>;
  type: string;
  subType: string;
  name: string;
  closeOnSelect: boolean;
  interactions: Array<Object>;
  appendToBody: boolean; // Deprecated
  parentScrollSelector: string;
  description?: string;
  layoutOptions?: { order?: string, download?: boolean, labelStyle?: string, draggable?: boolean, iconStyle?: string };
  military?: boolean;
  dateFormat?: string;
  textMaskEnabled?: boolean;
  allowInvalidDate?: boolean;
  tipWell?: {
    tip: string,
    icon?: string,
    button?: boolean;
  };
  rawValue?: any;

  private historyTimeout: any;


  constructor(value: any, control: NovoControlConfig) {
    super(value, control.validators, control.asyncValidators);
    this.validators = control.validators;
    this.initialValue = value;
    this.valueHistory.push(value);
    this.key = control.key;
    this.label = control.label;
    this.readOnly = control.readOnly;
    this.hidden = control.hidden;
    this.encrypted = control.encrypted;
    this.config = control.config;
    this.type = control.type;
    this.subType = control.subType;
    this.required = control.required;
    this.hasRequiredValidator = this.required;
    this.tooltip = control.tooltip;
    this.tooltipPosition = control.tooltipPosition;
    this.label = control.label;
    this.name = control.name;
    this.required = control.required;
    this.sortOrder = control.sortOrder;
    this.controlType = control.controlType;
    this.placeholder = control.placeholder;
    this.multiple = control.multiple;
    this.headerConfig = control.headerConfig;
    this.optionsType = control.optionsType;
    this.readOnly = control.readOnly;
    this.layoutOptions = control.layoutOptions;
    this.military = control.military;
    this.dateFormat = control.dateFormat;
    this.textMaskEnabled = control.textMaskEnabled;
    this.allowInvalidDate = control.allowInvalidDate;
    this.maxlength = control.maxlength;
    this.minlength = control.minlength;
    this.closeOnSelect = control.closeOnSelect;
    this.interactions = control.interactions;
    this.appendToBody = control.appendToBody;
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    this.parentScrollSelector = control.parentScrollSelector;
    this.description = control.description;
    this.options = control.options;
    this.tipWell = control.tipWell;

    // Reactive Form, need to enable/disable, can't bind to [disabled]
    if (this.readOnly) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * @name hide
   * @param clearValue - flag to reset the control's value
   */
  public hide(clearValue: boolean = true): void {
    this.hidden = true;
    if (clearValue) {
      this.setValue(null);
    }
  }

  /**
   * @name show
   */
  public show(): void {
    this.hidden = false;
  }

  /**
   * @name setRequired
   * @param isRequired
   */
  public setRequired(isRequired: boolean): void {
    this.required = isRequired;
    // Update validators to have the required
    if (this.required && !this.hasRequiredValidator) {
      let validators: any = [...this.validators];
      validators.push(Validators.required);
      // TODO: duplicated below
      this.setValidators(validators);
      this.updateValueAndValidity();
      this.hasRequiredValidator = this.required;
    } else if (!this.required && this.hasRequiredValidator) {
      let validators: any = [...this.validators];
      validators = validators.filter(val => val !== Validators.required);
      // TODO: duplicated above
      this.setValidators(validators);
      this.updateValueAndValidity();
      this.hasRequiredValidator = this.required;
    }
  }

  /**
   * @name setValue
   *
   * @param value
   * @param onlySelf
   * @param emitEvent
   * @param emitModelToViewChange
   * @param emitViewToModelChange
   *
   */
  public setValue(value: any, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange }: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}) {
    this.markAsDirty();
    this.markAsTouched();
    this.displayValueChanges.emit(value);
    super.setValue(value, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange });

    // History
    clearTimeout(this.historyTimeout);
    this.historyTimeout = setTimeout(() => {
      this.valueHistory.push(value);
    }, 300);
  }

  /**
   * @name setReadOnly
   * @param isReadOnly
   */
  public setReadOnly(isReadOnly: boolean): void {
    this.readOnly = isReadOnly;
    if (this.readOnly) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * @name markAsInvalid
   * @param message
   */
  markAsInvalid(message: string): void {
    this.markAsDirty();
    this.markAsTouched();
    this.setErrors(Object.assign({}, this.errors, { custom: message }));
  }
}


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
}
