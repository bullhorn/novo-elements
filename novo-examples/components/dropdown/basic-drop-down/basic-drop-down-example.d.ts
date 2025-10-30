import { AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @title Basic Drop Down
 */
export declare class BasicDropDownExample implements AfterContentInit {
    asyncItems: any[];
    clickMe(event?: string): void;
    ngAfterContentInit(): Promise<void>;
    getAsyncItems(): Promise<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicDropDownExample, "basic-drop-down-example", never, {}, {}, never, never, false, never>;
}
