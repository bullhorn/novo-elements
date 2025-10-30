import { FormUtils } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Address Control Example
 */
export declare class AddressControlExample {
    private formUtils;
    addressControl: any;
    secondaryAddressControl: any;
    addressForm: any;
    addressFormControls: any;
    states: any[];
    constructor(formUtils: FormUtils);
    getStateOptions(filter: string, countryID: number): any[];
    getStateLabel(value: number): string;
    getCountryOptions(filter?: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressControlExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressControlExample, "address-control-example", never, {}, {}, never, never, false, never>;
}
