import { EventEmitter } from '@angular/core';

export interface IMaskOptions {
  mask: any;
  keepCharPositions: boolean;
  guide: boolean;
}

export abstract class ControlConfig {
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
