import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
interface PropType {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
}
interface PropTypeDeclaration {
    name?: string;
    type: string;
    types: {
        type: string;
        value: string;
    }[];
    elementType?: {
        name: string;
        type: string;
    };
}
interface PropertyDeclartion {
    name: string;
    kindString: string;
    decorators: any[];
    type: PropTypeDeclaration;
    defaultValue: string;
    comment: {
        shortText: string;
        tags?: {
            tag: string;
            text: string;
        }[];
    };
    getSignature?: Omit<PropertyDeclartion, 'getSignature'>;
}
export declare class PropsTableComponent implements OnInit {
    component: string;
    kinds: string[];
    props: PropType[];
    ngOnInit(): void;
    getDefaultValue(p: PropertyDeclartion): string;
    getType(p: PropertyDeclartion): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropsTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PropsTableComponent, "props-table", never, { "component": { "alias": "component"; "required": false; }; "kinds": { "alias": "kinds"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
