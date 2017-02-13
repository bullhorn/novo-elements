// NG2
import { Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { Helpers } from '../../../utils/Helpers';

export interface NovoControlConfig {
    validators?: Array<any>;
    asyncValidators?: Array<any>;
    value?: any;
    key?: string;
    label?: string;
    required?: boolean;
    hidden?: boolean;
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
    name?: string;
    readOnly?: boolean;
    closeOnSelect?: boolean;
    interactions?: Array<Object>;
    dataSpecialization?: string;
    appendToBody?: boolean;
    parentScrollSelector?: string;
    description?: string;
    tooltip?: string;
    tooltipPosition?: string;
}

export class BaseControl {
    validators: Array<any>;
    asyncValidators?: Array<any>;
    value: any;
    key: string;
    label: string;
    required: boolean;
    hidden: boolean;
    sortOrder: number;
    controlType: string;
    placeholder: string;
    config: NovoControlConfig;
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
    name: string;
    disabled: boolean;
    readOnly: boolean; // "disabled", so it appears in the model still
    closeOnSelect: boolean;
    interactions: Array<Object>;
    dataSpecialization: string;
    appendToBody: boolean;
    parentScrollSelector: string;
    description?: string;
    tooltip?: string;
    tooltipPosition?: string;

    constructor(config: NovoControlConfig) {
        this.validators = config.validators || [];
        this.asyncValidators = config.asyncValidators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.name = config.name || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
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
        this.forceClear = new EventEmitter();
        this.readOnly = !!config.readOnly || !!config.disabled;
        this.disabled = !!config.disabled;
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
        this.parentScrollSelector = config.parentScrollSelector;
        this.description = config.description;
        if (config.tooltip) {
            this.tooltip = config.tooltip;
            this.tooltipPosition = config.tooltipPosition;
        }
    }
}
