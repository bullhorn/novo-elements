// NG2
import { EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
// APP
import { Helpers } from '../../../utils/Helpers';
import { notify } from '../../../utils/notifier/notifier.util';
import { IMaskOptions } from '../Control';
import { NovoControlGroupAddConfig } from '../ControlGroup';

export interface NovoGroupedControlConfig {
  label?: string;
  icon?: string;
  add?: NovoControlGroupAddConfig;
  remove?: boolean;
  key: string;
  initialValue?: {}[];
}

class ControlConfig {
  alwaysActive?: Boolean;
  allowInvalidDate?: boolean;
  appendToBody: boolean; // Deprecated;
  associatedEntity: string;
  asyncValidators?: Array<any>;
  checkboxLabel: string;
  closeOnSelect: boolean;
  config: any;
  controlType: string;
  currencyFormat: string;
  customControl?: any;
  customControlConfig?: any;
  dataSpecialization: string;
  dataType: string;
  dateFormat?: string;
  description?: string;
  dirty: boolean;
  disabled: boolean;
  enabled: boolean;
  encrypted: boolean;
  endDate?: Date | Number;
  fileBrowserImageUploadUrl?: string;
  forceClear: EventEmitter<any>;
  headerConfig: any;
  hidden: boolean;
  interactions: Array<{ event?: 'change' | 'focus' | string; invokeOnInit?: boolean; script? }>;
  isEmpty?: Function;
  key: string;
  label: string;
  maskOptions?: IMaskOptions;
  maxlength: number;
  metaType: string;
  military?: boolean;
  minimal?: boolean;
  minlength: number;
  multiple: boolean;
  name: string;
  options: Array<any>;
  optionsType: string;
  parentScrollSelector: string;
  placeholder: string;
  readOnly: boolean; // "disabled", so it appears in the model still;
  removeTooltipArrow?: boolean;
  required: boolean;
  restrictFieldInteractions?: boolean;
  sortOrder: number;
  startDate?: Date | Number;
  startupFocus?: boolean;
  subType?: string;
  template?: any;
  textMaskEnabled?: boolean;
  tooltip?: string;
  tooltipAutoPosition?: boolean;
  tooltipPosition?: string;
  tooltipPreline?: boolean;
  tooltipSize?: string;
  type: string;
  validators: Array<any>;
  value: any;
  warning?: string;
  width: number;
  layoutOptions?: {
    customActions?: boolean;
    download?: boolean;
    draggable?: boolean;
    edit?: boolean;
    iconStyle?: string;
    labelStyle?: string;
    order?: string;
    removable?: boolean;
    customValidation?: { action: string; fn: Function }[];
    removableWhenNew?: boolean;
  };
  tipWell?: {
    button?: boolean;
    icon?: string;
    tip: string;
  };
  isEmbedded = false;
  isInlineEmbedded = false;
  weekStart?: number;
  highlighted = false;
  disabledDateMessage?: string;
}

export type NovoControlConfig = Partial<ControlConfig>;

export class BaseControl extends ControlConfig {
  __type: string = 'BaseControl';
  __config: NovoControlConfig;

  constructor(type: string = 'BaseControl', config: NovoControlConfig = {}) {
    super();
    this.__type = type;
    this.__config = config;
    this.alwaysActive = config.alwaysActive;
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
    this.type = config.type;
    this.subType = config.subType;
    this.metaType = config.metaType;
    this.placeholder = config.placeholder || '';
    this.config = config.config || null;
    this.dirty = !!(config.value !== undefined && config.value !== null);
    this.multiple = !!config.multiple;
    this.headerConfig = config.headerConfig || null;
    this.currencyFormat = config.currencyFormat || null;
    this.associatedEntity = config.associatedEntity || null;
    this.optionsType = config.optionsType || null;
    this.options = config.options || [];
    this.forceClear = new EventEmitter();
    this.readOnly = !!config.readOnly || !!config.disabled;
    this.disabled = !!config.disabled;
    this.enabled = true;
    this.layoutOptions = config.layoutOptions || {};
    this.military = !!config.military;
    this.dateFormat = config.dateFormat;
    this.textMaskEnabled = config.textMaskEnabled;
    this.maskOptions = config.maskOptions;
    this.allowInvalidDate = config.allowInvalidDate;
    this.startDate = config.startDate;
    this.endDate = config.endDate;
    this.restrictFieldInteractions = !!config.restrictFieldInteractions;
    this.highlighted = !!config.highlighted;
    if (!Helpers.isEmpty(config.warning)) {
      this.warning = config.warning;
    }

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
    this.dataType = config.dataType;
    this.appendToBody = !!config.appendToBody;
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    this.parentScrollSelector = config.parentScrollSelector;
    this.description = config.description;
    if (config.tooltip) {
      this.tooltip = config.tooltip;
      this.tooltipPosition = config.tooltipPosition;
      this.tooltipSize = config.tooltipSize;
      this.tooltipPreline = config.tooltipPreline;
      this.removeTooltipArrow = config.removeTooltipArrow;
      this.tooltipAutoPosition = config.tooltipAutoPosition;
    }
    this.template = config.template;
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
    this.weekStart = config.weekStart || 0;
    this.disabledDateMessage = config.disabledDateMessage;
  }
}
