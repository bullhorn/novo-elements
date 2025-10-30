import { OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NovoSelectElement } from './Select';
import * as i0 from "@angular/core";
/**
 * Fixes a <novo-select> element so that if its value is updated externally, the checkboxes in the dropdown selector
 * update accordingly. Because this is a functionality change to a core control, this fix is provided as a directive
 * to only be used if needed.
 */
export declare class NovoSelectExtUpdateFix implements OnInit {
    control: NgControl;
    selectElement: NovoSelectElement;
    ngOnInit(): void;
    afterExternalUpdate(rawValue: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSelectExtUpdateFix, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSelectExtUpdateFix, "novo-select[extupdatefix]", never, {}, {}, never, never, false, never>;
}
