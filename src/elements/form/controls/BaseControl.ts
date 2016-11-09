// NG2
import { Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export interface NovoControlConfig {
    validators?: Array<any>;
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
    options?: Array<any>;
    type?: string;
}

export class BaseControl {
    validators: Array<any>;
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
    disabled: boolean;
    maxlength: number;
    options: Array<any>;
    type: string;

    constructor(config: NovoControlConfig) {
        this.validators = config.validators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
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
        this.disabled = config.disabled || false;
        if (this.required) {
            this.validators.push(Validators.required);
        }
        if (config.maxlength) {
            this.maxlength = config.maxlength;
        }
    }
}
