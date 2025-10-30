import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { TypographySize } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
export declare class NovoIconComponent implements AfterViewInit {
    element: ElementRef;
    private cdr;
    raised: boolean;
    theme: string;
    shape: string;
    color: string;
    role: string;
    ariaLabel: string;
    size: TypographySize;
    smaller: boolean;
    larger: boolean;
    set alt(value: string);
    get alt(): string;
    set name(iconName: string);
    get name(): string;
    get hb_classBinding(): string;
    iconName: string;
    constructor(element: ElementRef, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    projectContentChanged(record: MutationRecord): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoIconComponent, "novo-icon", never, { "raised": { "alias": "raised"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "smaller": { "alias": "smaller"; "required": false; }; "larger": { "alias": "larger"; "required": false; }; "alt": { "alias": "alt"; "required": false; }; "name": { "alias": "name"; "required": false; }; }, {}, never, ["*"], false, never>;
}
