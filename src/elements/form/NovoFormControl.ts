// NG2
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { NovoControlConfig } from './FormControls';
import { Helpers } from '../../utils/Helpers';

export class NovoFormControl extends FormControl {
    displayValueChanges: EventEmitter<any> = new EventEmitter<any>();
    hidden: boolean;
    required: boolean;
    readOnly: boolean;
    hasRequiredValidator: boolean;
    label: string;
    tooltip: string;
    tooltipPosition: string;
    initialValue: any;
    validators: any;

    constructor(value: any, control: NovoControlConfig) {
        super(value, control.validators, control.asyncValidators);
        this.validators = control.validators;
        this.initialValue = value;
        this.label = control.label;
        this.readOnly = control.readOnly;
        this.hidden = control.hidden;
        this.required = control.required;
        this.hasRequiredValidator = this.required;
        this.tooltip = control.tooltip;
        this.tooltipPosition = control.tooltipPosition;

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
        // TODO: Should we set defaults on these?
        this.displayValueChanges.emit(value);
        super.setValue(value, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange });
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
    get value() {
        return this.getRawValue();
    }
}
