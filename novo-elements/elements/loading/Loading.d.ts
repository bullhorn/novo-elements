import { EmbeddedViewRef, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoLoadingElement {
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value: string);
    get theme(): string;
    color: string;
    size: string;
    get hb_class(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLoadingElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLoadingElement, "novo-loading", never, { "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSpinnerElement {
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value: string);
    get theme(): string;
    color: string;
    size: string;
    private _inverse;
    get inverse(): boolean;
    set inverse(value: boolean);
    get hb_class(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSpinnerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSpinnerElement, "novo-spinner", never, { "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "inverse": { "alias": "inverse"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSkeletonDirective {
    skeleton: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSkeletonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSkeletonDirective, "[skeleton]", never, {}, {}, never, never, false, never>;
}
export declare class NovoLoadedDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLoadedDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoLoadedDirective, "[loaded]", never, {}, {}, never, never, false, never>;
}
export declare class NovoIsLoadingDirective {
    private viewContainer;
    skeletonTemplates: QueryList<TemplateRef<any>>;
    loadedTemplates: QueryList<TemplateRef<any>>;
    private hasView;
    private skeletonViews;
    private loadedViews;
    constructor(viewContainer: ViewContainerRef);
    set isLoading(condition: boolean);
    createViews(templates: QueryList<TemplateRef<any>>): EmbeddedViewRef<any>[];
    destroyViews(views: EmbeddedViewRef<any>[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoIsLoadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoIsLoadingDirective, "[isLoading]", never, { "isLoading": { "alias": "isLoading"; "required": false; }; }, {}, ["skeletonTemplates", "loadedTemplates"], never, false, never>;
}
