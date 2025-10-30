import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTemplate, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoTemplate, "[novoTemplate]", never, { "type": { "alias": "type"; "required": false; }; "name": { "alias": "novoTemplate"; "required": false; }; }, {}, never, never, false, never>;
}
