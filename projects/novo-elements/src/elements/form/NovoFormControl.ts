// NG2
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { NovoControlConfig } from './FormControls';
import { notify } from '../../utils/notifier/notifier.util';
import { IMaskOptions } from './Control';

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
  tooltipSize?: string;
  tooltipPreline?: boolean;
  removeTooltipArrow?: boolean;
  tooltipAutoPosition?: boolean;
  initialValue: any;
  valueHistory = [];
  validators: any;
  config: any;
  sortOrder: number;
  controlType: string;
  placeholder: string;
  minimal: boolean;
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
  layoutOptions?: { order?: string; download?: boolean; labelStyle?: string; draggable?: boolean; iconStyle?: string };
  military?: boolean;
  dateFormat?: string;
  currencyFormat?: string;
  startDate?: Date | Number;
  endDate?: Date | Number;
  weekStart?: number;
  textMaskEnabled?: boolean;
  maskOptions: IMaskOptions;
  allowInvalidDate?: boolean;
  tipWell?: {
    tip: string;
    icon?: string;
    button?: boolean;
    sanitize?: boolean;
  };
  rawValue?: any;
  customControlConfig?: any;
  checkboxLabel?: string;
  restrictFieldInteractions?: boolean;
  warning?: string;
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
    this.tooltipSize = control.tooltipSize;
    this.tooltipPreline = control.tooltipPreline;
    this.removeTooltipArrow = control.removeTooltipArrow;
    this.tooltipAutoPosition = control.tooltipAutoPosition;
    this.label = control.label;
    this.name = control.name;
    this.required = control.required;
    this.sortOrder = control.sortOrder;
    this.controlType = control.controlType;
    this.placeholder = control.placeholder;
    this.minimal = control.minimal;
    this.multiple = control.multiple;
    this.headerConfig = control.headerConfig;
    this.optionsType = control.optionsType;
    this.readOnly = control.readOnly;
    this.layoutOptions = control.layoutOptions;
    this.military = control.military;
    this.dateFormat = control.dateFormat;
    this.currencyFormat = control.currencyFormat;
    this.startDate = control.startDate;
    this.endDate = control.endDate;
    this.weekStart = control.weekStart;
    this.textMaskEnabled = control.textMaskEnabled;
    this.textMaskEnabled = control.textMaskEnabled;
    this.maskOptions = control.maskOptions;
    this.allowInvalidDate = control.allowInvalidDate;
    this.maxlength = control.maxlength;
    this.minlength = control.minlength;
    this.closeOnSelect = control.closeOnSelect;
    this.interactions = control.interactions;
    this.checkboxLabel = control.checkboxLabel;
    this.restrictFieldInteractions = control.restrictFieldInteractions;
    this.appendToBody = control.appendToBody;
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    this.parentScrollSelector = control.parentScrollSelector;
    this.description = control.description;
    this.options = control.options;
    this.tipWell = control.tipWell;
    this.customControlConfig = control.customControlConfig;
    this.warning = control.warning;

    // Reactive Form, need to enable/disable, can't bind to [disabled]
    if (this.readOnly) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * @param clearValue - flag to reset the control's value
   */
  hide(clearValue: boolean = true): void {
    this.hidden = true;
    if (clearValue) {
      this.setValue(null);
    }
  }

  show(): void {
    this.hidden = false;
  }

  setRequired(isRequired: boolean): void {
    this.required = isRequired;
    // Update validators to have the required
    if (this.required && !this.hasRequiredValidator) {
      const validators: any = [...this.validators];
      validators.push(Validators.required);
      // TODO: duplicated below
      this.setValidators(validators);
      this.updateValueAndValidity({ emitEvent: false });
      this.hasRequiredValidator = this.required;
    } else if (!this.required && this.hasRequiredValidator) {
      let validators: any = [...this.validators];
      validators = validators.filter((val) => val !== Validators.required);
      // TODO: duplicated above
      this.setValidators(validators);
      this.updateValueAndValidity({ emitEvent: false });
      this.hasRequiredValidator = this.required;
    }
  }

  setValue(
    value: any,
    {
      onlySelf,
      emitEvent,
      emitModelToViewChange,
      emitViewToModelChange,
    }: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    } = {},
  ) {
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

  setReadOnly(isReadOnly: boolean): void {
    this.readOnly = isReadOnly;
    if (this.readOnly) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * Disables the control. This means the control will be exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * If the control has children, all children will be disabled to maintain the model.
   */
  disable(opts: { onlySelf?: boolean; emitEvent?: boolean } = { emitEvent: false }): void {
    if (typeof opts.emitEvent === 'undefined') {
      opts.emitEvent = false;
    }
    super.disable(opts);
  }

  enable(opts: { onlySelf?: boolean; emitEvent?: boolean } = { emitEvent: false }): void {
    if (typeof opts.emitEvent === 'undefined') {
      opts.emitEvent = false;
    }
    super.enable(opts);
  }

  markAsInvalid(message: string): void {
    this.markAsDirty();
    this.markAsTouched();
    this.setErrors(Object.assign({}, this.errors, { custom: message }));
  }

  markAsValid(): void {
    this.setErrors(null);
  }
}
