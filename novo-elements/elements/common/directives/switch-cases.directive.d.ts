import { NgSwitch } from '@angular/common';
import { DoCheck, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SwitchCasesDirective implements OnInit, DoCheck {
    private viewContainer;
    private templateRef;
    private ngSwitch;
    private _created;
    novoSwitchCases: any[];
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, ngSwitch: NgSwitch);
    ngOnInit(): void;
    ngDoCheck(): void;
    enforceState(created: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchCasesDirective, [null, null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SwitchCasesDirective, "[novoSwitchCases]", never, { "novoSwitchCases": { "alias": "novoSwitchCases"; "required": false; }; }, {}, never, never, false, never>;
}
