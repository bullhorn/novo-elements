import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class Security {
    credentials: string[];
    change: EventEmitter<any>;
    grant(data: any[] | Object): void;
    has(value: any): boolean;
    revoke(value: any): void;
    clear(): void;
    subscribe(fn: any): void;
    checkRoutes(routes: {
        entities?: any[];
        permissions?: any[] | Function;
        path?: string;
        label?: string;
        canDisable?: Boolean;
    }[], options: {
        entityType?: string;
    }): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<Security, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Security>;
}
