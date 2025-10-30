import * as i0 from "@angular/core";
/**
 * @title Breadcrumb Dynamic Usage Example
 */
export declare class BreadcrumbSourceUsageExample {
    source: ({
        title: string;
        showMenu: boolean;
        link: string;
        noNavigation?: undefined;
        isSearch?: undefined;
        menuList?: undefined;
    } | {
        title: string;
        link: string;
        showMenu: boolean;
        noNavigation: boolean;
        isSearch: boolean;
        menuList: ({
            name: string;
            link: string;
            target: string;
            linkType?: undefined;
        } | {
            name: string;
            link: string;
            linkType: string;
            target?: undefined;
        })[];
    })[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbSourceUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbSourceUsageExample, "breadcrumb-source-usage-example", never, {}, {}, never, never, false, never>;
}
