const MAX_INTEGER = 2147483647;

export class FormValidators {
    // Makes sure the control value does not exceed the max integer value
    static maxInteger(control) {
        return control.value < MAX_INTEGER ? null : { 'integerTooLarge': true };
    }

    // Makes sure the control value does not exceed the max number value
    static maxDouble(control) {
        return control.value < Number.MAX_SAFE_INTEGER ? null : { 'doubleTooLarge': true };
    }

    // Make sure the control value is an email
    static isEmail(control) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !control.value || EMAIL_REGEXP.test(control.value) ? null : { 'invalidEmail': true };
    }
}
