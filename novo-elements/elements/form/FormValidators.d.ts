export declare class FormValidators {
    private showStateRequiredFlag;
    static maxInteger(control: any): {
        integerTooLarge: boolean;
    };
    static minYear(control: any): {
        minYear: boolean;
    };
    static maxDouble(control: any): {
        doubleTooLarge: boolean;
    };
    static isEmail(control: any): {
        invalidEmail: boolean;
    };
    static isValidAddress(control: any): {
        invalidAddress?: boolean;
        invalidAddressFields?: string[];
        invalidAddressForForm?: boolean;
        maxlength?: boolean;
        maxlengthFields?: string[];
    };
}
