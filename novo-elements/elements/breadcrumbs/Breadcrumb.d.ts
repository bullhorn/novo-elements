import { TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
import { SourceConfig } from './Breadcrumb.types';
import * as i0 from "@angular/core";
export declare class BreadcrumbElement {
    private breadcrumbService;
    separatorIcon: TemplateRef<any>;
    source: Array<SourceConfig>;
    constructor(breadcrumbService: BreadcrumbService);
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbElement, "novo-breadcrumb", never, { "separatorIcon": { "alias": "separatorIcon"; "required": false; }; "source": { "alias": "source"; "required": false; }; }, {}, never, ["*"], false, never>;
}
