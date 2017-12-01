export declare class FormValidators {
    static maxInteger(control: any): {
        'integerTooLarge': boolean;
    };
    static minYear(control: any): {
        'minYear': boolean;
    };
    static maxDouble(control: any): {
        'doubleTooLarge': boolean;
    };
    static isEmail(control: any): {
        'invalidEmail': boolean;
    };
    static isValidAddress(control: any): {
        'invalidAddress': boolean;
    };
}
