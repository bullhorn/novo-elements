import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class OptionsService {
    constructor();
    getOptionsConfig(http: HttpClient, field: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OptionsService>;
}
