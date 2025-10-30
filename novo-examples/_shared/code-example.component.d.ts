import { ComponentPortal } from '@angular/cdk/portal';
import { LiveExample } from '../examples.module';
import * as i0 from "@angular/core";
export declare class CodeExampleComponent {
    /** Component portal for the currently displayed example. */
    selectedPortal: ComponentPortal<any>;
    /** String key of the currently displayed example. */
    _example: string;
    exampleData: LiveExample;
    /** Whether the source for the example is being displayed. */
    showSource: boolean;
    constructor();
    get example(): string;
    set example(example: string);
    toggleSourceView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeExampleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeExampleComponent, "code-example", never, { "example": { "alias": "example"; "required": false; }; }, {}, never, never, false, never>;
}
