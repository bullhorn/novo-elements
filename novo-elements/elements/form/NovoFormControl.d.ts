import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import type { IMaskOptions } from './Control';
import { NovoControlConfig } from './FormControls';
export declare class NovoFormControl extends FormControl {
    displayValueChanges: EventEmitter<any>;
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
    tooltipIsHTML?: boolean;
    popoverContent?: string;
    popoverHtmlContent?: string;
    popoverTitle?: string;
    popoverPlacement?: 'left' | 'right' | 'top' | 'bottom';
    popoverOnHover?: boolean;
    popoverAlways?: boolean;
    popoverDisabled?: boolean;
    popoverAnimation?: boolean;
    popoverDismissTimeout?: number;
    removeTooltipArrow?: boolean;
    tooltipAutoPosition?: boolean;
    initialValue: any;
    valueHistory: any[];
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
    appendToBody: boolean;
    parentScrollSelector: string;
    description?: string;
    layoutOptions?: {
        order?: string;
        download?: boolean;
        labelStyle?: string;
        draggable?: boolean;
        iconStyle?: string;
    };
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
    highlighted?: boolean;
    disabledDateMessage?: string;
    private historyTimeout;
    constructor(value: any, control: NovoControlConfig);
    /**
     * @param clearValue - flag to reset the control's value
     */
    hide(clearValue?: boolean): void;
    show(): void;
    setRequired(isRequired: boolean): void;
    setValue(value: any, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange, }?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    setReadOnly(isReadOnly: boolean): void;
    /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     */
    disable(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    enable(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    markAsInvalid(message: string): void;
    markAsValid(): void;
}
