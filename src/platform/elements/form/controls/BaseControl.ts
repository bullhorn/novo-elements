// NG2
import { Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { Helpers } from '../../../utils/Helpers';
import { NovoControlGroupAddConfig } from '../ControlGroup';
import { notify } from '../../../utils/notifier/notifier.util';

export interface NovoGroupedControlConfig {
  label?: string;
  icon?: string;
  add?: NovoControlGroupAddConfig;
  remove?: boolean;
  key: string;
  initialValue?: {}[];
}

export interface NovoControlConfig {
  validators?: Array<any>;
  asyncValidators?: Array<any>;
  value?: any;
  key?: string;
  label?: string;
  checkboxLabel?: string;
  required?: boolean;
  hidden?: boolean;
  encrypted?: boolean;
  sortOrder?: number;
  controlType?: string;
  placeholder?: string;
  config?: any;
  dirty?: boolean;
  multiple?: boolean;
  headerConfig?: any;
  currencyFormat?: string;
  associatedEntity?: string;
  optionsType?: string;
  forceClear?: EventEmitter<any>;
  disabled?: boolean;
  maxlength?: number;
  minlength?: number;
  options?: Array<any>;
  type?: string;
  subType?: string;
  name?: string;
  readOnly?: boolean;
  closeOnSelect?: boolean;
  interactions?: Array<Object>;
  dataSpecialization?: string;
  appendToBody?: boolean; // Deprecated
  parentScrollSelector?: string;
  description?: string;
  tooltip?: string;
  tooltipPosition?: string;
  layoutOptions?: { order?: string, download?: boolean, edit?: boolean, customActions?: boolean, labelStyle?: string, draggable?: boolean, iconStyle?: string };
  customControl?: any;
  customControlConfig?: any;
  military?: boolean;
  dateFormat?: string;
  textMaskEnabled?: boolean;
  allowInvalidDate?: boolean;
  tipWell?: {
    tip: string,
    icon?: string,
    button?: boolean;
  };
  width?: number;
  startupFocus?: boolean;
  fileBrowserImageUploadUrl?: string;
  isEmpty?: Function;
}

export class BaseControl {
  __type: string = 'BaseControl';
  __config: NovoControlConfig;

  validators: Array<any>;
  asyncValidators?: Array<any>;
  value: any;
  key: string;
  label: string;
  checkboxLabel: string;
  required: boolean;
  hidden: boolean;
  encrypted: boolean;
  sortOrder: number;
  controlType: string;
  placeholder: string;
  config: any;
  dirty: boolean;
  multiple: boolean;
  headerConfig: any;
  currencyFormat: string;
  associatedEntity: string;
  optionsType: string;
  forceClear: EventEmitter<any>;
  maxlength: number;
  minlength: number;
  options: Array<any>;
  type: string;
  subType?: string;
  name: string;
  disabled: boolean;
  readOnly: boolean; // "disabled", so it appears in the model still
  closeOnSelect: boolean;
  interactions: Array<Object>;
  dataSpecialization: string;
  appendToBody: boolean; // Deprecated
  parentScrollSelector: string;
  description?: string;
  tooltip?: string;
  tooltipPosition?: string;
  layoutOptions?: { order?: string, download?: boolean, labelStyle?: string, draggable?: boolean, iconStyle?: string };
  customControl?: any;
  customControlConfig?: any;
  military?: boolean;
  dateFormat?: string;
  textMaskEnabled?: boolean;
  allowInvalidDate?: boolean;
  tipWell?: {
    tip: string,
    icon?: string,
    button?: boolean;
  };
  width: number;
  startupFocus?: boolean;
  fileBrowserImageUploadUrl?: string;
  isEmpty?: Function;

  constructor(type: string = 'BaseControl', config: NovoControlConfig = {}) {
    this.__type = type;
    this.__config = config;
    this.validators = config.validators || [];
    this.asyncValidators = config.asyncValidators || [];
    this.value = config.value;
    this.key = config.key || '';
    this.label = config.label || '';
    this.checkboxLabel = config.checkboxLabel;
    this.name = config.name || '';
    this.required = !!config.required;
    this.hidden = !!config.hidden;
    this.encrypted = !!config.encrypted;
    this.sortOrder = config.sortOrder === undefined ? 1 : config.sortOrder;
    this.controlType = config.controlType || '';
    this.placeholder = config.placeholder || '';
    this.config = config.config || null;
    this.dirty = !!config.value;
    this.multiple = !!config.multiple;
    this.headerConfig = config.headerConfig || null;
    this.currencyFormat = config.currencyFormat || null;
    this.associatedEntity = config.associatedEntity || null;
    this.optionsType = config.optionsType || null;
    this.options = config.options || [];
    this.forceClear = new EventEmitter();
    this.readOnly = !!config.readOnly || !!config.disabled;
    this.disabled = !!config.disabled;
    this.layoutOptions = config.layoutOptions || {};
    this.military = !!config.military;
    this.dateFormat = config.dateFormat;
    this.textMaskEnabled = config.textMaskEnabled;
    this.allowInvalidDate = config.allowInvalidDate;

    if (this.required) {
      this.validators.push(Validators.required);
    }
    if (!Helpers.isBlank(config.maxlength)) {
      this.maxlength = config.maxlength;
      this.validators.push(Validators.maxLength(this.maxlength));
    }
    if (!Helpers.isBlank(config.minlength)) {
      this.minlength = config.minlength;
      this.validators.push(Validators.minLength(this.minlength));
    }
    this.closeOnSelect = !!config.closeOnSelect;
    this.interactions = config.interactions;
    this.dataSpecialization = config.dataSpecialization;
    this.appendToBody = !!config.appendToBody;
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    this.parentScrollSelector = config.parentScrollSelector;
    this.description = config.description;
    if (config.tooltip) {
      this.tooltip = config.tooltip;
      this.tooltipPosition = config.tooltipPosition;
    }
    this.customControl = config.customControl;
    this.customControlConfig = config.customControlConfig;
    this.tipWell = config.tipWell;
    this.width = config.width;
    this.startupFocus = !!config.startupFocus;
    if (config.fileBrowserImageUploadUrl) {
      this.fileBrowserImageUploadUrl = config.fileBrowserImageUploadUrl;
    }
    if (config.isEmpty) {
      this.isEmpty = config.isEmpty;
    }
  }
}
