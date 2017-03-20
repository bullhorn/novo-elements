const MAX_INTEGER = 2147483647;
const MIN_YEAR = 1753;

export class FormValidators {
    // Makes sure the control value does not exceed the max integer value
    static maxInteger(control) {
        return control.value < MAX_INTEGER ? null : { 'integerTooLarge': true };
    }

    // Makes sure the control value is above the minimum year
    static minYear(control) {
        if (!control.value) {
            return null;
        }
        return control.value >= MIN_YEAR ? null : { 'minYear': true };
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

    // Makes sure the control value is a valid address
    static isValidAddress(control) {
        if (control.value && control.dirty) {
            let valid = true;
            // Address
            if ((!control.value.address1 || control.value.address1.length === 0) &&
               (!control.value.city || control.value.city.length === 0) &&
               (!control.value.state || control.value.state.length === 0) &&
               (!control.value.address2 || control.value.address2.length === 0) &&
               (!control.value.zip || control.value.zip.length === 0) &&
                (!control.value.countryName || control.value.countryName.length === 0))  {
                valid = false;
            }
            return valid ? null : { 'invalidAddress': true };
        }
        return null;
    }
}
