import { Security } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Security Example
 */
export declare class SecurityExample {
    private security;
    perms: any[];
    constructor(security: Security);
    shufflePermissions(): void;
    shuffle(array: string[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SecurityExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SecurityExample, "security-example", never, {}, {}, never, never, false, never>;
}
