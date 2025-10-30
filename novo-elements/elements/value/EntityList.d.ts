import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class EntityList implements OnInit {
    data: any;
    meta: any;
    baseEntity: string;
    metaDisplay: any;
    ENTITY_SHORT_NAMES: any;
    constructor();
    ngOnInit(): any;
    getClass(entity: any): any;
    openLink(entity: any): void;
    isLinkable(entity: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityList, "novo-entity-list", never, { "data": { "alias": "data"; "required": false; }; "meta": { "alias": "meta"; "required": false; }; }, {}, never, never, false, never>;
}
