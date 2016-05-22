const MAX_INTEGER = 2147483647;

export class FormValidators {
    // Makes sure the control value does not exceed the max integer value
    static maxInteger(control) {
        if (control.value > MAX_INTEGER) return { 'maxInteger': true };
        return null;
    }

    // Makes sure the control value does not exceed the max number value
    static maxDouble(control) {
        if (control.value > Number.MAX_SAFE_INTEGER) return { 'maxDouble': true };
        return null;
    }

    // Makes sure the control value is NOT NaN
    // Helps circumvent an NG2 issue where NaN passes validation for required
    static isNumber(control) {
        if (Number.isNaN(control.value)) return { 'requiredNumber': true };
        return null;
    }
}
