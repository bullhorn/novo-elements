// NG2
import { FormControl, Validators } from '@angular/forms';
// APP
import { NovoControlConfig } from './FormControls';

export class NovoFormControl extends FormControl {
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
        let validators: any = [...this.validators];
        // Update validators to have the required
        if (this.required && !this.hasRequiredValidator) {
            validators.push(Validators.required);
        } else if (!this.required && this.hasRequiredValidator) {
            validators = validators.filter(val => val !== Validators.required);
        }
        this.setValidators(validators);
        this.updateValueAndValidity();
        this.hasRequiredValidator = this.required;
    }

    /**
     *
     * @param value
     * @param config
     */
    public setValue(value: any, config: { onlySelf?: boolean, emitEvent?: boolean, emitModelToViewChange?: boolean, emitViewToModelChange?: boolean } = {}): void {
        this.markAsDirty();
        this.markAsTouched();
        super.setValue(value, config);
    }

    /**
     * @name setReadOnly
     * @param isReadOnly
     */
    public setReadOnly(isReadOnly: boolean): void {
        this.readOnly = isReadOnly;
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
